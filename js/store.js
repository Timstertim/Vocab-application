/* Persistent app state backed by localStorage. */
(function (root) {
  'use strict';
  const KEY = 'sanasto-v1';
  const listeners = [];

  function defaults() {
    return {
      words: [],
      categories: [],
      games: [],
      settings: { lenient: false, speech: true },
    };
  }

  const Starter = root.VocabStarter;
  let upgradeNote = '';

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) return upgradeStarter(Object.assign(defaults(), JSON.parse(raw)));
    } catch (e) {
      console.warn('Could not read saved data', e);
    }
    // First run: seed with the starter pack.
    const s = defaults();
    s.categories = Starter.categories.slice();
    s.words = Starter.words.map(({ since, ...w }) => w);
    s.starterVersion = Starter.VERSION;
    s.starterFixes = Starter.FIXES;
    return s;
  }

  /** Fill in missing levels on saved words from the starter list (words saved before levels existed). */
  function backfillLevels(s) {
    const byFinnish = new Map(Starter.words.map((w) => [root.VocabCore.normalize(w.finnish), w.level]));
    let changed = false;
    for (const w of s.words) {
      if (w.level) continue;
      const lv = byFinnish.get(root.VocabCore.normalize(w.finnish));
      if (lv) { w.level = lv; changed = true; }
    }
    return changed;
  }

  /** Apply corrections to starter words, once. Fields the user has changed are left alone. */
  function applyFixes(s) {
    if ((s.starterFixes || 0) >= (Starter.FIXES || 0)) return false;
    const norm = root.VocabCore.normalize;
    const current = new Map(Starter.words.map((w) => [norm(w.finnish), w]));
    for (const fix of Starter.fixes || []) {
      const now = current.get(norm(fix.finnish));
      if (!now) continue;
      for (const w of s.words) {
        if (norm(w.finnish) !== norm(fix.finnish)) continue;
        for (const field of Object.keys(fix)) {
          if (field === 'finnish') continue;
          if (field === 'addCategories') {
            for (const cid of fix.addCategories) {
              const starterCat = Starter.categories.find((c) => c.id === cid);
              const cat = s.categories.find((c) => c.id === cid || c.name.toLowerCase() === starterCat.name.toLowerCase());
              if (cat && !w.categoryIds.includes(cat.id)) w.categoryIds.push(cat.id);
            }
            continue;
          }
          if (JSON.stringify(w[field]) === JSON.stringify(fix[field])) w[field] = JSON.parse(JSON.stringify(now[field]));
        }
      }
    }
    s.starterFixes = Starter.FIXES;
    return true;
  }

  /** Give existing users the starter words added since they last opened the app, once. */
  function upgradeStarter(s) {
    const from = s.starterVersion || 1;
    if (from >= Starter.VERSION) {
      const fixed = applyFixes(s);
      if (backfillLevels(s) || fixed) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { /* ignore */ } }
      return s;
    }
    const had = new Set(s.categories.map((c) => c.name.toLowerCase()));
    const res = root.VocabCore.mergeImport(s, Starter.newerThan(from), { onlyNew: true });
    const next = Object.assign(res.state, { starterVersion: Starter.VERSION });
    backfillLevels(next);
    applyFixes(next);
    if (res.added) {
      // Only categories the user didn't have before.
      const names = res.state.categories.map((c) => c.name).filter((n) => !had.has(n.toLowerCase()));
      upgradeNote = res.added + ' new starter words added' + (names.length > 4
        ? ' in ' + names.length + ' new categories – see Categories'
        : names.length ? ': ' + names.join(', ') : '');
    }
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch (e) { /* ignore */ }
    return next;
  }

  let state = load();

  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Could not save data', e);
    }
    listeners.forEach((fn) => fn(state));
  }

  const Store = {
    get: () => state,
    set(next) { state = next; save(); },
    update(fn) { fn(state); save(); },
    onChange(fn) { listeners.push(fn); },

    word: (id) => state.words.find((w) => w.id === id),
    category: (id) => state.categories.find((c) => c.id === id),
    game: (id) => state.games.find((g) => g.id === id),

    upsertWord(word) {
      Store.update((s) => {
        const i = s.words.findIndex((w) => w.id === word.id);
        if (i >= 0) s.words[i] = word; else s.words.push(word);
      });
    },
    deleteWord(id) {
      Store.update((s) => { s.words = s.words.filter((w) => w.id !== id); });
    },
    upsertCategory(cat) {
      Store.update((s) => {
        const i = s.categories.findIndex((c) => c.id === cat.id);
        if (i >= 0) s.categories[i] = cat; else s.categories.push(cat);
      });
    },
    deleteCategory(id) {
      Store.update((s) => {
        s.categories = s.categories.filter((c) => c.id !== id);
        s.words.forEach((w) => { w.categoryIds = (w.categoryIds || []).filter((c) => c !== id); });
        s.games.forEach((g) => { g.categoryIds = (g.categoryIds || []).filter((c) => c !== id); });
      });
    },
    upsertGame(game) {
      Store.update((s) => {
        const i = s.games.findIndex((g) => g.id === game.id);
        if (i >= 0) s.games[i] = game; else s.games.push(game);
      });
    },
    deleteGame(id) {
      Store.update((s) => { s.games = s.games.filter((g) => g.id !== id); });
    },
    /** Accept (or stop accepting) another word for the gap in one of a word's example sentences. */
    setAlsoFits(wordId, fi, finnish, add) {
      const w = Store.word(wordId);
      if (w) Store.upsertWord(root.VocabCore.setAlsoFits(w, fi, finnish, add));
    },
    /** Record a practice result for a word without re-rendering listeners. */
    recordAnswer(wordId, correct) {
      const w = Store.word(wordId);
      if (!w) return;
      w.stats = w.stats || { correct: 0, wrong: 0 };
      if (correct) w.stats.correct++; else w.stats.wrong++;
      w.stats.lastSeen = Date.now();
      try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
    },
    /** Message about starter words added on this load, shown once. */
    takeUpgradeNote() { const n = upgradeNote; upgradeNote = ''; return n; },
    addStarterPack() {
      const res = root.VocabCore.mergeImport(state, Starter, { onlyNew: true });
      Store.set(res.state);
      return res;
    },
    reset() {
      state = defaults();
      state.starterVersion = Starter.VERSION; // an emptied app stays empty
      state.starterFixes = Starter.FIXES;
      save();
    },
  };

  root.Store = Store;
})(window);

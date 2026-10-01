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
    return s;
  }

  /** Give existing users the starter words added since they last opened the app, once. */
  function upgradeStarter(s) {
    const from = s.starterVersion || 1;
    if (from >= Starter.VERSION) return s;
    const res = root.VocabCore.mergeImport(s, Starter.newerThan(from), { onlyNew: true });
    const next = Object.assign(res.state, { starterVersion: Starter.VERSION });
    if (res.added) {
      const names = Starter.newerThan(from).categories.map((c) => c.name).filter((n) => n !== 'Verbs');
      upgradeNote = res.added + ' new starter words added' + (names.length ? ': ' + names.join(', ') : '');
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
      save();
    },
  };

  root.Store = Store;
})(window);

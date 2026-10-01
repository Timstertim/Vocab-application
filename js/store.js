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

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) return Object.assign(defaults(), JSON.parse(raw));
    } catch (e) {
      console.warn('Could not read saved data', e);
    }
    // First run: seed with the starter pack.
    const s = defaults();
    s.categories = root.VocabStarter.categories.slice();
    s.words = root.VocabStarter.words.slice();
    return s;
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
    /** Record a practice result for a word without re-rendering listeners. */
    recordAnswer(wordId, correct) {
      const w = Store.word(wordId);
      if (!w) return;
      w.stats = w.stats || { correct: 0, wrong: 0 };
      if (correct) w.stats.correct++; else w.stats.wrong++;
      w.stats.lastSeen = Date.now();
      try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
    },
    addStarterPack() {
      const res = root.VocabCore.mergeImport(state, root.VocabStarter);
      Store.set(res.state);
      return res;
    },
    reset() {
      state = defaults();
      save();
    },
  };

  root.Store = Store;
})(window);

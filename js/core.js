/*
 * Pure, DOM-free logic shared by the app and the tests.
 * Exposed as window.VocabCore in the browser and module.exports in Node.
 */
(function (root, factory) {
  const core = factory();
  if (typeof module === 'object' && module.exports) module.exports = core;
  else root.VocabCore = core;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }

  function stripDiacritics(s) {
    return s.normalize('NFD').replace(/[̀-ͯ]/g, '');
  }

  /** Normalise text for comparing answers. */
  function normalize(s, opts) {
    opts = opts || {};
    let out = String(s || '').toLowerCase().trim();
    out = out.replace(/\([^)]*\)/g, ' ');            // drop "(informal)" style notes
    out = out.replace(/[.!?¿¡,;:"“”„'’´`]/g, '');
    out = out.replace(/\s+/g, ' ').trim();
    if (opts.lenient) out = stripDiacritics(out);
    return out;
  }

  /** Split a stored answer like "hi, hello / hey" into its accepted alternatives. */
  function alternatives(answer) {
    return String(answer || '')
      .split(/[,;/]/)
      .map((a) => a.trim())
      .filter(Boolean);
  }

  function levenshtein(a, b) {
    if (a === b) return 0;
    if (!a.length) return b.length;
    if (!b.length) return a.length;
    let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
    for (let i = 1; i <= a.length; i++) {
      const cur = [i];
      for (let j = 1; j <= b.length; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
      }
      prev = cur;
    }
    return prev[b.length];
  }

  /**
   * Check a typed answer against the stored answer.
   * Returns { correct, close, expected } where `close` means a small typo
   * (or a missing ä/ö when not in lenient mode).
   */
  function checkAnswer(input, answer, opts) {
    opts = opts || {};
    const given = normalize(input, opts);
    const alts = alternatives(answer);
    if (!alts.length) alts.push(String(answer || ''));
    let close = false;
    for (const alt of alts) {
      const variants = [normalize(alt, opts)];
      // English verbs: accept with or without the leading "to ".
      if (/^to /.test(variants[0])) variants.push(variants[0].slice(3));
      for (const v of variants) {
        if (!v) continue;
        if (given === v) return { correct: true, close: false, expected: answer };
        if (stripDiacritics(given) === stripDiacritics(v)) close = true;
        const allowed = v.length <= 4 ? 0 : v.length <= 8 ? 1 : 2;
        if (allowed && levenshtein(given, v) <= allowed) close = true;
      }
    }
    return { correct: false, close: close && given.length > 0, expected: answer };
  }

  function shuffle(arr, rng) {
    rng = rng || Math.random;
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  /** Words matching a free-text query and/or a category id. */
  function filterWords(words, filter) {
    filter = filter || {};
    const q = normalize(filter.query || '', { lenient: true });
    return words.filter((w) => {
      if (filter.categoryId && !(w.categoryIds || []).includes(filter.categoryId)) return false;
      if (filter.categoryIds && filter.categoryIds.length &&
          !(w.categoryIds || []).some((c) => filter.categoryIds.includes(c))) return false;
      if (!q) return true;
      const hay = [w.finnish, w.english, w.definition, w.notes]
        .concat((w.examples || []).map((e) => e.fi + ' ' + (e.en || '')))
        .map((t) => normalize(t || '', { lenient: true }))
        .join(' | ');
      return hay.includes(q);
    });
  }

  function sortWords(words, by) {
    const a = words.slice();
    const cmp = (x, y) => x.localeCompare(y, 'fi');
    if (by === 'english') a.sort((x, y) => cmp(x.english || '', y.english || ''));
    else if (by === 'newest') a.sort((x, y) => (y.createdAt || 0) - (x.createdAt || 0));
    else if (by === 'weakest') a.sort((x, y) => accuracy(x) - accuracy(y));
    else a.sort((x, y) => cmp(x.finnish || '', y.finnish || ''));
    return a;
  }

  /** Share of correct answers, or 0.5 for unseen words so they sit in the middle. */
  function accuracy(word) {
    const s = word.stats || {};
    const total = (s.correct || 0) + (s.wrong || 0);
    return total ? s.correct / total : 0.5;
  }

  /** Prompt/answer pair for a word in the given direction ('fi-en', 'en-fi' or 'mixed'). */
  function makeCard(word, direction, rng) {
    let dir = direction;
    if (dir === 'mixed') dir = (rng || Math.random)() < 0.5 ? 'fi-en' : 'en-fi';
    return dir === 'fi-en'
      ? { word, dir, prompt: word.finnish, answer: word.english, promptLang: 'fi', answerLang: 'en' }
      : { word, dir, prompt: word.english, answer: word.finnish, promptLang: 'en', answerLang: 'fi' };
  }

  /** Multiple-choice options: the right answer plus up to n-1 distinct distractors. */
  function choicesFor(card, pool, n, rng) {
    const field = card.answerLang === 'fi' ? 'finnish' : 'english';
    const seen = new Set([normalize(card.answer)]);
    const distractors = [];
    for (const w of shuffle(pool, rng)) {
      if (w.id === card.word.id) continue;
      const key = normalize(w[field]);
      if (!key || seen.has(key)) continue;
      seen.add(key);
      distractors.push(w[field]);
      if (distractors.length >= n - 1) break;
    }
    return shuffle(distractors.concat(card.answer), rng);
  }

  /** Pick the words for a game round, favouring words answered wrongly before. */
  function pickRound(words, count, rng) {
    rng = rng || Math.random;
    const weighted = words.map((w) => ({ w, key: rng() * (1.5 - accuracy(w)) }));
    weighted.sort((a, b) => b.key - a.key);
    const n = count && count > 0 ? Math.min(count, words.length) : words.length;
    return shuffle(weighted.slice(0, n).map((x) => x.w), rng);
  }

  function stripHtml(html) {
    return String(html || '')
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#0?39;/g, "'")
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Parse the Wiktionary REST response from
   * /api/rest_v1/page/definition/{word} into Finnish entries.
   */
  function parseWiktionary(json) {
    const entries = (json && json.fi) || [];
    return entries.map((e) => ({
      partOfSpeech: e.partOfSpeech || '',
      definitions: (e.definitions || [])
        .map((d) => {
          let examples = (d.parsedExamples || []).map((x) => ({
            fi: stripHtml(x.example),
            en: stripHtml(x.translation || ''),
          }));
          if (!examples.length) {
            examples = (d.examples || []).map((x) => ({ fi: stripHtml(x), en: '' }));
          }
          return { text: stripHtml(d.definition), examples: examples.filter((x) => x.fi) };
        })
        .filter((d) => d.text),
    })).filter((e) => e.definitions.length);
  }

  /**
   * Turn parsed Wiktionary entries into suggested word fields.
   * The short English gloss is the first definition up to the first comma/semicolon.
   */
  function suggestionFromEntries(entries) {
    if (!entries.length) return null;
    const first = entries[0];
    const defs = first.definitions;
    const gloss = defs[0].text.split(/[;(]/)[0].trim().replace(/\.$/, '');
    const examples = [];
    for (const e of entries) for (const d of e.definitions) for (const x of d.examples) {
      if (examples.length < 3) examples.push(x);
    }
    return {
      english: gloss,
      partOfSpeech: first.partOfSpeech.toLowerCase(),
      definition: defs.slice(0, 3).map((d) => d.text).join('; '),
      examples,
    };
  }

  /** Validate and merge imported data into the current state (by Finnish word). */
  function mergeImport(state, data) {
    if (!data || !Array.isArray(data.words)) throw new Error('File does not contain a "words" list.');
    const cats = state.categories.slice();
    const catIdByName = new Map(cats.map((c) => [c.name.toLowerCase(), c.id]));
    const importedCatMap = new Map();
    for (const c of data.categories || []) {
      if (!c || !c.name) continue;
      let id = catIdByName.get(c.name.toLowerCase());
      if (!id) {
        id = uid();
        cats.push({ id, name: c.name, color: c.color || '#3b6fd8' });
        catIdByName.set(c.name.toLowerCase(), id);
      }
      importedCatMap.set(c.id, id);
    }
    const words = state.words.slice();
    const byFinnish = new Map(words.map((w, i) => [normalize(w.finnish), i]));
    let added = 0, updated = 0;
    for (const w of data.words) {
      if (!w || !w.finnish) continue;
      const clean = {
        id: uid(),
        finnish: String(w.finnish),
        english: String(w.english || ''),
        partOfSpeech: String(w.partOfSpeech || ''),
        definition: String(w.definition || ''),
        notes: String(w.notes || ''),
        examples: Array.isArray(w.examples) ? w.examples.filter((x) => x && x.fi) : [],
        categoryIds: (w.categoryIds || []).map((c) => importedCatMap.get(c)).filter(Boolean),
        stats: w.stats || { correct: 0, wrong: 0 },
        createdAt: w.createdAt || Date.now(),
      };
      const idx = byFinnish.get(normalize(clean.finnish));
      if (idx === undefined) {
        words.push(clean);
        byFinnish.set(normalize(clean.finnish), words.length - 1);
        added++;
      } else {
        const old = words[idx];
        words[idx] = Object.assign({}, old, clean, {
          id: old.id,
          categoryIds: Array.from(new Set((old.categoryIds || []).concat(clean.categoryIds))),
          stats: old.stats,
        });
        updated++;
      }
    }
    return { state: Object.assign({}, state, { words, categories: cats }), added, updated };
  }

  return {
    uid, normalize, stripDiacritics, alternatives, levenshtein, checkAnswer, shuffle,
    filterWords, sortWords, accuracy, makeCard, choicesFor, pickRound,
    stripHtml, parseWiktionary, suggestionFromEntries, mergeImport,
  };
});

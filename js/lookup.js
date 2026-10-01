/* Online dictionary lookup via the English Wiktionary REST API (CORS enabled). */
(function (root) {
  'use strict';
  const Core = root.VocabCore;
  const API = 'https://en.wiktionary.org/api/rest_v1/page/definition/';
  const cache = new Map();

  async function lookup(word) {
    const term = String(word || '').trim();
    if (!term) throw new Error('Type a Finnish word first.');
    if (cache.has(term)) return cache.get(term);
    const tryTerms = Array.from(new Set([term, term.toLowerCase()]));
    let entries = [];
    for (const t of tryTerms) {
      const res = await fetch(API + encodeURIComponent(t.replace(/ /g, '_')), {
        headers: { Accept: 'application/json' },
      });
      if (res.status === 404) continue;
      if (!res.ok) throw new Error('Dictionary request failed (' + res.status + ').');
      entries = Core.parseWiktionary(await res.json());
      if (entries.length) break;
    }
    const result = { term, entries, suggestion: Core.suggestionFromEntries(entries) };
    cache.set(term, result);
    return result;
  }

  function pageUrl(word) {
    return 'https://en.wiktionary.org/wiki/' + encodeURIComponent(String(word).trim().replace(/ /g, '_')) + '#Finnish';
  }

  root.Lookup = { lookup, pageUrl };
})(window);

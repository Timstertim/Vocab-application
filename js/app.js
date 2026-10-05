/* Views, routing and forms. */
(function (root) {
  'use strict';
  const Core = root.VocabCore;
  const Store = root.Store;
  const Games = root.Games;
  const { esc, toast, speakButton, letterBar, catChip } = root.UI;

  const view = document.getElementById('view');
  const modalRoot = document.getElementById('modal-root');
  const PALETTE = ['#3b6fd8', '#e07a2e', '#c2417e', '#2e9a6b', '#7a55c7', '#d24545', '#1f8fa3', '#5b8f2a', '#a8781f', '#55606e'];
  const POS = ['', 'noun', 'verb', 'adjective', 'adverb', 'pronoun', 'numeral', 'preposition', 'postposition',
    'conjunction', 'interjection', 'phrase', 'particle', 'abbreviation', 'prefix'];

  /* ---------- Routing ---------- */
  function parseHash() {
    const raw = location.hash.replace(/^#\/?/, '') || 'words';
    const [path, qs] = raw.split('?');
    const parts = path.split('/').map(decodeURIComponent);
    const params = Object.fromEntries(new URLSearchParams(qs || ''));
    return { parts, params };
  }

  function go(hash) { location.hash = hash; }

  function route() {
    Games.stop();
    root.Roleplay.stop();
    root.NumbersGame.stop();
    closeModal();
    const { parts, params } = parseHash();
    const tab = { word: 'words', play: 'games', roleplay: 'games', numbers: 'games', cases: 'games' }[parts[0]] || parts[0];
    document.querySelectorAll('.tabs a').forEach((a) => a.classList.toggle('active', a.dataset.tab === tab));
    switch (parts[0]) {
      case 'word': return renderWordDetail(parts[1]);
      case 'categories': return renderCategories();
      case 'games': return renderGames(params);
      case 'play': return renderPlay(parts[1], params);
      case 'roleplay':
        if (parts[2] !== undefined && parts[2] !== '') return root.Roleplay.play(view, parts[1], Number(parts[2]));
        if (parts[1]) return root.Roleplay.renderScenario(view, parts[1]);
        return root.Roleplay.renderList(view);
      case 'numbers':
        if (parts[1]) return root.NumbersGame.play(view, parts[1]);
        return root.NumbersGame.renderList(view);
      case 'cases':
        if (parts[1]) return root.CasesGame.play(view, parts[1]);
        return root.CasesGame.renderList(view);
      case 'settings': return renderSettings();
      default: return renderWords(params);
    }
  }

  function categoryOptions(selected, allLabel) {
    return '<option value="">' + esc(allLabel || 'All categories') + '</option>' +
      Store.get().categories.map((c) => '<option value="' + esc(c.id) + '"' + (c.id === selected ? ' selected' : '') +
        '>' + esc(c.name) + ' (' + countIn(c.id) + ')</option>').join('');
  }
  /** <option>s for a level select. */
  function levelOptions(selected, emptyLabel, extra) {
    return '<option value="">' + esc(emptyLabel) + '</option>' + Core.LEVEL_SCALE.map((l) =>
      '<option value="' + l + '"' + (l === selected ? ' selected' : '') + '>' + l + '</option>').join('') + (extra || '');
  }
  /** "Level from … to …" selects. */
  function levelRange(idPrefix, min, max) {
    return '<span class="level-range"><label class="inline">Level <select id="' + idPrefix + '-lmin" aria-label="Lowest level">' +
      levelOptions(min, 'any') + '</select></label><label class="inline">to <select id="' + idPrefix + '-lmax" aria-label="Highest level">' +
      levelOptions(max, 'any') + '</select></label></span>';
  }
  function levelText(min, max) {
    if (!min && !max) return '';
    if (min && max) return min === max ? min : min + '–' + max;
    return min ? min + ' and up' : 'up to ' + max;
  }
  function levelBadge(level) { return level ? '<span class="lvl" title="Level ' + esc(level) + '">' + esc(level) + '</span>' : ''; }

  function countIn(catId) { return Store.get().words.filter((w) => (w.categoryIds || []).includes(catId)).length; }

  function accuracyBar(w) {
    const s = w.stats || {};
    const total = (s.correct || 0) + (s.wrong || 0);
    if (!total) return '<span class="acc new" title="Not practised yet">new</span>';
    const pct = Math.round((s.correct / total) * 100);
    const cls = pct >= 80 ? 'hi' : pct >= 50 ? 'mid' : 'lo';
    return '<span class="acc ' + cls + '" title="' + s.correct + ' right, ' + s.wrong + ' wrong">' + pct + '%</span>';
  }

  /* ---------- Words list ---------- */
  function renderWords(params) {
    const s = Store.get();
    const query = params.q || '';
    const catId = params.cat || '';
    const sort = params.sort || 'finnish';
    const lvl = params.lvl || '';
    view.innerHTML =
      '<section class="page">' +
      '<div class="page-head"><h1>My words <span class="count">' + s.words.length + '</span></h1>' +
      '<button class="btn primary" data-act="add">+ Add word</button></div>' +
      '<div class="toolbar">' +
      '<div class="search"><input id="q" type="search" placeholder="Search Finnish, English, definitions, examples…" value="' + esc(query) + '" aria-label="Search words"></div>' +
      '<select id="cat" aria-label="Filter by category">' + categoryOptions(catId) + '</select>' +
      '<select id="lvl" aria-label="Filter by level">' + levelOptions(lvl, 'All levels', '<option value="none"' + (lvl === 'none' ? ' selected' : '') + '>No level</option>') + '</select>' +
      '<select id="sort" aria-label="Sort">' +
      [['finnish', 'A–Ö (Finnish)'], ['english', 'A–Z (English)'], ['newest', 'Newest first'], ['weakest', 'Needs practice']]
        .map(([v, l]) => '<option value="' + v + '"' + (v === sort ? ' selected' : '') + '>' + l + '</option>').join('') +
      '</select></div>' +
      '<div id="word-list"></div></section>';

    const listEl = view.querySelector('#word-list');
    const qEl = view.querySelector('#q');
    const catEl = view.querySelector('#cat');
    const sortEl = view.querySelector('#sort');
    const lvlEl = view.querySelector('#lvl');

    function draw() {
      const list = Core.sortWords(Core.filterWords(Store.get().words, { query: qEl.value, categoryId: catEl.value, level: lvlEl.value }), sortEl.value);
      if (!Store.get().words.length) {
        listEl.innerHTML = '<div class="empty"><p>No words yet. Add your first Finnish word!</p>' +
          '<button class="btn primary" data-act="add">+ Add word</button></div>';
      } else if (!list.length) {
        const q = qEl.value.trim();
        listEl.innerHTML = '<div class="empty"><p>No words match.</p>' +
          (q ? '<button class="btn primary" data-act="add" data-prefill="' + esc(q) + '">+ Add “' + esc(q) + '” as a new word</button>' : '') +
          '</div>';
      } else {
        listEl.innerHTML = '<ul class="word-grid">' + list.map((w) =>
          '<li><a class="word-card" href="#/word/' + encodeURIComponent(w.id) + '">' +
          '<div class="wc-top"><span class="wc-fi" lang="fi">' + esc(w.finnish) + '</span><span class="wc-badges">' + levelBadge(w.level) + accuracyBar(w) + '</span></div>' +
          '<div class="wc-en">' + esc(w.english) + (w.partOfSpeech ? ' <span class="pos">' + esc(w.partOfSpeech) + '</span>' : '') + '</div>' +
          (w.examples && w.examples[0] ? '<div class="wc-ex" lang="fi">' + esc(w.examples[0].fi) + '</div>' : '') +
          '<div class="chips">' + (w.categoryIds || []).map((c) => catChip(Store.category(c))).join('') + '</div>' +
          '</a>' + speakButton(w.finnish, 'fi') + '</li>').join('') + '</ul>';
      }
    }
    function syncHash() {
      const p = new URLSearchParams();
      if (qEl.value) p.set('q', qEl.value);
      if (catEl.value) p.set('cat', catEl.value);
      if (lvlEl.value) p.set('lvl', lvlEl.value);
      if (sortEl.value !== 'finnish') p.set('sort', sortEl.value);
      const h = '#/words' + (p.toString() ? '?' + p : '');
      history.replaceState(null, '', h);
    }
    qEl.oninput = () => { draw(); syncHash(); };
    catEl.onchange = sortEl.onchange = lvlEl.onchange = () => { draw(); syncHash(); };
    const addHandler = (e) => {
      const b = e.target.closest('[data-act=add]');
      if (b) openWordForm(null, { finnish: b.dataset.prefill || '', categoryIds: catEl.value ? [catEl.value] : [] });
    };
    view.querySelector('.page-head').onclick = addHandler;
    listEl.onclick = addHandler;
    draw();
    if (query) qEl.focus();
  }

  /* ---------- Word detail ---------- */
  function renderWordDetail(id) {
    const w = Store.word(id);
    if (!w) { view.innerHTML = '<section class="page"><p>Word not found.</p><a href="#/words">Back to words</a></section>'; return; }
    view.innerHTML =
      '<section class="page narrow">' +
      '<a class="back" href="#/words">← All words</a>' +
      '<article class="word-detail card-pad"><div id="wd-body"></div>' +
      '<div class="row gap">' +
      '<button class="btn primary" data-act="edit">Edit</button>' +
      '<button class="btn" data-act="lookup">Find definitions &amp; examples online</button>' +
      '<a class="btn ghost" target="_blank" rel="noopener" href="' + esc(root.Lookup.pageUrl(w.finnish)) + '">Open in Wiktionary ↗</a>' +
      '<button class="btn danger ghost" data-act="delete">Delete</button>' +
      '</div>' +
      '<div id="lookup-results"></div>' +
      '</article></section>';
    const drawBody = () => { view.querySelector('#wd-body').innerHTML = wordBody(Store.word(id)); };
    drawBody();
    view.querySelector('#wd-body').addEventListener('click', (e) => {
      const b = e.target.closest('[data-unfit]');
      if (!b) return;
      const ex = Store.word(id).examples[Number(b.dataset.unfit)];
      Store.setAlsoFits(id, ex.fi, b.dataset.word, false);
      drawBody();
      toast(b.dataset.word + ' is no longer accepted for that sentence');
    });
    view.querySelector('[data-act=edit]').onclick = () => openWordForm(w);
    view.querySelector('[data-act=delete]').onclick = () => {
      if (confirm('Delete "' + w.finnish + '"?')) { Store.deleteWord(w.id); toast('Deleted ' + w.finnish); go('#/words'); }
    };
    view.querySelector('[data-act=lookup]').onclick = () => {
      const box = view.querySelector('#lookup-results');
      showLookup(box, w.finnish, {
        onDefinition: (text) => {
          const cur = Store.word(w.id);
          cur.definition = cur.definition ? cur.definition + '; ' + text : text;
          Store.upsertWord(cur);
          drawBody();
          toast('Definition added');
        },
        onExample: (ex) => {
          const cur = Store.word(w.id);
          cur.examples = (cur.examples || []).concat(ex);
          Store.upsertWord(cur);
          drawBody();
          toast('Example added');
        },
      });
    };
  }

  function wordBody(w) {
    const s = w.stats || {};
    return '<div class="wd-head"><h1 lang="fi">' + esc(w.finnish) + '</h1>' + speakButton(w.finnish, 'fi') + '</div>' +
      '<p class="wd-en">' + esc(w.english) + (w.partOfSpeech ? ' <span class="pos">' + esc(w.partOfSpeech) + '</span>' : '') + ' ' + levelBadge(w.level) + '</p>' +
      '<div class="chips">' + (w.categoryIds || []).map((c) => catChip(Store.category(c))).join('') + '</div>' +
      (w.definition ? '<h3>Definition</h3><p>' + esc(w.definition) + '</p>' : '') +
      '<h3>Examples</h3>' +
      ((w.examples || []).length ? '<ul class="examples">' + w.examples.map((x, xi) =>
        '<li><span lang="fi">' + esc(x.fi) + '</span> ' + speakButton(x.fi, 'fi') +
        (x.en ? '<br><span class="muted">' + esc(x.en) + '</span>' : '') +
        ((x.alsoFits || []).length ? '<div class="also-fits small"><span class="muted">Also accepted in Fill the gap:</span> ' +
          x.alsoFits.map((a) => '<span class="also-chip" lang="fi">' + esc(a) +
            ' <button type="button" class="icon-btn" data-unfit="' + xi + '" data-word="' + esc(a) + '" title="Stop accepting ' + esc(a) +
            '" aria-label="Stop accepting ' + esc(a) + '">✕</button></span>').join(' ') + '</div>' : '') +
        '</li>').join('') + '</ul>'
        : '<p class="muted">No examples yet.</p>') +
      (w.notes ? '<h3>Notes</h3><p class="notes">' + esc(w.notes) + '</p>' : '') +
      '<p class="muted small">Practised ' + ((s.correct || 0) + (s.wrong || 0)) + ' times · ' +
      (s.correct || 0) + ' right · ' + (s.wrong || 0) + ' wrong</p>';
  }

  /* ---------- Online lookup panel ---------- */
  async function showLookup(box, term, handlers) {
    box.innerHTML = '<div class="lookup card-pad"><p class="muted">Looking up “' + esc(term) + '” in Wiktionary…</p></div>';
    try {
      const res = await root.Lookup.lookup(term);
      if (!res.entries.length) {
        box.innerHTML = '<div class="lookup card-pad"><p>No Finnish entry found for “' + esc(term) + '”.</p>' +
          '<p class="muted small">Tip: dictionaries list the basic form – nouns in the nominative (e.g. <em>talo</em>, not <em>talossa</em>) ' +
          'and verbs in the infinitive (e.g. <em>puhua</em>, not <em>puhun</em>).</p></div>';
        return res;
      }
      box.innerHTML = '<div class="lookup card-pad"><h3>Wiktionary results for “' + esc(term) + '”</h3>' +
        res.entries.map((e, ei) => '<div class="entry"><div class="pos">' + esc(e.partOfSpeech) + '</div><ol>' +
          e.definitions.map((d, di) =>
            '<li><div class="def-row"><span>' + esc(d.text) + '</span>' +
            (handlers.onDefinition ? '<button type="button" class="btn small" data-def="' + ei + '-' + di + '">Use</button>' : '') + '</div>' +
            (d.examples.length ? '<ul class="examples">' + d.examples.map((x, xi) =>
              '<li><div class="def-row"><span><span lang="fi">' + esc(x.fi) + '</span>' +
              (x.en ? '<br><span class="muted">' + esc(x.en) + '</span>' : '') + '</span>' +
              (handlers.onExample ? '<button type="button" class="btn small" data-ex="' + ei + '-' + di + '-' + xi + '">Add</button>' : '') +
              '</div></li>').join('') + '</ul>' : '') +
            '</li>').join('') + '</ol></div>').join('') +
        '<p class="muted small">Source: <a href="' + esc(root.Lookup.pageUrl(term)) + '" target="_blank" rel="noopener">Wiktionary</a> (CC BY-SA).</p></div>';
      box.querySelectorAll('[data-def]').forEach((b) => {
        b.onclick = () => {
          const [ei, di] = b.dataset.def.split('-').map(Number);
          handlers.onDefinition(res.entries[ei].definitions[di].text, res.entries[ei]);
          b.disabled = true; b.textContent = 'Added';
        };
      });
      box.querySelectorAll('[data-ex]').forEach((b) => {
        b.onclick = () => {
          const [ei, di, xi] = b.dataset.ex.split('-').map(Number);
          handlers.onExample(res.entries[ei].definitions[di].examples[xi]);
          b.disabled = true; b.textContent = 'Added';
        };
      });
      return res;
    } catch (err) {
      box.innerHTML = '<div class="lookup card-pad"><p class="bad">Could not reach the dictionary.</p>' +
        '<p class="muted small">' + esc(err.message) + ' You can still type the definition and examples yourself.</p></div>';
      return null;
    }
  }

  /* ---------- Modal ---------- */
  function openModal(html, onReady) {
    modalRoot.innerHTML = '<div class="modal-backdrop"><div class="modal" role="dialog" aria-modal="true">' + html + '</div></div>';
    const backdrop = modalRoot.querySelector('.modal-backdrop');
    backdrop.addEventListener('mousedown', (e) => { if (e.target === backdrop) closeModal(); });
    modalRoot.querySelectorAll('[data-act=close]').forEach((b) => { b.onclick = closeModal; });
    document.addEventListener('keydown', escClose);
    if (onReady) onReady(modalRoot.querySelector('.modal'));
  }
  function escClose(e) { if (e.key === 'Escape') closeModal(); }
  function closeModal() {
    modalRoot.innerHTML = '';
    document.removeEventListener('keydown', escClose);
  }

  /* ---------- Word form ---------- */
  function exampleRow(x) {
    return '<div class="ex-row">' +
      '<input class="ex-fi" lang="fi" placeholder="Finnish sentence" value="' + esc(x.fi || '') + '">' +
      '<input class="ex-en" placeholder="English translation (optional)" value="' + esc(x.en || '') + '">' +
      '<button type="button" class="icon-btn" data-act="rm-ex" aria-label="Remove example">✕</button></div>';
  }

  function openWordForm(word, prefill) {
    const isNew = !word;
    const w = word ? JSON.parse(JSON.stringify(word)) : Object.assign({
      id: Core.uid(), finnish: '', english: '', partOfSpeech: '', definition: '', notes: '',
      examples: [], categoryIds: [], stats: { correct: 0, wrong: 0 }, createdAt: Date.now(),
    }, prefill || {});
    const cats = Store.get().categories;

    openModal(
      '<form class="word-form" autocomplete="off">' +
      '<div class="modal-head"><h2>' + (isNew ? 'Add a word' : 'Edit word') + '</h2>' +
      '<button type="button" class="icon-btn" data-act="close" aria-label="Close">✕</button></div>' +
      '<label>Finnish word or phrase' +
      '<div class="row gap nowrap"><input id="f-fi" name="finnish" lang="fi" required value="' + esc(w.finnish) + '" placeholder="e.g. kirjasto">' +
      '<button type="button" class="btn" data-act="lookup">🔎 Look up</button></div></label>' +
      letterBar('#f-fi') +
      '<div id="f-lookup"></div>' +
      '<label>English meaning<input name="english" required value="' + esc(w.english) + '" placeholder="e.g. library">' +
      '<span class="hint">Separate alternatives with commas: “hi, hello”</span></label>' +
      '<div class="grid-2">' +
      '<label>Part of speech<select name="partOfSpeech">' +
      POS.concat(POS.includes(w.partOfSpeech) ? [] : [w.partOfSpeech]).map((p) => '<option value="' + esc(p) + '"' +
        (p === w.partOfSpeech ? ' selected' : '') + '>' + (p || '—') + '</option>').join('') +
      '</select></label>' +
      '<label>Level<select name="level">' + levelOptions(w.level || '', '—') + '</select>' +
      '<span class="hint">A1.1 = beginner … B1.2 = intermediate</span></label></div>' +
      '<label>Definition<textarea name="definition" rows="2" placeholder="What does it mean? Any grammar notes?">' + esc(w.definition) + '</textarea></label>' +
      '<fieldset><legend>Example sentences</legend><div id="f-examples">' +
      (w.examples.length ? w.examples : [{ fi: '', en: '' }]).map(exampleRow).join('') +
      '</div><button type="button" class="btn small ghost" data-act="add-ex">+ Add example</button></fieldset>' +
      '<fieldset><legend>Categories</legend><div class="cat-suggest" aria-live="polite"></div><div class="cat-picks">' +
      cats.map((c) => '<label class="cat-pick"><input type="checkbox" name="cat" value="' + esc(c.id) + '"' +
        (w.categoryIds.includes(c.id) ? ' checked' : '') + '>' + catChip(c) + '</label>').join('') +
      '</div><div class="row gap nowrap"><input id="f-newcat" placeholder="New category name">' +
      '<button type="button" class="btn small" data-act="new-cat">+ Create</button></div></fieldset>' +
      '<label>Notes<textarea name="notes" rows="2" placeholder="Inflections, memory hooks, where you heard it…">' + esc(w.notes) + '</textarea></label>' +
      '<div class="modal-foot">' +
      (isNew ? '<label class="inline"><input type="checkbox" id="f-another"> Add another after saving</label>' : '<span></span>') +
      '<div class="row gap"><button type="button" class="btn ghost" data-act="close">Cancel</button>' +
      '<button type="submit" class="btn primary">Save</button></div></div>' +
      '</form>',
      (modal) => {
        const form = modal.querySelector('form');
        const exBox = modal.querySelector('#f-examples');
        const fiInput = modal.querySelector('#f-fi');
        if (!w.finnish) fiInput.focus(); else form.english.focus();

        modal.querySelector('[data-act=add-ex]').onclick = () => {
          exBox.insertAdjacentHTML('beforeend', exampleRow({}));
          exBox.lastElementChild.querySelector('input').focus();
        };
        exBox.addEventListener('click', (e) => {
          if (e.target.closest('[data-act=rm-ex]')) e.target.closest('.ex-row').remove();
        });
        const addExample = (ex) => {
          const rows = Array.from(exBox.querySelectorAll('.ex-row'));
          const empty = rows.find((r) => !r.querySelector('.ex-fi').value.trim());
          if (empty) {
            empty.querySelector('.ex-fi').value = ex.fi;
            empty.querySelector('.ex-en').value = ex.en || '';
          } else exBox.insertAdjacentHTML('beforeend', exampleRow(ex));
        };

        // Create (or reuse) a category by name and tick it.
        const addCategory = (name) => {
          let cat = Store.get().categories.find((c) => c.name.toLowerCase() === name.toLowerCase());
          if (!cat) {
            cat = { id: Core.uid(), name, color: PALETTE[Store.get().categories.length % PALETTE.length] };
            Store.upsertCategory(cat);
            modal.querySelector('.cat-picks').insertAdjacentHTML('beforeend',
              '<label class="cat-pick"><input type="checkbox" name="cat" value="' + esc(cat.id) + '">' + catChip(cat) + '</label>');
          }
          modal.querySelector('input[name=cat][value="' + CSS.escape(cat.id) + '"]').checked = true;
          return cat;
        };
        modal.querySelector('[data-act=new-cat]').onclick = () => {
          const input = modal.querySelector('#f-newcat');
          const name = input.value.trim();
          if (!name) { input.focus(); return; }
          addCategory(name);
          input.value = '';
          renderSuggestions();
        };

        // Category suggestions, based on the meaning, definition and part of speech.
        const suggestBox = modal.querySelector('.cat-suggest');
        let suggestions = [];
        function renderSuggestions() {
          suggestions = Core.suggestCategories({
            finnish: fiInput.value, english: form.english.value,
            definition: form.definition.value, partOfSpeech: form.partOfSpeech.value,
          }, Store.get().categories, root.VocabTopics, {
            selectedIds: Array.from(form.querySelectorAll('input[name=cat]:checked')).map((c) => c.value),
          });
          suggestBox.innerHTML = suggestions.length ? '<span class="muted small">Suggested:</span> ' + suggestions.map((sg, n) => {
            const cat = sg.kind === 'existing' ? Store.category(sg.id) : null;
            return '<button type="button" class="suggest' + (cat ? '' : ' new') + '" data-sg="' + n + '"' +
              (cat ? ' style="--chip:' + esc(cat.color) + '"' : '') + ' title="' +
              (cat ? 'Add to ' + esc(sg.name) : 'Create the category ' + esc(sg.name) + ' and add this word to it') + '">+ ' +
              (cat ? '' : 'New: ') + esc(sg.name) + '</button>';
          }).join('') : '';
        }
        suggestBox.addEventListener('click', (e) => {
          const b = e.target.closest('[data-sg]');
          if (!b) return;
          const sg = suggestions[Number(b.dataset.sg)];
          if (sg.kind === 'existing') {
            modal.querySelector('input[name=cat][value="' + CSS.escape(sg.id) + '"]').checked = true;
          } else {
            toast('Created category ' + addCategory(sg.name).name);
          }
          renderSuggestions();
        });
        let suggestTimer;
        const suggestSoon = () => { clearTimeout(suggestTimer); suggestTimer = setTimeout(renderSuggestions, 250); };
        form.english.addEventListener('input', suggestSoon);
        form.definition.addEventListener('input', suggestSoon);
        form.partOfSpeech.addEventListener('change', renderSuggestions);
        modal.querySelector('.cat-picks').addEventListener('change', renderSuggestions);
        renderSuggestions();
        modal.querySelector('#f-newcat').addEventListener('keydown', (e) => {
          if (e.key === 'Enter') { e.preventDefault(); modal.querySelector('[data-act=new-cat]').click(); }
        });

        modal.querySelector('[data-act=lookup]').onclick = async () => {
          const term = fiInput.value.trim();
          if (!term) { fiInput.focus(); return; }
          const box = modal.querySelector('#f-lookup');
          const res = await showLookup(box, term, {
            onDefinition: (text, entry) => {
              form.definition.value = form.definition.value.trim() ? form.definition.value.trim() + '; ' + text : text;
              if (!form.english.value.trim()) form.english.value = Core.suggestionFromEntries([{ partOfSpeech: entry.partOfSpeech, definitions: [{ text, examples: [] }] }]).english;
              setPos(entry.partOfSpeech);
              renderSuggestions();
            },
            onExample: addExample,
          });
          // Pre-fill empty fields with the best guess so a word can be saved in two clicks.
          if (res && res.suggestion) {
            const sg = res.suggestion;
            if (!form.english.value.trim()) form.english.value = sg.english;
            if (!form.definition.value.trim()) form.definition.value = sg.definition;
            if (!form.partOfSpeech.value) setPos(sg.partOfSpeech);
            const hasExample = Array.from(exBox.querySelectorAll('.ex-fi')).some((i) => i.value.trim());
            if (!hasExample) sg.examples.slice(0, 2).forEach(addExample);
            toast('Filled in from Wiktionary – check and adjust as you like');
          }
          renderSuggestions();
        };
        function setPos(pos) {
          pos = String(pos || '').toLowerCase();
          if (!pos) return;
          const sel = form.partOfSpeech;
          if (!Array.from(sel.options).some((o) => o.value === pos)) sel.add(new Option(pos, pos));
          sel.value = pos;
        }

        form.onsubmit = (e) => {
          e.preventDefault();
          const finnish = fiInput.value.trim();
          const english = form.english.value.trim();
          if (!finnish || !english) return;
          const dupe = Store.get().words.find((x) => x.id !== w.id && Core.normalize(x.finnish) === Core.normalize(finnish));
          if (dupe && !confirm('"' + dupe.finnish + '" is already in your list (' + dupe.english + '). Save anyway?')) return;
          Object.assign(w, {
            finnish,
            english,
            partOfSpeech: form.partOfSpeech.value,
            level: form.level.value,
            definition: form.definition.value.trim(),
            notes: form.notes.value.trim(),
            examples: Array.from(exBox.querySelectorAll('.ex-row'))
              .map((r) => ({ fi: r.querySelector('.ex-fi').value.trim(), en: r.querySelector('.ex-en').value.trim() }))
              .filter((x) => x.fi)
              // Keep "also fits" answers for sentences that weren't changed.
              .map((x) => {
                const old = (w.examples || []).find((o) => o.fi === x.fi);
                return old && old.alsoFits ? Object.assign(x, { alsoFits: old.alsoFits }) : x;
              }),
            categoryIds: Array.from(form.querySelectorAll('input[name=cat]:checked')).map((c) => c.value),
          });
          Store.upsertWord(w);
          toast((isNew ? 'Added ' : 'Saved ') + w.finnish);
          const another = isNew && modal.querySelector('#f-another').checked;
          closeModal();
          if (isNew) route(); else renderWordDetail(w.id);
          if (another) {
            openWordForm(null, { categoryIds: w.categoryIds });
            modalRoot.querySelector('#f-another').checked = true;
          }
        };
      }
    );
  }

  /* ---------- Categories ---------- */
  function renderCategories() {
    const cats = Store.get().categories;
    view.innerHTML =
      '<section class="page">' +
      '<div class="page-head"><h1>Categories <span class="count">' + cats.length + '</span></h1>' +
      '<button class="btn primary" data-act="add">+ New category</button></div>' +
      (cats.length ? '<ul class="cat-grid">' + cats.map((c) => {
        const n = countIn(c.id);
        return '<li class="cat-card" style="--chip:' + esc(c.color) + '">' +
          '<a class="cat-main" href="#/words?cat=' + encodeURIComponent(c.id) + '">' +
          '<span class="cat-name">' + esc(c.name) + '</span><span class="muted">' + n + ' word' + (n === 1 ? '' : 's') + '</span></a>' +
          '<div class="row gap small-gap">' +
          '<a class="btn small" href="#/games?cat=' + encodeURIComponent(c.id) + '">Practise</a>' +
          '<button class="btn small ghost" data-edit="' + esc(c.id) + '">Edit</button>' +
          '<button class="btn small ghost danger" data-del="' + esc(c.id) + '">Delete</button></div></li>';
      }).join('') + '</ul>' : '<div class="empty"><p>No categories yet. Categories help you group words, e.g. “Food”, “At work”, “Chapter 3”.</p></div>') +
      '</section>';
    view.querySelector('[data-act=add]').onclick = () => openCategoryForm(null);
    view.querySelectorAll('[data-edit]').forEach((b) => { b.onclick = () => openCategoryForm(Store.category(b.dataset.edit)); });
    view.querySelectorAll('[data-del]').forEach((b) => {
      b.onclick = () => {
        const c = Store.category(b.dataset.del);
        if (confirm('Delete the category "' + c.name + '"? The words themselves are kept.')) {
          Store.deleteCategory(c.id);
          toast('Category deleted');
          renderCategories();
        }
      };
    });
  }

  function openCategoryForm(cat) {
    const isNew = !cat;
    const c = cat ? Object.assign({}, cat) : { id: Core.uid(), name: '', color: PALETTE[Store.get().categories.length % PALETTE.length] };
    openModal(
      '<form class="cat-form">' +
      '<div class="modal-head"><h2>' + (isNew ? 'New category' : 'Edit category') + '</h2>' +
      '<button type="button" class="icon-btn" data-act="close" aria-label="Close">✕</button></div>' +
      '<label>Name<input name="name" required value="' + esc(c.name) + '" placeholder="e.g. Weather"></label>' +
      '<fieldset><legend>Colour</legend><div class="swatches">' +
      PALETTE.map((p) => '<label class="swatch" style="--chip:' + p + '"><input type="radio" name="color" value="' + p + '"' +
        (p === c.color ? ' checked' : '') + ' aria-label="' + p + '"></label>').join('') +
      '</div></fieldset>' +
      '<div class="modal-foot"><span></span><div class="row gap"><button type="button" class="btn ghost" data-act="close">Cancel</button>' +
      '<button class="btn primary" type="submit">Save</button></div></div></form>',
      (modal) => {
        const form = modal.querySelector('form');
        form.name.focus();
        form.onsubmit = (e) => {
          e.preventDefault();
          const name = form.name.value.trim();
          if (!name) return;
          const clash = Store.get().categories.find((x) => x.id !== c.id && x.name.toLowerCase() === name.toLowerCase());
          if (clash) { toast('A category called "' + clash.name + '" already exists'); return; }
          c.name = name;
          c.color = (form.querySelector('input[name=color]:checked') || {}).value || c.color;
          Store.upsertCategory(c);
          closeModal();
          renderCategories();
        };
      }
    );
  }

  /* ---------- Games ---------- */
  function wordsForCategories(catIds, levelMin, levelMax) {
    return Core.filterWords(Store.get().words, { categoryIds: catIds || [], levelMin, levelMax });
  }

  function gameSummary(g) {
    const cats = (g.categoryIds || []).map((id) => Store.category(id)).filter(Boolean);
    const n = wordsForCategories(g.categoryIds, g.levelMin, g.levelMax).length;
    const lt = levelText(g.levelMin, g.levelMax);
    return (Games.TYPES[g.type].noDirection ? '' : directionLabel(g.type, g.direction) + ' · ') + (cats.length ? cats.map((c) => c.name).join(', ') : 'All words') +
      (lt ? ' · ' + lt : '') +
      ' · ' + (g.count ? Math.min(g.count, n) + ' of ' : '') + n + ' words';
  }

  /** Direction wording; for Write it says which language you type. */
  function directionLabel(type, dir) {
    if (type === 'write') return { 'fi-en': 'You type English', 'en-fi': 'You type Finnish', mixed: 'You type both' }[dir];
    return Games.DIRECTIONS[dir];
  }

  function renderGames(params) {
    const s = Store.get();
    const presetCat = params.cat || '';
    view.innerHTML =
      '<section class="page">' +
      '<div class="page-head"><h1>Games</h1>' +
      '<button class="btn primary" data-act="create">+ Create a game</button></div>' +
      '<a class="rp-banner" href="#/roleplay"><span class="rp-icon">🎭</span><span><strong>Role play</strong>' +
      '<span class="muted small">Practise real conversations: at the shop, the library, the health centre, the café, on the phone…</span></span>' +
      '<span class="btn primary small">Start</span></a>' +
      '<a class="rp-banner" href="#/numbers"><span class="rp-icon">🔢</span><span><strong>Number practice</strong>' +
      '<span class="muted small">Dates, clock times, prices, floors and places, spoken forms and bus numbers</span></span>' +
      '<span class="btn primary small">Start</span></a>' +
      '<a class="rp-banner" href="#/cases"><span class="rp-icon">🎯</span><span><strong>Which case?</strong>' +
      '<span class="muted small">Put the word in the right form: Pidän suklaasta, Minua pelottaa, kaksi kissaa</span></span>' +
      '<span class="btn primary small">Start</span></a>' +
      '<h2 class="section-title">Quick play</h2>' +
      '<div class="toolbar"><label class="inline">Words from <select id="qp-cat">' + categoryOptions(presetCat, 'All words') + '</select></label>' +
      '<label class="inline">Direction <select id="qp-dir">' +
      Object.entries(Games.DIRECTIONS).map(([k, v]) => '<option value="' + k + '"' + (k === (s.settings.qpDir || 'fi-en') ? ' selected' : '') + '>' + v + '</option>').join('') +
      '</select></label>' + levelRange('qp', s.settings.qpLevelMin || '', s.settings.qpLevelMax || '') + '</div>' +
      '<p class="muted small" id="qp-count"></p>' +
      '<div class="type-grid">' + Object.entries(Games.TYPES).map(([k, t]) =>
        '<button class="type-card" data-quick="' + k + '"><span class="type-icon">' + t.icon + '</span>' +
        '<strong>' + t.name + '</strong><span class="muted small">' + t.blurb + '</span></button>').join('') +
      '</div>' +
      '<h2 class="section-title">My games</h2>' +
      (s.games.length ? '<ul class="game-list">' + s.games.map((g) => {
        const t = Games.TYPES[g.type];
        const best = g.type === 'match' && s.settings.bestTimes && s.settings.bestTimes[g.id];
        return '<li class="game-item"><span class="type-icon">' + t.icon + '</span>' +
          '<div class="gi-body"><strong>' + esc(g.name) + '</strong><span class="muted small">' + t.name + ' · ' + esc(gameSummary(g)) +
          (best ? ' · best ' + best.toFixed(1) + 's' : '') + '</span></div>' +
          '<div class="row gap small-gap"><a class="btn primary small" href="#/play/' + encodeURIComponent(g.id) + '">Play</a>' +
          '<button class="btn small ghost" data-edit="' + esc(g.id) + '">Edit</button>' +
          '<button class="btn small ghost danger" data-del="' + esc(g.id) + '">Delete</button></div></li>';
      }).join('') + '</ul>'
        : '<div class="empty"><p>Create your own mini games: pick a game type, the categories to include and how many words per round. They\'ll be saved here.</p>' +
          '<button class="btn primary" data-act="create">+ Create a game</button></div>') +
      '</section>';

    view.querySelectorAll('[data-act=create]').forEach((b) => { b.onclick = () => openGameForm(null, presetCat); });
    const qp = (sel) => view.querySelector(sel);
    const qpCount = () => {
      const n = wordsForCategories(qp('#qp-cat').value ? [qp('#qp-cat').value] : [], qp('#qp-lmin').value, qp('#qp-lmax').value).length;
      qp('#qp-count').textContent = n + ' word' + (n === 1 ? '' : 's') + ' match' + (n === 1 ? 'es' : '') + ' these settings.';
    };
    ['#qp-cat', '#qp-dir', '#qp-lmin', '#qp-lmax'].forEach((sel) => {
      qp(sel).addEventListener('change', () => {
        // Keep "from" ≤ "to".
        const lo = qp('#qp-lmin'), hi = qp('#qp-lmax');
        if (lo.value && hi.value && Core.levelIndex(lo.value) > Core.levelIndex(hi.value)) (sel === '#qp-lmin' ? hi : lo).value = (sel === '#qp-lmin' ? lo : hi).value;
        Store.update((st) => { st.settings.qpLevelMin = lo.value; st.settings.qpLevelMax = hi.value; st.settings.qpDir = qp('#qp-dir').value; });
        qpCount();
      });
    });
    qpCount();
    const startQuick = (type, dir) => {
      const p = new URLSearchParams({ type, dir });
      const cat = qp('#qp-cat').value;
      if (cat) p.set('cat', cat);
      if (qp('#qp-lmin').value) p.set('lmin', qp('#qp-lmin').value);
      if (qp('#qp-lmax').value) p.set('lmax', qp('#qp-lmax').value);
      go('#/play/quick?' + p);
    };
    view.querySelectorAll('[data-quick]').forEach((b) => {
      b.onclick = () => {
        if (b.dataset.quick !== 'write') return startQuick(b.dataset.quick, qp('#qp-dir').value);
        // Write: ask which language to type.
        openModal('<div class="modal-head"><h2>✍️ Write – which language do you type?</h2>' +
          '<button type="button" class="icon-btn" data-act="close" aria-label="Close">✕</button></div>' +
          '<div class="write-choice">' +
          '<button class="type-card" data-wdir="en-fi"><strong>Type in Finnish</strong><span class="muted small">You see the English, you write the Finnish word.</span></button>' +
          '<button class="type-card" data-wdir="fi-en"><strong>Type in English</strong><span class="muted small">You see the Finnish word, you write what it means.</span></button>' +
          '<button class="type-card" data-wdir="mixed"><strong>Mixed</strong><span class="muted small">A bit of both.</span></button></div>',
        (m) => m.querySelectorAll('[data-wdir]').forEach((x) => { x.onclick = () => { closeModal(); startQuick('write', x.dataset.wdir); }; }));
      };
    });
    view.querySelectorAll('[data-edit]').forEach((b) => { b.onclick = () => openGameForm(Store.game(b.dataset.edit)); });
    view.querySelectorAll('[data-del]').forEach((b) => {
      b.onclick = () => {
        const g = Store.game(b.dataset.del);
        if (confirm('Delete the game "' + g.name + '"?')) { Store.deleteGame(g.id); renderGames(params); }
      };
    });
  }

  function openGameForm(game, presetCat) {
    const isNew = !game;
    const g = game ? JSON.parse(JSON.stringify(game)) : {
      id: Core.uid(), name: '', type: 'quiz', direction: 'fi-en', count: 10,
      categoryIds: presetCat ? [presetCat] : [],
      levelMin: Store.get().settings.qpLevelMin || '', levelMax: Store.get().settings.qpLevelMax || '',
    };
    const cats = Store.get().categories;
    openModal(
      '<form class="game-form">' +
      '<div class="modal-head"><h2>' + (isNew ? 'Create a game' : 'Edit game') + '</h2>' +
      '<button type="button" class="icon-btn" data-act="close" aria-label="Close">✕</button></div>' +
      '<label>Name<input name="name" required value="' + esc(g.name) + '" placeholder="e.g. Food quiz"></label>' +
      '<fieldset><legend>Game type</legend><div class="type-picks">' +
      Object.entries(Games.TYPES).map(([k, t]) => '<label class="type-pick"><input type="radio" name="type" value="' + k + '"' +
        (k === g.type ? ' checked' : '') + '><span class="type-icon">' + t.icon + '</span><strong>' + t.name + '</strong>' +
        '<span class="muted small">' + t.blurb + '</span></label>').join('') + '</div></fieldset>' +
      '<fieldset><legend>Words from <span class="muted small">(none selected = all words)</span></legend><div class="cat-picks">' +
      (cats.length ? cats.map((c) => '<label class="cat-pick"><input type="checkbox" name="cat" value="' + esc(c.id) + '"' +
        (g.categoryIds.includes(c.id) ? ' checked' : '') + '>' + catChip(c) + ' <span class="muted small">' + countIn(c.id) + '</span></label>').join('')
        : '<span class="muted">No categories yet – all words will be used.</span>') +
      '</div></fieldset>' +
      '<div class="grid-2">' +
      '<label id="g-dir">Direction<select name="direction">' + Object.entries(Games.DIRECTIONS).map(([k, v]) =>
        '<option value="' + k + '"' + (k === g.direction ? ' selected' : '') + '>' + v + '</option>').join('') + '</select></label>' +
      '<label>Words per round<select name="count">' + [5, 10, 15, 20, 30, 0].map((n) =>
        '<option value="' + n + '"' + (n === g.count ? ' selected' : '') + '>' + (n || 'All') + '</option>').join('') + '</select></label>' +
      '<label>Lowest level<select name="levelMin">' + levelOptions(g.levelMin || '', 'Any') + '</select></label>' +
      '<label>Highest level<select name="levelMax">' + levelOptions(g.levelMax || '', 'Any') + '</select></label>' +
      '</div>' +
      '<p class="muted small" id="g-summary"></p>' +
      '<div class="modal-foot"><span></span><div class="row gap"><button type="button" class="btn ghost" data-act="close">Cancel</button>' +
      '<button class="btn" type="submit" data-then="save">Save</button>' +
      '<button class="btn primary" type="submit" data-then="play">Save &amp; play</button></div></div></form>',
      (modal) => {
        const form = modal.querySelector('form');
        const summary = modal.querySelector('#g-summary');
        const read = () => {
          g.name = form.name.value.trim();
          g.type = form.querySelector('input[name=type]:checked').value;
          g.direction = form.direction.value;
          g.count = Number(form.count.value);
          g.categoryIds = Array.from(form.querySelectorAll('input[name=cat]:checked')).map((c) => c.value);
          g.levelMin = form.levelMin.value;
          g.levelMax = form.levelMax.value;
          if (g.levelMin && g.levelMax && Core.levelIndex(g.levelMin) > Core.levelIndex(g.levelMax)) {
            g.levelMax = g.levelMin;
            form.levelMax.value = g.levelMin;
          }
        };
        // For Write, say plainly which language is typed.
        const labelDirections = () => {
          dirLabel.firstChild.textContent = g.type === 'write' ? 'You type in' : 'Direction';
          Array.from(form.direction.options).forEach((o) => {
            o.textContent = g.type === 'write' ? { 'fi-en': 'English (Finnish shown)', 'en-fi': 'Finnish (English shown)', mixed: 'Both, mixed' }[o.value] : Games.DIRECTIONS[o.value];
          });
        };
        const dirLabel = modal.querySelector('#g-dir');
        const update = () => {
          read();
          dirLabel.hidden = !!Games.TYPES[g.type].noDirection;
          labelDirections();
          let words = wordsForCategories(g.categoryIds, g.levelMin, g.levelMax);
          if (g.type === 'gap') words = words.filter((w) => Core.sentenceFor(w));
          const n = words.length;
          summary.textContent = n ? 'This game will use ' + (g.count ? Math.min(g.count, n) + ' of ' : 'all ') + n + ' matching words per round.' +
            (g.type === 'gap' ? ' (Only words with an example sentence that contains the word.)' : '')
            : g.type === 'gap' ? 'No words here have an example sentence that contains the word yet.' : 'No words match these categories and levels yet.';
          if (!form.name.value.trim() || form.name.dataset.auto) {
            const cs = g.categoryIds.map((id) => Store.category(id).name);
            form.name.value = (cs.length ? cs.join(' + ') : 'All words') + ' – ' + Games.TYPES[g.type].name;
            form.name.dataset.auto = '1';
          }
        };
        form.name.oninput = () => { delete form.name.dataset.auto; };
        form.addEventListener('change', update);
        if (isNew) update(); else { read(); dirLabel.hidden = !!Games.TYPES[g.type].noDirection; labelDirections(); summary.textContent = gameSummary(g); }
        let then = 'save';
        form.querySelectorAll('[data-then]').forEach((b) => { b.onclick = () => { then = b.dataset.then; }; });
        form.onsubmit = (e) => {
          e.preventDefault();
          read();
          if (!g.name) return;
          Store.upsertGame(g);
          closeModal();
          toast('Game saved');
          if (then === 'play') go('#/play/' + encodeURIComponent(g.id));
          else route();
        };
      }
    );
  }

  function renderPlay(id, params) {
    let opts;
    if (id === 'quick') {
      const cat = params.cat ? Store.category(params.cat) : null;
      const type = Games.TYPES[params.type] ? params.type : 'flashcards';
      opts = {
        type,
        direction: Games.DIRECTIONS[params.dir] ? params.dir : 'fi-en',
        count: type === 'flashcards' ? 0 : type === 'match' ? 6 : 10,
        categoryIds: cat ? [cat.id] : [],
        levelMin: Core.levelIndex(params.lmin) >= 0 ? params.lmin : '',
        levelMax: Core.levelIndex(params.lmax) >= 0 ? params.lmax : '',
      };
      const lt = levelText(opts.levelMin, opts.levelMax);
      opts.title = (cat ? cat.name : 'All words') + (lt ? ' (' + lt + ')' : '') + ' · ' + Games.TYPES[type].name;
    } else {
      const g = Store.game(id);
      if (!g) { view.innerHTML = '<section class="page"><p>Game not found.</p><a href="#/games">Back to games</a></section>'; return; }
      opts = { type: g.type, direction: g.direction, count: g.count, categoryIds: g.categoryIds, levelMin: g.levelMin, levelMax: g.levelMax, title: g.name, gameId: g.id };
    }
    view.innerHTML = '<section class="page narrow"><div id="game"></div></section>';
    const words = wordsForCategories(opts.categoryIds, opts.levelMin, opts.levelMax);
    Games.start(view.querySelector('#game'), Object.assign(opts, {
      words,
      // Distractors for multiple choice may come from all words when a category is tiny.
      pool: words.length >= 4 ? words : Store.get().words,
      onExit: () => go('#/games'),
    }));
  }

  /* ---------- Settings ---------- */
  function renderSettings() {
    const st = Store.get().settings;
    view.innerHTML =
      '<section class="page narrow">' +
      '<h1>Settings</h1>' +
      '<div class="card-pad settings">' +
      '<label class="toggle"><input type="checkbox" id="s-lenient"' + (st.lenient ? ' checked' : '') + '>' +
      '<span><strong>Forgive missing ä / ö</strong><br><span class="muted small">In Write mode, accept “paiva” for “päivä”. ' +
      'Off by default, because in Finnish the dots change the meaning (e.g. <em>sää</em> weather vs. <em>saa</em> gets, <em>säde</em> ray vs. <em>sade</em> rain).</span></span></label>' +
      '<label class="toggle"><input type="checkbox" id="s-speech"' + (st.speech ? ' checked' : '') + '>' +
      '<span><strong>Pronunciation (text-to-speech)</strong><br><span class="muted small">' +
      ('speechSynthesis' in root ? 'Uses your device\'s voices. Install a Finnish voice in your system settings for the best result.' : 'Not supported in this browser.') +
      '</span></span></label>' +
      '</div>' +
      '<h2 class="section-title">Your data</h2>' +
      '<div class="card-pad settings">' +
      '<p class="muted small">Everything is saved in this browser. Export a backup to move your words to another device.</p>' +
      '<div class="row gap">' +
      '<button class="btn" data-act="export">⬇ Export backup (.json)</button>' +
      '<label class="btn">⬆ Import backup<input type="file" id="s-import" accept="application/json,.json" hidden></label>' +
      '<button class="btn" data-act="starter">Add starter words</button>' +
      '<button class="btn danger ghost" data-act="reset">Delete everything</button>' +
      '</div></div>' +
      '<p class="muted small">Definitions and examples looked up online come from <a href="https://en.wiktionary.org" target="_blank" rel="noopener">Wiktionary</a>, available under CC BY-SA.</p>' +
      '</section>';
    const save = (k, v) => Store.update((s) => { s.settings[k] = v; });
    view.querySelector('#s-lenient').onchange = (e) => save('lenient', e.target.checked);
    view.querySelector('#s-speech').onchange = (e) => save('speech', e.target.checked);
    view.querySelector('[data-act=export]').onclick = () => {
      const s = Store.get();
      const data = { app: 'sanasto', version: 1, exportedAt: new Date().toISOString(), categories: s.categories, words: s.words, games: s.games };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'sanasto-backup-' + new Date().toISOString().slice(0, 10) + '.json';
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    };
    view.querySelector('#s-import').onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      try {
        const data = JSON.parse(await file.text());
        const res = Core.mergeImport(Store.get(), data);
        Store.set(res.state);
        toast('Imported: ' + res.added + ' new, ' + res.updated + ' updated');
      } catch (err) {
        toast('Import failed: ' + err.message);
      }
      e.target.value = '';
    };
    view.querySelector('[data-act=starter]').onclick = () => {
      const res = Store.addStarterPack();
      toast('Starter words: ' + res.added + ' added, ' + res.skipped + ' already there');
    };
    view.querySelector('[data-act=reset]').onclick = () => {
      if (confirm('Delete all words, categories and games? This cannot be undone. Export a backup first if unsure.')) {
        Store.reset();
        toast('All data deleted');
      }
    };
  }

  window.addEventListener('hashchange', route);
  route();
  const note = Store.takeUpgradeNote();
  if (note) toast(note);
})(window);

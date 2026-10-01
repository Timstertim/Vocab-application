/* Role play: scripted conversations in everyday situations, at three difficulty levels. */
(function (root) {
  'use strict';
  const Core = root.VocabCore;
  const Store = root.Store;
  const { esc, speak, speakButton, letterBar } = root.UI;

  const LEVELS = {
    easy: { name: 'Easy', blurb: 'Choose the best reply' },
    medium: { name: 'Medium', blurb: 'Put the words in order' },
    hard: { name: 'Hard', blurb: 'Type the reply yourself' },
  };

  let timers = [];
  let keyHandler = null;
  function stop() {
    timers.forEach(clearTimeout);
    timers = [];
    if (keyHandler) document.removeEventListener('keydown', keyHandler);
    keyHandler = null;
    if ('speechSynthesis' in root) speechSynthesis.cancel();
  }
  function later(fn, ms) { timers.push(setTimeout(fn, ms)); }
  function onKey(fn) {
    if (keyHandler) document.removeEventListener('keydown', keyHandler);
    keyHandler = (e) => {
      if (e.target.closest('button') && (e.key === 'Enter' || e.key === ' ')) return;
      if (e.target.matches('input, textarea') && e.key !== 'Enter') return;
      fn(e);
    };
    document.addEventListener('keydown', keyHandler);
  }

  const scenarios = () => root.VocabScenarios;
  const scenario = (id) => scenarios().find((s) => s.id === id);
  const level = () => (LEVELS[Store.get().settings.rpLevel] ? Store.get().settings.rpLevel : 'easy');
  const best = (sid, n) => ((Store.get().settings.rpBest || {})[sid + ':' + n]);
  /** Split "(Kuljettaja:) Huomenta!" into a stage note and the spoken part. */
  function splitLine(t) {
    const m = String(t).match(/^\(([^)]*)\)\s*(.*)$/);
    return m ? { note: m[1], spoken: m[2] } : { note: '', spoken: t };
  }
  function categoryFor(sc) {
    return Store.get().categories.find((c) => c.name === sc.category);
  }

  function levelPicker() {
    return '<div class="level-picker" role="radiogroup" aria-label="Difficulty">' +
      Object.entries(LEVELS).map(([k, l]) => '<button type="button" role="radio" aria-checked="' + (k === level()) +
        '" class="level' + (k === level() ? ' on' : '') + '" data-level="' + k + '"><strong>' + l.name + '</strong>' +
        '<span class="muted small">' + l.blurb + '</span></button>').join('') + '</div>';
  }
  function bindLevelPicker(el, rerender) {
    el.querySelectorAll('[data-level]').forEach((b) => {
      b.onclick = () => { Store.update((s) => { s.settings.rpLevel = b.dataset.level; }); rerender(); };
    });
  }
  function stars(pct) {
    if (pct == null) return '';
    const n = pct >= 100 ? 3 : pct >= 67 ? 2 : 1;
    return '<span class="stars" title="Best: ' + pct + '%">' + '★'.repeat(n) + '<span class="dim">' + '★'.repeat(3 - n) + '</span></span>';
  }

  /* ---------- Scenario list ---------- */
  function renderList(view) {
    stop();
    view.innerHTML = '<section class="page">' +
      '<a class="back" href="#/games">← Games</a>' +
      '<div class="page-head"><h1>🎭 Role play</h1></div>' +
      '<p class="muted">Practise real conversations. Pick a place, then a situation: you get a goal, the other person speaks Finnish, and you reply.</p>' +
      '<h2 class="section-title">Difficulty</h2>' + levelPicker() +
      '<h2 class="section-title">Where are you?</h2>' +
      '<div class="rp-grid">' + scenarios().map((sc) => {
        const done = sc.situations.filter((_, n) => best(sc.id, n) != null).length;
        return '<a class="rp-card" href="#/roleplay/' + sc.id + '"><span class="rp-icon">' + sc.icon + '</span>' +
          '<strong>' + esc(sc.name) + '</strong><span class="muted small" lang="fi">' + esc(sc.fi) + '</span>' +
          '<span class="muted small">' + sc.situations.length + ' situations' + (done ? ' · ' + done + ' played' : '') + '</span></a>';
      }).join('') + '</div></section>';
    bindLevelPicker(view, () => renderList(view));
  }

  /* ---------- One scenario: its situations ---------- */
  function renderScenario(view, id) {
    stop();
    const sc = scenario(id);
    if (!sc) { view.innerHTML = '<section class="page"><p>Scenario not found.</p><a href="#/roleplay">Back</a></section>'; return; }
    const cat = categoryFor(sc);
    view.innerHTML = '<section class="page narrow">' +
      '<a class="back" href="#/roleplay">← All places</a>' +
      '<div class="page-head"><h1>' + sc.icon + ' ' + esc(sc.name) + ' <span class="muted" lang="fi">· ' + esc(sc.fi) + '</span></h1></div>' +
      levelPicker() +
      '<ul class="rp-situations">' + sc.situations.map((si, n) =>
        '<li><a class="rp-situation" href="#/roleplay/' + sc.id + '/' + n + '">' +
        '<div><strong>' + esc(si.title) + '</strong> ' + stars(best(sc.id, n)) +
        '<p class="muted small">' + esc(si.goal) + '</p></div><span class="btn primary small">Play</span></a></li>').join('') +
      '</ul>' +
      '<div class="row gap">' +
      '<a class="btn" href="#/roleplay/' + sc.id + '/' + Math.floor(Math.random() * sc.situations.length) + '">🎲 Random situation</a>' +
      (cat ? '<a class="btn ghost" href="#/words?cat=' + encodeURIComponent(cat.id) + '">See the words for this place</a>' : '') +
      '</div></section>';
    bindLevelPicker(view, () => renderScenario(view, id));
  }

  /* ---------- Playing a situation ---------- */
  function play(view, id, n) {
    stop();
    const sc = scenario(id);
    const si = sc && sc.situations[n];
    if (!si) { view.innerHTML = '<section class="page"><p>Situation not found.</p><a href="#/roleplay">Back</a></section>'; return; }
    const lv = level();
    const steps = si.steps;
    let i = 0;
    let missed = new Set();
    let showEnglish = false;
    const lenient = Store.get().settings.lenient;

    view.innerHTML = '<section class="page narrow rp">' +
      '<div class="game-head"><button class="btn ghost small" data-act="exit">✕ Exit</button>' +
      '<div class="game-title">' + sc.icon + ' ' + esc(si.title) + '</div>' +
      '<div class="game-count"><span id="rp-count"></span></div></div>' +
      '<div class="progress"><span id="rp-progress"></span></div>' +
      '<details class="rp-goal" open><summary>🎯 Your goal <span class="muted small">· ' + LEVELS[lv].name + '</span></summary><p>' + esc(si.goal) + '</p></details>' +
      '<div class="rp-chat" id="rp-chat" aria-live="polite"></div>' +
      '<div class="rp-input card-pad" id="rp-input"></div></section>';
    const chat = view.querySelector('#rp-chat');
    const input = view.querySelector('#rp-input');
    view.querySelector('[data-act=exit]').onclick = () => { stop(); location.hash = '#/roleplay/' + sc.id; };

    function scrollDown() {
      const last = chat.lastElementChild;
      if (last && last.scrollIntoView) last.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
    function addNpc(line) {
      const { note, spoken } = splitLine(line[0]);
      const enParts = splitLine(line[1]);
      chat.insertAdjacentHTML('beforeend', '<div class="bubble npc">' +
        (note ? '<p class="stage">' + esc(note) + '</p>' : '') +
        (spoken ? '<p lang="fi">' + esc(spoken) + ' ' + speakButton(spoken, 'fi') + '</p>' +
          '<button type="button" class="link-btn small" data-tr>Show English</button>' +
          '<p class="en muted small" hidden>' + esc(enParts.spoken || line[1]) + '</p>' : '') +
        '</div>');
      const b = chat.lastElementChild.querySelector('[data-tr]');
      if (b) b.onclick = () => { b.nextElementSibling.hidden = false; b.remove(); };
      if (spoken) speak(spoken, 'fi');
      scrollDown();
    }
    function addMe(fi, en, note) {
      // The English only matches when the scripted reply itself was used (not a shorter typed one).
      chat.insertAdjacentHTML('beforeend', '<div class="bubble me"><p lang="fi">' + esc(fi) + '</p>' +
        (en ? '<p class="en small">' + esc(en) + '</p>' : '') + (note ? '<p class="small note">' + note + '</p>' : '') + '</div>');
      scrollDown();
    }
    function updateCount() {
      view.querySelector('#rp-count').textContent = Math.min(i + 1, steps.length) + ' / ' + steps.length;
      view.querySelector('#rp-progress').style.width = Math.round((i / steps.length) * 100) + '%';
    }

    function nextStep() {
      stop();
      if (i >= steps.length) return finish();
      updateCount();
      const st = steps[i];
      addNpc(st.npc);
      ({ easy, medium, hard })[lv](st);
    }
    function advance(st, fi, note) {
      const own = fi && Core.normalize(fi) !== Core.normalize(st.reply[0]);
      addMe(own ? fi : st.reply[0], own ? '' : st.reply[1], note);
      speak(st.reply[0], 'fi');
      input.innerHTML = '';
      i++;
      later(nextStep, note ? 1800 : 1300);
    }
    function hintButton() {
      return '<button type="button" class="btn ghost small" data-act="hint">💡 Hint</button>';
    }
    function bindHint(st) {
      const h = input.querySelector('[data-act=hint]');
      if (h) h.onclick = () => { h.outerHTML = '<span class="muted small">Say: “' + esc(st.reply[1]) + '”</span>'; };
    }

    /* Easy: choose the best reply */
    function easy(st) {
      const options = Core.shuffle([{ fi: st.reply[0], en: st.reply[1], ok: true }].concat(
        st.wrong.map((w) => ({ fi: w[0], en: w[1], why: w[2], ok: false }))));
      input.innerHTML = '<div class="rp-label">What do you say? <button type="button" class="link-btn small" data-act="en">' +
        (showEnglish ? 'Hide English' : 'Show English') + '</button></div>' +
        '<div class="rp-options">' + options.map((o, k) => '<button class="choice rp-option" data-k="' + k + '"><kbd>' + (k + 1) + '</kbd> ' +
          '<span><span lang="fi">' + esc(o.fi) + '</span><span class="en small"' + (showEnglish ? '' : ' hidden') + '>' + esc(o.en) + '</span></span></button>').join('') +
        '</div><div class="feedback" aria-live="polite"></div>';
      input.querySelector('[data-act=en]').onclick = (e) => {
        showEnglish = !showEnglish;
        input.querySelectorAll('.rp-option .en').forEach((x) => { x.hidden = !showEnglish; });
        e.target.textContent = showEnglish ? 'Hide English' : 'Show English';
      };
      const fb = input.querySelector('.feedback');
      const pick = (k) => {
        const o = options[k];
        const b = input.querySelector('[data-k="' + k + '"]');
        if (!o || !b || b.disabled) return;
        if (o.ok) {
          input.querySelectorAll('.rp-option').forEach((x) => { x.disabled = true; });
          b.classList.add('right');
          fb.innerHTML = '<span class="good">Oikein! ✓</span>';
          later(() => advance(st), 500);
        } else {
          missed.add(i);
          b.classList.add('wrong');
          b.disabled = true;
          fb.innerHTML = '<span class="bad">Not quite.</span> ' + esc(o.why) + ' <span class="muted small">Try again.</span>';
        }
      };
      input.querySelectorAll('.rp-option').forEach((b) => { b.onclick = () => pick(Number(b.dataset.k)); });
      onKey((e) => { if (/^[1-9]$/.test(e.key)) pick(Number(e.key) - 1); });
    }

    /* Medium: put the words in order */
    function medium(st) {
      const tiles = Core.replyTiles(st.reply[0]);
      let pool = tiles.map((t, k) => ({ t, k }));
      if (pool.length > 1) {
        do { pool = Core.shuffle(pool); } while (pool.map((x) => x.k).join() === tiles.map((_, k) => k).join());
      }
      let answer = [];
      let tries = 0;
      function draw() {
        input.innerHTML = '<div class="rp-label">Put the words in order <span class="muted small">· tap a word to move it</span></div>' +
          '<div class="tile-answer" aria-label="Your reply">' + (answer.length ? answer.map((x, n) =>
            '<button type="button" class="wtile on" data-a="' + n + '" lang="fi">' + esc(x.t) + '</button>').join('') :
            '<span class="muted small">Your reply appears here</span>') + '</div>' +
          '<div class="tile-pool">' + pool.map((x, n) => '<button type="button" class="wtile" data-p="' + n + '" lang="fi">' + esc(x.t) + '</button>').join('') + '</div>' +
          '<div class="row gap">' +
          '<button type="button" class="btn primary" data-act="check"' + (pool.length ? ' disabled' : '') + '>Check</button>' +
          '<button type="button" class="btn ghost" data-act="clear"' + (answer.length ? '' : ' disabled') + '>Clear</button>' +
          hintButton() + '</div><div class="feedback" aria-live="polite"></div>';
        input.querySelectorAll('[data-p]').forEach((b) => { b.onclick = () => { answer.push(pool.splice(Number(b.dataset.p), 1)[0]); draw(); }; });
        input.querySelectorAll('[data-a]').forEach((b) => { b.onclick = () => { pool.push(answer.splice(Number(b.dataset.a), 1)[0]); draw(); }; });
        input.querySelector('[data-act=clear]').onclick = () => { pool = pool.concat(answer); answer = []; draw(); };
        input.querySelector('[data-act=check]').onclick = check;
        bindHint(st);
      }
      function check() {
        if (pool.length) return;
        if (Core.checkOrder(answer.map((x) => x.t), st)) {
          input.querySelector('.feedback').innerHTML = '<span class="good">Oikein! ✓</span>';
          input.querySelectorAll('button').forEach((b) => { b.disabled = true; });
          later(() => advance(st), 500);
          return;
        }
        missed.add(i);
        tries++;
        const fb = input.querySelector('.feedback');
        if (tries < 2) {
          fb.innerHTML = '<span class="bad">Not quite – the order isn\'t right yet.</span> <span class="muted small">Tap words to move them back and try again.</span>';
        } else {
          fb.innerHTML = '<span class="bad">The right order is:</span><div class="expected" lang="fi">' + esc(st.reply[0]) + '</div>' +
            '<button type="button" class="btn" data-act="cont">Continue <kbd>Enter</kbd></button>';
          const c = fb.querySelector('[data-act=cont]');
          c.onclick = () => advance(st);
          c.focus();
        }
      }
      onKey((e) => { if (e.key === 'Enter') { const c = input.querySelector('[data-act=cont]'); if (c) c.click(); else check(); } });
      draw();
    }

    /* Hard: type the reply */
    function hard(st) {
      let wrongTries = 0;
      input.innerHTML = '<form class="rp-type" autocomplete="off"><div class="rp-label">Type your reply in Finnish</div>' +
        '<input id="rp-text" class="big-input" lang="fi" autocapitalize="sentences" spellcheck="false" placeholder="Kirjoita vastauksesi…">' +
        letterBar('#rp-text') +
        '<div class="row gap"><button class="btn primary" type="submit">Check <kbd>Enter</kbd></button>' +
        '<button class="btn ghost" type="button" data-act="giveup">Show answer</button>' + hintButton() + '</div>' +
        '<div class="feedback" aria-live="polite"></div></form>';
      const form = input.querySelector('form');
      const text = form.querySelector('input');
      const fb = form.querySelector('.feedback');
      text.focus();
      bindHint(st);
      const reveal = (typed) => {
        missed.add(i);
        text.readOnly = true;
        form.querySelectorAll('button').forEach((b) => { b.disabled = true; });
        fb.innerHTML = '<span class="bad">A good reply would be:</span><div class="expected" lang="fi">' + esc(st.reply[0]) + ' ' +
          speakButton(st.reply[0], 'fi') + '</div>' +
          (st.accept && st.accept.length ? '<p class="muted small">Also fine: ' + st.accept.slice(0, 2).map((a) => '<span lang="fi">' + esc(a) + '</span>').join(' · ') + '</p>' : '') +
          '<div class="row gap center"><button type="button" class="btn" data-act="cont">Continue <kbd>Enter</kbd></button>' +
          (typed ? '<button type="button" class="btn ghost" data-act="right">I was right</button>' : '') + '</div>';
        const c = fb.querySelector('[data-act=cont]');
        c.disabled = false;
        c.onclick = () => advance(st);
        c.focus();
        const r = fb.querySelector('[data-act=right]');
        if (r) { r.disabled = false; r.onclick = () => { missed.delete(i); advance(st, typed, 'Marked as right by you.'); }; }
      };
      form.onsubmit = (e) => {
        e.preventDefault();
        const typed = text.value.trim();
        if (!typed || text.readOnly) return;
        const res = Core.checkReply(typed, st, { lenient });
        if (res.correct) {
          text.readOnly = true;
          form.querySelectorAll('button').forEach((b) => { b.disabled = true; });
          fb.innerHTML = res.close ? '<span class="good">Almost perfect ✓</span>' : '<span class="good">Oikein! ✓</span>';
          later(() => advance(st, typed, res.close ? 'Check the spelling: <span lang="fi">' + esc(st.reply[0]) + '</span>' : ''), 500);
          return;
        }
        wrongTries++;
        missed.add(i);
        if (res.wrongIndex >= 0) {
          fb.innerHTML = '<span class="bad">Not quite.</span> ' + esc(st.wrong[res.wrongIndex][2]) + ' <span class="muted small">Try again.</span>';
        } else if (wrongTries < 2) {
          fb.innerHTML = '<span class="bad">Not quite.</span> <span class="muted small">Check the goal and try again – or use 💡 Hint.</span>';
        } else {
          reveal(typed);
        }
      };
      form.querySelector('[data-act=giveup]').onclick = () => reveal('');
    }

    function finish() {
      stop();
      const total = steps.length;
      const right = total - missed.size;
      const pct = Math.round((right / total) * 100);
      const key = sc.id + ':' + n;
      const prev = best(sc.id, n);
      if (prev == null || pct > prev) Store.update((s) => { s.settings.rpBest = Object.assign({}, s.settings.rpBest, { [key]: pct }); });
      const cat = categoryFor(sc);
      const nextN = (n + 1) % sc.situations.length;
      view.querySelector('#rp-progress').style.width = '100%';
      input.innerHTML = '<div class="results">' +
        '<h2>' + (pct === 100 ? 'Mahtavaa! 🎉' : pct >= 67 ? 'Hienoa!' : 'Hyvä yritys!') + '</h2>' +
        '<p class="big-stars">' + stars(pct) + '</p>' +
        '<p>' + right + ' of ' + total + ' replies right on the first try' + (prev != null && pct > prev ? ' · new best!' : '') + '</p>' +
        '<h3>Useful phrases</h3><ul class="rp-phrases">' + steps.map((st) =>
          '<li><span lang="fi"><strong>' + esc(st.reply[0]) + '</strong></span> ' + speakButton(st.reply[0], 'fi') +
          '<br><span class="muted small">' + esc(st.reply[1]) + '</span></li>').join('') + '</ul>' +
        '<div class="row gap center">' +
        '<button class="btn primary" data-act="again">Play again</button>' +
        (sc.situations.length > 1 ? '<a class="btn" href="#/roleplay/' + sc.id + '/' + nextN + '">Next situation →</a>' : '') +
        (cat ? '<a class="btn" href="#/play/quick?type=flashcards&cat=' + encodeURIComponent(cat.id) + '">Practise the words</a>' : '') +
        '<a class="btn ghost" href="#/roleplay/' + sc.id + '">Done</a></div></div>';
      input.querySelector('[data-act=again]').onclick = () => play(view, id, n);
      input.scrollIntoView && input.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }

    nextStep();
  }

  root.Roleplay = { renderList, renderScenario, play, stop, LEVELS };
})(window);

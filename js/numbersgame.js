/*
 * Drill screens: pick a set, then choose or type the answer to ten questions.
 * Used by Number practice (dates, clock times, prices…) and Which case?.
 */
(function (root) {
  'use strict';
  const Store = root.Store;
  const { esc, speak, speakButton, letterBar } = root.UI;
  const ROUND = 10;

  let keyHandler = null;
  let timer = null;
  function stop() {
    if (keyHandler) document.removeEventListener('keydown', keyHandler);
    keyHandler = null;
    clearTimeout(timer);
    if ('speechSynthesis' in root) speechSynthesis.cancel();
  }
  function onKey(fn) {
    if (keyHandler) document.removeEventListener('keydown', keyHandler);
    keyHandler = (e) => {
      if (e.target.closest('button') && (e.key === 'Enter' || e.key === ' ')) return;
      if (e.target.matches('input') && e.key !== 'Enter') return;
      fn(e);
    };
    document.addEventListener('keydown', keyHandler);
  }
  /** An analogue clock face (inline SVG) showing h:m. The label doesn't give the time away. */
  function clockSvg(h, m) {
    const hourAngle = ((h % 12) + m / 60) * 30, minuteAngle = m * 6;
    const hand = (angle, len, width, cls) => {
      const a = (angle - 90) * Math.PI / 180;
      return '<line class="' + cls + '" x1="100" y1="100" x2="' + (100 + len * Math.cos(a)).toFixed(1) + '" y2="' + (100 + len * Math.sin(a)).toFixed(1) +
        '" stroke-width="' + width + '" stroke-linecap="round"/>';
    };
    let marks = '';
    for (let k = 0; k < 60; k++) {
      const a = (k * 6 - 90) * Math.PI / 180, big = k % 5 === 0, r1 = big ? 80 : 85;
      marks += '<line class="tick' + (big ? ' big' : '') + '" x1="' + (100 + r1 * Math.cos(a)).toFixed(1) + '" y1="' + (100 + r1 * Math.sin(a)).toFixed(1) +
        '" x2="' + (100 + 90 * Math.cos(a)).toFixed(1) + '" y2="' + (100 + 90 * Math.sin(a)).toFixed(1) + '"/>';
    }
    for (let n = 1; n <= 12; n++) {
      const a = (n * 30 - 90) * Math.PI / 180;
      marks += '<text x="' + (100 + 67 * Math.cos(a)).toFixed(1) + '" y="' + (100 + 67 * Math.sin(a) + 5).toFixed(1) + '">' + n + '</text>';
    }
    return '<svg class="clock-face" viewBox="0 0 200 200" role="img" aria-label="A clock face">' +
      '<circle class="rim" cx="100" cy="100" r="94"/>' + marks +
      hand(hourAngle, 45, 7, 'hour') + hand(minuteAngle, 70, 4, 'minute') + '<circle class="pin" cx="100" cy="100" r="5"/></svg>';
  }

  // What differs between the drills. The source has SETS, round(set, n) and check(typed, ex).
  const NUMBERS = {
    src: () => root.VocabNumbers, hash: '#/numbers', title: '🔢 Number practice', modeKey: 'numMode', bestKey: 'numBest',
    intro: 'Numbers the way they\'re really used: dates, the time, prices, floors and places, spoken forms and bus numbers. New questions every round.',
    check: (typed, ex) => root.VocabNumbers.checkNumberAnswer(typed, ex),
  };
  const CASES = {
    src: () => root.VocabCases, hash: '#/cases', title: '🎯 Which case?', modeKey: 'caseMode', bestKey: 'caseBest', sentence: true,
    intro: 'A sentence with a gap and a word in its basic form. Put the word in the form the sentence needs: Pidän ___ (suklaa) → suklaasta.',
    check: (typed, ex) => root.VocabCases.check(typed, ex),
  };

  const mode = (cfg) => (Store.get().settings[cfg.modeKey] === 'type' ? 'type' : 'choose');
  const best = (cfg, set) => (Store.get().settings[cfg.bestKey] || {})[set];

  function renderList(view, cfg) {
    cfg = cfg || NUMBERS;
    stop();
    const sets = Object.entries(cfg.src().SETS).concat([['mixed', { name: 'Mixed', icon: '🎲', blurb: 'A bit of everything' }]]);
    view.innerHTML = '<section class="page">' +
      '<a class="back" href="#/games">← Games</a>' +
      '<div class="page-head"><h1>' + cfg.title + '</h1></div>' +
      '<p class="muted">' + esc(cfg.intro) + '</p>' +
      '<h2 class="section-title">How do you answer?</h2>' +
      '<div class="level-picker two">' +
      [['choose', 'Choose', 'Pick the right form out of four'], ['type', 'Type', 'Write it yourself']].map(([k, n, b]) =>
        '<button type="button" class="level' + (k === mode(cfg) ? ' on' : '') + '" data-mode="' + k + '" aria-pressed="' + (k === mode(cfg)) + '"><strong>' + n +
        '</strong><span class="muted small">' + b + '</span></button>').join('') + '</div>' +
      '<h2 class="section-title">What do you want to practise?</h2>' +
      '<div class="rp-grid">' + sets.map(([k, s]) => {
        const b = best(cfg, k);
        return '<a class="rp-card" href="' + cfg.hash + '/' + k + '"><span class="rp-icon">' + s.icon + '</span><strong>' + esc(s.name) + '</strong>' +
          '<span class="muted small" lang="fi">' + esc(s.blurb) + '</span>' + (b != null ? '<span class="muted small">Best: ' + b + '/' + ROUND + '</span>' : '') + '</a>';
      }).join('') + '</div></section>';
    view.querySelectorAll('[data-mode]').forEach((b) => {
      b.onclick = () => { Store.update((s) => { s.settings[cfg.modeKey] = b.dataset.mode; }); renderList(view, cfg); };
    });
  }

  function play(view, set, cfg) {
    cfg = cfg || NUMBERS;
    stop();
    const N = cfg.src();
    if (set !== 'mixed' && !N.SETS[set]) { view.innerHTML = '<section class="page"><p>Not found.</p><a href="' + cfg.hash + '">Back</a></section>'; return; }
    const info = set === 'mixed' ? { name: 'Mixed', icon: '🎲' } : N.SETS[set];
    const exercises = N.round(set, ROUND);
    const m = mode(cfg);
    // What the 🔊 button reads: the whole sentence in Which case?, otherwise the answer.
    const sayIt = (ex) => (ex.digits ? ex.shown.replace(/[“”]/g, '') : cfg.sentence && ex.context ? ex.context.replace('___', ex.answer) : ex.answer);
    let i = 0;
    const results = [];
    view.innerHTML = '<section class="page narrow"><div id="num-game"></div></section>';
    const el = view.querySelector('#num-game');

    function header() {
      return '<div class="game-head"><button class="btn ghost small" data-act="exit">✕ Exit</button>' +
        '<div class="game-title">' + info.icon + ' ' + esc(info.name) + '</div>' +
        '<div class="game-count">' + Math.min(i + 1, exercises.length) + ' / ' + exercises.length + '</div></div>' +
        '<div class="progress"><span style="width:' + Math.round((i / exercises.length) * 100) + '%"></span></div>';
    }
    function contextHtml(ex, fill) {
      if (!ex.context) return '';
      const [a, b] = ex.context.split('___');
      return '<p class="gap-sentence num-context" lang="fi">' + esc(a) +
        (fill ? '<mark class="gap-filled">' + esc(fill) + '</mark>' : '<span class="gap">________</span>') + esc(b) + '</p>';
    }

    function render() {
      stop();
      if (i >= exercises.length) return finish();
      const ex = exercises[i];
      let answered = false;
      el.innerHTML = header() +
        '<div class="question card-pad">' +
        '<div class="q-label">' + esc(ex.task) + '</div>' +
        (ex.clock ? clockSvg(ex.clock.h, ex.clock.m) : '<div class="q-prompt num-shown">' + esc(ex.shown) + '</div>') +
        '<div id="num-context">' + contextHtml(ex) + '</div>' +
        (m === 'choose'
          ? '<div class="choices num-choices">' + ex.options.map((o, n) => '<button class="choice" data-n="' + n + '"><kbd>' + (n + 1) + '</kbd> <span lang="fi">' + esc(o) + '</span></button>').join('') + '</div>'
          : '<form class="num-type" autocomplete="off"><input id="num-input" class="big-input" ' + (ex.digits ? 'inputmode="numeric" ' : 'lang="fi" ') +
            'placeholder="' + (ex.digits ? (ex.kind === 'dates' ? 'Type the date, e.g. 6.12.' : 'Type the number in digits') : 'Kirjoita suomeksi…') + '" spellcheck="false" autocapitalize="off">' +
            (ex.digits ? '' : letterBar('#num-input')) +
            '<div class="row gap center"><button class="btn primary" type="submit">Check <kbd>Enter</kbd></button>' +
            '<button class="btn ghost" type="button" data-act="show">Show answer</button></div></form>') +
        '<div class="feedback" aria-live="polite"></div></div>';
      el.querySelector('[data-act=exit]').onclick = () => { stop(); location.hash = cfg.hash; };
      const fb = el.querySelector('.feedback');

      const reveal = (ok, close, typed) => {
        answered = true;
        results.push({ ex, ok, typed });
        el.querySelector('#num-context').innerHTML = contextHtml(ex, ex.digits ? null : ex.answer) || '';
        fb.innerHTML = (ok ? '<span class="good">' + (close ? 'Almost perfect ✓' : 'Oikein! ✓') + '</span>' : '<span class="bad">Not quite.</span>') +
          '<div class="expected" lang="fi">' + esc(ex.digits ? ex.answer + ' (' + ex.accept[0] + ')' : ex.answer) + ' ' +
          speakButton(sayIt(ex), 'fi') + '</div>' +
          (ex.en ? '<p class="muted small">' + esc(ex.en) + '</p>' : '') +
          (ex.accept.length && !ex.digits ? '<p class="muted small">Also correct: ' + ex.accept.slice(0, 2).map((a) => '<span lang="fi">' + esc(a) + '</span>').join(' · ') + '</p>' : '') +
          '<p class="muted small">' + esc(ex.note) + '</p>' +
          '<button class="btn" data-act="next">Continue <kbd>Enter</kbd></button>';
        fb.querySelector('[data-act=next]').onclick = next;
        fb.querySelector('[data-act=next]').focus();
        speak(sayIt(ex), 'fi');
      };

      if (m === 'choose') {
        const buttons = Array.from(el.querySelectorAll('.choice'));
        const choose = (n) => {
          if (answered || n >= ex.options.length) return;
          const ok = ex.options[n] === ex.answer;
          buttons.forEach((b, k) => {
            b.disabled = true;
            if (ex.options[k] === ex.answer) b.classList.add('right');
            else if (k === n) b.classList.add('wrong');
          });
          reveal(ok, false);
        };
        buttons.forEach((b, n) => { b.onclick = () => choose(n); });
        onKey((e) => { if (/^[1-4]$/.test(e.key)) choose(Number(e.key) - 1); });
      } else {
        const form = el.querySelector('form');
        const input = form.querySelector('input');
        input.focus();
        form.onsubmit = (e) => {
          e.preventDefault();
          if (answered || !input.value.trim()) return;
          const res = cfg.check(input.value, ex);
          input.readOnly = true;
          input.classList.add(res.correct ? 'right' : 'wrong');
          form.querySelectorAll('button').forEach((b) => { b.disabled = true; });
          reveal(res.correct, res.close, input.value);
        };
        form.querySelector('[data-act=show]').onclick = () => {
          if (answered) return;
          input.readOnly = true;
          form.querySelectorAll('button').forEach((b) => { b.disabled = true; });
          reveal(false, false, '');
        };
      }
    }
    function next() { i++; render(); }

    function finish() {
      stop();
      const right = results.filter((r) => r.ok).length;
      const prev = best(cfg, set);
      if (prev == null || right > prev) Store.update((s) => { s.settings[cfg.bestKey] = Object.assign({}, s.settings[cfg.bestKey], { [set]: right }); });
      const missed = results.filter((r) => !r.ok);
      el.innerHTML = '<div class="results card-pad">' +
        '<h2>' + (right === ROUND ? 'Mahtavaa! 🎉' : right >= 7 ? 'Hienoa!' : 'Hyvä yritys!') + '</h2>' +
        '<div class="score-ring" style="--pct:' + Math.round((right / ROUND) * 100) + '"><span>' + right + '/' + ROUND + '</span></div>' +
        (prev != null && right > prev ? '<p>New best!</p>' : '') +
        (missed.length ? '<h3>To review</h3><ul class="missed">' + missed.map((r) =>
          '<li><strong>' + esc(r.ex.shown) + '</strong> → <span lang="fi">' + esc(cfg.sentence && r.ex.context ? r.ex.context.replace('___', r.ex.answer) : r.ex.answer) + '</span> ' + speakButton(sayIt(r.ex), 'fi') +
          (r.typed ? '<br><span class="muted small">You wrote: ' + esc(r.typed) + '</span>' : '') + '</li>').join('') + '</ul>' : '') +
        '<div class="row gap center"><button class="btn primary" data-act="again">New round</button>' +
        '<a class="btn ghost" href="' + cfg.hash + '">Done</a></div></div>';
      el.querySelector('[data-act=again]').onclick = () => play(view, set, cfg);
    }

    render();
  }

  root.NumbersGame = { renderList: (view) => renderList(view, NUMBERS), play: (view, set) => play(view, set, NUMBERS), stop };
  root.CasesGame = { renderList: (view) => renderList(view, CASES), play: (view, set) => play(view, set, CASES), stop };
})(window);

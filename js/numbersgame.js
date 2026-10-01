/* Number practice: dates, clock times, prices, positions, spoken forms… generated fresh each round. */
(function (root) {
  'use strict';
  const N = root.VocabNumbers;
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
  const mode = () => (Store.get().settings.numMode === 'type' ? 'type' : 'choose');
  const best = (set) => (Store.get().settings.numBest || {})[set];

  function renderList(view) {
    stop();
    const sets = Object.entries(N.SETS).concat([['mixed', { name: 'Mixed', icon: '🎲', blurb: 'A bit of everything' }]]);
    view.innerHTML = '<section class="page">' +
      '<a class="back" href="#/games">← Games</a>' +
      '<div class="page-head"><h1>🔢 Number practice</h1></div>' +
      '<p class="muted">Numbers the way they\'re really used: dates, the time, prices, floors and places, spoken forms and bus numbers. New questions every round.</p>' +
      '<h2 class="section-title">How do you answer?</h2>' +
      '<div class="level-picker two">' +
      [['choose', 'Choose', 'Pick the right form out of four'], ['type', 'Type', 'Write it yourself']].map(([k, n, b]) =>
        '<button type="button" class="level' + (k === mode() ? ' on' : '') + '" data-mode="' + k + '" aria-pressed="' + (k === mode()) + '"><strong>' + n +
        '</strong><span class="muted small">' + b + '</span></button>').join('') + '</div>' +
      '<h2 class="section-title">What do you want to practise?</h2>' +
      '<div class="rp-grid">' + sets.map(([k, s]) => {
        const b = best(k);
        return '<a class="rp-card" href="#/numbers/' + k + '"><span class="rp-icon">' + s.icon + '</span><strong>' + esc(s.name) + '</strong>' +
          '<span class="muted small" lang="fi">' + esc(s.blurb) + '</span>' + (b != null ? '<span class="muted small">Best: ' + b + '/' + ROUND + '</span>' : '') + '</a>';
      }).join('') + '</div></section>';
    view.querySelectorAll('[data-mode]').forEach((b) => {
      b.onclick = () => { Store.update((s) => { s.settings.numMode = b.dataset.mode; }); renderList(view); };
    });
  }

  function play(view, set) {
    stop();
    if (set !== 'mixed' && !N.SETS[set]) { view.innerHTML = '<section class="page"><p>Not found.</p><a href="#/numbers">Back</a></section>'; return; }
    const info = set === 'mixed' ? { name: 'Mixed', icon: '🎲' } : N.SETS[set];
    const exercises = N.round(set, ROUND);
    const m = mode();
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
        '<div class="q-prompt num-shown">' + esc(ex.shown) + '</div>' +
        '<div id="num-context">' + contextHtml(ex) + '</div>' +
        (m === 'choose'
          ? '<div class="choices num-choices">' + ex.options.map((o, n) => '<button class="choice" data-n="' + n + '"><kbd>' + (n + 1) + '</kbd> <span lang="fi">' + esc(o) + '</span></button>').join('') + '</div>'
          : '<form class="num-type" autocomplete="off"><input id="num-input" class="big-input" ' + (ex.digits ? 'inputmode="numeric" ' : 'lang="fi" ') +
            'placeholder="' + (ex.digits ? 'Type the number in digits' : 'Kirjoita suomeksi…') + '" spellcheck="false" autocapitalize="off">' +
            (ex.digits ? '' : letterBar('#num-input')) +
            '<div class="row gap center"><button class="btn primary" type="submit">Check <kbd>Enter</kbd></button>' +
            '<button class="btn ghost" type="button" data-act="show">Show answer</button></div></form>') +
        '<div class="feedback" aria-live="polite"></div></div>';
      el.querySelector('[data-act=exit]').onclick = () => { stop(); location.hash = '#/numbers'; };
      const fb = el.querySelector('.feedback');

      const reveal = (ok, close, typed) => {
        answered = true;
        results.push({ ex, ok, typed });
        el.querySelector('#num-context').innerHTML = contextHtml(ex, ex.digits ? null : ex.answer) || '';
        fb.innerHTML = (ok ? '<span class="good">' + (close ? 'Almost perfect ✓' : 'Oikein! ✓') + '</span>' : '<span class="bad">Not quite.</span>') +
          '<div class="expected" lang="fi">' + esc(ex.digits ? ex.answer + ' (' + ex.accept[0] + ')' : ex.answer) + ' ' +
          speakButton(ex.digits ? ex.shown.replace(/[“”]/g, '') : ex.answer, 'fi') + '</div>' +
          (ex.accept.length && !ex.digits ? '<p class="muted small">Also correct: ' + ex.accept.slice(0, 2).map((a) => '<span lang="fi">' + esc(a) + '</span>').join(' · ') + '</p>' : '') +
          '<p class="muted small">' + esc(ex.note) + '</p>' +
          '<button class="btn" data-act="next">Continue <kbd>Enter</kbd></button>';
        fb.querySelector('[data-act=next]').onclick = next;
        fb.querySelector('[data-act=next]').focus();
        speak(ex.digits ? ex.shown.replace(/[“”]/g, '') : ex.answer, 'fi');
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
          const res = N.checkNumberAnswer(input.value, ex);
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
      const prev = best(set);
      if (prev == null || right > prev) Store.update((s) => { s.settings.numBest = Object.assign({}, s.settings.numBest, { [set]: right }); });
      const missed = results.filter((r) => !r.ok);
      el.innerHTML = '<div class="results card-pad">' +
        '<h2>' + (right === ROUND ? 'Mahtavaa! 🎉' : right >= 7 ? 'Hienoa!' : 'Hyvä yritys!') + '</h2>' +
        '<div class="score-ring" style="--pct:' + Math.round((right / ROUND) * 100) + '"><span>' + right + '/' + ROUND + '</span></div>' +
        (prev != null && right > prev ? '<p>New best!</p>' : '') +
        (missed.length ? '<h3>To review</h3><ul class="missed">' + missed.map((r) =>
          '<li><strong>' + esc(r.ex.shown) + '</strong> → <span lang="fi">' + esc(r.ex.answer) + '</span> ' + speakButton(r.ex.digits ? r.ex.shown.replace(/[“”]/g, '') : r.ex.answer, 'fi') +
          (r.typed ? '<br><span class="muted small">You wrote: ' + esc(r.typed) + '</span>' : '') + '</li>').join('') + '</ul>' : '') +
        '<div class="row gap center"><button class="btn primary" data-act="again">New round</button>' +
        '<a class="btn ghost" href="#/numbers">Done</a></div></div>';
      el.querySelector('[data-act=again]').onclick = () => play(view, set);
    }

    render();
  }

  root.NumbersGame = { renderList, play, stop };
})(window);

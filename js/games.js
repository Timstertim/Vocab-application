/* Quizlet-style practice games: flashcards, multiple choice, write and match. */
(function (root) {
  'use strict';
  const Core = root.VocabCore;
  const { esc, speak, speakButton, letterBar } = root.UI;

  const TYPES = {
    flashcards: { name: 'Flashcards', icon: '🃏', blurb: 'Flip cards and sort them into "know it" and "still learning".' },
    quiz: { name: 'Multiple choice', icon: '✅', blurb: 'Pick the right translation out of four options.' },
    write: { name: 'Write', icon: '✍️', blurb: 'Type the translation. Missed words come back at the end.' },
    match: { name: 'Match', icon: '⚡', blurb: 'Race the clock to pair Finnish words with their meanings.' },
  };
  const DIRECTIONS = {
    'fi-en': 'Finnish → English',
    'en-fi': 'English → Finnish',
    mixed: 'Mixed',
  };

  let keyHandler = null;
  let timers = [];

  function stop() {
    if (keyHandler) document.removeEventListener('keydown', keyHandler);
    keyHandler = null;
    timers.forEach(clearTimeout);
    timers.forEach(clearInterval);
    timers = [];
    if ('speechSynthesis' in root) speechSynthesis.cancel();
  }

  function onKey(fn) {
    if (keyHandler) document.removeEventListener('keydown', keyHandler);
    keyHandler = (e) => {
      if (e.target.matches('input, textarea, select') && e.key !== 'Enter') return;
      // Let focused buttons handle Enter/Space themselves so actions don't fire twice.
      if (e.target.closest('button') && (e.key === 'Enter' || e.key === ' ')) return;
      fn(e);
    };
    document.addEventListener('keydown', keyHandler);
  }

  function later(fn, ms) { timers.push(setTimeout(fn, ms)); }

  /**
   * Start a game.
   * opts: { type, words, pool, direction, count, title, onExit, gameId }
   */
  function start(el, opts) {
    stop();
    if (!opts.words.length) {
      el.innerHTML = '<div class="empty card-pad"><p>There are no words to practise here yet.</p>' +
        '<button class="btn" data-act="exit">Back</button></div>';
      el.querySelector('[data-act=exit]').onclick = opts.onExit;
      return;
    }
    if (opts.type === 'quiz' && (opts.pool || opts.words).length < 2) {
      el.innerHTML = '<div class="empty card-pad"><p>Multiple choice needs at least 2 words.</p>' +
        '<button class="btn" data-act="exit">Back</button></div>';
      el.querySelector('[data-act=exit]').onclick = opts.onExit;
      return;
    }
    const round = Core.pickRound(opts.words, opts.count);
    const cards = round.map((w) => Core.makeCard(w, opts.direction || 'fi-en'));
    const session = { opts, cards, results: [], el, startedAt: Date.now() };
    ({ flashcards, quiz, write, match })[opts.type](session);
  }

  function header(session, index, total, extra) {
    const pct = total ? Math.round((index / total) * 100) : 0;
    return '<div class="game-head">' +
      '<button class="btn ghost small" data-act="exit">✕ Exit</button>' +
      '<div class="game-title">' + esc(session.opts.title || TYPES[session.opts.type].name) + '</div>' +
      '<div class="game-count">' + (extra || (Math.min(index + 1, total) + ' / ' + total)) + '</div>' +
      '</div><div class="progress"><span style="width:' + pct + '%"></span></div>';
  }

  function bindExit(session) {
    const b = session.el.querySelector('[data-act=exit]');
    if (b) b.onclick = () => { stop(); session.opts.onExit(); };
  }

  function record(session, card, correct) {
    session.results.push({ card, correct });
    root.Store.recordAnswer(card.word.id, correct);
  }

  function detailBlock(word) {
    let html = '';
    if (word.definition) html += '<p class="def">' + esc(word.definition) + '</p>';
    const ex = (word.examples || [])[0];
    if (ex) {
      html += '<p class="example"><span lang="fi">' + esc(ex.fi) + '</span>' +
        (ex.en ? '<br><span class="muted">' + esc(ex.en) + '</span>' : '') + '</p>';
    }
    return html;
  }

  /* ---------- Flashcards ---------- */
  function flashcards(session) {
    let i = 0;
    let flipped = false;
    const known = new Map();

    function render() {
      if (i >= session.cards.length) return finish(session);
      const c = session.cards[i];
      flipped = false;
      session.el.innerHTML = header(session, i, session.cards.length) +
        '<div class="flashcard-wrap">' +
        '<button class="flashcard" aria-live="polite" data-act="flip">' +
        '<div class="fc-inner">' +
        '<div class="fc-face fc-front"><span class="fc-lang">' + (c.promptLang === 'fi' ? 'Suomi' : 'English') + '</span>' +
        '<span class="fc-text" lang="' + c.promptLang + '">' + esc(c.prompt) + '</span>' +
        '<span class="fc-hint">Click or press Space to flip</span></div>' +
        '<div class="fc-face fc-back"><span class="fc-lang">' + (c.answerLang === 'fi' ? 'Suomi' : 'English') + '</span>' +
        '<span class="fc-text" lang="' + c.answerLang + '">' + esc(c.answer) + '</span>' +
        detailBlock(c.word) + '</div>' +
        '</div></button>' +
        '<div class="fc-speak">' + speakButton(c.word.finnish, 'fi') + '</div>' +
        '</div>' +
        '<div class="game-actions">' +
        '<button class="btn ghost" data-act="prev"' + (i === 0 ? ' disabled' : '') + '>← Back</button>' +
        '<button class="btn warn" data-act="learning">Still learning <kbd>1</kbd></button>' +
        '<button class="btn ok" data-act="know">Know it <kbd>2</kbd></button>' +
        '</div>';
      bindExit(session);
      const q = (s) => session.el.querySelector(s);
      q('[data-act=flip]').onclick = flip;
      q('[data-act=prev]').onclick = prev;
      q('[data-act=learning]').onclick = () => mark(false);
      q('[data-act=know]').onclick = () => mark(true);
      if (c.promptLang === 'fi') speak(c.prompt, 'fi');
    }
    function flip() {
      flipped = !flipped;
      session.el.querySelector('.flashcard').classList.toggle('flipped', flipped);
      const c = session.cards[i];
      if (flipped && c.answerLang === 'fi') speak(c.answer, 'fi');
    }
    function mark(ok) {
      known.set(i, ok);
      i++;
      render();
    }
    function prev() {
      if (i === 0) return;
      i--;
      known.delete(i);
      render();
    }
    onKey((e) => {
      if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'ArrowDown') { e.preventDefault(); flip(); }
      else if (e.key === '1') mark(false);
      else if (e.key === '2' || e.key === 'ArrowRight') mark(true);
      else if (e.key === 'ArrowLeft') prev();
    });
    session.finishHook = () => {
      session.results = session.cards.map((card, idx) => ({ card, correct: !!known.get(idx) }));
      session.results.forEach((r) => root.Store.recordAnswer(r.card.word.id, r.correct));
    };
    render();
  }

  /* ---------- Multiple choice ---------- */
  function quiz(session) {
    let i = 0;
    const pool = session.opts.pool || session.opts.words;

    function render() {
      if (i >= session.cards.length) return finish(session);
      const c = session.cards[i];
      const choices = Core.choicesFor(c, pool, 4);
      let answered = false;
      session.el.innerHTML = header(session, i, session.cards.length) +
        '<div class="question card-pad">' +
        '<div class="q-label">' + (c.dir === 'fi-en' ? 'What does this mean?' : 'How do you say this in Finnish?') + '</div>' +
        '<div class="q-prompt" lang="' + c.promptLang + '">' + esc(c.prompt) + ' ' +
        (c.promptLang === 'fi' ? speakButton(c.prompt, 'fi') : '') + '</div>' +
        '<div class="choices">' +
        choices.map((ch, n) => '<button class="choice" data-n="' + n + '"><kbd>' + (n + 1) + '</kbd> <span lang="' +
          c.answerLang + '">' + esc(ch) + '</span></button>').join('') +
        '</div><div class="feedback" aria-live="polite"></div></div>';
      bindExit(session);
      const buttons = Array.from(session.el.querySelectorAll('.choice'));
      const choose = (n) => {
        if (answered || n >= choices.length) return;
        answered = true;
        const ok = Core.normalize(choices[n]) === Core.normalize(c.answer);
        record(session, c, ok);
        buttons.forEach((b, k) => {
          b.disabled = true;
          if (Core.normalize(choices[k]) === Core.normalize(c.answer)) b.classList.add('right');
          else if (k === n) b.classList.add('wrong');
        });
        const fb = session.el.querySelector('.feedback');
        if (ok) {
          fb.innerHTML = '<span class="good">Oikein! ✓</span>';
          if (c.answerLang === 'fi') speak(c.answer, 'fi');
          later(next, 900);
        } else {
          fb.innerHTML = '<span class="bad">Not quite.</span> ' + detailBlock(c.word) +
            '<button class="btn" data-act="next">Continue <kbd>Enter</kbd></button>';
          fb.querySelector('[data-act=next]').onclick = next;
          fb.querySelector('[data-act=next]').focus();
        }
      };
      buttons.forEach((b, n) => { b.onclick = () => choose(n); });
      onKey((e) => {
        if (/^[1-4]$/.test(e.key)) choose(Number(e.key) - 1);
        else if (e.key === 'Enter' && answered) { e.preventDefault(); next(); }
      });
    }
    function next() {
      timers.forEach(clearTimeout);
      timers = [];
      i++;
      render();
    }
    render();
  }

  /* ---------- Write ---------- */
  function write(session) {
    const queue = session.cards.slice();
    const firstTry = new Set();
    let i = 0;
    const lenient = root.Store.get().settings.lenient;

    function render() {
      if (i >= queue.length) return finish(session);
      const c = queue[i];
      const retry = i >= session.cards.length;
      let done = false;
      session.el.innerHTML = header(session, Math.min(i, session.cards.length), session.cards.length,
        retry ? 'Review ' + (i - session.cards.length + 1) + ' / ' + (queue.length - session.cards.length) : null) +
        '<form class="question card-pad" autocomplete="off">' +
        '<div class="q-label">' + (retry ? 'Let\'s try this one again · ' : '') +
        (c.dir === 'fi-en' ? 'Type the English meaning' : 'Type the Finnish word') + '</div>' +
        '<div class="q-prompt" lang="' + c.promptLang + '">' + esc(c.prompt) + ' ' +
        (c.promptLang === 'fi' ? speakButton(c.prompt, 'fi') : '') + '</div>' +
        '<input id="write-input" class="big-input" lang="' + c.answerLang + '" autocapitalize="off" spellcheck="false" ' +
        'placeholder="' + (c.answerLang === 'fi' ? 'Kirjoita suomeksi…' : 'Type in English…') + '">' +
        (c.answerLang === 'fi' ? letterBar('#write-input') : '') +
        '<div class="row gap"><button class="btn primary" type="submit">Check <kbd>Enter</kbd></button>' +
        '<button class="btn ghost" type="button" data-act="dontknow">I don\'t know</button></div>' +
        '<div class="feedback" aria-live="polite"></div></form>';
      bindExit(session);
      const form = session.el.querySelector('form');
      const input = form.querySelector('input');
      const fb = form.querySelector('.feedback');
      input.focus();

      const conclude = (ok) => {
        if (!retry) record(session, c, ok);
        else if (ok) firstTry.add(c);
        if (!ok && !retry) queue.push(c);
      };
      const showWrong = (result, typed) => {
        fb.innerHTML = (result && result.close
          ? '<span class="warn-text">Almost!</span> '
          : '<span class="bad">' + (typed ? 'Not quite.' : 'The answer is:') + '</span> ') +
          '<div class="expected"><span lang="' + c.answerLang + '">' + esc(c.answer) + '</span> ' +
          speakButton(c.word.finnish, 'fi') + '</div>' +
          (typed ? '<div class="muted small">You wrote: ' + esc(typed) + '</div>' : '') +
          detailBlock(c.word) +
          '<div class="row gap">' +
          '<button class="btn" type="button" data-act="next">Continue <kbd>Enter</kbd></button>' +
          (typed ? '<button class="btn ghost" type="button" data-act="override">I was right</button>' : '') +
          '</div>';
        fb.querySelector('[data-act=next]').onclick = () => { conclude(false); next(); };
        fb.querySelector('[data-act=next]').focus();
        const ov = fb.querySelector('[data-act=override]');
        if (ov) ov.onclick = () => { conclude(true); next(); };
      };

      form.onsubmit = (e) => {
        e.preventDefault();
        if (done) return;
        const typed = input.value.trim();
        if (!typed) return;
        done = true;
        input.readOnly = true;
        form.querySelector('[type=submit]').disabled = true;
        form.querySelector('[data-act=dontknow]').disabled = true;
        const result = Core.checkAnswer(typed, c.answer, { lenient });
        if (result.correct) {
          input.classList.add('right');
          fb.innerHTML = '<span class="good">Oikein! ✓</span>' +
            (Core.alternatives(c.answer).length > 1 ? ' <span class="muted">(' + esc(c.answer) + ')</span>' : '');
          speak(c.word.finnish, 'fi');
          conclude(true);
          later(next, 1000);
          done = 'auto';
        } else {
          input.classList.add(result.close ? 'close' : 'wrong');
          showWrong(result, typed);
        }
      };
      form.querySelector('[data-act=dontknow]').onclick = () => {
        if (done) return;
        done = true;
        input.readOnly = true;
        form.querySelector('[type=submit]').disabled = true;
        showWrong(null, '');
      };
      onKey((e) => {
        if (e.key === 'Enter' && done === 'auto') {
          e.preventDefault();
          next();
        }
      });
    }
    function next() {
      timers.forEach(clearTimeout);
      timers = [];
      i++;
      render();
    }
    render();
  }

  /* ---------- Match ---------- */
  function match(session) {
    const BOARD = 6;
    const chunks = [];
    for (let k = 0; k < session.cards.length; k += BOARD) chunks.push(session.cards.slice(k, k + BOARD));
    let board = 0;
    let penalty = 0;
    let mistakes = new Set();
    const t0 = Date.now();
    const elapsed = () => (Date.now() - t0) / 1000 + penalty;

    function render() {
      if (board >= chunks.length) {
        session.matchTime = elapsed();
        session.results = session.cards.map((card) => ({ card, correct: !mistakes.has(card.word.id) }));
        session.results.forEach((r) => root.Store.recordAnswer(r.card.word.id, r.correct));
        return finish(session);
      }
      const cards = chunks[board];
      const tiles = Core.shuffle([].concat(
        cards.map((c) => ({ id: c.word.id, text: c.word.finnish, lang: 'fi' })),
        cards.map((c) => ({ id: c.word.id, text: c.word.english, lang: 'en' }))
      ));
      session.el.innerHTML = header(session, board, chunks.length,
        '<span class="timer">0.0s</span>') +
        '<p class="muted center">Tap a Finnish word and its meaning. Wrong pairs add 1 second.' +
        (chunks.length > 1 ? ' Board ' + (board + 1) + ' of ' + chunks.length + '.' : '') + '</p>' +
        '<div class="match-grid">' +
        tiles.map((t, n) => '<button class="tile" data-n="' + n + '" lang="' + t.lang + '">' + esc(t.text) + '</button>').join('') +
        '</div>';
      bindExit(session);
      const timerEl = session.el.querySelector('.timer');
      const iv = setInterval(() => { if (timerEl.isConnected) timerEl.textContent = elapsed().toFixed(1) + 's'; }, 100);
      timers.push(iv);
      let selected = null;
      let left = cards.length;
      const btns = Array.from(session.el.querySelectorAll('.tile'));
      btns.forEach((b, n) => {
        b.onclick = () => {
          if (b.classList.contains('gone') || b.classList.contains('bad')) return;
          if (selected === null) { selected = n; b.classList.add('sel'); if (tiles[n].lang === 'fi') speak(tiles[n].text, 'fi'); return; }
          if (selected === n) { selected = null; b.classList.remove('sel'); return; }
          const a = tiles[selected], t = tiles[n], ab = btns[selected];
          selected = null;
          ab.classList.remove('sel');
          if (a.id === t.id && a.lang !== t.lang) {
            ab.classList.add('gone');
            b.classList.add('gone');
            left--;
            if (!left) { clearInterval(iv); board++; later(render, 350); }
          } else {
            penalty += 1;
            mistakes.add(a.id);
            mistakes.add(t.id);
            [ab, b].forEach((x) => x.classList.add('bad'));
            later(() => [ab, b].forEach((x) => x.classList.remove('bad')), 450);
          }
        };
      });
    }
    render();
  }

  /* ---------- Results ---------- */
  function finish(session) {
    stop();
    if (session.finishHook) session.finishHook();
    const total = session.results.length;
    const right = session.results.filter((r) => r.correct).length;
    const missed = session.results.filter((r) => !r.correct).map((r) => r.card.word);
    const pct = total ? Math.round((right / total) * 100) : 0;
    let best = '';
    if (session.opts.type === 'match' && session.matchTime != null) {
      const key = session.opts.gameId || 'quick';
      const s = root.Store.get();
      s.settings.bestTimes = s.settings.bestTimes || {};
      const prev = s.settings.bestTimes[key];
      const isBest = prev == null || session.matchTime < prev;
      if (isBest) root.Store.update((st) => { st.settings.bestTimes[key] = session.matchTime; });
      best = '<p class="big-stat">' + session.matchTime.toFixed(1) + 's</p>' +
        '<p class="muted">' + (isBest ? (prev == null ? 'Your first time on this game!' : 'New best time! 🎉') :
          'Best: ' + prev.toFixed(1) + 's') + '</p>';
    }
    const praise = pct === 100 ? 'Mahtavaa! Perfect round.' : pct >= 80 ? 'Hienoa! Great work.' :
      pct >= 50 ? 'Hyvä! Keep going.' : 'Harjoitus tekee mestarin – practice makes perfect.';
    session.el.innerHTML =
      '<div class="results card-pad">' +
      '<h2>' + esc(praise) + '</h2>' + best +
      '<div class="score-ring" style="--pct:' + pct + '"><span>' + pct + '%</span></div>' +
      '<p>' + right + ' of ' + total + ' ' + (session.opts.type === 'flashcards' ? 'marked as known' :
        session.opts.type === 'match' ? 'matched without a mistake' : 'correct on the first try') + '</p>' +
      (missed.length ? '<h3>Words to review</h3><ul class="missed">' + missed.map((w) =>
        '<li><span lang="fi"><strong>' + esc(w.finnish) + '</strong></span> ' + speakButton(w.finnish, 'fi') +
        ' – ' + esc(w.english) + '</li>').join('') + '</ul>' : '') +
      '<div class="row gap center">' +
      '<button class="btn primary" data-act="again">Play again</button>' +
      (missed.length ? '<button class="btn" data-act="missed">Practise missed (' + missed.length + ')</button>' : '') +
      '<button class="btn ghost" data-act="exit">Done</button></div></div>';
    const q = (s) => session.el.querySelector(s);
    q('[data-act=exit]').onclick = session.opts.onExit;
    q('[data-act=again]').onclick = () => start(session.el, session.opts);
    if (missed.length) {
      q('[data-act=missed]').onclick = () => start(session.el, Object.assign({}, session.opts, {
        words: missed, count: 0, pool: session.opts.pool || session.opts.words,
        title: (session.opts.title || '') + ' · missed',
      }));
    }
  }

  root.Games = { start, stop, TYPES, DIRECTIONS };
})(window);

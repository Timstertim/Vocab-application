/* Daily review: today's due words plus a few new ones, asked a little harder each time you know them. */
(function (root) {
  'use strict';
  const R = root.VocabReview;
  const Core = root.VocabCore;
  const Store = root.Store;
  const { esc, speak, speakButton, letterBar } = root.UI;
  const SIZES = [10, 20, 30];

  let keyHandler = null;
  let timer = null;
  function stop() {
    if (keyHandler) document.removeEventListener('keydown', keyHandler);
    keyHandler = null;
    clearTimeout(timer);
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

  const settings = () => Store.get().settings;
  const size = () => (SIZES.includes(settings().dailySize) ? settings().dailySize : 10);
  /** The words the review draws from: a category and a highest level, if chosen. */
  function scopeFilter() {
    const cat = settings().dailyCat || '', max = settings().dailyLevelMax || '';
    return (w) => (!cat || (w.categoryIds || []).includes(cat)) && (!max || Core.inLevelRange(w, '', max));
  }
  const levelRank = (w) => { const i = Core.levelIndex(w.level); return i < 0 ? 99 : i; };
  const todaysPick = (n) => R.pickDaily(Store.get().words, { size: n || size(), day: R.today(), filter: scopeFilter(), levelRank });

  /** Short text for the Games page: what's waiting today. */
  function summary() {
    const day = R.today(), daily = settings().daily;
    const p = todaysPick();
    return { due: p.due, fresh: p.fresh, done: !!daily && daily.last === day, streak: R.currentStreak(daily, day) };
  }

  function renderStart(view) {
    stop();
    const s = settings(), day = R.today();
    const p = todaysPick(), info = summary();
    const tomorrow = Store.get().words.filter((w) => scopeFilter()(w) && w.srs && w.srs.due === R.addDays(day, 1)).length;
    const learning = Store.get().words.filter((w) => w.srs).length;
    view.innerHTML = '<section class="page narrow">' +
      '<a class="back" href="#/games">← Games</a>' +
      '<div class="page-head"><h1>📆 Daily review</h1>' +
      (info.streak ? '<span class="streak" title="Days in a row">🔥 ' + info.streak + (info.streak === 1 ? ' day' : ' days') + '</span>' : '') + '</div>' +
      '<p class="muted">A few minutes a day. Words you get right come back later and later (1, 2, 4, 7, 14, 30, 60 days); ' +
      'words you miss come back tomorrow. First you pick the meaning, then the Finnish word, then you write it.</p>' +
      '<div class="card-pad review-today">' +
      (info.done
        ? '<p><strong>Done for today ✓</strong></p><p class="muted">' + (tomorrow ? tomorrow + ' word' + (tomorrow === 1 ? '' : 's') + ' due tomorrow.' : 'See you tomorrow!') + '</p>'
        : '<p><strong>' + (p.due ? p.due + ' word' + (p.due === 1 ? '' : 's') + ' due today' : 'Nothing due today') + '</strong>' +
          (p.words.length > Math.min(p.due, size()) ? ' + ' + (p.words.length - Math.min(p.due, size())) + ' new' : '') + '</p>') +
      '<p class="muted small">' + learning + ' word' + (learning === 1 ? '' : 's') + ' in your review so far' +
      (s.daily && s.daily.best ? ' · best streak ' + s.daily.best + (s.daily.best === 1 ? ' day' : ' days') : '') + '</p>' +
      (p.words.length
        ? '<button class="btn primary" data-act="start">' + (info.done ? 'Review more' : 'Start') + ' (' + p.words.length + ')</button>'
        : '<p class="muted">No words to review here. Pick other words below.</p>') + '</div>' +
      '<h2 class="section-title">Settings</h2>' +
      '<div class="toolbar">' +
      '<label class="inline">Words a day <select id="rv-size">' + SIZES.map((n) => '<option' + (n === size() ? ' selected' : '') + '>' + n + '</option>').join('') + '</select></label>' +
      '<label class="inline">Words from <select id="rv-cat"><option value="">All words</option>' +
      Store.get().categories.map((c) => '<option value="' + esc(c.id) + '"' + (c.id === s.dailyCat ? ' selected' : '') + '>' + esc(c.name) + '</option>').join('') + '</select></label>' +
      '<label class="inline">Up to level <select id="rv-level"><option value="">Any level</option>' +
      Core.LEVEL_SCALE.slice(0, 7).map((l) => '<option' + (l === s.dailyLevelMax ? ' selected' : '') + '>' + l + '</option>').join('') + '</select></label>' +
      '</div></section>';
    const save = (key, value) => { Store.update((st) => { st.settings[key] = value; }); renderStart(view); };
    view.querySelector('#rv-size').onchange = (e) => save('dailySize', Number(e.target.value));
    view.querySelector('#rv-cat').onchange = (e) => save('dailyCat', e.target.value);
    view.querySelector('#rv-level').onchange = (e) => save('dailyLevelMax', e.target.value);
    const start = view.querySelector('[data-act=start]');
    if (start) start.onclick = () => play(view, p.words);
  }

  function play(view, words) {
    stop();
    const day = R.today();
    const all = Store.get().words;
    const queue = words.map((w) => ({ id: w.id, type: R.questionType(w.srs) }));
    const total = queue.length;
    const results = new Map();     // word id → right on the first try?
    let i = 0;
    view.innerHTML = '<section class="page narrow"><div id="rv-game"></div></section>';
    const el = view.querySelector('#rv-game');

    function header() {
      const n = Math.min(i, total);
      return '<div class="game-head"><button class="btn ghost small" data-act="exit">✕ Exit</button>' +
        '<div class="game-title">📆 Daily review</div>' +
        '<div class="game-count">' + (i < total ? (i + 1) + ' / ' + total : 'Once more') + '</div></div>' +
        '<div class="progress"><span style="width:' + Math.round((n / total) * 100) + '%"></span></div>';
    }
    const example = (w) => (w.examples && w.examples[0]
      ? '<p class="muted small"><span lang="fi">' + esc(w.examples[0].fi) + '</span> – ' + esc(w.examples[0].en) + '</p>' : '');

    function render() {
      stop();
      if (i >= queue.length) return finish();
      const q = queue[i], w = Store.word(q.id);
      if (!w) { i++; return render(); }
      const retry = i >= total;
      let answered = false;
      const fiPrompt = q.type === 'choose-fi';
      const label = (retry ? 'One more try · ' : '') +
        (q.type === 'choose-fi' ? 'What does it mean?' : q.type === 'choose-en' ? 'Which is the Finnish word?' : 'Write it in Finnish');
      const prompt = fiPrompt ? w.finnish : w.english;
      const opts = q.type === 'type' ? [] : choices(w, q.type);
      el.innerHTML = header() +
        '<div class="question card-pad">' +
        '<div class="q-label">' + esc(label) + '</div>' +
        '<div class="q-prompt" lang="' + (fiPrompt ? 'fi' : 'en') + '">' + esc(prompt) + (fiPrompt ? ' ' + speakButton(w.finnish, 'fi') : '') + '</div>' +
        (q.type === 'type'
          ? '<form class="num-type" autocomplete="off"><input id="rv-input" class="big-input" lang="fi" placeholder="Kirjoita suomeksi…" spellcheck="false" autocapitalize="off">' +
            letterBar('#rv-input') +
            '<div class="row gap center"><button class="btn primary" type="submit">Check <kbd>Enter</kbd></button>' +
            '<button class="btn ghost" type="button" data-act="dontknow">I don\'t know</button></div></form>'
          : '<div class="choices">' + opts.map((o, n) => '<button class="choice" data-n="' + n + '"><kbd>' + (n + 1) + '</kbd> <span lang="' +
            (fiPrompt ? 'en' : 'fi') + '">' + esc(o) + '</span></button>').join('') + '</div>') +
        '<div class="feedback" aria-live="polite"></div></div>';
      el.querySelector('[data-act=exit]').onclick = () => { stop(); renderStart(view); };
      const fb = el.querySelector('.feedback');

      const conclude = (ok, note) => {
        answered = true;
        if (!retry) {
          results.set(w.id, ok);
          Store.recordAnswer(w.id, ok);
          Store.update(() => { w.srs = R.schedule(w.srs, ok, day); });
          if (!ok) queue.push(q);
        }
        const next = w.srs ? w.srs.due : '';
        fb.innerHTML = (ok ? '<span class="good">Oikein! ✓</span>' : '<span class="bad">' + (note || 'Not quite.') + '</span>') +
          '<div class="expected"><span lang="fi">' + esc(w.finnish) + '</span> = ' + esc(w.english) + ' ' + speakButton(w.finnish, 'fi') + '</div>' +
          example(w) +
          (!retry && next ? '<p class="muted small">' + (ok ? 'Next time: ' + when(next, day) : 'It will come back once more now, and again tomorrow.') + '</p>' : '') +
          '<button class="btn" data-act="next">Continue <kbd>Enter</kbd></button>';
        fb.querySelector('[data-act=next]').onclick = () => { i++; render(); };
        fb.querySelector('[data-act=next]').focus();
        onKey((e) => { if (e.key === 'Enter') { e.preventDefault(); i++; render(); } });
        speak(w.finnish, 'fi');
      };

      if (q.type === 'type') {
        const form = el.querySelector('form'), input = form.querySelector('input');
        input.focus();
        const lock = () => { input.readOnly = true; form.querySelectorAll('button').forEach((b) => { b.disabled = true; }); };
        form.onsubmit = (e) => {
          e.preventDefault();
          if (answered || !input.value.trim()) return;
          const res = Core.checkAnswer(input.value, w.finnish, { lenient: settings().lenient });
          lock();
          input.classList.add(res.correct ? 'right' : res.close ? 'close' : 'wrong');
          conclude(res.correct, res.close ? 'Almost! Check the spelling.' : 'Not quite.');
        };
        form.querySelector('[data-act=dontknow]').onclick = () => { if (!answered) { lock(); conclude(false, 'The answer is:'); } };
      } else {
        const buttons = Array.from(el.querySelectorAll('.choice'));
        const right = q.type === 'choose-fi' ? w.english : w.finnish;
        const choose = (n) => {
          if (answered || n >= buttons.length) return;
          buttons.forEach((b, k) => {
            b.disabled = true;
            if (opts[k] === right) b.classList.add('right');
            else if (k === n) b.classList.add('wrong');
          });
          conclude(opts[n] === right);
        };
        buttons.forEach((b, n) => { b.onclick = () => choose(n); });
        onKey((e) => { if (/^[1-4]$/.test(e.key)) choose(Number(e.key) - 1); });
      }
    }

    /** Four options; words with the same meaning are never offered as wrong ones. */
    function choices(w, type) {
      const answerLang = type === 'choose-fi' ? 'en' : 'fi';
      const answer = answerLang === 'en' ? w.english : w.finnish;
      const sameMeaning = (x) => Core.normalize(x.english) === Core.normalize(w.english);
      const pool = all.filter((x) => x.id !== w.id && !sameMeaning(x) && (!w.partOfSpeech || x.partOfSpeech === w.partOfSpeech));
      return Core.choicesFor({ word: w, answer, answerLang }, pool.length >= 3 ? pool : all.filter((x) => !sameMeaning(x)), 4);
    }

    function finish() {
      stop();
      const right = Array.from(results.values()).filter(Boolean).length;
      const before = settings().daily;
      const firstToday = !before || before.last !== day;
      Store.update((s) => { s.settings.daily = R.finishDay(s.settings.daily, day); });
      const streak = settings().daily.streak;
      const missed = Array.from(results.entries()).filter(([, ok]) => !ok).map(([id]) => Store.word(id)).filter(Boolean);
      el.innerHTML = '<div class="results card-pad">' +
        '<h2>' + (right === total ? 'Mahtavaa! 🎉' : right >= total * 0.7 ? 'Hienoa!' : 'Hyvä yritys!') + '</h2>' +
        '<div class="score-ring" style="--pct:' + Math.round((right / total) * 100) + '"><span>' + right + '/' + total + '</span></div>' +
        '<p>' + (firstToday ? '🔥 ' + streak + (streak === 1 ? ' day' : ' days in a row') + (streak > 1 ? '!' : ' – come back tomorrow to keep it going.') : 'Extra practice done.') + '</p>' +
        (missed.length ? '<h3>Coming back tomorrow</h3><ul class="missed">' + missed.map((w) =>
          '<li><strong lang="fi">' + esc(w.finnish) + '</strong> = ' + esc(w.english) + ' ' + speakButton(w.finnish, 'fi') + '</li>').join('') + '</ul>' : '') +
        '<div class="row gap center"><button class="btn primary" data-act="done">Done</button></div></div>';
      el.querySelector('[data-act=done]').onclick = () => renderStart(view);
    }

    render();
  }

  /** "tomorrow", "in 4 days"… */
  function when(due, day) {
    const n = R.daysBetween(day, due);
    return n <= 0 ? 'today' : n === 1 ? 'tomorrow' : 'in ' + n + ' days';
  }

  root.DailyReview = { renderStart, summary, stop };
})(window);

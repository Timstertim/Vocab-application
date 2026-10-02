const test = require('node:test');
const assert = require('node:assert/strict');
const N = require('../js/numbers.js');

test('cardinal numbers are written as one word', () => {
  const cases = { 0: 'nolla', 7: 'seitsemän', 10: 'kymmenen', 11: 'yksitoista', 16: 'kuusitoista', 20: 'kaksikymmentä',
    21: 'kaksikymmentäyksi', 99: 'yhdeksänkymmentäyhdeksän', 100: 'sata', 101: 'satayksi', 250: 'kaksisataaviisikymmentä',
    1000: 'tuhat', 1990: 'tuhatyhdeksänsataayhdeksänkymmentä', 2024: 'kaksituhattakaksikymmentäneljä', 1100: 'tuhatsata' };
  for (const [n, w] of Object.entries(cases)) assert.equal(N.cardinal(+n), w, n);
});

test('ordinals, including compounds and the essive', () => {
  const nom = { 1: 'ensimmäinen', 2: 'toinen', 3: 'kolmas', 6: 'kuudes', 10: 'kymmenes', 11: 'yhdestoista', 12: 'kahdestoista',
    13: 'kolmastoista', 20: 'kahdeskymmenes', 21: 'kahdeskymmenesensimmäinen', 24: 'kahdeskymmenesneljäs', 30: 'kolmaskymmenes',
    31: 'kolmaskymmenesensimmäinen' };
  for (const [n, w] of Object.entries(nom)) assert.equal(N.ordinal(+n), w, n);
  const ess = { 1: 'ensimmäisenä', 3: 'kolmantena', 6: 'kuudentena', 10: 'kymmenentenä', 11: 'yhdentenätoista',
    12: 'kahdentenatoista', 20: 'kahdentenakymmenentenä', 24: 'kahdentenakymmenentenäneljäntenä', 31: 'kolmantenakymmenentenäensimmäisenä' };
  for (const [n, w] of Object.entries(ess)) assert.equal(N.ordinalEssive(+n), w, n);
  assert.equal(N.ORD_INESSIVE[3], 'kolmannessa');
  assert.equal(N.ORD_TRANSLATIVE[2], 'toiseksi');
});

test('typed answers ignore spaces, hyphens and punctuation; small typos are close', () => {
  const ex = { kind: 'years', answer: 'kaksituhattakaksikymmentäneljä', accept: [] };
  assert.equal(N.checkNumberAnswer('kaksi tuhatta kaksikymmentä neljä', ex).correct, true);
  assert.equal(N.checkNumberAnswer('Kaksituhatta-kaksikymmentäneljä.', ex).correct, true);
  assert.equal(N.checkNumberAnswer('kaksituhattakaksikymmentneljä', ex).close, true);
  assert.equal(N.checkNumberAnswer('tuhat', ex).correct, false);
  const phone = { kind: 'phone', answer: 'nolla neljä nolla, yksi kaksi kolme', accept: [] };
  assert.equal(N.checkNumberAnswer('nolla neljä nolla yks kaks kolme', phone).correct, true);
});

test('every generated exercise has a unique answer among its options and the answer is accepted', () => {
  let rng = 1;
  const rand = () => { rng = (rng * 16807) % 2147483647; return (rng - 1) / 2147483646; };
  for (const set of Object.keys(N.SETS).concat('mixed')) {
    for (let k = 0; k < 40; k++) {
      for (const ex of N.round(set, 10, rand)) {
        assert.ok(ex.answer && ex.context !== undefined && ex.task, set);
        assert.ok(ex.options.includes(ex.answer), set + ' options');
        assert.equal(new Set(ex.options.map(N.squash)).size, ex.options.length, 'duplicate options in ' + ex.shown + ': ' + ex.options);
        assert.ok(ex.options.length >= 3, 'too few options for ' + ex.shown);
        assert.ok(N.checkNumberAnswer(ex.answer, ex).correct, ex.answer);
        for (const a of ex.accept) assert.ok(N.checkNumberAnswer(a, ex).correct, a);
        for (const w of ex.wrong) assert.equal(N.checkNumberAnswer(w, ex).correct, false, 'wrong accepted: ' + w + ' for ' + ex.shown);
        if (ex.context) assert.ok(ex.context.includes('___'), ex.context);
      }
    }
  }
});

test('clock times: half past is "puoli" + the next hour', () => {
  let found = 0;
  let seed = 7;
  const rand = () => { seed = (seed * 48271) % 2147483647; return seed / 2147483647; };
  for (let k = 0; k < 400; k++) {
    const [ex] = N.round('times', 1, rand);
    const [h, m] = ex.shown.split('.').map(Number);
    if (m === 30) {
      found++;
      const next = (h % 12) % 12 + 1;
      assert.equal(ex.answer, 'puoli ' + N.cardinal(next), ex.shown);
    }
    if (m === 45) assert.equal(ex.answer, 'varttia vaille ' + N.cardinal((h % 12) % 12 + 1), ex.shown);
    if (m === 10) assert.equal(ex.answer, 'kymmentä yli ' + N.cardinal(h % 12 || 12), ex.shown);
  }
  assert.ok(found > 5);
});

test('decades and centuries', () => {
  assert.equal(N.decadeWord(1990) + 'luvulla', 'tuhatyhdeksänsataayhdeksänkymmentäluvulla');
  assert.equal(N.decadeWord(2000) + 'luku', 'kaksituhattaluku');
  assert.equal(N.decadeWord(2010) + 'luku', 'kaksituhattakymmenluku');
  assert.equal(N.decadeWord(1800) + 'luku', 'tuhatkahdeksansataaluku');
});

test('clock, time spans and years exercises use the right forms', () => {
  let seed = 3;
  const rand = () => { seed = (seed * 48271) % 2147483647; return seed / 2147483647; };
  const seen = { clock: 0, spans: 0, years: 0 };
  for (let k = 0; k < 300; k++) {
    for (const set of Object.keys(seen)) {
      const [ex] = N.round(set, 1, rand);
      seen[set]++;
      if (set === 'clock') {
        assert.ok(ex.clock && ex.clock.h >= 1 && ex.clock.h <= 12, 'clock data');
        if (ex.clock.m === 30) assert.equal(ex.answer, 'puoli ' + N.cardinal(ex.clock.h % 12 + 1));
        if (ex.clock.m === 0) assert.equal(ex.answer, N.cardinal(ex.clock.h));
      }
      if (/^in \d+ /.test(ex.shown)) assert.match(ex.answer, / päästä$/);
      if (/ ago$/.test(ex.shown)) assert.match(ex.answer, / sitten$/);
      if (/^since /.test(ex.shown)) assert.match(ex.answer, /^vuodesta /);
      if (/^by /.test(ex.shown)) assert.match(ex.answer, /^vuoteen /);
      if (/-luvulla$/.test(ex.shown)) assert.match(ex.answer, /luvulla$/);
    }
  }
  const ex = { kind: 'spans', answer: 'kahden tunnin päästä', accept: ['kahden tunnin kuluttua'], wrong: ['kaksi tuntia päästä'] };
  assert.equal(N.checkNumberAnswer('kahden tunnin kuluttua', ex).correct, true);
  assert.equal(N.checkNumberAnswer('kaksi tuntia päästä', ex).correct, false);
});

test('dates: the month as an ordinal is partitive (kuudes kahdettatoista)', () => {
  assert.equal(N.MONTHS_ORD_PARTITIVE[12], 'kahdettatoista');
  assert.equal(N.MONTHS_ORD_PARTITIVE[6], 'kuudetta');
  for (let i = 0; i < 200; i++) {
    const ex = N.round('dates', 1)[0];
    if (ex.digits || /puhekieli/.test(ex.task)) continue;
    const [d, m] = ex.shown.split('.').map(Number);
    const day = ex.answer.split(' ')[0];
    assert.equal(N.checkNumberAnswer(day + ' ' + N.MONTHS_ORD_PARTITIVE[m], ex).correct, true, ex.shown);
    assert.equal(N.checkNumberAnswer(day + ' ' + N.ordinal(m), ex).correct, false, ex.shown);
    assert.ok(day === N.ordinal(d) || day === N.ordinalEssive(d), ex.shown);
  }
});

test('dates in puhekieli', () => {
  const said = { 1: 'eka', 2: 'toka', 8: 'kaheksas', 10: 'kymmenes', 12: 'kahdestoist', 20: 'kahdeskymmenes', 21: 'kakskytensimmäinen', 28: 'kakskytkaheksas', 31: 'kolkytensimmäinen' };
  for (const [d, w] of Object.entries(said)) assert.equal(N.spokenDay(+d, 0), w, d);
  const on = { 1: 'ekana', 12: 'kahdentenatoist', 28: 'kakskytkaheksantena' };
  for (const [d, w] of Object.entries(on)) assert.equal(N.spokenDay(+d, 1), w, d);
  // Hearing a spoken date: the answer is compared as day and month, so 2.12. ≠ 21.2.
  const ex = { kind: 'dates', digits: true, answer: '2.12.' };
  assert.equal(N.checkNumberAnswer('2.12', ex).correct, true);
  assert.equal(N.checkNumberAnswer('21.2.', ex).correct, false);
  for (let i = 0; i < 500; i++) {
    const e = N.round('dates', 1)[0];
    assert.equal(e.options.length, 4, e.shown);
    assert.equal(e.options.filter((o) => N.checkNumberAnswer(o, e).correct).length, 1, e.shown);
  }
});

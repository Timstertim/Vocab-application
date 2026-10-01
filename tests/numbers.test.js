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

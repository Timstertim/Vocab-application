const test = require('node:test');
const assert = require('node:assert');
const K = require('../js/cases.js');

test('which case: every item is complete and its options are distinct', () => {
  for (const it of K.ITEMS) {
    const [set, sentence, base, answer, wrong, note, en] = it;
    assert.ok(K.SETS[set], set);
    assert.equal(sentence.split('___').length, 2, sentence);
    assert.ok(base && answer && note && en, sentence);
    assert.ok(wrong.length >= 3, sentence);
    const all = [answer].concat(wrong).map(K.squash);
    assert.equal(new Set(all).size, all.length, 'duplicate option in ' + sentence);
  }
  for (const set of Object.keys(K.SETS)) assert.ok(K.exercises(set).length >= 10, set);
});

test('which case: rounds have four options with exactly one right answer', () => {
  for (const set of Object.keys(K.SETS).concat('mixed')) {
    const r = K.round(set, 10);
    assert.equal(r.length, 10);
    for (const ex of r) {
      assert.equal(ex.options.length, 4);
      assert.equal(ex.options.filter((o) => K.check(o, ex).correct).length, 1, ex.context);
    }
  }
});

test('which case: typing is forgiving but never accepts another case', () => {
  const ex = K.exercises('verbs').find((e) => e.shown === 'suklaa');
  assert.equal(K.check('suklaasta', ex).correct, true);
  assert.equal(K.check(' Suklaasta. ', ex).correct, true);
  assert.equal(K.check('suklasta', ex).close, true);       // one letter missing
  assert.equal(K.check('suklaata', ex).correct, false);    // partitive: a known wrong form
  const ill = K.exercises('verbs').find((e) => e.shown === 'uusi kollega');
  assert.equal(K.check('uuteen kollegaan', ill).correct, true);
  assert.equal(K.check('uutta kollegaa', ill).correct, false);
  const who = K.exercises('person').find((e) => e.context === '___ pelottaa.');
  assert.equal(K.check('minua', who).correct, true);       // capital letters don't matter
});

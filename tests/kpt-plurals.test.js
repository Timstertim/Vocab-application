const test = require('node:test');
const assert = require('node:assert');
const K = require('../js/kpt.js');
const P = require('../js/plurals.js');

test('KPT: every item has a gap, a rule and distinct options', () => {
  for (const it of K.ITEMS) {
    const [set, sentence, base, answer, wrong, note, en] = it;
    assert.ok(K.SETS[set], set);
    assert.equal(sentence.split('___').length, 2, sentence);
    assert.ok(base && answer && note && en && wrong.length >= 2, sentence);
    const all = [answer].concat(wrong).map((x) => x.toLowerCase());
    assert.equal(new Set(all).size, all.length, 'duplicate option: ' + sentence);
  }
  for (const set of Object.keys(K.SETS)) assert.ok(K.exercises(set).length >= 15, set);
  assert.ok(K.RULES.includes('kiuasta') && K.RULES.includes('mansikoita'));
});

test('KPT: a round has exactly one right option, and the wrong grade is never accepted', () => {
  for (const set of Object.keys(K.SETS).concat('mixed')) {
    for (const ex of K.round(set, 10)) assert.equal(ex.options.filter((o) => K.check(o, ex).correct).length, 1, ex.context);
  }
  const ex = K.exercises('nouns').find((e) => e.answer === 'kaupassa');
  assert.equal(K.check('kaupassa', ex).correct, true);
  assert.equal(K.check('kauppassa', ex).correct, false);
  const inv = K.exercises('inverse').find((e) => e.answer === 'kiuasta');
  assert.equal(K.check('kiukasta', inv).correct, false);
});

test('Plurals: the forms of a word', () => {
  const kauppa = P.formsOf(P.WORDS.find((w) => w[0] === 'kauppa'));
  assert.deepEqual([kauppa.nom, kauppa.par, kauppa.gen, kauppa.ine, kauppa.ill, kauppa.ade, kauppa.ess, kauppa.tra],
    ['kaupat', 'kauppoja', 'kauppojen', 'kaupoissa', 'kauppoihin', 'kaupoilla', 'kauppoina', 'kaupoiksi']);
  const joki = P.formsOf(P.WORDS.find((w) => w[0] === 'joki'));
  assert.deepEqual([joki.nom, joki.ine, joki.ess], ['joet', 'joissa', 'jokina']);
  const pöytä = P.formsOf(P.WORDS.find((w) => w[0] === 'pöytä'));
  assert.deepEqual([pöytä.ine, pöytä.abl], ['pöydissä', 'pöydiltä']);
});

test('Plurals: rounds have one right option; alternatives are accepted when typed', () => {
  for (const set of Object.keys(P.SETS).filter((k) => !P.SETS[k].typeOnly).concat('mixed')) {
    const r = P.round(set, 10);
    assert.equal(r.length, 10);
    for (const ex of r) {
      assert.ok(ex.options.length >= 3, ex.shown);
      assert.equal(ex.options.filter((o) => P.check(o, ex).correct).length, 1, ex.shown + ' ' + ex.form);
    }
  }
  const lapsi = P.exercise(P.WORDS.find((w) => w[0] === 'lapsi'), 'gen', Math.random);
  assert.equal(lapsi.answer, 'lasten');
  assert.equal(P.check('lapsien', lapsi).correct, true);
  assert.equal(P.check('lapsia', lapsi).correct, false);
});

test('Plurals: fill the gap is written, with the form decided by the sentence', () => {
  assert.equal(P.SETS.gap.typeOnly, true);
  const all = P.gapExercises();
  assert.ok(all.length >= 60);
  for (const ex of all) {
    assert.equal(ex.context.split('___').length, 2, ex.context);
    assert.match(ex.shown, /\(plural\)$/);
    assert.ok(ex.note && ex.en, ex.context);
    assert.equal(P.check(ex.answer, ex).correct, true, ex.answer);
    assert.equal(P.check(ex.shown.replace(' (plural)', ''), ex).correct, false, 'the basic form is not the answer: ' + ex.context);
  }
  const puu = all.find((e) => e.answer === 'puiden');
  assert.equal(P.check('puitten', puu).correct, true);
  assert.equal(P.round('gap', 10).length, 10);
});

test('Plurals and KPT: no typo is forgiven, so a wrong form never passes as "almost"', () => {
  const ys = P.gapExercises().find((e) => e.answer === 'ystäviä');
  assert.equal(P.check('ystävä', ys).correct, false);
  const kauppa = P.exercise(P.WORDS.find((w) => w[0] === 'kauppa'), 'ine', Math.random);
  assert.equal(P.check('kauppoissa', kauppa).correct, false);
  assert.equal(P.check('Kaupoissa ', kauppa).correct, true);   // case and spaces don't matter
  const k = K.exercises('nouns').find((e) => e.answer === 'kaupassa');
  assert.equal(K.check('kaupasa', k).correct, false);
});

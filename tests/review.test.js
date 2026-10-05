const test = require('node:test');
const assert = require('node:assert');
const R = require('../js/review.js');

test('review: dates', () => {
  assert.equal(R.addDays('2026-12-31', 1), '2027-01-01');
  assert.equal(R.addDays('2026-03-01', -1), '2026-02-28');
  assert.equal(R.daysBetween('2026-10-05', '2026-10-12'), 7);
  assert.equal(R.today(new Date(2026, 0, 9)), '2026-01-09');
});

test('review: a right answer moves the word further out, a wrong one back to tomorrow', () => {
  const day = '2026-10-05';
  let s = R.schedule(undefined, true, day);
  assert.deepEqual(s, { box: 1, due: '2026-10-06', last: day });
  s = R.schedule(s, true, '2026-10-06');
  assert.equal(s.box, 2); assert.equal(s.due, '2026-10-08');
  for (let k = 0; k < 10; k++) s = R.schedule(s, true, day);
  assert.equal(s.box, R.MAX_BOX); assert.equal(s.due, R.addDays(day, 60));
  s = R.schedule(s, false, day);
  assert.deepEqual(s, { box: 0, due: '2026-10-06', last: day });
});

test('review: questions get harder as a word is learnt', () => {
  assert.equal(R.questionType(undefined), 'choose-fi');
  assert.equal(R.questionType({ box: 2 }), 'choose-en');
  assert.equal(R.questionType({ box: 4 }), 'type');
});

test('review: due words first (most overdue), then new words by level', () => {
  const day = '2026-10-05';
  const w = (id, srs, level) => ({ id, finnish: id, english: id, srs, level });
  const words = [
    w('later', { box: 3, due: '2026-10-09' }), w('due1', { box: 2, due: '2026-10-05' }),
    w('overdue', { box: 1, due: '2026-10-01' }), w('newB1', undefined, 'B1.1'), w('newA1', undefined, 'A1.1'),
  ];
  const rank = (x) => ['A1.1', 'B1.1'].indexOf(x.level);
  const p = R.pickDaily(words, { size: 3, day, levelRank: rank });
  assert.deepEqual(p.words.map((x) => x.id), ['overdue', 'due1', 'newA1']);
  assert.equal(p.due, 2); assert.equal(p.fresh, 2);
  assert.deepEqual(R.pickDaily(words, { size: 1, day }).words.map((x) => x.id), ['overdue']);
  assert.deepEqual(R.pickDaily(words, { size: 5, day, filter: (x) => x.id !== 'overdue' }).words.length, 3);
});

test('review: the streak counts days in a row', () => {
  let d = R.finishDay(undefined, '2026-10-05');
  assert.deepEqual(d, { last: '2026-10-05', streak: 1, best: 1 });
  assert.equal(R.finishDay(d, '2026-10-05'), d);                 // twice in a day counts once
  d = R.finishDay(d, '2026-10-06');
  assert.equal(d.streak, 2);
  assert.equal(R.currentStreak(d, '2026-10-07'), 2);              // still alive until today is over
  assert.equal(R.currentStreak(d, '2026-10-08'), 0);              // a missed day breaks it
  d = R.finishDay(d, '2026-10-09');
  assert.deepEqual(d, { last: '2026-10-09', streak: 1, best: 2 });
});

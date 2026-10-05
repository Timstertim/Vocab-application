/*
 * Daily review: a simple spaced-repetition schedule.
 * Each word has srs = { box, due, last }. A right answer moves it up a box and further out
 * (1, 2, 4, 7, 14, 30, 60 days); a wrong one sends it back to box 0, due tomorrow.
 * Dates are local calendar days as 'YYYY-MM-DD'. Pure functions, shared by the app and the tests.
 */
(function (root, factory) {
  const review = factory();
  if (typeof module === 'object' && module.exports) module.exports = review;
  else root.VocabReview = review;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const INTERVALS = [1, 2, 4, 7, 14, 30, 60];
  const MAX_BOX = INTERVALS.length;

  const pad = (n) => String(n).padStart(2, '0');
  /** Today's local date, 'YYYY-MM-DD'. */
  function today(d) {
    d = d || new Date();
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }
  function addDays(day, n) {
    const [y, m, d] = day.split('-').map(Number);
    return today(new Date(y, m - 1, d + n));
  }
  /** Whole days from a to b (b later = positive). */
  function daysBetween(a, b) {
    const t = (s) => { const [y, m, d] = s.split('-').map(Number); return Date.UTC(y, m - 1, d); };
    return Math.round((t(b) - t(a)) / 86400000);
  }

  const isDue = (w, day) => !!(w.srs && w.srs.due && w.srs.due <= day);
  const isNew = (w) => !w.srs;

  /** The srs after an answer. */
  function schedule(srs, correct, day) {
    if (!correct) return { box: 0, due: addDays(day, 1), last: day };
    const box = Math.min((srs ? srs.box : 0) + 1, MAX_BOX);
    return { box, due: addDays(day, INTERVALS[box - 1]), last: day };
  }

  /** How a word is asked: recognise it first, then recall it, then write it. */
  function questionType(srs) {
    const box = srs ? srs.box : 0;
    return box <= 1 ? 'choose-fi' : box <= 3 ? 'choose-en' : 'type';
  }

  /**
   * Today's words: the due ones first (most overdue, then the least learnt), then new words to fill up
   * (lower levels first). opts: { size, day, filter(w) }.
   */
  function pickDaily(words, opts) {
    const size = opts.size || 10, day = opts.day || today();
    const pool = words.filter((w) => w.finnish && w.english && (!opts.filter || opts.filter(w)));
    const due = pool.filter((w) => isDue(w, day))
      .sort((a, b) => (a.srs.due < b.srs.due ? -1 : a.srs.due > b.srs.due ? 1 : a.srs.box - b.srs.box));
    const levelRank = opts.levelRank || (() => 0);
    const fresh = pool.filter(isNew).map((w, i) => ({ w, i }))
      .sort((a, b) => levelRank(a.w) - levelRank(b.w) || a.i - b.i).map((x) => x.w);
    const picked = due.slice(0, size);
    const newCount = Math.max(0, size - picked.length);
    return { words: picked.concat(fresh.slice(0, newCount)), due: due.length, fresh: fresh.length };
  }

  /** The streak after finishing today's review. daily = { last, streak, best }. */
  function finishDay(daily, day) {
    daily = daily || {};
    if (daily.last === day) return daily;
    const streak = daily.last && daysBetween(daily.last, day) === 1 ? (daily.streak || 0) + 1 : 1;
    return { last: day, streak, best: Math.max(daily.best || 0, streak) };
  }
  /** The streak to show today: it's lost if yesterday was missed. */
  function currentStreak(daily, day) {
    if (!daily || !daily.last) return 0;
    const gap = daysBetween(daily.last, day);
    return gap <= 1 ? daily.streak || 0 : 0;
  }

  return { INTERVALS, MAX_BOX, today, addDays, daysBetween, isDue, isNew, schedule, questionType, pickDaily, finishDay, currentStreak };
});

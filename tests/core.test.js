const test = require('node:test');
const assert = require('node:assert/strict');
const Core = require('../js/core.js');

test('checkAnswer accepts any listed alternative, ignoring case and punctuation', () => {
  assert.equal(Core.checkAnswer('Hello!', 'hi, hello').correct, true);
  assert.equal(Core.checkAnswer('hi', 'hi; hello / hey').correct, true);
  assert.equal(Core.checkAnswer('bye', 'hi, hello').correct, false);
});

test('checkAnswer treats "to" as optional for English verbs', () => {
  assert.equal(Core.checkAnswer('speak', 'to speak, to talk').correct, true);
  assert.equal(Core.checkAnswer('to talk', 'to speak, to talk').correct, true);
});

test('missing dots are "close", not correct, unless lenient', () => {
  const strict = Core.checkAnswer('paiva', 'päivä');
  assert.equal(strict.correct, false);
  assert.equal(strict.close, true);
  assert.equal(Core.checkAnswer('paiva', 'päivä', { lenient: true }).correct, true);
});

test('small typos on longer words are flagged as close', () => {
  assert.equal(Core.checkAnswer('kymenen', 'kymmenen').close, true);
  assert.equal(Core.checkAnswer('talo', 'tali').close, false); // too short for typo tolerance
  assert.equal(Core.checkAnswer('', 'talo').close, false);
});

test('parenthetical notes are ignored', () => {
  assert.equal(Core.checkAnswer('thanks', 'thanks (informal)').correct, true);
});

test('filterWords searches across fields without diacritics and filters by category', () => {
  const words = [
    { id: '1', finnish: 'päivä', english: 'day', categoryIds: ['a'], examples: [] },
    { id: '2', finnish: 'yö', english: 'night', categoryIds: ['b'], examples: [{ fi: 'Hyvää yötä', en: 'Good night' }] },
  ];
  assert.deepEqual(Core.filterWords(words, { query: 'paiva' }).map((w) => w.id), ['1']);
  assert.deepEqual(Core.filterWords(words, { query: 'good night' }).map((w) => w.id), ['2']);
  assert.deepEqual(Core.filterWords(words, { categoryId: 'b' }).map((w) => w.id), ['2']);
  assert.deepEqual(Core.filterWords(words, { categoryIds: ['a', 'b'] }).length, 2);
  assert.deepEqual(Core.filterWords(words, { categoryIds: [] }).length, 2);
});

test('sortWords uses Finnish alphabetical order (ä and ö after z)', () => {
  const words = ['ötökkä', 'äiti', 'auto', 'zeppeliini'].map((f, i) => ({ id: String(i), finnish: f }));
  assert.deepEqual(Core.sortWords(words, 'finnish').map((w) => w.finnish), ['auto', 'zeppeliini', 'äiti', 'ötökkä']);
});

test('choicesFor returns the answer plus distinct distractors', () => {
  const pool = ['yksi', 'kaksi', 'kolme', 'neljä', 'viisi'].map((f, i) => ({ id: String(i), finnish: f, english: 'n' + i }));
  const card = Core.makeCard(pool[0], 'en-fi');
  const choices = Core.choicesFor(card, pool, 4);
  assert.equal(choices.length, 4);
  assert.ok(choices.includes('yksi'));
  assert.equal(new Set(choices).size, 4);
});

test('pickRound limits the count and never repeats words', () => {
  const words = Array.from({ length: 20 }, (_, i) => ({ id: String(i), finnish: 'w' + i, english: 'e' + i }));
  const round = Core.pickRound(words, 8);
  assert.equal(round.length, 8);
  assert.equal(new Set(round.map((w) => w.id)).size, 8);
  assert.equal(Core.pickRound(words, 0).length, 20);
});

test('parseWiktionary extracts Finnish definitions and examples, stripping HTML', () => {
  const json = {
    en: [{ partOfSpeech: 'Noun', definitions: [{ definition: 'not this one' }] }],
    fi: [{
      partOfSpeech: 'Noun',
      language: 'Finnish',
      definitions: [
        { definition: '<a href="/wiki/house">house</a>; building', parsedExamples: [{ example: 'Iso <b>talo</b>.', translation: 'A big house.' }] },
        { definition: '', examples: [] },
        { definition: 'household', examples: ['<i>talon</i> väki'] },
      ],
    }],
  };
  const entries = Core.parseWiktionary(json);
  assert.equal(entries.length, 1);
  assert.equal(entries[0].definitions.length, 2);
  assert.equal(entries[0].definitions[0].text, 'house; building');
  assert.deepEqual(entries[0].definitions[0].examples, [{ fi: 'Iso talo.', en: 'A big house.' }]);
  assert.deepEqual(entries[0].definitions[1].examples, [{ fi: 'talon väki', en: '' }]);

  const s = Core.suggestionFromEntries(entries);
  assert.equal(s.english, 'house');
  assert.equal(s.partOfSpeech, 'noun');
  assert.equal(s.examples.length, 2);
  assert.equal(Core.suggestionFromEntries([]), null);
  assert.deepEqual(Core.parseWiktionary({}), []);
});

test('mergeImport adds new words, updates duplicates and maps categories by name', () => {
  const state = {
    words: [{ id: 'x', finnish: 'talo', english: 'house', categoryIds: ['home'], stats: { correct: 3, wrong: 1 } }],
    categories: [{ id: 'home', name: 'Home', color: '#000' }],
    games: [],
  };
  const data = {
    categories: [{ id: 'c1', name: 'home' }, { id: 'c2', name: 'Food' }],
    words: [
      { finnish: 'Talo', english: 'house, building', categoryIds: ['c1'] },
      { finnish: 'leipä', english: 'bread', categoryIds: ['c2'] },
      { english: 'missing finnish' },
    ],
  };
  const res = Core.mergeImport(state, data);
  assert.equal(res.added, 1);
  assert.equal(res.updated, 1);
  assert.equal(res.state.categories.length, 2);
  const talo = res.state.words.find((w) => w.id === 'x');
  assert.equal(talo.english, 'house, building');
  assert.deepEqual(talo.stats, { correct: 3, wrong: 1 });
  const food = res.state.categories.find((c) => c.name === 'Food');
  assert.deepEqual(res.state.words.find((w) => w.finnish === 'leipä').categoryIds, [food.id]);
  assert.throws(() => Core.mergeImport(state, { nope: 1 }));
});

const TOPICS = require('../js/topics.js');
const CATS = [
  { id: 'g', name: 'Greetings' }, { id: 'f', name: 'Food & drink' }, { id: 'v', name: 'Verbs' },
  { id: 'col', name: 'Colours' }, { id: 's', name: 'Sauna' },
];
const suggest = (w, opts) => Core.suggestCategories(w, CATS, TOPICS, opts);

test('suggestCategories picks a matching existing category', () => {
  const s = suggest({ english: 'yellow', partOfSpeech: 'adjective' });
  assert.equal(s[0].kind, 'existing');
  assert.equal(s[0].id, 'col');
});

test('suggestCategories proposes a new category when no existing one fits', () => {
  const s = suggest({ english: 'dog', definition: 'A domesticated mammal kept as a pet.' });
  assert.deepEqual(s.map((x) => [x.kind, x.name]), [['new', 'Animals']]);
});

test('suggestCategories recognises verbs from "to ..." and maps category names by alias', () => {
  const s = suggest({ english: 'to eat' });
  assert.deepEqual(s.map((x) => x.id).sort(), ['f', 'v']);
  const other = Core.suggestCategories({ english: 'rain' }, [{ id: 'w', name: 'weather' }], TOPICS);
  assert.deepEqual(other.map((x) => x.id), ['w']);
});

test('suggestCategories matches a user category named after the word and skips ticked ones', () => {
  assert.ok(suggest({ english: 'sauna' }).some((x) => x.id === 's'));
  assert.ok(!suggest({ english: 'yellow' }, { selectedIds: ['col'] }).some((x) => x.id === 'col'));
});

test('suggestCategories stays quiet without a clear signal', () => {
  assert.deepEqual(suggest({ english: '' }), []);
  assert.deepEqual(suggest({ english: 'something odd' }), []);
  // "water" only in the definition should not outrank a clear weather match
  assert.deepEqual(suggest({ english: 'rain', definition: 'Water falling from clouds.' }).map((x) => x.name), ['Weather']);
});

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

test('mergeImport with onlyNew keeps existing words untouched and skips unused categories', () => {
  const state = {
    words: [{ id: 'x', finnish: 'iloinen', english: 'my own meaning', categoryIds: [] }],
    categories: [], games: [],
  };
  const data = {
    categories: [{ id: 'f', name: 'Feelings' }, { id: 'u', name: 'Unused' }],
    words: [
      { finnish: 'iloinen', english: 'happy', categoryIds: ['f'] },
      { finnish: 'surullinen', english: 'sad', categoryIds: ['f'] },
    ],
  };
  const res = Core.mergeImport(state, data, { onlyNew: true });
  assert.equal(res.added, 1);
  assert.equal(res.skipped, 1);
  assert.equal(res.state.words.find((w) => w.id === 'x').english, 'my own meaning');
  assert.deepEqual(res.state.categories.map((c) => c.name), ['Feelings']);
});

test('starter pack: unique words, valid categories, and newerThan() returns only later words', () => {
  global.self = global;
  require('../js/starter.js');
  const S = global.VocabStarter;
  const names = S.words.map((w) => w.finnish);
  assert.equal(new Set(names).size, names.length);
  const catIds = new Set(S.categories.map((c) => c.id));
  for (const w of S.words) {
    assert.ok(w.english && w.examples.length, w.finnish);
    for (const c of w.categoryIds) assert.ok(catIds.has(c), w.finnish + ' → ' + c);
  }
  const v2 = S.newerThan(1);
  assert.ok(v2.words.length > 0 && v2.words.every((w) => w.since > 1));
  assert.ok(S.newerThan(2).words.filter((w) => w.since === 3).every((w) => w.categoryIds.includes('cat-daycare')));
  assert.ok(S.newerThan(3).words.length > 0 && S.newerThan(3).words.every((w) => w.since >= 4));
  // Every role-play scenario has a word category.
  const SC = require('../js/scenarios.js');
  for (const sc of SC) assert.ok(S.categories.some((c) => c.name === sc.category), sc.category);
  // Every starter example must work in Fill the gap.
  for (const w of S.words) for (const ex of w.examples) assert.ok(Core.findWordInSentence(ex.fi, w.finnish), w.finnish + ': ' + ex.fi);
  assert.deepEqual(S.newerThan(S.VERSION).words, []);
});

test('suggestCategories knows shapes', () => {
  const s = Core.suggestCategories({ english: 'triangle' }, [{ id: 'sh', name: 'Shapes' }], TOPICS);
  assert.deepEqual(s.map((x) => x.id), ['sh']);
});

test('findWordInSentence locates inflected forms, compounds and phrases', () => {
  const f = (s, w) => { const h = Core.findWordInSentence(s, w); return h && h.form; };
  assert.equal(f('Ostin uuden takin.', 'ostaa'), 'Ostin');
  assert.equal(f('Tavataan huomenna kahvilassa.', 'tavata'), 'Tavataan');
  assert.equal(f('Piirsin sydämen korttiin.', 'sydän'), 'sydämen');
  assert.equal(f('Minulla on lentopelko.', 'pelko'), 'pelko');
  assert.equal(f('Saisinko lasin vettä?', 'vesi'), 'vettä');
  assert.equal(f('Ole hyvä, tässä on kahvisi.', 'ole hyvä'), 'Ole hyvä');
  assert.equal(f('Kiitos avusta.', 'talo'), null);
  // Two equally loose candidates: refuse rather than guess.
  assert.equal(f('Sanoin sinulle sen.', 'satu'), null);
});

test('sentenceFor splits the sentence around the word', () => {
  const s = Core.sentenceFor({ finnish: 'ostaa', examples: [{ fi: 'Ostin uuden takin.', en: 'I bought a new coat.' }] });
  assert.deepEqual([s.before, s.form, s.after, s.en], ['', 'Ostin', ' uuden takin.', 'I bought a new coat.']);
  assert.equal(Core.sentenceFor({ finnish: 'talo', examples: [{ fi: 'Kiitos.' }] }), null);
  assert.equal(Core.sentenceFor({ finnish: 'talo', examples: [] }), null);
  // A phrase that is almost the whole sentence leaves nothing to go on.
  assert.equal(Core.sentenceFor({ finnish: 'onko hänellä kaikki hyvin', examples: [{ fi: 'Onko hänellä kaikki hyvin kotona?' }] }), null);
  assert.ok(Core.sentenceFor({ finnish: 'ole hyvä', examples: [{ fi: 'Ole hyvä, tässä on kahvisi.' }] }));
});

test('gapChoices gives six distinct options, preferring the same part of speech', () => {
  const pool = [
    ...['ostaa', 'myydä', 'tulla', 'mennä', 'syödä', 'juoda'].map((f, i) => ({ id: 'v' + i, finnish: f, partOfSpeech: 'verb' })),
    ...['talo', 'kissa', 'koira'].map((f, i) => ({ id: 'n' + i, finnish: f, partOfSpeech: 'noun' })),
  ];
  const choices = Core.gapChoices(pool[0], pool, 6);
  assert.equal(choices.length, 6);
  assert.equal(new Set(choices).size, 6);
  assert.ok(choices.includes('ostaa'));
  assert.ok(choices.every((c) => !['talo', 'kissa', 'koira'].includes(c)));
  assert.equal(Core.gapChoices(pool[0], pool.slice(0, 3), 6).length, 3);
});

test('gap: words marked as also fitting count as correct, and synonyms are not offered', () => {
  const word = { id: 't', finnish: 'toppahaalari', english: 'snowsuit', examples: [{ fi: 'Talvella lapsella pitää olla toppahaalari.' }] };
  let s = Core.sentenceFor(word);
  assert.equal(Core.isGapAnswer('pipo', word, s), false);
  const marked = Core.setAlsoFits(word, word.examples[0].fi, 'pipo', true);
  s = Core.sentenceFor(marked);
  assert.equal(Core.isGapAnswer('pipo', marked, s), true);
  assert.equal(Core.isGapAnswer('toppahaalari', marked, s), true);
  assert.equal(Core.isGapAnswer('lelu', marked, s), false);
  assert.equal(word.examples[0].alsoFits, undefined, 'original is not mutated');
  const twice = Core.setAlsoFits(marked, word.examples[0].fi, 'pipo', true);
  assert.deepEqual(twice.examples[0].alsoFits, ['pipo']);
  assert.equal(Core.setAlsoFits(marked, word.examples[0].fi, 'pipo', false).examples[0].alsoFits, undefined);

  const happy = { id: 'a', finnish: 'iloinen', english: 'happy, glad', partOfSpeech: 'adjective' };
  const pool = [happy,
    { id: 'b', finnish: 'onnellinen', english: 'happy, content', partOfSpeech: 'adjective' },
    { id: 'c', finnish: 'surullinen', english: 'sad', partOfSpeech: 'adjective' },
    { id: 'd', finnish: 'puhua', english: 'to speak, to talk', partOfSpeech: 'verb' },
    { id: 'e', finnish: 'jutella', english: 'to chat, talk', partOfSpeech: 'verb' }];
  for (let k = 0; k < 20; k++) {
    assert.ok(!Core.gapChoices(happy, pool, 6).includes('onnellinen'));
    assert.ok(!Core.gapChoices(pool[3], pool, 6).includes('jutella'));
  }
});

test('role play: every scripted reply is accepted and no wrong reply is', () => {
  const SC = require('../js/scenarios.js');
  for (const sc of SC) for (const si of sc.situations) {
    assert.ok(si.goal && si.steps.length >= 3, si.title);
    for (const st of si.steps) {
      assert.ok(Core.checkReply(st.reply[0], st).correct, st.reply[0]);
      assert.ok(Core.checkOrder(Core.replyTiles(st.reply[0]), st), 'order ' + st.reply[0]);
      for (const a of st.accept || []) assert.ok(Core.checkReply(a, st).correct, 'accept ' + a);
      assert.ok(st.wrong.length >= 2, st.reply[0]);
      for (const w of st.wrong) {
        assert.equal(Core.checkReply(w[0], st).correct, false, 'wrong accepted: ' + w[0]);
        assert.ok(w[2], 'explanation for ' + w[0]);
      }
    }
  }
});

test('role play checks: typos are close, known mistakes are recognised, word order matters', () => {
  const step = { reply: ['Kortilla, kiitos.', 'By card'], accept: ['Maksan kortilla'], wrong: [['Kortti, kiitos.', '', 'why']] };
  assert.deepEqual(Core.checkReply('kortilla kiitos', step), { correct: true, close: false, wrongIndex: -1 });
  assert.equal(Core.checkReply('Kortila, kiitos', step).close, true);
  assert.equal(Core.checkReply('Kortti kiitos', step).wrongIndex, 0);
  assert.equal(Core.checkReply('', step).correct, false);
  assert.deepEqual(Core.replyTiles('Mittasimme juuri, se on 38,5 astetta.'), ['Mittasimme', 'juuri', 'se', 'on', '38,5', 'astetta']);
  assert.equal(Core.checkOrder(['Kortilla', 'kiitos'], step), true);
  assert.equal(Core.checkOrder(['kiitos', 'Kortilla'], step), false);
});

test('levels: every starter word has a valid level, and level filters work', () => {
  global.self = global;
  require('../js/levels.js');
  require('../js/starter.js');
  const S = global.VocabStarter;
  for (const w of S.words) assert.ok(Core.levelIndex(w.level) >= 0, w.finnish + ' has no level');
  const words = [{ id: 'a', finnish: 'a', level: 'A1.1' }, { id: 'b', finnish: 'b', level: 'A2.2' }, { id: 'c', finnish: 'c' }];
  const ids = (f) => Core.filterWords(words, f).map((w) => w.id).join('');
  assert.equal(ids({}), 'abc');
  assert.equal(ids({ levelMax: 'A1.3' }), 'a');
  assert.equal(ids({ levelMin: 'A2.1' }), 'b');
  assert.equal(ids({ levelMin: 'A1.1', levelMax: 'B1.1' }), 'ab');
  assert.equal(ids({ level: 'A2.2' }), 'b');
  assert.equal(ids({ level: 'none' }), 'c');
  // Imports keep valid levels and drop invalid ones.
  const res = Core.mergeImport({ words: [], categories: [], games: [] },
    { words: [{ finnish: 'x', english: 'x', level: 'A2.1' }, { finnish: 'y', english: 'y', level: 'Z9' }] });
  assert.deepEqual(res.state.words.map((w) => w.level), ['A2.1', '']);
  const SC = require('../js/scenarios.js');
  for (const sc of SC) assert.ok(Core.levelIndex(sc.level) >= 0, sc.id);
});

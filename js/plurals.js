/*
 * Plural forms: a word and a plural form to make (t-plural, partitive, genitive, inessive…), generated from a table.
 * Pure data and logic, shared by the app and the tests.
 */
(function (root, factory) {
  const plurals = factory(root.VocabCases || (typeof require === 'function' ? require('./cases.js') : null));
  if (typeof module === 'object' && module.exports) module.exports = plurals;
  else root.VocabPlurals = plurals;
})(typeof self !== 'undefined' ? self : this, function (Cases) {
  'use strict';

  // The plural forms, with the question to ask and a short rule.
  const FORMS = {
    nom: { name: 't-plural (nominative)', q: 'Plural: many of them (t-monikko)', rule: 'The t-plural: -t on the weak stem. kauppa → kaupat.' },
    par: { name: 'Plural partitive', q: 'Plural partitive (some, many: -a, -ta, -ja)', rule: 'Plural partitive: -ia / -ita / -ja, usually on the strong stem. kauppa → kauppoja.' },
    gen: { name: 'Plural genitive', q: 'Plural genitive (whose: -en, -den, -jen, -ten)', rule: 'Plural genitive: -en / -den / -jen / -ten, usually on the strong stem. kauppa → kauppojen.' },
    ine: { name: 'Plural inessive', q: 'Plural inessive (in: -issa)', rule: 'Plural -issa / -issä on the weak stem. kauppa → kaupoissa.' },
    ela: { name: 'Plural elative', q: 'Plural elative (from, about: -ista)', rule: 'Plural -ista / -istä on the weak stem. kauppa → kaupoista.' },
    ill: { name: 'Plural illative', q: 'Plural illative (into: -ihin, -isiin)', rule: 'Plural illative -ihin / -isiin on the strong stem. kauppa → kauppoihin.' },
    ade: { name: 'Plural adessive', q: 'Plural adessive (on, at, have: -illa)', rule: 'Plural -illa / -illä on the weak stem. kauppa → kaupoilla.' },
    abl: { name: 'Plural ablative', q: 'Plural ablative (from someone: -ilta)', rule: 'Plural -ilta / -iltä on the weak stem. kauppa → kaupoilta.' },
    all: { name: 'Plural allative', q: 'Plural allative (to someone: -ille)', rule: 'Plural -ille on the weak stem. kauppa → kaupoille.' },
    ess: { name: 'Plural essive', q: 'Plural essive (as: -ina)', rule: 'Plural essive -ina / -inä on the strong stem. kauppa → kauppoina.' },
    tra: { name: 'Plural translative', q: 'Plural translative (into, becoming: -iksi)', rule: 'Plural -iksi on the weak stem. kauppa → kaupoiksi.' },
  };

  const SETS = {
    basic: { name: 't-plural, partitive & genitive', icon: '🅰️', blurb: 'kaupat · kauppoja · kauppojen · lapset · lapsia · lasten', forms: ['nom', 'par', 'gen'] },
    inner: { name: 'In, from, into: -issa, -ista, -ihin', icon: '🏠', blurb: 'kaupoissa · kaupoista · kauppoihin', forms: ['ine', 'ela', 'ill'] },
    outer: { name: 'On, from, to: -illa, -ilta, -ille', icon: '🛋️', blurb: 'pöydillä · ystäviltä · lapsille', forms: ['ade', 'abl', 'all'] },
    other: { name: 'As & becoming: -ina, -iksi', icon: '🔁', blurb: 'lapsina · kauppoina · kaupoiksi', forms: ['ess', 'tra'] },
    gap: { name: 'Fill the gap (write it)', icon: '✍️', blurb: 'A sentence and a word: work out the plural form yourself and write it', typeOnly: true },
  };

  // Fill the gap: [sentence with ___, word, answer, [other accepted answers], which form and why, English].
  // The form is not named in the question; the sentence decides it. More come from Which case? (its plural set).
  const GAP = [
    ['Lapset pukeutuivat ___.', 'noita', 'noidiksi', [], 'Plural translative -iksi (dressed up as, becoming). Weak grade: noita → noidiksi.', 'The children dressed up as witches.'],
    ['Leikkaa omena ___.', 'pala', 'paloiksi', [], 'Plural translative -iksi: into pieces.', 'Cut the apple into pieces.'],
    ['He tulivat hyviksi ___.', 'ystävä', 'ystäviksi', [], 'Plural translative -iksi: became friends. The adjective agrees: hyviksi ystäviksi.', 'They became good friends.'],
    ['He työskentelevät ___.', 'opettaja', 'opettajina', [], 'Plural essive -ina (as): työskennellä opettajana / opettajina.', 'They work as teachers.'],
    ['Pidämme heitä ___.', 'ystävä', 'ystävinä', [], 'Plural essive -inä (regard as).', 'We regard them as friends.'],
    ['Sain kukkia ___.', 'oppilas', 'oppilailta', [], 'Plural ablative -ilta (from people). oppilas → oppilai-.', 'I got flowers from the pupils.'],
    ['Kysyin neuvoa ___.', 'naapuri', 'naapureilta', [], 'kysyä + -lta: plural ablative. naapuri → naapurei-.', 'I asked the neighbours for advice.'],
    ['Lähetin kutsut ___.', 'ystävä', 'ystäville', [], 'Plural allative -ille (to people).', 'I sent the invitations to friends.'],
    ['Opettaja antoi tehtävän ___.', 'oppilas', 'oppilaille', [], 'antaa + -lle: plural allative.', 'The teacher gave the pupils a task.'],
    ['Kissat istuvat ___.', 'tuoli', 'tuoleilla', [], 'Plural adessive -illa (on). tuoli → tuolei-.', 'The cats are sitting on the chairs.'],
    ['___ on paljon läksyjä.', 'opiskelija', 'Opiskelijoilla', [], 'Who has: plural adessive -illa.', 'The students have lots of homework.'],
    ['Pidän ___.', 'kukka', 'kukista', [], 'pitää + -sta: plural elative. Weak grade: kukka → kukista.', 'I like flowers.'],
    ['Puhuimme ___.', 'harrastus', 'harrastuksista', [], 'puhua + -sta: plural elative. -us → -uksi-.', 'We talked about hobbies.'],
    ['Ota kirjat pois ___.', 'laatikko', 'laatikoista', [], 'Out of: plural elative -ista. Weak: laatikko → laatikoista.', 'Take the books out of the boxes.'],
    ['Lapset leikkivät ___.', 'puisto', 'puistoissa', [], 'In: plural inessive -issa.', 'The children play in the parks.'],
    ['___ on paljon kalaa.', 'järvi', 'Järvissä', [], 'In: plural inessive -issä.', 'There\'s lots of fish in the lakes.'],
    ['Avaimet ovat ___.', 'tasku', 'taskuissa', [], 'In: plural inessive -issa.', 'The keys are in the pockets.'],
    ['Laita kengät ___.', 'hylly', 'hyllyihin', [], 'Into, onto (a shelf): plural illative -ihin.', 'Put the shoes on the shelves.'],
    ['Vastasin kaikkiin ___.', 'viesti', 'viesteihin', [], 'vastata + illative: plural -ihin. viesti → viestei-.', 'I answered all the messages.'],
    ['Kesällä menemme moniin ___.', 'juhla', 'juhliin', [], 'Into: plural illative -iin. The adjective agrees: moniin juhliin.', 'In summer we go to lots of parties.'],
    ['Muutimme uusiin ___.', 'huone', 'huoneisiin', [], 'Into: plural illative -isiin (after -e words).', 'We moved into new rooms.'],
    ['___ odottavat bussia.', 'ihminen', 'Ihmiset', [], 'The subject (all of them): t-plural. ihminen → ihmiset.', 'The people are waiting for the bus.'],
    ['Ostin autoon uudet ___.', 'rengas', 'renkaat', [], 'A whole set as the object: t-plural. Inverse KPT: rengas → renkaat.', 'I bought new tyres for the car.'],
    ['Ostin ___ äidille.', 'kukka', 'kukkia', [], 'Some (no number): plural partitive. Strong grade: kukkia.', 'I bought flowers for Mum.'],
    ['Meillä ei ole ___.', 'lapsi', 'lapsia', [], 'Negative: plural partitive.', 'We don\'t have children.'],
    ['Hänellä on monia ___.', 'ystävä', 'ystäviä', [], 'monia + plural partitive.', 'They have many friends.'],
    ['Pöydällä on ___.', 'avain', 'avaimia', [], 'Some (no number): plural partitive. avain → avaimia.', 'There are keys on the table.'],
    ['___ huone on yläkerrassa.', 'tyttö', 'Tyttöjen', [], 'Whose: plural genitive -jen. Strong grade: tyttöjen.', 'The girls\' room is upstairs.'],
    ['___ hinnat nousivat.', 'asunto', 'Asuntojen', [], 'Whose: plural genitive -jen.', 'Housing prices went up.'],
    ['Talo on ___ keskellä.', 'puu', 'puiden', ['puitten'], 'keskellä + genitive: plural genitive -iden.', 'The house is in the middle of the trees.'],
    ['___ määrä kasvaa.', 'opiskelija', 'Opiskelijoiden', ['Opiskelijoitten'], 'Plural genitive -iden.', 'The number of students is growing.'],
    ['Lapset kävelivät ___ läpi.', 'metsä', 'metsien', [], 'läpi + genitive: plural genitive -ien.', 'The children walked through the forests.'],
    ['Kuuntelen ___ tarinoita.', 'vanhus', 'vanhusten', ['vanhuksien'], 'Whose: plural genitive. -us words: vanhusten (also vanhuksien).', 'I listen to the old people\'s stories.'],
  ];

  // [word, English, t-plural, weak plural stem, strong plural stem, partitive, genitive (and alternatives), illative, a/ä]
  // The weak stem makes -issa, -ista, -illa, -ilta, -ille, -iksi; the strong stem makes the essive -ina.
  const WORDS = [
    ['talo', 'house', 'talot', 'taloi', 'taloi', 'taloja', ['talojen'], 'taloihin', 'a'],
    ['kauppa', 'shop', 'kaupat', 'kaupoi', 'kauppoi', 'kauppoja', ['kauppojen'], 'kauppoihin', 'a'],
    ['katu', 'street', 'kadut', 'kadui', 'katui', 'katuja', ['katujen'], 'katuihin', 'a'],
    ['pöytä', 'table', 'pöydät', 'pöydi', 'pöyti', 'pöytiä', ['pöytien'], 'pöytiin', 'ä'],
    ['kenkä', 'shoe', 'kengät', 'kengi', 'kenki', 'kenkiä', ['kenkien'], 'kenkiin', 'ä'],
    ['lapsi', 'child', 'lapset', 'lapsi', 'lapsi', 'lapsia', ['lasten', 'lapsien'], 'lapsiin', 'a'],
    ['käsi', 'hand', 'kädet', 'käsi', 'käsi', 'käsiä', ['käsien'], 'käsiin', 'ä'],
    ['ihminen', 'person', 'ihmiset', 'ihmisi', 'ihmisi', 'ihmisiä', ['ihmisten', 'ihmisien'], 'ihmisiin', 'ä'],
    ['nainen', 'woman', 'naiset', 'naisi', 'naisi', 'naisia', ['naisten', 'naisien'], 'naisiin', 'a'],
    ['kirje', 'letter', 'kirjeet', 'kirjei', 'kirjei', 'kirjeitä', ['kirjeiden', 'kirjeitten'], 'kirjeisiin', 'ä'],
    ['huone', 'room', 'huoneet', 'huonei', 'huonei', 'huoneita', ['huoneiden', 'huoneitten'], 'huoneisiin', 'a'],
    ['rengas', 'tyre, ring', 'renkaat', 'renkai', 'renkai', 'renkaita', ['renkaiden', 'renkaitten'], 'renkaisiin', 'a'],
    ['hammas', 'tooth', 'hampaat', 'hampai', 'hampai', 'hampaita', ['hampaiden', 'hampaitten'], 'hampaisiin', 'a'],
    ['kysymys', 'question', 'kysymykset', 'kysymyksi', 'kysymyksi', 'kysymyksiä', ['kysymysten', 'kysymyksien'], 'kysymyksiin', 'ä'],
    ['kaunis', 'beautiful', 'kauniit', 'kaunii', 'kaunii', 'kauniita', ['kauniiden', 'kauniitten'], 'kauniisiin', 'a'],
    ['avain', 'key', 'avaimet', 'avaimi', 'avaimi', 'avaimia', ['avainten', 'avaimien'], 'avaimiin', 'a'],
    ['puhelin', 'phone', 'puhelimet', 'puhelimi', 'puhelimi', 'puhelimia', ['puhelimien', 'puhelinten'], 'puhelimiin', 'a'],
    ['kirja', 'book', 'kirjat', 'kirjoi', 'kirjoi', 'kirjoja', ['kirjojen'], 'kirjoihin', 'a'],
    ['koira', 'dog', 'koirat', 'koiri', 'koiri', 'koiria', ['koirien'], 'koiriin', 'a'],
    ['omena', 'apple', 'omenat', 'omenoi', 'omenoi', 'omenoita', ['omenoiden', 'omenien', 'omenoitten'], 'omenoihin', 'a'],
    ['tyttö', 'girl', 'tytöt', 'tytöi', 'tyttöi', 'tyttöjä', ['tyttöjen'], 'tyttöihin', 'ä'],
    ['joki', 'river', 'joet', 'joi', 'joki', 'jokia', ['jokien'], 'jokiin', 'a'],
    ['vesi', 'water', 'vedet', 'vesi', 'vesi', 'vesiä', ['vesien'], 'vesiin', 'ä'],
    ['kaappi', 'cupboard', 'kaapit', 'kaapei', 'kaappei', 'kaappeja', ['kaappien'], 'kaappeihin', 'a'],
    ['opiskelija', 'student', 'opiskelijat', 'opiskelijoi', 'opiskelijoi', 'opiskelijoita', ['opiskelijoiden', 'opiskelijoitten'], 'opiskelijoihin', 'a'],
    ['kukka', 'flower', 'kukat', 'kuki', 'kukki', 'kukkia', ['kukkien'], 'kukkiin', 'a'],
    ['lehti', 'leaf; newspaper', 'lehdet', 'lehdi', 'lehti', 'lehtiä', ['lehtien'], 'lehtiin', 'ä'],
    ['mansikka', 'strawberry', 'mansikat', 'mansikoi', 'mansikoi', 'mansikoita', ['mansikoiden', 'mansikoitten'], 'mansikoihin', 'a'],
    ['ystävä', 'friend', 'ystävät', 'ystävi', 'ystävi', 'ystäviä', ['ystävien'], 'ystäviin', 'ä'],
    ['opettaja', 'teacher', 'opettajat', 'opettaji', 'opettaji', 'opettajia', ['opettajien'], 'opettajiin', 'a'],
  ];

  /** All plural forms of a word: { nom, par, gen, ine, ela, ill, ade, abl, all, ess, tra }, and alternatives. */
  function formsOf(row) {
    const [, , nom, weak, strong, par, gen, ill, v] = row;
    const a = v;   // a or ä, for vowel harmony
    return {
      nom, par, gen: gen[0], ill,
      ine: weak + 'ss' + a, ela: weak + 'st' + a, ade: weak + 'll' + a, abl: weak + 'lt' + a,
      all: weak + 'lle', ess: strong + 'n' + a, tra: weak + 'ksi',
      alt: { gen: gen.slice(1) },
    };
  }

  const shuffle = (arr, rng) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  };

  /** One question: a word and a plural form; the wrong options are other plural forms of the same word. */
  function exercise(row, form, rng) {
    const f = formsOf(row);
    const answer = f[form];
    const others = shuffle(Object.keys(FORMS).filter((k) => k !== form).map((k) => f[k]), rng)
      .filter((x, i, arr) => x !== answer && arr.indexOf(x) === i && !(f.alt[form] || []).includes(x));
    return {
      kind: 'plural', shown: row[0] + ' (' + row[1] + ')', task: FORMS[form].q, context: '', answer, accept: f.alt[form] || [],
      wrong: others.slice(0, 3), note: FORMS[form].rule + ' ' + row[0] + ' → ' + answer + (f.alt[form] && f.alt[form].length ? ' (also: ' + f.alt[form].join(', ') + ')' : '') + '.',
      form, strict: true,
    };
  }

  /** The fill-the-gap questions: the ones above and the plural sentences of Which case?. */
  function gapExercises() {
    const fromCases = (Cases.ITEMS || []).filter((it) => it[0] === 'plurals')
      .map(([, sentence, base, answer, , note, en]) => [sentence, base, answer, [], note, en]);
    return GAP.concat(fromCases).map(([sentence, base, answer, accept, note, en]) => ({
      kind: 'plural-gap', shown: base + ' (plural)', task: 'Write the plural form that fits the sentence', context: sentence,
      answer, accept, wrong: [], note, en, options: [], strict: true,
    }));
  }

  function round(set, n, rng) {
    rng = rng || Math.random;
    if (set === 'gap') return shuffle(gapExercises(), rng).slice(0, n);
    const forms = set === 'mixed' ? Object.keys(FORMS) : SETS[set].forms;
    const pairs = shuffle(WORDS.flatMap((w) => forms.map((f) => [w, f])), rng).slice(0, n);
    return pairs.map(([w, f]) => {
      const ex = exercise(w, f, rng);
      return Object.assign(ex, { options: shuffle([ex.answer].concat(ex.wrong), rng) });
    });
  }

  return { FORMS, SETS, WORDS, GAP, formsOf, exercise, gapExercises, round, check: Cases.check };
});

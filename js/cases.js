/*
 * "Which case?": sentences with a gap, the word in its basic form, and the form the sentence needs.
 * The wrong options are real forms of the same word in other cases, so the choice is about the case.
 * Pure data and logic, shared by the app and the tests.
 */
(function (root, factory) {
  const cases = factory();
  if (typeof module === 'object' && module.exports) module.exports = cases;
  else root.VocabCases = cases;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const SETS = {
    verbs: { name: 'Verbs & their cases', icon: '🔗', blurb: 'Pidän suklaasta · Luotan sinuun · Kysy opettajalta' },
    person: { name: 'Minua, minulla, minun', icon: '🙋', blurb: 'Minua pelottaa · Minulla on kylmä · Minun täytyy lähteä' },
    amounts: { name: 'Numbers, amounts & "not"', icon: '🧮', blurb: 'kaksi kissaa · paljon vettä · Minulla ei ole autoa' },
  };

  // Rules shown after each answer.
  const R = {
    ela: '-sta / -stä (elative)',
    ill: 'illative (-an, -een, -seen…)',
    par: 'partitive (-a, -ta, -tta)',
    all: '-lle (allative)',
    abl: '-lta / -ltä (ablative)',
    tra: '-ksi (translative)',
  };

  // [set, sentence with ___, basic form, answer, [wrong forms], note, English]
  const ITEMS = [
    // Verbs that take -sta
    ['verbs', 'Pidän ___.', 'suklaa', 'suklaasta', ['suklaata', 'suklaaseen', 'suklaalle'], 'pitää + ' + R.ela + ': pidän jostakin.', 'I like chocolate.'],
    ['verbs', 'Tykkään ___.', 'musiikki', 'musiikista', ['musiikkia', 'musiikkiin', 'musiikille'], 'tykätä + ' + R.ela + ', like pitää.', 'I like music.'],
    ['verbs', 'Huolehdin ___.', 'lapsi', 'lapsesta', ['lasta', 'lapseen', 'lapselle'], 'huolehtia + ' + R.ela + ': huolehtia jostakin = to take care of.', 'I take care of the child.'],
    ['verbs', 'Kerro ___!', 'loma', 'lomasta', ['lomaa', 'lomaan', 'lomalle'], 'kertoa + ' + R.ela + ' = to tell about. kertoa + -lle = to tell someone.', 'Tell me about the holiday!'],
    ['verbs', 'Puhuimme ___.', 'sää', 'säästä', ['säätä', 'säähän', 'säälle'], 'puhua + ' + R.ela + ' = to talk about.', 'We talked about the weather.'],
    ['verbs', 'Nautin ___.', 'kesä', 'kesästä', ['kesää', 'kesään', 'kesälle'], 'nauttia + ' + R.ela + '.', 'I\'m enjoying the summer.'],
    ['verbs', 'Naapuri valittaa ___.', 'melu', 'melusta', ['melua', 'meluun', 'melulle'], 'valittaa + ' + R.ela + ' = to complain about.', 'The neighbour is complaining about the noise.'],
    ['verbs', 'Unelmoin ___.', 'matka', 'matkasta', ['matkaa', 'matkaan', 'matkalle'], 'unelmoida + ' + R.ela + ' = to dream of.', 'I\'m dreaming of a trip.'],
    ['verbs', 'Kiinnostuin ___.', 'historia', 'historiasta', ['historiaa', 'historiaan', 'historialle'], 'kiinnostua + ' + R.ela + ' = to become interested in.', 'I became interested in history.'],
    // Verbs that take the illative
    ['verbs', 'Tutustuin ___.', 'uusi kollega', 'uuteen kollegaan', ['uutta kollegaa', 'uudesta kollegasta', 'uudelle kollegalle'], 'tutustua + ' + R.ill + '. The adjective follows: uuteen kollegaan.', 'I got to know a new colleague.'],
    ['verbs', 'Osallistun ___.', 'kokous', 'kokoukseen', ['kokousta', 'kokouksesta', 'kokoukselle'], 'osallistua + ' + R.ill + ' = to take part in.', 'I\'ll take part in the meeting.'],
    ['verbs', 'Luotan ___.', 'sinä', 'sinuun', ['sinua', 'sinusta', 'sinulle'], 'luottaa + ' + R.ill + ' = to trust.', 'I trust you.'],
    ['verbs', 'Totuin ___ nopeasti.', 'talvi', 'talveen', ['talvea', 'talvesta', 'talvelle'], 'tottua + ' + R.ill + ' = to get used to.', 'I got used to the winter quickly.'],
    ['verbs', 'Rakastuin ___.', 'hän', 'häneen', ['häntä', 'hänestä', 'hänelle'], 'rakastua + ' + R.ill + ' = to fall in love with. But: rakastaa + partitive.', 'I fell in love with them.'],
    ['verbs', 'Vastaa ___!', 'kysymys', 'kysymykseen', ['kysymystä', 'kysymyksestä', 'kysymykselle'], 'vastata + ' + R.ill + ' = to answer.', 'Answer the question!'],
    ['verbs', 'Keskity ___.', 'tehtävä', 'tehtävään', ['tehtävää', 'tehtävästä', 'tehtävälle'], 'keskittyä + ' + R.ill + ' = to concentrate on.', 'Concentrate on the task.'],
    ['verbs', 'Kyllästyin ___.', 'sade', 'sateeseen', ['sadetta', 'sateesta', 'sateelle'], 'kyllästyä + ' + R.ill + ' = to get fed up with.', 'I got fed up with the rain.'],
    ['verbs', 'Uskotko ___?', 'joulupukki', 'joulupukkiin', ['joulupukkia', 'joulupukista', 'joulupukille'], 'uskoa + ' + R.ill + ' = to believe in.', 'Do you believe in Father Christmas?'],
    ['verbs', 'Sää vaikuttaa ___.', 'mieliala', 'mielialaan', ['mielialaa', 'mielialasta', 'mielialalle'], 'vaikuttaa + ' + R.ill + ' = to affect.', 'The weather affects your mood.'],
    // Verbs that take the partitive
    ['verbs', 'Odotan ___.', 'bussi', 'bussia', ['bussin', 'bussiin', 'bussista'], 'odottaa + ' + R.par + ' = to wait for.', 'I\'m waiting for the bus.'],
    ['verbs', 'Rakastan ___.', 'sinä', 'sinua', ['sinut', 'sinuun', 'sinusta'], 'rakastaa + ' + R.par + '.', 'I love you.'],
    ['verbs', 'Autan ___.', 'äiti', 'äitiä', ['äidin', 'äidille', 'äidistä'], 'auttaa + ' + R.par + ' (the person you help).', 'I help Mum.'],
    ['verbs', 'Ajattelen ___.', 'perhe', 'perhettä', ['perheen', 'perheeseen', 'perheestä'], 'ajatella + ' + R.par + ' = to think about.', 'I\'m thinking about my family.'],
    ['verbs', 'Pelkään ___.', 'pimeä', 'pimeää', ['pimeän', 'pimeään', 'pimeästä'], 'pelätä + ' + R.par + ' = to be afraid of.', 'I\'m afraid of the dark.'],
    ['verbs', 'Kiitin ___.', 'opettaja', 'opettajaa', ['opettajan', 'opettajalle', 'opettajasta'], 'kiittää + ' + R.par + ' (the person). What for: -sta: kiitin häntä avusta.', 'I thanked the teacher.'],
    ['verbs', 'Etsin ___.', 'avain', 'avainta', ['avaimen', 'avaimeen', 'avaimesta'], 'etsiä + ' + R.par + ' = to look for.', 'I\'m looking for the key.'],
    ['verbs', 'Kuuntelen ___.', 'radio', 'radiota', ['radion', 'radioon', 'radiosta'], 'kuunnella + ' + R.par + '.', 'I\'m listening to the radio.'],
    // Verbs that take -lle
    ['verbs', 'Tämä kirja kuuluu ___.', 'minä', 'minulle', ['minua', 'minuun', 'minusta'], 'kuulua + ' + R.all + ' = to belong to.', 'This book belongs to me.'],
    ['verbs', 'Sopiiko ___ huomenna?', 'sinä', 'sinulle', ['sinua', 'sinuun', 'sinusta'], 'sopia + ' + R.all + ' = to suit someone.', 'Does tomorrow suit you?'],
    ['verbs', 'Soitan ___ illalla.', 'äiti', 'äidille', ['äitiä', 'äitiin', 'äidistä'], 'soittaa + ' + R.all + ' = to call someone.', 'I\'ll call Mum in the evening.'],
    ['verbs', 'Annoin kirjan ___.', 'Liisa', 'Liisalle', ['Liisaa', 'Liisaan', 'Liisalta'], 'antaa + ' + R.all + ' = to give to.', 'I gave the book to Liisa.'],
    ['verbs', 'Näytä kuva ___.', 'opettaja', 'opettajalle', ['opettajaa', 'opettajaan', 'opettajalta'], 'näyttää + ' + R.all + ' = to show to.', 'Show the picture to the teacher.'],
    // Verbs that take -lta
    ['verbs', 'Kysy ___.', 'opettaja', 'opettajalta', ['opettajaa', 'opettajalle', 'opettajasta'], 'kysyä + ' + R.abl + ' = to ask someone.', 'Ask the teacher.'],
    ['verbs', 'Pyysin apua ___.', 'naapuri', 'naapurilta', ['naapuria', 'naapurille', 'naapurista'], 'pyytää jotakin + ' + R.abl + ' = to ask someone for something.', 'I asked the neighbour for help.'],
    ['verbs', 'Ruoka maistuu ___.', 'valkosipuli', 'valkosipulilta', ['valkosipulia', 'valkosipulille', 'valkosipulista'], 'maistua + ' + R.abl + ' = to taste of.', 'The food tastes of garlic.'],
    ['verbs', 'Hän näyttää ___.', 'isä', 'isältä', ['isää', 'isälle', 'isästä'], 'näyttää + ' + R.abl + ' = to look like.', 'They look like their dad.'],
    ['verbs', 'Se kuulostaa ___.', 'hyvä idea', 'hyvältä idealta', ['hyvää ideaa', 'hyvälle idealle', 'hyvästä ideasta'], 'kuulostaa + ' + R.abl + ' = to sound like.', 'That sounds like a good idea.'],
    ['verbs', 'Kangas tuntuu ___.', 'silkki', 'silkiltä', ['silkkiä', 'silkille', 'silkistä'], 'tuntua + ' + R.abl + ' = to feel like.', 'The fabric feels like silk.'],
    // Verbs that take -ksi
    ['verbs', 'Vesi muuttuu ___.', 'jää', 'jääksi', ['jäätä', 'jäähän', 'jäästä'], 'muuttua + ' + R.tra + ' = to turn into.', 'Water turns into ice.'],
    ['verbs', 'Valo vaihtui ___.', 'vihreä', 'vihreäksi', ['vihreää', 'vihreään', 'vihreästä'], 'vaihtua + ' + R.tra + ' = to change to.', 'The light changed to green.'],

    // Whose case? Feelings (partitive), having and states (adessive), must (genitive).
    ['person', '___ pelottaa.', 'minä', 'Minua', ['Minulla', 'Minun', 'Minä'], 'Feeling verbs: the person is partitive. Minua pelottaa = I\'m scared.', 'I\'m scared.'],
    ['person', '___ väsyttää.', 'lapsi', 'Lasta', ['Lapsella', 'Lapsen', 'Lapsi'], 'Feeling verbs: the person is partitive (lapsi → lasta).', 'The child is sleepy.'],
    ['person', 'Janottaako ___?', 'sinä', 'sinua', ['sinulla', 'sinun', 'sinä'], 'Feeling verbs: the person is partitive.', 'Are you thirsty?'],
    ['person', '___ naurattaa.', 'me', 'Meitä', ['Meillä', 'Meidän', 'Me'], 'Feeling verbs: the person is partitive.', 'We can\'t stop laughing.'],
    ['person', '___ harmittaa.', 'Pekka', 'Pekkaa', ['Pekalla', 'Pekan', 'Pekka'], 'Feeling verbs: the person is partitive.', 'Pekka is annoyed.'],
    ['person', '___ kiinnostaa musiikki.', 'Leo', 'Leoa', ['Leolla', 'Leon', 'Leo'], 'kiinnostaa: the person is partitive.', 'Leo is interested in music.'],
    ['person', 'Mihin ___ sattuu?', 'sinä', 'sinua', ['sinulla', 'sinun', 'sinä'], 'sattua (to hurt): the person is partitive.', 'Where does it hurt?'],
    ['person', '___ on kylmä.', 'minä', 'Minulla', ['Minua', 'Minun', 'Minä'], 'olla kylmä / kuuma / nälkä / jano: the person is adessive (-lla).', 'I\'m cold.'],
    ['person', '___ on nälkä.', 'lapsi', 'Lapsella', ['Lasta', 'Lapsen', 'Lapsi'], 'olla nälkä: the person is adessive (-lla).', 'The child is hungry.'],
    ['person', '___ on kuumetta.', 'Aino', 'Ainolla', ['Ainoa', 'Ainon', 'Aino'], 'Illnesses and symptoms: the person is adessive. Kuumetta is partitive (some fever).', 'Aino has a temperature.'],
    ['person', '___ on kaksi lasta.', 'he', 'Heillä', ['Heitä', 'Heidän', 'He'], 'Having = adessive + on: heillä on.', 'They have two children.'],
    ['person', 'Onko ___ kiire?', 'sinä', 'sinulla', ['sinua', 'sinun', 'sinä'], 'olla kiire: the person is adessive.', 'Are you in a hurry?'],
    ['person', '___ on ikävä äitiä.', 'lapsi', 'Lapsella', ['Lasta', 'Lapsen', 'Lapsi'], 'olla ikävä: the person is adessive, the one you miss is partitive.', 'The child misses Mum.'],
    ['person', '___ on paha olo.', 'minä', 'Minulla', ['Minua', 'Minun', 'Minä'], 'olla paha olo: the person is adessive.', 'I feel unwell.'],
    ['person', 'Oliko ___ kivaa?', 'sinä', 'sinulla', ['sinua', 'sinun', 'sinä'], 'olla kivaa / hauskaa: the person is adessive.', 'Did you have fun?'],
    ['person', '___ täytyy lähteä.', 'minä', 'Minun', ['Minua', 'Minulla', 'Minä'], 'täytyy, pitää, on pakko: the person is genitive.', 'I have to go.'],
    ['person', '___ pitää mennä töihin.', 'äiti', 'Äidin', ['Äitiä', 'Äidillä', 'Äiti'], 'pitää (must): the person is genitive.', 'Mum has to go to work.'],
    ['person', '___ on pakko levätä.', 'sinä', 'Sinun', ['Sinua', 'Sinulla', 'Sinä'], 'on pakko: the person is genitive.', 'You have to rest.'],
    ['person', '___ ei tarvitse tulla.', 'te', 'Teidän', ['Teitä', 'Teillä', 'Te'], 'ei tarvitse: the person is genitive.', 'You don\'t need to come.'],
    ['person', '___ kannattaa varata aika.', 'sinä', 'Sinun', ['Sinua', 'Sinulla', 'Sinä'], 'kannattaa (it\'s worth it): the person is genitive.', 'You should book an appointment.'],
    ['person', 'Nyt on ___ vuorosi.', 'sinä', 'sinun', ['sinua', 'sinulla', 'sinä'], 'Whose turn: genitive, plus -si on the noun: sinun vuorosi.', 'Now it\'s your turn.'],

    // After numbers and amounts, and in negative sentences: the partitive.
    ['amounts', 'Minulla on kaksi ___.', 'kissa', 'kissaa', ['kissa', 'kissat', 'kissoja'], 'After numbers 2 and up: partitive singular. kaksi kissaa.', 'I have two cats.'],
    ['amounts', 'Ostin kolme ___.', 'omena', 'omenaa', ['omena', 'omenat', 'omenoita'], 'After numbers 2 and up: partitive singular.', 'I bought three apples.'],
    ['amounts', 'Ryhmässä on kaksitoista ___.', 'lapsi', 'lasta', ['lapsi', 'lapset', 'lapsia'], 'After numbers: partitive singular. lapsi → lasta.', 'There are twelve children in the group.'],
    ['amounts', 'Montako ___ sinulla on?', 'lapsi', 'lasta', ['lapsi', 'lapset', 'lapsia'], 'montako / monta + partitive singular.', 'How many children do you have?'],
    ['amounts', 'Tarvitaan viisi ___.', 'tuoli', 'tuolia', ['tuoli', 'tuolit', 'tuoleja'], 'After numbers: partitive singular.', 'We need five chairs.'],
    ['amounts', 'Lippu maksaa neljä ___.', 'euro', 'euroa', ['euro', 'euron', 'euroja'], 'Prices: number + partitive. neljä euroa.', 'The ticket costs four euros.'],
    ['amounts', 'Työpäivä on kahdeksan ___.', 'tunti', 'tuntia', ['tunti', 'tunnin', 'tunteja'], 'After numbers: partitive singular.', 'The working day is eight hours.'],
    ['amounts', 'Ulkona on viisi astetta ___.', 'pakkanen', 'pakkasta', ['pakkanen', 'pakkasen', 'pakkasia'], 'astetta pakkasta = degrees below zero. Both are partitive.', 'It\'s minus five outside.'],
    ['amounts', 'Pöydällä on yksi ___.', 'kuppi', 'kuppi', ['kuppia', 'kupin', 'kupit'], 'After yksi the noun stays in the basic form: yksi kuppi.', 'There\'s one cup on the table.'],
    ['amounts', 'Juon paljon ___.', 'vesi', 'vettä', ['vesi', 'veden', 'vesiä'], 'paljon + partitive. vesi → vettä.', 'I drink a lot of water.'],
    ['amounts', 'Onko sinulla vähän ___?', 'aika', 'aikaa', ['aika', 'ajan', 'aikoja'], 'vähän + partitive.', 'Do you have a little time?'],
    ['amounts', 'Lasi ___, kiitos.', 'maito', 'maitoa', ['maito', 'maidon', 'maitoja'], 'Measures (lasi, kuppi, pala, kilo) + partitive.', 'A glass of milk, please.'],
    ['amounts', 'Saisinko kupin ___?', 'tee', 'teetä', ['tee', 'teen', 'teehen'], 'Measures + partitive: kuppi teetä.', 'Could I have a cup of tea?'],
    ['amounts', 'Haluan palan ___.', 'kakku', 'kakkua', ['kakku', 'kakun', 'kakkuja'], 'Measures + partitive: pala kakkua.', 'I\'d like a piece of cake.'],
    ['amounts', 'Kaupassa ei ole ___.', 'maito', 'maitoa', ['maito', 'maidon', 'maidot'], 'Negative "there is no…": partitive. Ei ole maitoa.', 'There\'s no milk in the shop.'],
    ['amounts', 'Minulla ei ole ___.', 'auto', 'autoa', ['auto', 'auton', 'autot'], 'Negative having: partitive. Minulla ei ole autoa.', 'I don\'t have a car.'],
    ['amounts', 'En näe ___.', 'sinä', 'sinua', ['sinut', 'sinä', 'sinulla'], 'Negative verb + object: partitive. En näe sinua.', 'I can\'t see you.'],
    ['amounts', 'En löydä ___.', 'kenkä', 'kenkää', ['kengän', 'kenkä', 'kengät'], 'Negative verb + object: partitive. kenkä → kenkää.', 'I can\'t find the shoe.'],
    ['amounts', 'Juna lähtee kahden ___ päästä.', 'minuutti', 'minuutin', ['minuuttia', 'minuutti', 'minuutit'], 'kahden … päästä: the number and the noun are both genitive.', 'The train leaves in two minutes.'],
  ];

  const pick = (arr, rng) => arr[Math.floor(rng() * arr.length)];
  function shuffle(arr, rng) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }
  const squash = (s) => String(s || '').toLowerCase().normalize('NFC').replace(/[\s.,!?;:–—-]+/g, ' ').trim();
  function lev(a, b) {
    let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
    for (let i = 1; i <= a.length; i++) {
      const cur = [i];
      for (let j = 1; j <= b.length; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = cur;
    }
    return prev[b.length];
  }

  function toExercise(item) {
    const [set, sentence, base, answer, wrong, note, en] = item;
    return { kind: set, shown: base, task: 'Put the word in the right form', context: sentence, answer, accept: [], wrong, note, en };
  }
  const exercises = (set) => ITEMS.filter((it) => set === 'mixed' || it[0] === set).map(toExercise);

  /** { correct, close }: one typo is forgiven in longer answers, but never a known wrong form. */
  function check(typed, ex) {
    const given = squash(typed);
    if (!given) return { correct: false, close: false };
    const answers = [ex.answer].concat(ex.accept || []).map(squash);
    if (answers.includes(given)) return { correct: true, close: false };
    if ((ex.wrong || []).map(squash).includes(given)) return { correct: false, close: false };
    const close = answers.some((a) => a.length >= 7 && lev(a, given) <= 1);
    return { correct: close, close };
  }

  /** n exercises from a set (or 'mixed'), each with four options. */
  function round(set, n, rng) {
    rng = rng || Math.random;
    return shuffle(exercises(set), rng).slice(0, n).map((ex) =>
      Object.assign(ex, { options: shuffle([ex.answer].concat(ex.wrong.slice(0, 3)), rng) }));
  }

  return { SETS, ITEMS, exercises, round, check, squash };
});

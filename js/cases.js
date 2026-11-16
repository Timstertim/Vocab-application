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
    plurals: { name: 'Plurals in all forms', icon: '👥', blurb: 'kissat · omenoita · lasten · laatikoissa · kauppoihin · pöydillä', task: 'Put the word in the plural' },
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
    // Plurals: every case, and words whose stem changes. The wrong options are the singular or another plural case.
    // Nominative plural -t: the subject, or "all of them" as the object.
    ['plurals', '___ nukkuvat sohvalla.', 'kissa', 'Kissat', ['Kissa', 'Kissoja', 'Kissojen'], 'Nominative plural -t: the subject. kissa → kissat.', 'The cats are sleeping on the sofa.'],
    ['plurals', '___ leikkivät pihalla.', 'lapsi', 'Lapset', ['Lapsi', 'Lapsia', 'Lasten'], 'Nominative plural. lapsi → lapset (stem lapse-).', 'The children are playing in the yard.'],
    ['plurals', '___ juttelevat kahvilassa.', 'nainen', 'Naiset', ['Nainen', 'Naisia', 'Naisten'], 'Nominative plural. -nen words: nainen → naiset (stem naise-).', 'The women are chatting in the café.'],
    ['plurals', 'Missä ___ ovat?', 'kenkä', 'kengät', ['kenkä', 'kenkiä', 'kenkien'], 'Nominative plural. Consonant gradation: kenkä → kengät (nk → ng).', 'Where are the shoes?'],
    ['plurals', 'Missä ___ ovat?', 'avain', 'avaimet', ['avain', 'avaimia', 'avainten'], 'Nominative plural. -in words: avain → avaimet (n → m).', 'Where are the keys?'],
    ['plurals', 'Muista harjata ___.', 'hammas', 'hampaat', ['hammasta', 'hampaita', 'hampaiden'], 'All of them as the object: nominative plural. hammas → hampaat (mm → mp).', 'Remember to brush your teeth.'],
    ['plurals', 'Pese ___.', 'käsi', 'kädet', ['kättä', 'käsiä', 'käsien'], 'All of them as the object: nominative plural. käsi → kädet.', 'Wash your hands.'],
    ['plurals', 'Laittakaa ___ pois.', 'puhelin', 'puhelimet', ['puhelinta', 'puhelimia', 'puhelimien'], 'All of them as the object: nominative plural. puhelin → puhelimet.', 'Put your phones away.'],
    // Partitive plural -ia / -ita / -ja: some, many, not any.
    ['plurals', 'Ostin ___.', 'omena', 'omenoita', ['omenat', 'omenaa', 'omenoiden'], 'Some (not all, not a number): partitive plural. omena → omenoita.', 'I bought some apples.'],
    ['plurals', 'Rakastan ___.', 'kirja', 'kirjoja', ['kirjat', 'kirjaa', 'kirjojen'], 'Things in general: partitive plural. kirja → kirjoja.', 'I love books.'],
    ['plurals', 'Kaupassa on paljon ___.', 'ihminen', 'ihmisiä', ['ihmiset', 'ihmistä', 'ihmisten'], 'paljon + partitive plural for things you can count. -nen → -siä.', 'There are a lot of people in the shop.'],
    ['plurals', 'Syön ___.', 'mansikka', 'mansikoita', ['mansikat', 'mansikkaa', 'mansikoiden'], 'Partitive plural. Gradation kk → k: mansikoita.', 'I\'m eating strawberries.'],
    ['plurals', 'Meillä ei ole ___.', 'tuoli', 'tuoleja', ['tuolit', 'tuolia', 'tuolien'], 'Negative sentence: partitive plural. tuoli → tuoleja.', 'We don\'t have any chairs.'],
    ['plurals', 'Ryhmässä on pieniä ___.', 'lapsi', 'lapsia', ['lapset', 'lasta', 'lasten'], 'Partitive plural; the adjective agrees: pieniä lapsia.', 'There are small children in the group.'],
    ['plurals', 'Puistossa on ___ kukkia.', 'kaunis', 'kauniita', ['kauniit', 'kaunista', 'kauniiden'], 'The adjective agrees with kukkia: partitive plural. kaunis → kauniita.', 'There are beautiful flowers in the park.'],
    ['plurals', 'Rannalla on paljon ___.', 'vene', 'veneitä', ['veneet', 'venettä', 'veneiden'], 'paljon + partitive plural. -e words: vene → veneitä.', 'There are lots of boats on the beach.'],
    // Genitive plural -en / -den / -jen / -ten: whose, and before postpositions.
    ['plurals', '___ huone on toisessa kerroksessa.', 'lapsi', 'Lasten', ['Lapset', 'Lapsia', 'Lapsen'], 'Whose (many): genitive plural. lapsi → lasten.', 'The children\'s room is on the second floor.'],
    ['plurals', '___ määrä kasvaa.', 'auto', 'Autojen', ['Autot', 'Autoja', 'Auton'], 'Genitive plural. auto → autojen.', 'The number of cars is growing.'],
    ['plurals', '___ nimet ovat ovessa.', 'opettaja', 'Opettajien', ['Opettajat', 'Opettajia', 'Opettajan'], 'Genitive plural. opettaja → opettajien.', 'The teachers\' names are on the door.'],
    ['plurals', 'Asumme ___ lähellä.', 'järvi', 'järvien', ['järvet', 'järviä', 'järven'], 'lähellä takes the genitive: järvien lähellä.', 'We live near the lakes.'],
    // Inessive -issa: in.
    ['plurals', 'Kirjat ovat ___.', 'laatikko', 'laatikoissa', ['laatikossa', 'laatikoihin', 'laatikoista'], 'In (many): plural inessive -issa. Gradation kk → k.', 'The books are in the boxes.'],
    ['plurals', 'Lapset leikkivät ___.', 'huone', 'huoneissa', ['huoneessa', 'huoneisiin', 'huoneista'], 'Plural inessive -issa. huone → huoneissa.', 'The children are playing in the rooms.'],
    ['plurals', 'Monissa ___ on sauna.', 'koti', 'kodeissa', ['kodissa', 'koteihin', 'kodeista'], 'Plural inessive. koti → kodeissa (t → d, i → e).', 'Many homes have a sauna.'],
    // Elative -ista: from, about.
    ['plurals', 'Pidän ___.', 'koira', 'koirista', ['koirasta', 'koiria', 'koiriin'], 'pitää + -sta; things in general are plural: koirista.', 'I like dogs.'],
    ['plurals', 'Kerro ___.', 'lapsi', 'lapsista', ['lapsesta', 'lapsia', 'lapsiin'], 'kertoa + -sta: plural elative -ista.', 'Tell me about the children.'],
    ['plurals', 'Puolet ___ tuli pyörällä.', 'oppilas', 'oppilaista', ['oppilaasta', 'oppilaita', 'oppilaisiin'], 'puolet + plural elative. oppilas → oppilaista.', 'Half of the pupils came by bike.'],
    // Illative -ihin / -isiin: into.
    ['plurals', 'Laita lelut ___.', 'laatikko', 'laatikoihin', ['laatikkoon', 'laatikoissa', 'laatikoista'], 'Into (many): plural illative -ihin.', 'Put the toys in the boxes.'],
    ['plurals', 'Menemme ___.', 'kauppa', 'kauppoihin', ['kauppaan', 'kaupoissa', 'kaupoista'], 'Plural illative -ihin keeps the strong grade: kauppoihin (but kaupoissa).', 'We\'re going to the shops.'],
    ['plurals', 'Vie astiat ___.', 'kaappi', 'kaappeihin', ['kaappiin', 'kaapeissa', 'kaapeista'], 'Plural illative. kaappi → kaappeihin (but kaapeissa).', 'Take the dishes to the cupboards.'],
    ['plurals', 'Vastaa ___.', 'kysymys', 'kysymyksiin', ['kysymykseen', 'kysymyksiä', 'kysymyksistä'], 'vastata + illative. -us/-ys words: kysymys → kysymyksiin.', 'Answer the questions.'],
    ['plurals', 'Tutustuin uusiin ___.', 'kollega', 'kollegoihin', ['kollegaan', 'kollegoita', 'kollegoista'], 'tutustua + illative; the adjective agrees: uusiin kollegoihin.', 'I got to know the new colleagues.'],
    // Adessive -illa: on, at, have, by.
    ['plurals', 'Lautaset ovat ___.', 'pöytä', 'pöydillä', ['pöydällä', 'pöytiin', 'pöydiltä'], 'On (many): plural adessive -illa. pöytä → pöydillä (t → d).', 'The plates are on the tables.'],
    ['plurals', '___ on kylmä.', 'lapsi', 'Lapsilla', ['Lapsella', 'Lapsia', 'Lasten'], 'Who has or feels: adessive. Plural: lapsilla.', 'The children are cold.'],
    // Ablative -ilta: from (a person).
    ['plurals', 'Kysy ___.', 'opettaja', 'opettajilta', ['opettajalta', 'opettajille', 'opettajista'], 'kysyä + -lta: plural ablative -ilta.', 'Ask the teachers.'],
    ['plurals', 'Sain lahjoja ___.', 'ystävä', 'ystäviltä', ['ystävältä', 'ystäville', 'ystävistä'], 'From people: plural ablative -iltä.', 'I got presents from friends.'],
    // Allative -ille: to (a person).
    ['plurals', 'Annoin kirjat ___.', 'lapsi', 'lapsille', ['lapselle', 'lapsilta', 'lapsiin'], 'To people: plural allative -ille.', 'I gave the books to the children.'],
    ['plurals', 'Kerro ___.', 'vanhempi', 'vanhemmille', ['vanhemmalle', 'vanhemmilta', 'vanhempiin'], 'vanhemmat = parents. To them: vanhemmille (mp → mm).', 'Tell the parents.'],
    ['plurals', 'Soitin kaikille ___.', 'asiakas', 'asiakkaille', ['asiakkaalle', 'asiakkailta', 'asiakkaita'], 'Plural allative. -as words: asiakas → asiakkaille (k → kk).', 'I called all the customers.'],
    // Essive -ina: as.
    ['plurals', 'Olimme siellä ___.', 'lapsi', 'lapsina', ['lapsena', 'lapsiksi', 'lapsia'], 'As (a state, a role): plural essive -ina.', 'We were there as children.'],
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
    const plural = set === 'plurals';
    return { kind: set, shown: plural ? base + ' (plural)' : base, task: SETS[set].task || 'Put the word in the right form', context: sentence, answer, accept: [], wrong, note, en };
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

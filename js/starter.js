/* Starter vocabulary, loaded on first run or from Settings. */
(function (root) {
  'use strict';
  const C = (name, color) => ({ id: 'cat-' + name.toLowerCase().replace(/\W+/g, '-'), name, color });
  const categories = [
    C('Greetings', '#3b6fd8'),
    C('Food & drink', '#e07a2e'),
    C('Family', '#c2417e'),
    C('Home', '#2e9a6b'),
    C('Numbers', '#7a55c7'),
    C('Colours', '#d24545'),
    C('Verbs', '#1f8fa3'),
    C('Nature', '#5b8f2a'),
  ];
  const id = (n) => 'cat-' + n.toLowerCase().replace(/\W+/g, '-');

  // [finnish, english, part of speech, definition, [[example fi, example en]...], category]
  const raw = [
    ['hei', 'hi, hello', 'interjection', 'An informal greeting, used any time of day.', [['Hei! Mitä kuuluu?', 'Hi! How are you?']], 'Greetings'],
    ['kiitos', 'thank you, thanks', 'interjection', 'Used to express gratitude.', [['Kiitos avusta.', 'Thanks for the help.']], 'Greetings'],
    ['anteeksi', 'sorry, excuse me', 'interjection', 'Used to apologise or to get someone\'s attention politely.', [['Anteeksi, missä on asema?', 'Excuse me, where is the station?']], 'Greetings'],
    ['hyvää huomenta', 'good morning', 'phrase', 'A greeting used in the morning.', [['Hyvää huomenta, äiti!', 'Good morning, Mum!']], 'Greetings'],
    ['näkemiin', 'goodbye', 'interjection', 'A fairly formal farewell; literally "until seeing".', [['Näkemiin ja hyvää päivänjatkoa!', 'Goodbye and have a nice rest of the day!']], 'Greetings'],
    ['ole hyvä', 'please, here you go, you\'re welcome', 'phrase', 'Said when offering something or replying to thanks.', [['Ole hyvä, tässä on kahvisi.', 'Here you go, here is your coffee.']], 'Greetings'],

    ['leipä', 'bread', 'noun', 'A staple food baked from flour dough.', [['Ostin tuoretta leipää.', 'I bought fresh bread.']], 'Food & drink'],
    ['maito', 'milk', 'noun', 'White liquid produced by cows, used as a drink.', [['Juon maitoa aamulla.', 'I drink milk in the morning.']], 'Food & drink'],
    ['kahvi', 'coffee', 'noun', 'A hot drink made from roasted coffee beans.', [['Suomalaiset juovat paljon kahvia.', 'Finns drink a lot of coffee.']], 'Food & drink'],
    ['omena', 'apple', 'noun', 'A round fruit with red, green or yellow skin.', [['Tämä omena on makea.', 'This apple is sweet.']], 'Food & drink'],
    ['juusto', 'cheese', 'noun', 'A food made from pressed milk curds.', [['Laitan juustoa leivän päälle.', 'I put cheese on the bread.']], 'Food & drink'],
    ['vesi', 'water', 'noun', 'Clear liquid essential for life. Note the stem: veden, vettä.', [['Saisinko lasin vettä?', 'Could I have a glass of water?']], 'Food & drink'],

    ['äiti', 'mother, mum', 'noun', 'A female parent.', [['Äitini asuu Tampereella.', 'My mother lives in Tampere.']], 'Family'],
    ['isä', 'father, dad', 'noun', 'A male parent.', [['Isä laittaa ruokaa.', 'Dad is cooking.']], 'Family'],
    ['sisko', 'sister', 'noun', 'A female sibling (more formal: sisar).', [['Minulla on kaksi siskoa.', 'I have two sisters.']], 'Family'],
    ['veli', 'brother', 'noun', 'A male sibling. Stem: veljen, veljeä.', [['Veljeni on opettaja.', 'My brother is a teacher.']], 'Family'],
    ['lapsi', 'child', 'noun', 'A young person. Plural: lapset.', [['Lapsi leikkii puistossa.', 'The child is playing in the park.']], 'Family'],

    ['talo', 'house', 'noun', 'A building people live in.', [['Talo on järven rannalla.', 'The house is on the shore of the lake.']], 'Home'],
    ['keittiö', 'kitchen', 'noun', 'The room where food is prepared.', [['Keittiössä on uusi liesi.', 'There is a new stove in the kitchen.']], 'Home'],
    ['sauna', 'sauna', 'noun', 'A small heated room for bathing in hot steam.', [['Mennään saunaan illalla.', 'Let\'s go to the sauna in the evening.']], 'Home'],
    ['ikkuna', 'window', 'noun', 'An opening in a wall fitted with glass.', [['Avaa ikkuna, täällä on kuuma.', 'Open the window, it\'s hot in here.']], 'Home'],
    ['ovi', 'door', 'noun', 'A movable barrier at the entrance of a room or building.', [['Sulje ovi, kiitos.', 'Close the door, please.']], 'Home'],

    ['yksi', 'one', 'numeral', 'The number 1.', [['Minulla on yksi koira.', 'I have one dog.']], 'Numbers'],
    ['kaksi', 'two', 'numeral', 'The number 2.', [['Kaksi kahvia, kiitos.', 'Two coffees, please.']], 'Numbers'],
    ['kolme', 'three', 'numeral', 'The number 3.', [['Odotin kolme tuntia.', 'I waited three hours.']], 'Numbers'],
    ['kymmenen', 'ten', 'numeral', 'The number 10.', [['Bussi tulee kymmenen minuutin päästä.', 'The bus comes in ten minutes.']], 'Numbers'],

    ['punainen', 'red', 'adjective', 'The colour of blood or ripe strawberries.', [['Naapurillamme on punainen auto.', 'Our neighbour has a red car.']], 'Colours'],
    ['sininen', 'blue', 'adjective', 'The colour of a clear sky.', [['Taivas on sininen.', 'The sky is blue.']], 'Colours'],
    ['vihreä', 'green', 'adjective', 'The colour of grass and leaves.', [['Metsä on kesällä vihreä.', 'The forest is green in summer.']], 'Colours'],
    ['valkoinen', 'white', 'adjective', 'The colour of fresh snow.', [['Lumi on valkoinen.', 'Snow is white.']], 'Colours'],

    ['puhua', 'to speak, to talk', 'verb', 'To say words; to use a language.', [['Puhutko suomea?', 'Do you speak Finnish?']], 'Verbs'],
    ['syödä', 'to eat', 'verb', 'To put food in the mouth and swallow it.', [['Syödään yhdessä!', 'Let\'s eat together!']], 'Verbs'],
    ['juoda', 'to drink', 'verb', 'To take liquid into the mouth and swallow it.', [['Haluatko juoda teetä?', 'Do you want to drink tea?']], 'Verbs'],
    ['mennä', 'to go', 'verb', 'To move from one place to another.', [['Menen kauppaan.', 'I\'m going to the shop.']], 'Verbs'],
    ['ymmärtää', 'to understand', 'verb', 'To grasp the meaning of something.', [['En ymmärrä.', 'I don\'t understand.']], 'Verbs'],
    ['asua', 'to live, to reside', 'verb', 'To have one\'s home somewhere.', [['Asun Helsingissä.', 'I live in Helsinki.']], 'Verbs'],

    ['järvi', 'lake', 'noun', 'A large body of fresh water. Finland has about 188 000 of them.', [['Suomessa on paljon järviä.', 'There are many lakes in Finland.']], 'Nature'],
    ['metsä', 'forest', 'noun', 'A large area covered with trees.', [['Kävelemme metsässä.', 'We walk in the forest.']], 'Nature'],
    ['lumi', 'snow', 'noun', 'Frozen water falling as white flakes. Stem: lumen, lunta.', [['Ulkona sataa lunta.', 'It\'s snowing outside.']], 'Nature'],
    ['aurinko', 'sun', 'noun', 'The star that gives Earth light and heat.', [['Aurinko paistaa.', 'The sun is shining.']], 'Nature'],
  ];

  const now = Date.now();
  const words = raw.map((r, i) => ({
    id: 'w-starter-' + i,
    finnish: r[0],
    english: r[1],
    partOfSpeech: r[2],
    definition: r[3],
    examples: r[4].map(([fi, en]) => ({ fi, en })),
    categoryIds: [id(r[5])],
    notes: '',
    stats: { correct: 0, wrong: 0 },
    createdAt: now - (raw.length - i) * 1000,
  }));

  root.VocabStarter = { categories, words };
})(typeof self !== 'undefined' ? self : this);

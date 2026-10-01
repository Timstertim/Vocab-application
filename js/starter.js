/*
 * Starter vocabulary, loaded on first run or from Settings.
 * Bump VERSION when adding words: existing users then get the new words once
 * (words they already have, edited or deleted are left alone).
 */
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
    C('Feelings', '#e0567a'),
    C('Shapes', '#a8781f'),
    C('A2.2 verbs', '#3a7f8f'),
  ];
  const VERSION = 2;
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

  // Added in version 2. Same columns, plus the version; category may be a list.
  const v2 = [
    // Feelings
    ['iloinen', 'happy, glad, cheerful', 'adjective', 'Feeling or showing joy.', [['Olen iloinen, että tulit.', 'I\'m glad you came.']], 'Feelings'],
    ['surullinen', 'sad', 'adjective', 'Feeling sorrow or unhappiness.', [['Lapsi on surullinen, koska kissa katosi.', 'The child is sad because the cat disappeared.']], 'Feelings'],
    ['vihainen', 'angry', 'adjective', 'Feeling or showing anger.', [['Miksi olet vihainen?', 'Why are you angry?']], 'Feelings'],
    ['onnellinen', 'happy, content', 'adjective', 'Deeply happy with one\'s life or situation (stronger than iloinen).', [['Olemme onnellisia yhdessä.', 'We are happy together.']], 'Feelings'],
    ['väsynyt', 'tired', 'adjective', 'Needing rest or sleep.', [['Olen tosi väsynyt tänään.', 'I\'m really tired today.']], 'Feelings'],
    ['hermostunut', 'nervous', 'adjective', 'Anxious or uneasy about something coming up.', [['Olin hermostunut ennen koetta.', 'I was nervous before the exam.']], 'Feelings'],
    ['peloissaan', 'scared, frightened', 'adverb', 'Used with olla: olla peloissaan = to be scared. Takes the elative (-sta/-stä).', [['Koira on peloissaan ukkosesta.', 'The dog is scared of the thunder.']], 'Feelings'],
    ['huolissaan', 'worried', 'adverb', 'Used with olla: olla huolissaan jostakin = to be worried about something.', [['Äiti on huolissaan sinusta.', 'Mum is worried about you.']], 'Feelings'],
    ['innoissaan', 'excited', 'adverb', 'Used with olla: olla innoissaan jostakin = to be excited about something.', [['Lapset ovat innoissaan joulusta.', 'The children are excited about Christmas.']], 'Feelings'],
    ['yllättynyt', 'surprised', 'adjective', 'Feeling surprise at something unexpected.', [['Olin iloisesti yllättynyt.', 'I was pleasantly surprised.']], 'Feelings'],
    ['pettynyt', 'disappointed', 'adjective', 'Sad because something was not as good as hoped. Takes the illative: pettynyt johonkin.', [['Olen pettynyt tulokseen.', 'I\'m disappointed with the result.']], 'Feelings'],
    ['ylpeä', 'proud', 'adjective', 'Pleased with oneself or someone else. Takes the elative: ylpeä jostakin.', [['Olen ylpeä sinusta.', 'I\'m proud of you.']], 'Feelings'],
    ['kateellinen', 'jealous, envious', 'adjective', 'Wanting what someone else has.', [['Älä ole kateellinen!', 'Don\'t be jealous!']], 'Feelings'],
    ['yksinäinen', 'lonely', 'adjective', 'Sad because one is alone or has no friends.', [['Vanha mies tuntee itsensä yksinäiseksi.', 'The old man feels lonely.']], 'Feelings'],
    ['rauhallinen', 'calm, peaceful', 'adjective', 'Not worried, excited or upset.', [['Pysy rauhallisena.', 'Stay calm.']], 'Feelings'],
    ['tylsistynyt', 'bored', 'adjective', 'Tired of having nothing interesting to do. Everyday alternative: Minulla on tylsää.', [['Olen tylsistynyt, tehdään jotain!', 'I\'m bored, let\'s do something!']], 'Feelings'],
    ['tunne', 'feeling, emotion', 'noun', 'Something you feel, such as joy or fear. Stem: tunteen, tunnetta.', [['Se oli outo tunne.', 'It was a strange feeling.']], 'Feelings'],
    ['ilo', 'joy', 'noun', 'A feeling of great happiness.', [['Lapsi hyppi ilosta.', 'The child jumped for joy.']], 'Feelings'],
    ['suru', 'sorrow, grief, sadness', 'noun', 'Deep sadness, especially after a loss.', [['Suru helpottaa ajan kanssa.', 'Grief eases with time.']], 'Feelings'],
    ['pelko', 'fear', 'noun', 'The feeling of being afraid. Stem: pelon, pelkoa.', [['Minulla on lentopelko.', 'I have a fear of flying.']], 'Feelings'],
    ['rakkaus', 'love', 'noun', 'A strong feeling of affection. Stem: rakkauden, rakkautta.', [['Rakkaus on sokea.', 'Love is blind.']], 'Feelings'],

    // Shapes
    ['muoto', 'shape, form', 'noun', 'The outline or form of something. Stem: muodon, muotoa.', [['Minkä muotoinen se on?', 'What shape is it?']], 'Shapes'],
    ['ympyrä', 'circle', 'noun', 'A perfectly round flat shape.', [['Piirrä ympyrä.', 'Draw a circle.']], 'Shapes'],
    ['neliö', 'square', 'noun', 'A shape with four equal sides and four right angles. Also: square metre (m²).', [['Huone on neliön muotoinen.', 'The room is square-shaped.']], 'Shapes'],
    ['kolmio', 'triangle', 'noun', 'A shape with three sides and three corners.', [['Liikennemerkki on kolmio.', 'The traffic sign is a triangle.']], 'Shapes'],
    ['suorakulmio', 'rectangle', 'noun', 'A shape with four right angles and two pairs of equal sides.', [['Ovi on suorakulmio.', 'A door is a rectangle.']], 'Shapes'],
    ['soikio', 'oval', 'noun', 'An egg-like, stretched round shape.', [['Peili on soikion muotoinen.', 'The mirror is oval.']], 'Shapes'],
    ['tähti', 'star', 'noun', 'A shape with five or more points; also a star in the sky. Stem: tähden, tähteä.', [['Piirsin tähden.', 'I drew a star.']], 'Shapes'],
    ['sydän', 'heart', 'noun', 'The heart shape; also the organ. Stem: sydämen, sydäntä.', [['Piirsin sydämen korttiin.', 'I drew a heart on the card.']], 'Shapes'],
    ['viiva', 'line', 'noun', 'A long thin mark.', [['Vedä viiva tähän.', 'Draw a line here.']], 'Shapes'],
    ['piste', 'dot, point, full stop', 'noun', 'A small round mark; also a point in a game. Stem: pisteen, pistettä.', [['Lauseen loppuun tulee piste.', 'A full stop goes at the end of a sentence.']], 'Shapes'],
    ['kulma', 'corner, angle', 'noun', 'The point where two lines or sides meet.', [['Kadun kulmassa on kahvila.', 'There\'s a café on the street corner.']], 'Shapes'],
    ['kuutio', 'cube', 'noun', 'A solid shape with six square sides.', [['Jääkuutio sulaa.', 'The ice cube is melting.']], 'Shapes'],
    ['pallo', 'ball, sphere', 'noun', 'A round object; also a sphere in geometry.', [['Lapset potkivat palloa.', 'The children are kicking the ball.']], 'Shapes'],
    ['pyöreä', 'round', 'adjective', 'Shaped like a circle or ball.', [['Pöytä on pyöreä.', 'The table is round.']], 'Shapes'],
    ['suora', 'straight', 'adjective', 'Not bent or curved.', [['Piirrä suora viiva.', 'Draw a straight line.']], 'Shapes'],

    // A2.2 verbs
    ['ostaa', 'to buy', 'verb', 'Type 1 · minä ostan · hän osti (past).', [['Ostin uuden takin.', 'I bought a new coat.']], ['A2.2 verbs', 'Verbs']],
    ['myydä', 'to sell', 'verb', 'Type 2 · minä myyn · hän myi (past).', [['He myivät vanhan autonsa.', 'They sold their old car.']], ['A2.2 verbs', 'Verbs']],
    ['maksaa', 'to pay, to cost', 'verb', 'Type 1 · minä maksan · hän maksoi (past).', [['Paljonko tämä maksaa?', 'How much does this cost?']], ['A2.2 verbs', 'Verbs']],
    ['tavata', 'to meet', 'verb', 'Type 4 · minä tapaan · hän tapasi (past).', [['Tavataan huomenna kahvilassa.', 'Let\'s meet tomorrow at the café.']], ['A2.2 verbs', 'Verbs']],
    ['odottaa', 'to wait, to expect', 'verb', 'Type 1 · minä odotan · hän odotti (past). Takes the partitive: odottaa bussia.', [['Odotan bussia.', 'I\'m waiting for the bus.']], ['A2.2 verbs', 'Verbs']],
    ['auttaa', 'to help', 'verb', 'Type 1 · minä autan · hän auttoi (past). Takes the partitive: auttaa ystävää.', [['Voitko auttaa minua?', 'Can you help me?']], ['A2.2 verbs', 'Verbs']],
    ['muistaa', 'to remember', 'verb', 'Type 1 · minä muistan · hän muisti (past).', [['Muistatko minun nimeni?', 'Do you remember my name?']], ['A2.2 verbs', 'Verbs']],
    ['unohtaa', 'to forget', 'verb', 'Type 1 · minä unohdan · hän unohti (past).', [['Unohdin avaimet kotiin.', 'I forgot my keys at home.']], ['A2.2 verbs', 'Verbs']],
    ['tarvita', 'to need', 'verb', 'Type 5 · minä tarvitsen · hän tarvitsi (past).', [['Tarvitsen apua.', 'I need help.']], ['A2.2 verbs', 'Verbs']],
    ['osata', 'to know how, can (a skill)', 'verb', 'Type 4 · minä osaan · hän osasi (past). For skills: osaan uida = I can swim.', [['Osaatko uida?', 'Can you swim?']], ['A2.2 verbs', 'Verbs']],
    ['haluta', 'to want', 'verb', 'Type 4 · minä haluan · hän halusi (past).', [['Haluan oppia suomea.', 'I want to learn Finnish.']], ['A2.2 verbs', 'Verbs']],
    ['oppia', 'to learn', 'verb', 'Type 1 · minä opin · hän oppi (past).', [['Opin uuden sanan joka päivä.', 'I learn a new word every day.']], ['A2.2 verbs', 'Verbs']],
    ['opiskella', 'to study', 'verb', 'Type 3 · minä opiskelen · hän opiskeli (past).', [['Opiskelen yliopistossa.', 'I study at university.']], ['A2.2 verbs', 'Verbs']],
    ['tehdä', 'to do, to make', 'verb', 'Irregular · minä teen · hän teki (past).', [['Mitä teet viikonloppuna?', 'What are you doing at the weekend?']], ['A2.2 verbs', 'Verbs']],
    ['nähdä', 'to see', 'verb', 'Irregular · minä näen · hän näki (past).', [['Näin sinut eilen kaupassa.', 'I saw you in the shop yesterday.']], ['A2.2 verbs', 'Verbs']],
    ['tulla', 'to come', 'verb', 'Type 3 · minä tulen · hän tuli (past).', [['Tuletko mukaan?', 'Are you coming along?']], ['A2.2 verbs', 'Verbs']],
    ['lähteä', 'to leave, to go', 'verb', 'Type 1 · minä lähden · hän lähti (past).', [['Juna lähtee kello kahdeksan.', 'The train leaves at eight o\'clock.']], ['A2.2 verbs', 'Verbs']],
    ['palata', 'to return, to come back', 'verb', 'Type 4 · minä palaan · hän palasi (past).', [['Palaan kotiin illalla.', 'I\'ll come back home in the evening.']], ['A2.2 verbs', 'Verbs']],
    ['käydä', 'to visit, to go (and come back)', 'verb', 'Type 2 · minä käyn · hän kävi (past). Takes the inessive: käydä kaupassa.', [['Käyn kaupassa.', 'I\'ll pop to the shop.']], ['A2.2 verbs', 'Verbs']],
    ['viedä', 'to take (somewhere)', 'verb', 'Type 2 · minä vien · hän vei (past).', [['Vien lapset kouluun.', 'I take the kids to school.']], ['A2.2 verbs', 'Verbs']],
    ['tuoda', 'to bring', 'verb', 'Type 2 · minä tuon · hän toi (past).', [['Toin sinulle lahjan.', 'I brought you a present.']], ['A2.2 verbs', 'Verbs']],
    ['etsiä', 'to look for, to search', 'verb', 'Type 1 · minä etsin · hän etsi (past). Takes the partitive.', [['Etsin silmälasejani.', 'I\'m looking for my glasses.']], ['A2.2 verbs', 'Verbs']],
    ['löytää', 'to find', 'verb', 'Type 1 · minä löydän · hän löysi (past).', [['Löysin lompakon kadulta.', 'I found a wallet in the street.']], ['A2.2 verbs', 'Verbs']],
    ['kysyä', 'to ask', 'verb', 'Type 1 · minä kysyn · hän kysyi (past).', [['Saanko kysyä jotain?', 'May I ask something?']], ['A2.2 verbs', 'Verbs']],
    ['vastata', 'to answer, to reply', 'verb', 'Type 4 · minä vastaan · hän vastasi (past). Takes the illative: vastata kysymykseen.', [['Vastaa kysymykseen.', 'Answer the question.']], ['A2.2 verbs', 'Verbs']],
    ['kertoa', 'to tell', 'verb', 'Type 1 · minä kerron · hän kertoi (past).', [['Kerro minulle tarina.', 'Tell me a story.']], ['A2.2 verbs', 'Verbs']],
    ['tietää', 'to know (a fact)', 'verb', 'Type 1 · minä tiedän · hän tiesi (past). For people use tuntea.', [['En tiedä.', 'I don\'t know.']], ['A2.2 verbs', 'Verbs']],
    ['tuntea', 'to know (a person), to feel', 'verb', 'Type 1 · minä tunnen · hän tunsi (past).', [['Tunnetko Liisan?', 'Do you know Liisa?']], ['A2.2 verbs', 'Verbs']],
    ['ajatella', 'to think', 'verb', 'Type 3 · minä ajattelen · hän ajatteli (past).', [['Ajattelen sinua.', 'I\'m thinking of you.']], ['A2.2 verbs', 'Verbs']],
    ['nukkua', 'to sleep', 'verb', 'Type 1 · minä nukun · hän nukkui (past).', [['Nukuin huonosti viime yönä.', 'I slept badly last night.']], ['A2.2 verbs', 'Verbs']],
    ['herätä', 'to wake up', 'verb', 'Type 4 · minä herään · hän heräsi (past).', [['Herään joka aamu kuudelta.', 'I wake up at six every morning.']], ['A2.2 verbs', 'Verbs']],
    ['pelätä', 'to be afraid, to fear', 'verb', 'Type 4 · minä pelkään · hän pelkäsi (past). Takes the partitive: pelätä hämähäkkejä.', [['Pelkään hämähäkkejä.', 'I\'m afraid of spiders.']], ['A2.2 verbs', 'Verbs', 'Feelings']],
    ['rakastaa', 'to love', 'verb', 'Type 1 · minä rakastan · hän rakasti (past). Takes the partitive: rakastan sinua.', [['Rakastan sinua.', 'I love you.']], ['A2.2 verbs', 'Verbs', 'Feelings']],
    ['pitää', 'to like, to keep', 'verb', 'Type 1 · minä pidän · hän piti (past). "To like" takes the elative: pidän kahvista.', [['Pidän kahvista.', 'I like coffee.']], ['A2.2 verbs', 'Verbs']],
    ['tykätä', 'to like', 'verb', 'Colloquial. Type 4 · minä tykkään · hän tykkäsi (past). Takes the elative: tykkään sinusta.', [['Tykkään sinusta.', 'I like you.']], ['A2.2 verbs', 'Verbs']],
    ['matkustaa', 'to travel', 'verb', 'Type 1 · minä matkustan · hän matkusti (past).', [['Matkustamme kesällä Lappiin.', 'We are travelling to Lapland in the summer.']], ['A2.2 verbs', 'Verbs']],
    ['siivota', 'to clean, to tidy', 'verb', 'Type 4 · minä siivoan · hän siivosi (past).', [['Siivoan kotia lauantaisin.', 'I clean the house on Saturdays.']], ['A2.2 verbs', 'Verbs']],
    ['pestä', 'to wash', 'verb', 'Type 3 · minä pesen · hän pesi (past).', [['Pese kätesi!', 'Wash your hands!']], ['A2.2 verbs', 'Verbs']],
    ['valita', 'to choose', 'verb', 'Type 5 · minä valitsen · hän valitsi (past).', [['Valitse yksi.', 'Choose one.']], ['A2.2 verbs', 'Verbs']],
    ['alkaa', 'to begin, to start', 'verb', 'Type 1 · minä alan · se alkoi (past).', [['Elokuva alkaa seitsemältä.', 'The film starts at seven.']], ['A2.2 verbs', 'Verbs']],
    ['lopettaa', 'to stop, to quit, to finish', 'verb', 'Type 1 · minä lopetan · hän lopetti (past).', [['Lopetin tupakoinnin.', 'I quit smoking.']], ['A2.2 verbs', 'Verbs']],
    ['soittaa', 'to call, to phone, to play (an instrument)', 'verb', 'Type 1 · minä soitan · hän soitti (past).', [['Soitan sinulle illalla.', 'I\'ll call you in the evening.']], ['A2.2 verbs', 'Verbs']],
  ];

  const now = Date.now();
  const rows = raw.map((r) => r.concat(1)).concat(v2.map((r) => r.concat(2)));
  const words = rows.map((r, i) => ({
    id: 'w-starter-' + i,
    finnish: r[0],
    english: r[1],
    partOfSpeech: r[2],
    definition: r[3],
    examples: r[4].map(([fi, en]) => ({ fi, en })),
    categoryIds: [].concat(r[5]).map(id),
    notes: '',
    stats: { correct: 0, wrong: 0 },
    createdAt: now - (rows.length - i) * 1000,
    since: r[6],
  }));

  /** The starter words added after `version`, with the categories they use. */
  function newerThan(version) {
    const ws = words.filter((w) => w.since > version);
    const used = new Set([].concat(...ws.map((w) => w.categoryIds)));
    return { categories: categories.filter((c) => used.has(c.id)), words: ws };
  }

  root.VocabStarter = { VERSION, categories, words, newerThan };
})(typeof self !== 'undefined' ? self : this);

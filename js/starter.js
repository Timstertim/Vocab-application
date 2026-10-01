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
    C('Daycare', '#c0602a'),
  ];
  const VERSION = 3;
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
    ['tuoda', 'to bring', 'verb', 'Type 2 · minä tuon · hän toi (past).', [['Tuon sinulle lahjan huomenna.', 'I\'ll bring you a present tomorrow.']], ['A2.2 verbs', 'Verbs']],
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

  // Added in version 3: words a daycare (päiväkoti) teacher uses at work.
  const D = 'Daycare', DV = ['Daycare', 'Verbs'];
  const v3 = [
    // The system and the people
    ['päiväkoti', 'daycare, daycare centre, kindergarten', 'noun', 'A place where children under school age get early childhood education and care. Stem: päiväkodin, päiväkotia.', [['Lapsi on päiväkodissa kahdeksasta neljään.', 'The child is at daycare from eight to four.']], D],
    ['varhaiskasvatus', 'early childhood education and care, ECEC', 'noun', 'The official Finnish term for education and care before school. Stem: varhaiskasvatuksen, varhaiskasvatusta.', [['Varhaiskasvatus on lapsen oikeus.', 'Early childhood education is a child\'s right.']], D],
    ['varhaiskasvatuksen opettaja', 'early childhood education teacher, kindergarten teacher', 'noun', 'The teacher responsible for planning and leading pedagogy in a group (abbr. vo, formerly lastentarhanopettaja).', [['Olen varhaiskasvatuksen opettaja.', 'I\'m an early childhood education teacher.']], D],
    ['lastenhoitaja', 'childcare worker, nursery nurse', 'noun', 'Varhaiskasvatuksen lastenhoitaja: a trained worker who cares for and educates children in the group.', [['Lastenhoitaja auttaa lapsia pukemaan.', 'The childcare worker helps the children get dressed.']], D],
    ['päiväkodin johtaja', 'daycare director, head of the daycare', 'noun', 'The manager of a daycare centre (also: varhaiskasvatusyksikön johtaja).', [['Päiväkodin johtaja tekee työvuorolistat.', 'The daycare director makes the work rosters.']], D],
    ['kasvattaja', 'educator', 'noun', 'A general word for any adult who educates and cares for the children.', [['Kasvattajat suunnittelevat viikon toiminnan.', 'The educators plan the week\'s activities.']], D],
    ['sijainen', 'substitute, supply worker', 'noun', 'Someone who covers for an absent worker. Stem: sijaisen, sijaista.', [['Tänään ryhmässä on sijainen.', 'Today there\'s a substitute in the group.']], D],
    ['ryhmä', 'group', 'noun', 'A group of children with its own room and staff, e.g. pienten ryhmä (toddlers), isojen ryhmä (older children).', [['Ryhmässämme on 21 lasta.', 'There are 21 children in our group.']], D],
    ['esiopetus', 'pre-primary education, preschool', 'noun', 'The compulsory year of education before school starts, usually at age six. Stem: esiopetuksen, esiopetusta.', [['Esiopetus alkaa elokuussa.', 'Pre-primary education starts in August.']], D],
    ['eskari', 'preschool', 'noun', 'Colloquial word for esiopetus.', [['Poikani menee eskariin syksyllä.', 'My son starts preschool in the autumn.']], D],
    ['huoltaja', 'guardian, parent', 'noun', 'The official word for a child\'s parent or legal guardian, used in daycare and school letters.', [['Lähetin huoltajille tiedotteen.', 'I sent the guardians a notice.']], D],
    ['varhaiskasvatussuunnitelma', 'ECEC plan, individual early education plan', 'noun', 'The child\'s individual plan, made together with the guardians. Short: vasu.', [['Lapsen varhaiskasvatussuunnitelma tehdään yhdessä huoltajien kanssa.', 'The child\'s ECEC plan is made together with the guardians.']], D],
    ['vasukeskustelu', 'ECEC plan meeting, parent meeting', 'noun', 'A meeting between the teacher and the guardians to discuss the child\'s plan (vasu).', [['Sovitaan aika vasukeskustelulle.', 'Let\'s agree on a time for the ECEC plan meeting.']], D],
    ['kasvatuskumppanuus', 'partnership with parents', 'noun', 'Cooperation between staff and guardians in supporting the child. Stem: kasvatuskumppanuuden.', [['Kasvatuskumppanuus huoltajien kanssa on tärkeää.', 'Partnership with the guardians is important.']], D],
    ['vanhempainilta', 'parents\' evening', 'noun', 'An evening meeting for all the parents of a group.', [['Vanhempainilta on torstaina.', 'The parents\' evening is on Thursday.']], D],
    ['tutustumisjakso', 'settling-in period', 'noun', 'The first days or weeks when a new child gets to know the daycare, usually with a parent.', [['Tutustumisjakso kestää noin kaksi viikkoa.', 'The settling-in period lasts about two weeks.']], D],
    ['hoitoaika', 'care hours, booked care time', 'noun', 'The hours a child is booked to be at daycare, usually reported in an app. Stem: hoitoajan.', [['Ilmoita lapsen hoitoajat sovellukseen.', 'Report the child\'s care hours in the app.']], D],
    ['poissaolo', 'absence', 'noun', 'When a child is not at daycare, e.g. because of illness.', [['Ilmoitathan poissaolosta aamulla.', 'Please report any absence in the morning.']], D],
    ['tiedote', 'notice, newsletter', 'noun', 'A written message to guardians. Stem: tiedotteen, tiedotetta.', [['Viikon tiedote on sovelluksessa.', 'The weekly newsletter is in the app.']], D],
    ['työvuoro', 'work shift', 'noun', 'aamuvuoro = morning shift, iltavuoro = evening shift.', [['Työvuoroni alkaa kello seitsemän.', 'My shift starts at seven o\'clock.']], D],
    ['palaveri', 'meeting', 'noun', 'A work meeting, e.g. tiimipalaveri = team meeting.', [['Tiimipalaveri on keskiviikkona.', 'The team meeting is on Wednesday.']], D],
    ['havainnointi', 'observation', 'noun', 'Watching and documenting children\'s play and learning to plan activities. Verb: havainnoida.', [['Havainnointi auttaa suunnittelemaan toimintaa.', 'Observation helps in planning activities.']], D],

    // The daily rhythm
    ['aamupiiri', 'morning circle', 'noun', 'A short gathering in the morning with songs, the calendar and the day\'s plan.', [['Aamupiirissä lauletaan ja katsotaan kalenteria.', 'In the morning circle we sing and look at the calendar.']], D],
    ['tuokio', 'session, activity time', 'noun', 'A short planned activity, e.g. musiikkituokio (music session), satutuokio (story time).', [['Aamupäivällä on musiikkituokio.', 'In the morning there\'s a music session.']], D],
    ['ulkoilu', 'outdoor time, outdoor play', 'noun', 'Time spent playing outside, usually twice a day in all weathers.', [['Ulkoilu alkaa kymmeneltä.', 'Outdoor time starts at ten.']], D],
    ['ruokailu', 'mealtime', 'noun', 'Eating together, e.g. lunch at the daycare.', [['Ennen ruokailua pestään kädet.', 'Hands are washed before the meal.']], D],
    ['välipala', 'snack', 'noun', 'A small meal between main meals, usually in the afternoon.', [['Välipalaksi on leipää ja maitoa.', 'For snack there is bread and milk.']], D],
    ['lepohetki', 'rest time', 'noun', 'A quiet time after lunch for resting or sleeping. Stem: lepohetken.', [['Lepohetken aikana luetaan satu.', 'A story is read during rest time.']], D],
    ['päiväunet', 'nap, afternoon nap', 'noun', 'Always plural: nukkua päiväunet = to take a nap.', [['Pienimmät nukkuvat päiväunet.', 'The youngest ones take a nap.']], D],
    ['hakea', 'to pick up, to fetch', 'verb', 'Type 1 · minä haen · hän haki (past). hakea lapsi päiväkodista = pick up a child from daycare.', [['Isä hakee lapsen neljältä.', 'Dad picks up the child at four.']], DV],
    ['päivä meni hyvin', 'the day went well', 'phrase', 'What you often tell a parent at pick-up. Question: Miten päivä meni?', [['Päivä meni hyvin, hän leikki paljon ulkona.', 'The day went well, they played outside a lot.']], D],

    // Clothes and the cloakroom
    ['ulkovaatteet', 'outdoor clothes', 'noun', 'Plural. The clothes children put on to go outside.', [['Ulkovaatteet ovat lokerossa.', 'The outdoor clothes are in the cubby.']], D],
    ['kurahousut', 'rain trousers, waterproof trousers', 'noun', 'Plural. Waterproof trousers for mud and puddles (kura = mud).', [['Muista kurahousut!', 'Remember the rain trousers!']], D],
    ['välikausihaalari', 'mid-season overall', 'noun', 'A lined waterproof overall for spring and autumn.', [['Välikausihaalari on hyvä keväällä ja syksyllä.', 'A mid-season overall is good in spring and autumn.']], D],
    ['toppahaalari', 'snowsuit, winter overall', 'noun', 'A padded winter overall.', [['Talvella lapsella pitää olla toppahaalari.', 'In winter the child needs a snowsuit.']], D],
    ['lapanen', 'mitten', 'noun', 'Stem: lapasen, lapasta. Plural: lapaset.', [['Missä sinun lapasesi ovat?', 'Where are your mittens?']], D],
    ['pipo', 'beanie, knitted hat', 'noun', 'A warm knitted hat.', [['Laita pipo päähän.', 'Put your hat on.']], D],
    ['vaihtovaatteet', 'spare clothes, change of clothes', 'noun', 'Plural. Extra clothes kept at daycare in case of accidents or wet weather.', [['Tuokaa lapselle vaihtovaatteita.', 'Please bring spare clothes for the child.']], D],
    ['lokero', 'cubby, locker', 'noun', 'Each child\'s own shelf or locker for clothes in the cloakroom.', [['Vaatteet ovat lapsen omassa lokerossa.', 'The clothes are in the child\'s own cubby.']], D],
    ['kuraeteinen', 'boot room, mud room', 'noun', 'An entrance room where muddy outdoor clothes and boots are left. Stem: kuraeteisen.', [['Jätä kurahousut kuraeteiseen.', 'Leave the rain trousers in the boot room.']], D],
    ['kuivauskaappi', 'drying cabinet', 'noun', 'A heated cabinet for drying wet outdoor clothes.', [['Laitetaan märät vaatteet kuivauskaappiin.', 'Let\'s put the wet clothes in the drying cabinet.']], D],
    ['heijastinliivi', 'reflective vest, hi-vis vest', 'noun', 'A bright vest children wear on outings.', [['Retkellä lapsilla on heijastinliivit.', 'On outings the children wear reflective vests.']], D],
    ['pukea', 'to dress (someone), to put on', 'verb', 'Type 1 · minä puen · hän puki (past). pukea päälle = to put on.', [['Puetaan ulkovaatteet päälle.', 'Let\'s put our outdoor clothes on.']], DV],
    ['pukeutua', 'to get dressed', 'verb', 'Type 1 · minä pukeudun · hän pukeutui (past). Dressing oneself.', [['Osaatko jo pukeutua itse?', 'Can you get dressed by yourself already?']], DV],
    ['riisua', 'to undress, to take off', 'verb', 'Type 1 · minä riisun · hän riisui (past).', [['Riisu kengät eteisessä.', 'Take your shoes off in the hall.']], DV],

    // Care and health
    ['vaippa', 'nappy, diaper', 'noun', 'Stem: vaipan, vaippaa. vaihtaa vaippa = change a nappy.', [['Vaihdetaan vaippa.', 'Let\'s change the nappy.']], D],
    ['potta', 'potty', 'noun', 'Stem: potan, pottaa. käydä potalla = use the potty.', [['Harjoittelemme potalla käymistä.', 'We\'re practising using the potty.']], D],
    ['vessa', 'toilet, loo', 'noun', 'Everyday word for the toilet. käydä vessassa = go to the toilet.', [['Pitääkö sinun käydä vessassa?', 'Do you need to go to the toilet?']], D],
    ['tutti', 'dummy, pacifier', 'noun', 'Stem: tutin, tuttia.', [['Lapsi saa tutin vain päiväunille.', 'The child only gets the dummy for naps.']], D],
    ['unikaveri', 'cuddly toy, comfort toy', 'noun', 'A soft toy a child brings for rest time (literally "sleep buddy").', [['Unikaveri auttaa nukahtamaan.', 'A cuddly toy helps with falling asleep.']], D],
    ['sairas', 'sick, ill', 'adjective', 'Stem: sairaan, sairasta.', [['Sairasta lasta ei saa tuoda päiväkotiin.', 'A sick child must not be brought to daycare.']], D],
    ['kuume', 'fever, temperature', 'noun', 'Stem: kuumeen, kuumetta. Lapsella on kuumetta = the child has a fever.', [['Lapsella on kuumetta.', 'The child has a fever.']], D],
    ['allergia', 'allergy', 'noun', 'e.g. pähkinäallergia = nut allergy.', [['Lapsella on pähkinäallergia.', 'The child has a nut allergy.']], D],
    ['erityisruokavalio', 'special diet', 'noun', 'A diet for allergies, religion or other reasons.', [['Kolmella lapsella on erityisruokavalio.', 'Three children have a special diet.']], D],

    // Activities and play
    ['leikki', 'play, game', 'noun', 'Stem: leikin, leikkiä. vapaa leikki = free play.', [['Vapaa leikki on tärkeää.', 'Free play is important.']], D],
    ['leikkiä', 'to play', 'verb', 'Type 1 · minä leikin · hän leikki (past). For children\'s play; for sports and games use pelata.', [['Lapset leikkivät pihalla.', 'The children are playing in the yard.']], DV],
    ['piha', 'yard, playground', 'noun', 'The daycare\'s outdoor play area.', [['Mennään pihalle!', 'Let\'s go out to the yard!']], D],
    ['hiekkalaatikko', 'sandbox, sandpit', 'noun', 'Stem: hiekkalaatikon. leikkiä hiekkalaatikolla = play in the sandbox.', [['Hiekkalaatikolla on lapio ja ämpäri.', 'There\'s a spade and a bucket in the sandbox.']], D],
    ['lelu', 'toy', 'noun', 'A thing children play with.', [['Kerätään lelut pois.', 'Let\'s tidy away the toys.']], D],
    ['retki', 'trip, outing', 'noun', 'Stem: retken, retkeä. lähteä retkelle = go on an outing.', [['Lähdemme retkelle metsään.', 'We\'re going on a trip to the forest.']], D],
    ['liikunta', 'physical activity, PE', 'noun', 'Exercise and movement games, e.g. in the hall (sali).', [['Tiistaisin on liikuntaa salissa.', 'On Tuesdays there\'s physical activity in the hall.']], D],
    ['satu', 'fairy tale, story', 'noun', 'Stem: sadun, satua.', [['Luen teille sadun.', 'I\'ll read you a story.']], D],
    ['muovailuvaha', 'modelling clay, play dough', 'noun', 'Soft clay for shaping.', [['Lapset tekevät muovailuvahasta eläimiä.', 'The children make animals out of play dough.']], D],
    ['askarrella', 'to do crafts, to make (crafts)', 'verb', 'Type 3 · minä askartelen · hän askarteli (past). Noun: askartelu = crafts.', [['Askartelemme joulukortteja.', 'We\'re making Christmas cards.']], DV],
    ['piirtää', 'to draw', 'verb', 'Type 1 · minä piirrän · hän piirsi (past).', [['Piirrä kuva perheestäsi.', 'Draw a picture of your family.']], DV],
    ['maalata', 'to paint', 'verb', 'Type 4 · minä maalaan · hän maalasi (past).', [['Maalaamme vesiväreillä.', 'We\'re painting with watercolours.']], DV],
    ['laulaa', 'to sing', 'verb', 'Type 1 · minä laulan · hän lauloi (past).', [['Lauletaan yhdessä!', 'Let\'s sing together!']], DV],

    // Guiding the group and feelings
    ['jono', 'line, queue', 'noun', 'mennä jonoon = get in line.', [['Mennään jonoon.', 'Let\'s get in line.']], D],
    ['vuoro', 'turn', 'noun', 'Sinun vuorosi = your turn. odottaa vuoroaan = wait for one\'s turn.', [['Nyt on sinun vuorosi.', 'Now it\'s your turn.']], D],
    ['jakaa', 'to share, to divide', 'verb', 'Type 1 · minä jaan · hän jakoi (past).', [['Jaetaan lelut.', 'Let\'s share the toys.']], DV],
    ['riita', 'argument, quarrel', 'noun', 'Stem: riidan, riitaa. selvittää riita = sort out an argument.', [['Lapset selvittivät riidan yhdessä.', 'The children sorted out the argument together.']], D],
    ['itkeä', 'to cry', 'verb', 'Type 1 · minä itken · hän itki (past).', [['Älä itke, äiti tulee pian.', 'Don\'t cry, Mum will come soon.']], DV],
    ['lohduttaa', 'to comfort', 'verb', 'Type 1 · minä lohdutan · hän lohdutti (past). Takes the partitive.', [['Opettaja lohduttaa itkevää lasta.', 'The teacher comforts the crying child.']], DV],
    ['tunnetaidot', 'emotional skills, social-emotional skills', 'noun', 'Plural. Recognising, naming and handling feelings.', [['Harjoittelemme tunnetaitoja.', 'We practise emotional skills.']], D],
    ['kiusaaminen', 'bullying', 'noun', 'Stem: kiusaamisen. puuttua kiusaamiseen = intervene in bullying.', [['Kiusaamiseen puututaan heti.', 'Bullying is dealt with immediately.']], D],
    ['turvallinen', 'safe', 'adjective', 'Free from danger; feeling secure.', [['Päiväkodin pitää olla turvallinen paikka.', 'Daycare must be a safe place.']], D],
  ];

  const now = Date.now();
  const rows = raw.map((r) => r.concat(1)).concat(v2.map((r) => r.concat(2)), v3.map((r) => r.concat(3)));
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

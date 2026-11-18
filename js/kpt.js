/*
 * KPT (consonant gradation): practise when a word takes the strong grade (kauppa) and when the weak one (kaupan).
 * Sentences with a gap; the wrong options are the same form with the other grade, so the choice is about KPT.
 * Pure data and logic, shared by the app and the tests.
 */
(function (root, factory) {
  const kpt = factory(root.VocabCases || (typeof require === 'function' ? require('./cases.js') : null));
  if (typeof module === 'object' && module.exports) module.exports = kpt;
  else root.VocabKpt = kpt;
})(typeof self !== 'undefined' ? self : this, function (Cases) {
  'use strict';

  const SETS = {
    nouns: { name: 'Nouns: strong or weak?', icon: '🔤', blurb: 'kauppa → kaupassa · kauppaan · katu → kadulla · kenkä → kengässä' },
    inverse: { name: 'Inverse words: kiuas, rengas, liike', icon: '🔄', blurb: 'kiuas → kiukaalle · rengas → renkaassa · lääke → lääkkeen' },
    plurals: { name: 'KPT in the plural', icon: '👥', blurb: 'kaupat · kauppoja · kaupoissa · kauppoihin · renkaita' },
    verbs: { name: 'Verbs', icon: '🏃', blurb: 'lukea → luen · lukee · tavata → tapaan · tavataan' },
  };

  const W = 'Weak grade', S = 'Strong grade';
  // [set, sentence with ___, basic form, answer, [wrong forms], why, English]
  const ITEMS = [
    // Nouns with a strong basic form: weak before a closed syllable (-n, -ssa, -sta, -lla, -lta, -lle, -ksi, -t).
    ['nouns', 'Tämä on ___ ovi.', 'kauppa', 'kaupan', ['kauppan', 'kauppaan'], W + ': the genitive -n closes the syllable. pp → p.', 'This is the shop\'s door.'],
    ['nouns', 'Olen nyt ___.', 'kauppa', 'kaupassa', ['kauppassa', 'kauppaan'], W + ': -ssa (S-missä). pp → p.', 'I\'m in the shop now.'],
    ['nouns', 'Menen ___.', 'kauppa', 'kauppaan', ['kaupaan', 'kaupassa'], S + ': the illative (S-mihin) is always strong.', 'I\'m going to the shop.'],
    ['nouns', 'En löydä ___.', 'kauppa', 'kauppaa', ['kaupaa', 'kaupan'], S + ': the partitive is strong.', 'I can\'t find the shop.'],
    ['nouns', 'Talo meni nopeasti ___.', 'kauppa', 'kaupaksi', ['kauppaksi', 'kauppaa'], W + ': -ksi (translative). mennä kaupaksi = to sell.', 'The house sold quickly.'],
    ['nouns', 'Tämä on minun ___.', 'kauppa', 'kauppani', ['kaupani', 'kaupan'], S + ': a possessive ending (-ni, -si…) keeps the strong grade.', 'This is my shop.'],
    ['nouns', 'Asun tällä ___.', 'katu', 'kadulla', ['katulla', 'katua'], W + ': -lla (L-missä). t → d.', 'I live on this street.'],
    ['nouns', 'Kävelimme pitkin ___.', 'katu', 'katua', ['kadua', 'kadulla'], S + ': the partitive is strong.', 'We walked along the street.'],
    ['nouns', 'Kirja on ___.', 'pöytä', 'pöydällä', ['pöytällä', 'pöytään'], W + ': -llä. t → d.', 'The book is on the table.'],
    ['nouns', 'Astiat ovat ___.', 'kaappi', 'kaapissa', ['kaappissa', 'kaappiin'], W + ': -ssa. pp → p.', 'The dishes are in the cupboard.'],
    ['nouns', 'Laita astiat ___.', 'kaappi', 'kaappiin', ['kaapiin', 'kaapissa'], S + ': the illative is strong.', 'Put the dishes in the cupboard.'],
    ['nouns', '___ nimi on Aino.', 'tyttö', 'Tytön', ['Tyttön', 'Tyttöä'], W + ': genitive -n. tt → t.', 'The girl\'s name is Aino.'],
    ['nouns', 'Olin ___ ujo.', 'tyttö', 'tyttönä', ['tytönä', 'tytön'], S + ': the essive (-na, as) is strong.', 'As a girl I was shy.'],
    ['nouns', 'Kivi on ___.', 'kenkä', 'kengässä', ['kenkässä', 'kenkään'], W + ': -ssä. nk → ng.', 'There\'s a stone in my shoe.'],
    ['nouns', 'Etsin toista ___.', 'kenkä', 'kenkää', ['kengää', 'kengän'], S + ': the partitive is strong.', 'I\'m looking for the other shoe.'],
    ['nouns', 'Uimme ___.', 'lampi', 'lammessa', ['lampessa', 'lampeen'], W + ': -ssa. mp → mm.', 'We swam in the pond.'],
    ['nouns', 'Nähdään ___.', 'ilta', 'illalla', ['iltalla', 'iltaa'], W + ': -lla. lt → ll.', 'See you in the evening.'],
    ['nouns', 'Istumme ___.', 'ranta', 'rannalla', ['rantalla', 'rantaan'], W + ': -lla. nt → nn.', 'We\'re sitting on the beach.'],
    ['nouns', 'Mennään ___!', 'ranta', 'rantaan', ['rannaan', 'rannalla'], S + ': the illative is strong.', 'Let\'s go to the beach!'],
    ['nouns', 'Isoisän ___ on lunta.', 'parta', 'parrassa', ['partassa', 'partaan'], W + ': -ssa. rt → rr.', 'There\'s snow in Grandad\'s beard.'],
    ['nouns', 'Seison yhdellä ___.', 'jalka', 'jalalla', ['jalkalla', 'jalkaa'], W + ': -lla. k disappears: jalka → jala-.', 'I\'m standing on one leg.'],
    ['nouns', 'Uimme ___.', 'joki', 'joessa', ['jokessa', 'jokeen'], W + ': -ssa. k disappears: joki → joe-.', 'We swam in the river.'],
    ['nouns', 'Tämä on ___ pala.', 'leipä', 'leivän', ['leipän', 'leipää'], W + ': genitive -n. p → v.', 'This is a piece of bread.'],
    ['nouns', 'Ostin ___.', 'leipä', 'leipää', ['leivää', 'leivän'], S + ': the partitive is strong.', 'I bought some bread.'],
    ['nouns', 'Hän on uudessa ___.', 'puku', 'puvussa', ['pukussa', 'pukuun'], W + ': -ssa. uku → uvu (also kyky → kyvyn).', 'They\'re in a new suit.'],
    ['nouns', 'Lapset leikkivät ___.', 'hiekka', 'hiekassa', ['hiekkassa', 'hiekkaan'], W + ': -ssa. kk → k.', 'The children are playing in the sand.'],
    ['nouns', 'Karhun ___ näkyvät lumessa.', 'jälki', 'jäljet', ['jälket', 'jälkiä'], W + ': the t-plural. lk → lj.', 'The bear\'s tracks show in the snow.'],
    // Inverse words: weak basic form, strong in the other forms – except the partitive singular.
    ['inverse', 'Heitä löylyä ___.', 'kiuas', 'kiukaalle', ['kiuaalle', 'kiuasta'], 'Inverse: the basic form kiuas is weak, the other forms are strong: kiukaa-.', 'Throw water on the sauna stove.'],
    ['inverse', 'Lisää puita ___.', 'kiuas', 'kiukaaseen', ['kiuaaseen', 'kiukaalla'], 'Inverse and illative: strong. kiuas → kiukaaseen.', 'Put more wood in the stove.'],
    ['inverse', 'Lämmitän ___.', 'kiuas', 'kiuasta', ['kiukasta', 'kiukaan'], 'Inverse words keep the weak grade in the partitive singular: kiuasta.', 'I\'m heating up the sauna stove.'],
    ['inverse', '___ on reikä.', 'rengas', 'Renkaassa', ['Rengaassa', 'Rengasta'], 'Inverse: rengas → renkaa- (ng → nk).', 'There\'s a hole in the tyre.'],
    ['inverse', 'Tarvitsen uutta ___.', 'rengas', 'rengasta', ['renkasta', 'renkaan'], 'Partitive singular of an inverse word: weak. rengasta.', 'I need a new tyre.'],
    ['inverse', '___ juuri on kipeä.', 'hammas', 'Hampaan', ['Hammaan', 'Hammasta'], 'Inverse: hammas → hampaa- (mm → mp).', 'The root of the tooth is sore.'],
    ['inverse', '___ särkee.', 'hammas', 'Hammasta', ['Hampasta', 'Hampaan'], 'Partitive singular: weak. hammasta.', 'My tooth aches.'],
    ['inverse', '___ en lähde ulos.', 'sade', 'Sateella', ['Sadella', 'Sadetta'], 'Inverse -e word: sade → satee- (d → t).', 'In the rain I won\'t go out.'],
    ['inverse', 'Huomenna on luvassa ___.', 'sade', 'sadetta', ['satetta', 'sateen'], 'Partitive singular: weak. sadetta.', 'Rain is expected tomorrow.'],
    ['inverse', 'Ostin kengät tästä ___.', 'liike', 'liikkeestä', ['liikeestä', 'liikettä'], 'Inverse -e word: liike → liikkee- (k → kk).', 'I bought the shoes from this shop.'],
    ['inverse', 'Mikä tämän ___ nimi on?', 'lääke', 'lääkkeen', ['lääkeen', 'lääkettä'], 'Inverse: lääke → lääkkee-.', 'What\'s the name of this medicine?'],
    ['inverse', 'Tarvitsen ___.', 'lääke', 'lääkettä', ['lääkkettä', 'lääkkeen'], 'Partitive singular: weak. lääkettä.', 'I need some medicine.'],
    ['inverse', 'Kirje meni väärään ___.', 'osoite', 'osoitteeseen', ['osoiteeseen', 'osoitetta'], 'Inverse: osoite → osoittee- (t → tt).', 'The letter went to the wrong address.'],
    ['inverse', 'Vesi on ___.', 'keitin', 'keittimessä', ['keitimessä', 'keitintä'], 'Inverse -in word: keitin → keittime- (t → tt).', 'The water is in the kettle.'],
    ['inverse', 'Hän on töissä ___.', 'tehdas', 'tehtaalla', ['tehdaalla', 'tehdasta'], 'Inverse: tehdas → tehtaa- (d → t).', 'They work at a factory.'],
    ['inverse', '___ linna on suuri.', 'kuningas', 'Kuninkaan', ['Kuningaan', 'Kuningasta'], 'Inverse: kuningas → kuninkaa- (ng → nk).', 'The king\'s castle is big.'],
    ['inverse', 'Kysy ___.', 'opas', 'oppaalta', ['opaalta', 'opasta'], 'Inverse: opas → oppaa- (p → pp).', 'Ask the guide.'],
    // Plurals: weak in -issa, -ista, -illa, -ilta, -ille, -iksi and the t-plural; strong in the partitive, genitive, illative and essive.
    ['plurals', '___ ovat kiinni.', 'kauppa', 'Kaupat', ['Kauppat', 'Kauppoja'], 'Plural with -t: weak.', 'The shops are closed.'],
    ['plurals', 'Kaupungissa on paljon ___.', 'kauppa', 'kauppoja', ['kaupoja', 'kaupoissa'], 'Plural partitive: strong.', 'There are lots of shops in the town.'],
    ['plurals', '___ aukioloajat vaihtelevat.', 'kauppa', 'Kauppojen', ['Kaupojen', 'Kaupoissa'], 'Plural genitive: strong.', 'The shops\' opening hours vary.'],
    ['plurals', '___ on ruuhkaa.', 'kauppa', 'Kaupoissa', ['Kauppoissa', 'Kauppoihin'], 'Plural -issa: weak.', 'The shops are busy.'],
    ['plurals', 'Menemme ___.', 'kauppa', 'kauppoihin', ['kaupoihin', 'kaupoissa'], 'Plural illative: strong.', 'We\'re going to the shops.'],
    ['plurals', 'Lapset leikkivät ___.', 'katu', 'kaduilla', ['katuilla', 'katuja'], 'Plural -illa: weak. t → d.', 'The children play in the streets.'],
    ['plurals', 'Uusia ___ rakennetaan.', 'katu', 'katuja', ['kaduja', 'kaduilla'], 'Plural partitive: strong.', 'New streets are being built.'],
    ['plurals', '___ ovat valmiina.', 'pöytä', 'Pöydät', ['Pöytät', 'Pöytiä'], 'Plural with -t: weak.', 'The tables are ready.'],
    ['plurals', 'Ostin uusia ___.', 'kenkä', 'kenkiä', ['kengiä', 'kengät'], 'Plural partitive: strong.', 'I bought new shoes.'],
    ['plurals', '___ hinnat nousivat.', 'kenkä', 'Kenkien', ['Kengien', 'Kengät'], 'Plural genitive: strong.', 'Shoe prices went up.'],
    ['plurals', '___ on hauskaa.', 'tyttö', 'Tytöillä', ['Tyttöillä', 'Tyttöjä'], 'Plural -illä: weak. tt → t.', 'The girls are having fun.'],
    ['plurals', 'Suomen ___ on paljon kalaa.', 'joki', 'joissa', ['jokissa', 'jokia'], 'Plural -issa: weak. k disappears: joki → joissa.', 'There are lots of fish in Finland\'s rivers.'],
    ['plurals', 'Uimme ___.', 'lampi', 'lammissa', ['lampissa', 'lampiin'], 'Plural -issa: weak. mp → mm.', 'We swam in the ponds.'],
    ['plurals', '___ on paljon ihmisiä.', 'ranta', 'Rannoilla', ['Rantoilla', 'Rantoja'], 'Plural -illa: weak. nt → nn.', 'There are lots of people on the beaches.'],
    ['plurals', 'Laita astiat ___.', 'kaappi', 'kaappeihin', ['kaapeihin', 'kaapeissa'], 'Plural illative: strong.', 'Put the dishes in the cupboards.'],
    ['plurals', 'Astiat ovat ___.', 'kaappi', 'kaapeissa', ['kaappeissa', 'kaappeja'], 'Plural -issa: weak.', 'The dishes are in the cupboards.'],
    ['plurals', 'Söimme kaikki ___.', 'mansikka', 'mansikat', ['mansikkat', 'mansikoita'], 'Plural with -t: weak.', 'We ate all the strawberries.'],
    ['plurals', 'Ostin ___.', 'mansikka', 'mansikoita', ['mansikkoita', 'mansikat'], 'Long words ending in -kka/-kko stay weak even in the plural partitive: mansikoita (but kauppoja).', 'I bought strawberries.'],
    ['plurals', 'Kaikki ___ ovat kuumia.', 'kiuas', 'kiukaat', ['kiuaat', 'kiukaita'], 'Inverse word, plural: strong in all plural forms. kiukaat.', 'All the stoves are hot.'],
    ['plurals', 'Kaupassa on monenlaisia ___.', 'rengas', 'renkaita', ['rengaita', 'renkaat'], 'Inverse word, plural partitive: strong. renkaita.', 'The shop has all kinds of tyres.'],
    ['plurals', '___ hoito on tärkeää.', 'hammas', 'Hampaiden', ['Hammaiden', 'Hampaat'], 'Inverse word, plural genitive: strong. hampaiden.', 'Taking care of your teeth is important.'],
    ['plurals', 'Joissakin ___ on sivuvaikutuksia.', 'lääke', 'lääkkeissä', ['lääkeissä', 'lääkkeitä'], 'Inverse word: strong in the plural too. lääkkeissä.', 'Some medicines have side effects.'],
    // Verbs. Type 1: weak in minä/sinä/me/te, the imperative, the negative and the passive; strong in hän/he and the infinitive.
    ['verbs', 'Minä ___ kirjaa.', 'lukea', 'luen', ['luken', 'lukee'], 'Type 1, minä: weak. k disappears: lukea → luen.', 'I\'m reading a book.'],
    ['verbs', 'Hän ___ lehteä.', 'lukea', 'lukee', ['luee', 'luen'], 'Type 1, hän: strong. lukee.', 'They\'re reading the paper.'],
    ['verbs', 'Me ___ yhdessä.', 'lukea', 'luemme', ['lukemme', 'lukevat'], 'Type 1, me: weak.', 'We read together.'],
    ['verbs', '___ tämä!', 'lukea', 'Lue', ['Luke', 'Lukee'], 'The imperative (sinä): weak. Lue!', 'Read this!'],
    ['verbs', 'En ___ lehteä.', 'lukea', 'lue', ['luke', 'lukee'], 'The negative (en, et, ei…): weak. en lue.', 'I don\'t read the paper.'],
    ['verbs', 'Täällä ___ paljon.', 'lukea', 'luetaan', ['luketaan', 'lukevat'], 'The passive present: weak. luetaan.', 'People read a lot here.'],
    ['verbs', 'Hän ___ kirjan eilen.', 'lukea', 'luki', ['lui', 'luin'], 'Past tense, hän: strong. luki.', 'They read the book yesterday.'],
    ['verbs', 'Minä ___ kahvia.', 'ottaa', 'otan', ['ottan', 'ottaa'], 'Type 1, minä: weak. tt → t.', 'I\'ll have some coffee.'],
    ['verbs', 'He ___ taksin.', 'ottaa', 'ottavat', ['otavat', 'otamme'], 'Type 1, he: strong.', 'They take a taxi.'],
    ['verbs', 'Minä ___ sen.', 'tietää', 'tiedän', ['tietän', 'tietää'], 'Type 1, minä: weak. t → d.', 'I know it.'],
    ['verbs', 'Minä ___ hyvin.', 'nukkua', 'nukun', ['nukkun', 'nukkuu'], 'Type 1, minä: weak. kk → k.', 'I sleep well.'],
    ['verbs', 'Vauva ___.', 'nukkua', 'nukkuu', ['nukuu', 'nukun'], 'Type 1, hän: strong.', 'The baby is sleeping.'],
    ['verbs', 'Sinä ___ hyvin.', 'kirjoittaa', 'kirjoitat', ['kirjoittat', 'kirjoittaa'], 'Type 1, sinä: weak. tt → t.', 'You write well.'],
    ['verbs', 'Minä ___.', 'ymmärtää', 'ymmärrän', ['ymmärtän', 'ymmärtää'], 'Type 1, minä: weak. rt → rr.', 'I understand.'],
    ['verbs', 'Minä ___ sinulle lahjan.', 'antaa', 'annan', ['antan', 'antaa'], 'Type 1, minä: weak. nt → nn.', 'I\'ll give you a present.'],
    // Types 3 and 4: inverse. The infinitive is weak, the present tense strong, the passive weak again.
    ['verbs', 'Minä ___ ystävän huomenna.', 'tavata', 'tapaan', ['tavaan', 'tapaa'], 'Type 4 is inverse: infinitive weak (tavata), present strong (tapaan). v → p.', 'I\'m meeting a friend tomorrow.'],
    ['verbs', 'Huomenna ___!', 'tavata', 'tavataan', ['tapataan', 'tapaamme'], 'The passive of an inverse verb: weak, like the infinitive. tavataan.', 'See you tomorrow!'],
    ['verbs', 'Minä ___ koiria.', 'pelätä', 'pelkään', ['pelään', 'pelkää'], 'Type 4, inverse: pelätä → pelkään (k comes back).', 'I\'m afraid of dogs.'],
    ['verbs', 'Lapsi ___ lätäkköön.', 'hypätä', 'hyppää', ['hypää', 'hyppäsi'], 'Type 4, inverse: hypätä → hyppää (p → pp).', 'The child jumps into the puddle.'],
    ['verbs', 'Minä ___ tulla.', 'luvata', 'lupaan', ['luvaan', 'lupaa'], 'Type 4, inverse: luvata → lupaan (v → p).', 'I promise to come.'],
    ['verbs', 'Lasi ___ lattialle.', 'pudota', 'putoaa', ['pudoaa', 'putosi'], 'Type 4, inverse: pudota → putoaa (d → t).', 'The glass falls on the floor.'],
    ['verbs', 'Minä ___ mekon.', 'ommella', 'ompelen', ['ommelen', 'ompelee'], 'Type 3, inverse: ommella → ompelen (mm → mp).', 'I\'m sewing a dress.'],
    ['verbs', 'Minä ___ musiikkia.', 'kuunnella', 'kuuntelen', ['kuunnelen', 'kuuntelee'], 'Type 3, inverse: kuunnella → kuuntelen (nn → nt).', 'I\'m listening to music.'],
    ['verbs', 'Minä ___ hotellissa.', 'yöpyä', 'yövyn', ['yöpyn', 'yöpyy'], 'Type 1, minä: weak. p → v: yöpyä → yövyn.', 'I\'m staying at a hotel.'],
    ['verbs', 'Minä ___ sohvalla.', 'maata', 'makaan', ['makaa', 'maan'], 'Type 4, inverse: maata → makaan (k comes back). Passive: maataan, maattiin.', 'I\'m lying on the sofa.'],
    ['verbs', 'Älä ___ koko ajan!', 'valittaa', 'valita', ['valitta', 'valittaa'], 'The negative command (älä + stem): weak. valittaa → älä valita (tt → t).', 'Stop complaining all the time!'],
    ['verbs', 'Älä ___ siitä!', 'välittää', 'välitä', ['välittä', 'välittää'], 'The negative command (älä + stem): weak. välittää → älä välitä (tt → t). Compare: älä valita (valittaa).', 'Never mind about that!'],
  ];

  // The rules page, shown on the game's start page.
  const RULES =
    '<p>Many words change a <strong>k, p or t</strong> in the middle when you add an ending. The basic form usually has the ' +
    '<strong>strong</strong> grade, and some endings make it <strong>weak</strong>.</p>' +
    '<h3>The pairs (strong → weak)</h3>' +
    '<table class="rules-table"><tr><th>Strong → weak</th><th>Example</th></tr>' +
    [['kk → k', 'kukka → kukan'], ['pp → p', 'kauppa → kaupan'], ['tt → t', 'tyttö → tytön'], ['k → (disappears)', 'joki → joen, jalka → jalan'],
      ['p → v', 'leipä → leivän'], ['t → d', 'katu → kadun'], ['nk → ng', 'kenkä → kengän'], ['mp → mm', 'lampi → lammen'],
      ['lt → ll', 'ilta → illan'], ['nt → nn', 'ranta → rannan'], ['rt → rr', 'parta → parran'], ['lke/lki → lje/lji', 'jälki → jäljen'],
      ['uku / yky → uvu / yvy', 'puku → puvun, kyky → kyvyn']]
      .map(([a, b]) => '<tr><td>' + a + '</td><td lang="fi">' + b + '</td></tr>').join('') + '</table>' +
    '<h3>Normal words (kauppa): when weak?</h3>' +
    '<p><strong>Weak</strong> when the ending closes the syllable with a consonant: genitive <em>-n</em> (kaupan), <em>-ssa</em> (kaupassa), ' +
    '<em>-sta</em>, <em>-lla</em>, <em>-lta</em>, <em>-lle</em>, <em>-ksi</em>, and the t-plural (kaupat).</p>' +
    '<p><strong>Strong</strong>: the partitive (kauppaa), the illative / S-mihin (kauppaan), the essive (kauppana) and with possessive ' +
    'endings (kauppani). Learn these as the "strong group".</p>' +
    '<h3>Plural</h3>' +
    '<p><strong>Weak</strong>: kaupat, kaupoissa, kaupoista, kaupoilla, kaupoilta, kaupoille, kaupoiksi. ' +
    '<strong>Strong</strong>: kauppoja, kauppojen, kauppoihin, kauppoina.</p>' +
    '<p>Exception: long words ending in -kka / -kko (mansikka, mustikka, laatikko) stay weak in all plural forms: ' +
    'mansikoita, mansikoiden, laatikoita.</p>' +
    '<h3>Inverse words (kiuas): the other way round</h3>' +
    '<p>Here the <strong>basic form is weak</strong> and the other forms are strong: kiuas → kiukaan, kiukaassa, kiukaaseen, kiukaat, kiukaita. ' +
    'Only the <strong>partitive singular stays weak</strong>: kiuasta.</p>' +
    '<p>Typical inverse words: <em>-as / -äs</em> (kiuas, rengas, hammas, opas, tehdas, kuningas), <em>-e</em> (sade → sateen, ' +
    'liike → liikkeen, lääke → lääkkeen, osoite → osoitteen) and <em>-in</em> (keitin → keittimen).</p>' +
    '<h3>Verbs</h3>' +
    '<p><strong>Type 1</strong> (lukea, ottaa, tietää): weak in minä, sinä, me, te (luen, otan, tiedän), the imperative (Lue!), the negative ' +
    '(en lue) and the passive (luetaan); strong in hän, he (lukee, lukevat) and the infinitive.</p>' +
    '<p><strong>Types 3 and 4 are inverse</strong> (tavata, pelätä, luvata, ommella, kuunnella): the infinitive is weak, the present tense strong ' +
    '(tapaan, pelkään, lupaan, ompelen, kuuntelen), and the passive weak again (tavataan).</p>';

  const shuffle = (arr, rng) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  };
  function toExercise([set, sentence, base, answer, wrong, note, en]) {
    return { kind: set, shown: base, task: 'Strong or weak? Put the word in the right form', context: sentence, answer, accept: [], wrong, note, en, strict: true };
  }
  const exercises = (set) => ITEMS.filter((it) => set === 'mixed' || it[0] === set).map(toExercise);
  function round(set, n, rng) {
    rng = rng || Math.random;
    return shuffle(exercises(set), rng).slice(0, n).map((ex) => Object.assign(ex, { options: shuffle([ex.answer].concat(ex.wrong.slice(0, 3)), rng) }));
  }

  return { SETS, ITEMS, RULES, exercises, round, check: Cases.check };
});

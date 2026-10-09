/*
 * Language levels for the starter words, on the Finnish scale used by schools and YKI
 * (A1.1 … C1.1, the CEFR levels split into sub-levels).
 * A word's level is WORD[finnish] if listed, otherwise the level of its first category.
 * These are estimates for a learner of Finnish as a second language.
 */
(function (root, factory) {
  const levels = factory();
  if (typeof module === 'object' && module.exports) module.exports = levels;
  else root.VocabLevels = levels;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  const SCALE = ['A1.1', 'A1.2', 'A1.3', 'A2.1', 'A2.2', 'B1.1', 'B1.2', 'B2.1', 'B2.2', 'C1.1'];

  const CATEGORY = {
    'Greetings': 'A1.1', 'Food & drink': 'A1.2', 'Family': 'A1.1', 'Home': 'A1.2', 'Numbers': 'A1.1',
    'Colours': 'A1.1', 'Verbs': 'A1.2', 'Nature': 'A1.3', 'Feelings': 'A2.1', 'Shapes': 'A2.1',
    'A2.2 verbs': 'A2.2', 'Daycare': 'B1.1', 'Daycare: play': 'A2.1', 'Daycare: safety': 'A2.2',
    'Talking to parents': 'B1.1', 'ECEC terms': 'B1.2', 'Working life': 'A2.2', 'Time & calendar': 'A1.2',
    'Weather & seasons': 'A1.3', 'Body & health': 'A1.3', 'Clothes': 'A1.2', 'Shopping & money': 'A1.3',
    'Getting around': 'A1.3', 'Services & offices': 'A2.2', 'Animals': 'A1.2', 'Question words': 'A1.1',
    'Opposites': 'A1.2', 'Small words': 'A1.3', 'Survival phrases': 'A1.1', 'Spoken Finnish': 'A2.1',
    'Holidays & traditions': 'A2.1', 'Finnish food': 'A2.1', 'At the shop': 'A2.1', 'At the library': 'A2.1',
    'At the health centre': 'A2.2', 'At the café': 'A2.1', 'Bus & train': 'A2.1', 'Daycare pick-up': 'A2.2',
    'On the phone': 'A2.2', 'At the office': 'A2.2', 'Emergency call': 'A2.2',
    'Pronouns': 'A1.1', 'Where things are': 'A1.3', 'Daycare: instructions': 'A2.1', 'Daycare: praise': 'A2.1',
    'Daycare: songs & circle time': 'A2.2', 'Child development': 'B1.2', 'Neuvola & school': 'A2.2', 'Housing': 'A2.2',
    'Recycling': 'A2.2', 'Sauna & nature': 'A2.2', 'Hobbies & sport': 'A2.1', 'Jobs': 'A2.1', 'Countries & languages': 'A1.2',
    'Technology': 'A2.1', 'Personality': 'A2.2', 'Time expressions': 'A2.1', 'Must, may & can': 'A2.2',
    'Verbs with cases': 'B1.1', 'Linking words': 'B1.1', 'Work emails': 'B1.1', 'Sayings': 'B1.2', 'Illnesses': 'A2.2',
    'Everyday actions': 'A2.1', 'Describing things': 'A2.1', 'Computer problems': 'B1.1', 'Studying & writing': 'A2.2',
    'Daycare: meals': 'A2.1', 'Daycare: rest & hygiene': 'A2.1', 'Daycare: outdoors': 'A2.1', 'Daycare: arts & crafts': 'A2.1',
    'Daycare: friends & conflicts': 'A2.2', 'Daycare: games & stories': 'A2.1', 'Planning & documentation': 'B1.2',
    'Support & inclusion': 'B1.2', 'Cooking & kitchen': 'A2.1', 'Banking & bills': 'B1.1', 'Kela, taxes & forms': 'B1.1',
    'Car & driving': 'A2.2', 'Doctor & pharmacy': 'A2.2', 'Feeling verbs': 'A2.2', 'Opinions & discussion': 'B1.1',
    'Polite requests': 'A2.2', 'Abbreviations': 'A2.2', 'Confusing words': 'A2.1', 'Slang': 'A2.2', 'Finnish customs': 'A2.2',
    'Streets & place names': 'A2.1',
  };

  // Words that are easier or harder than their category.
  const groups = {
    'A1.1': ['ole hyvä', 'vesi', 'maito', 'kahvi', 'puhua', 'syödä', 'juoda', 'mennä', 'asua', 'tulla',
      'maanantai', 'tiistai', 'keskiviikko', 'torstai', 'perjantai', 'lauantai', 'sunnuntai', 'tänään', 'huomenna',
      'eilen', 'kello', 'kylmä', 'kauppa', 'euro', 'bussi', 'auto', 'koira', 'kissa', 'iso', 'pieni', 'uusi', 'vanha',
      'hyvä', 'huono', 'ja', 'moi', 'joo', 'kiitti', 'okei', 'kiva'],
    'A1.2': ['näkemiin', 'aurinko', 'lumi', 'järvi', 'metsä', 'väsynyt', 'ostaa', 'maksaa', 'tehdä', 'haluta',
      'opiskella', 'nukkua', 'ymmärtää', 'vessa', 'tammikuu', 'helmikuu', 'maaliskuu', 'huhtikuu', 'toukokuu',
      'kesäkuu', 'heinäkuu', 'elokuu', 'syyskuu', 'lokakuu', 'marraskuu', 'joulukuu', 'aamupäivä', 'iltapäivä',
      'viikko', 'kuukausi', 'vuosi', 'tunti', 'minuutti', 'viikonloppu', 'sää', 'sataa', 'kuuma', 'lämmin', 'kevät',
      'kesä', 'syksy', 'talvi', 'pää', 'käsi', 'jalka', 'silmä', 'suu', 'nenä', 'korva', 'lääkäri', 'raha', 'hinta',
      'kallis', 'halpa', 'kortti', 'ruokakauppa', 'juna', 'metro', 'pyörä', 'kävellä', 'kirjasto', 'eläin', 'hevonen',
      'lehmä', 'kala', 'lintu', 'millainen', 'kuinka monta', 'mistä', 'mihin', 'kaunis', 'auki', 'kiinni', 'mutta',
      'tai', 'myös', 'aina', 'voisitko toistaa', 'miten sanotaan', 'mitä tarkoittaa', 'joulu', 'syntymäpäivä',
      'kahvila', 'täällä', 'numero', 't-paita'],
    'A1.3': ['iloinen', 'surullinen', 'vihainen', 'tähti', 'sydän', 'pallo', 'myydä', 'nähdä', 'oppia', 'tietää',
      'kysyä', 'odottaa', 'tykätä', 'soittaa', 'päiväkoti', 'leikkiä', 'sairas', 'laulaa', 'juosta', 'nähdään huomenna',
      'hyvää viikonloppua', 'puoli', 'kalenteri', 'sade', 'tuuli', 'kipeä', 'apteekki', 'lääke', 'hammas', 'terve',
      'selkä', 'sormi', 'vatsa', 'koko', 'sentti', 'kassa', 'ajaa', 'vasen', 'oikea', 'posti', 'pankki', 'poliisi',
      'karhu', 'susi', 'hirvi', 'poro', 'kettu', 'jänis', 'orava', 'lammas', 'ankka', 'hiiri', 'kenen', 'mihin aikaan',
      'hidas', 'nopea', 'aikaisin', 'myöhään', 'ruma', 'vai', 'koska', 'vielä', 'jo', 'ehkä', 'usein', 'joskus',
      'ensin', 'sitten', 'mä', 'sä', 'tosi', 'lahja', 'joulupukki', 'onnea', 'ruisleipä', 'pulla', 'puuro', 'karkki',
      'makkara', 'seuraava', 'keskusta', 'ulkona', 'haloo', 'sairaala'],
    'A2.1': ['onnellinen', 'ilo', 'rakkaus', 'auttaa', 'muistaa', 'unohtaa', 'tarvita', 'osata', 'tavata', 'lähteä',
      'käydä', 'etsiä', 'löytää', 'vastata', 'kertoa', 'herätä', 'rakastaa', 'pitää', 'matkustaa', 'siivota', 'pestä',
      'alkaa', 'leikki', 'piha', 'lelu', 'pipo', 'lapanen', 'kuume', 'piirtää', 'maalata', 'hakea', 'päivä meni hyvin',
      'heittää', 'hypätä', 'lumiukko', 'nukke', 'ei hätää', 'mihin sattuu', 'laastari', 'hätänumero', 'kaatua',
      'lapsi söi hyvin', 'hän nukkui tunnin', 'hän oli väsynyt', 'hänellä oli hyvä päivä', 'palkka', 'loma',
      'työkaveri', 'kahvitauko', 'vartti', 'päivämäärä', 'pakkanen', 'aste', 'pilvinen', 'terveyskeskus', 'flunssa',
      'yskä', 'kurkku', 'polvi', 'villapaita', 'kumisaappaat', 'kaulahuivi', 'alushousut', 'kokeilla', 'sopia',
      'pyjama', 'hanska', 'kuitti', 'alennus', 'ale', 'tarjous', 'vaihtaa', 'lasku', 'ostoskassi', 'käteinen',
      'myöhässä', 'ajoissa', 'aikataulu', 'matkakortti', 'suoraan', 'ratikka', 'raitiovaunu', 'passi', 'paketti',
      'lainata', 'henkilökortti', 'Kela', 'siili', 'joutsen', 'hämähäkki', 'perhonen', 'possu', 'montako', 'kumpi',
      'raskas', 'kevyt', 'puhdas', 'likainen', 'märkä', 'kuiva', 'täynnä', 'tyhjä', 'että', 'jos', 'kun', 'koskaan',
      'heti', 'myöhemmin', 'olen pahoillani', 'kirjoittaisitko sen', 'juhannus', 'mökki', 'kynttilä', 'mukaan',
      'tilata', 'ulos', 'sisällä', 'sisälle', 'asunto', 'osoite', 'puhelu', 'tekstiviesti', 'myyjä', 'asiakas',
      'isompi', 'pienempi', 'kerros', 'kipu', 'tabletti', 'salasana', 'pähkinä', 'ajokortti', 'lähettää', 'täyttää',
      'ambulanssi', 'tulipalo', 'hengittää'],
    'A2.2': ['hermostunut', 'peloissaan', 'huolissaan', 'innoissaan', 'yllättynyt', 'pettynyt', 'yksinäinen',
      'rauhallinen', 'tunne', 'suru', 'pelko', 'kulma', 'muoto', 'suora', 'allergia', 'satu', 'itkeä', 'retki', 'ryhmä',
      'ruokailu', 'välipala', 'ulkoilu', 'päiväunet', 'vaippa', 'potta', 'tutti', 'eskari', 'ulkovaatteet', 'pukea',
      'pukeutua', 'riisua', 'jono', 'vuoro', 'jakaa', 'turvallinen', 'lokero', 'kurahousut', 'toppahaalari', 'hippa',
      'palapeli', 'potkia', 'haava', 'varovainen', 'ensiapu', 'vuotaa', 'aurinkorasva', 'kiitos tiedosta', 'tiimi',
      'lomake', 'työaika', 'liukas', 'räntä', 'sääennuste', 'ukkonen', 'myrsky', 'sumu', 'särkeä', 'resepti', 'nuha',
      'lippis', 'nappi', 'pantti', 'palauttaa', 'tili', 'risteys', 'suojatie', 'kulkea', 'jonottaa', 'muurahainen',
      'hyttynen', 'eikö', 'vaikka', 'siksi', 'ihan sama', 'duuni', 'kämppä', 'uudenvuodenaatto', 'itsenäisyyspäivä',
      'nimipäivä', 'korvapuusti', 'karjalanpiirakka', 'hana', 'tuote', 'hylly', 'lähtö', 'allerginen', 'laktoositon',
      'oire', 'hätäkeskus', 'ovikoodi', 'onnettomuus', 'varas', 'savu', 'palokunta'],
    'B1.1': ['kateellinen', 'tylsistynyt', 'suorakulmio', 'soikio', 'kuutio', 'huoltaja', 'kiusaaminen',
      'välikausihaalari', 'kuraeteinen', 'kuivauskaappi', 'heijastinliivi', 'roolileikki', 'vuorotella',
      'kiipeilyteline', 'kylmäpakkaus', 'tapaturma', 'pistos', 'turvallisuus', 'kotikieli', 'pienryhmä', 'suunnitella',
      'arvioida', 'ammattiliitto', 'perehdytys', 'määräaikainen', 'vakituinen', 'työterveys', 'ansioluettelo',
      'esihenkilö', 'verokortti', 'työsopimus', 'ylityö', 'vetoketju', 'tunnistautua', 'pankkitunnukset',
      'oleskelulupa', 'muuttoilmoitus', 'verotoimisto', 'allekirjoitus', 'kuitenkin', 'virpominen', 'laskiainen',
      'kokko', 'munavoi', 'mämmi', 'piimä', 'leipäjuusto', 'lakka', 'gluteeniton', 'huoltoyhtiö', 'yleisavain',
      'vuokrasopimus', 'palkkatodistus', 'liite', 'asumistuki', 'henkilöllisyystodistus', 'myöhästymismaksu',
      'lainausautomaatti', 'sähköinen resepti', 'päivystys', 'vastaanotto', 'vaivata', 'tulot', 'kylkiasento',
      'elvyttää', 'tajuton', 'adrenaliinikynä', 'rappukäytävä', 'murto', 'kunta', 'sammutin', 'palovaroitin'],
    'B1.2': ['varhaiskasvatussuunnitelma', 'kasvatuskumppanuus', 'havainnointi', 'tunnetaidot', 'havainnoida'],
  };
  // Version 7 additions.
    groups['A1.1'] = groups['A1.1'].concat(['olla', 'lukea', 'kirjoittaa', 'minä', 'sinä', 'hän', 'me', 'te', 'he', 'tämä', 'tuo', 'minun', 'sinun', 'kaikki', 'Suomi', 'suomalainen', 'suomeksi', 'nyt', 'koulu', 'kirja', 'kotona']);
    groups['A1.2'] = groups['A1.2'].concat(['saada', 'antaa', 'ottaa', 'sanoa', 'katsoa', 'kuunnella', 'istua', 'avata', 'voida', 'nämä', 'nuo', 'yksitoista', 'kaksitoista', 'viisitoista', 'kaksikymmentä', 'kolmekymmentä', 'sata', 'tuhat', 'väri', 'vaalea', 'tumma', 'violetti', 'vaaleanpunainen', 'isoäiti', 'isoisä', 'vanhemmat', 'nälkä', 'jano', 'avain', 'lamppu', 'kotiin', 'tule tänne', 'hienoa', 'laulu', 'uida', 'elokuva', 'opettaja', 'opiskelija', 'kotoisin', 'englanti', 'englanniksi', 'puhelin', 'aamulla', 'illalla', 'tänään on', 'perhe']);
    groups['A1.3'] = groups['A1.3'].concat(['seistä', 'sulkea', 'nauraa', 'tanssia', 'laittaa', 'pelata', 'joku', 'jokin', 'kukaan', 'oma', 'itse', 'miljoona', 'ensimmäinen', 'toinen', 'kolmas', 'mummo', 'vaari', 'setä', 'täti', 'serkku', 'aamiainen', 'lounas', 'sipuli', 'jogurtti', 'pesukone', 'eteinen', 'parveke', 'kaappi', 'seinä', 'lattia', 'matto', 'uuni', 'töissä', 'töihin', 'kotoa', 'tänne', 'täältä', 'siellä', 'sinne', 'sieltä', 'sisään', 'kuuntele', 'odota', 'istu alas', 'pese kädet', 'hauska', 'yöllä', 'pian', 'täytyy', 'saa', 'ei saa', 'reppu', 'luokka', 'netti', 'sähköposti', 'Ruotsi', 'Viro', 'Venäjä', 'Norja', 'maa', 'kieli']);
    groups['A2.1'] = groups['A2.1'].concat(['leikata', 'nostaa', 'rakentaa', 'tuntua', 'elää', 'muuttaa', 'kokata', 'mikään', 'viimeinen', 'puolitoista', 'sukulainen', 'sisarus', 'naimisissa', 'herkullinen', 'maistua', 'päivällinen', 'pakastin', 'astianpesukone', 'liesi', 'katto', 'välissä', 'keskellä', 'ylhäällä', 'alhaalla', 'hyvin tehty', 'harjoitella', 'piiri', 'rumpu', 'vuodenaika', 'kuvakirja', 'läksyt', 'oppilas', 'välitunti', 'naapuri', 'kerrostalo', 'vuokra', 'roska', 'muovi', 'paperi', 'lasi', 'metalli', 'saunoa', 'harrastus', 'voittaa', 'ammatti', 'äidinkieli', 'kiltti', 'ujo', 'rohkea', 'laiska', 'ystävällinen', 'hiljainen', 'juuri', 'minun pitää', 'ei tarvitse', 'voisin', 'sen jälkeen', 'esimerkiksi', 'hyvä mieli', 'paha mieli', 'ikävä', 'halata', 'hali', 'itku', 'nauru', 'pelottaa', 'miltä sinusta tuntuu', 'mikä hätänä', 'olo', 'paha olo', 'vatsakipu', 'päänsärky', 'levätä', 'korona', 'ruotsiksi', 'suomen kieli', 'Eurooppa']);
    groups['A2.2'] = groups['A2.2'].concat(['kirjava', 'puoliso', 'varovasti', 'ei haittaa', 'jaksaa', 'onnistua', 'vahinko', 'insinööri', 'ohjelmoija', 'eläkeläinen', 'työtön', 'kansallisuus', 'ulkomaalainen', 'Pohjoismaat', 'kirjautua', 'verkkopankki', 'sosiaalinen', 'reipas', 'äsken', 'toissapäivänä', 'ylihuomenna', 'arkisin', 'viikonloppuisin', 'tunnin kuluttua', 'ehtiä', 'kannattaa', 'pitäisi', 'on pakko', 'vaan', 'joten', 'ennen kuin', 'eli', 'lopuksi', 'sisu', 'ota rennosti', 'samaa mieltä', 'nolo', 'kiitollinen', 'tyytyväinen', 'helpottunut', 'ärsyttää', 'harmittaa', 'jännittää', 'kiukkuinen', 'rakastunut', 'ihastunut', 'loukkaantunut', 'suuttua', 'rauhoittua', 'oksentaa', 'täi', 'lepo', 'sairastua', 'parantua', 'kirpputori', 'revontulet', 'lenkki', 'käsityöt', 'neuloa', 'joukkue', 'hävitä', 'yksiö', 'kaksio', 'kellari']);
    groups['B1.1'] = groups['B1.1'].concat(['kärsivällinen', 'itsepäinen', 'luotettava', 'huumorintaju', 'toimittaja', 'yrittäjä', 'kansalaisuus', 'käyttäjätunnus', 'päivittää', 'saattaa', 'taitaa', 'viitsiä', 'uskaltaa', 'mahtua', 'kyllä se siitä', 'masentunut', 'ahdistunut', 'turhautunut', 'stressaantunut', 'mustasukkainen', 'hämmentynyt', 'kärsimätön', 'häpeä', 'pelästyä', 'ilahtua', 'kutista', 'tarttua', 'tarttuva', 'kuumeeton', 'oireeton', 'pahoinvointi', 'vuorokausi', 'antibiootti', 'nenäsumute', 'verenpaine', 'migreeni', 'isännöitsijä', 'takuuvuokra', 'järjestyssäännöt', 'kotivakuutus', 'sähkösopimus', 'vuokranantaja', 'vuokralainen', 'kartonki', 'lajitella', 'jätekatos', 'vaarallinen jäte', 'jokamiehenoikeus', 'kaamos', 'ruska', 'laavu', 'tunturi', 'lauteet', 'vihta', 'yötön yö', 'terveydenhoitaja', 'iltapäiväkerho']);
  // Version 8 additions.
    groups['A1.2'] = groups['A1.2'].concat(['suihku', 'kynä', 'sana', 'kysymys', 'vastaus', 'mukava', 'isi', 'käydä kaupassa']);
    groups['A1.3'] = groups['A1.3'].concat(['harjata', 'keittää', 'sammuttaa', 'sytyttää', 'pehmeä', 'kova', 'rikki', 'korkea', 'matala', 'kurssi', 'koe', 'lause', 'vihko', 'toistaa', 'kielikurssi', 'tehtävä', 'sanakirja', 'lautanen', 'saippua', 'pyykki', 'tiskata', 'imuroida', 'leipoa', 'kantaa', 'wifi', 'tulostin', 'toimia', 'teksti', 'tärkeä', 'puinen', 'muovinen', 'lasinen', 'laatikko']);
    groups['A2.2'] = groups['A2.2'].concat(['kammata', 'meikata', 'pedata', 'ripustaa', 'viikata', 'silittää', 'ulkoiluttaa', 'kiirehtiä', 'nukahtaa', 'herättää', 'sileä', 'karhea', 'ehjä', 'kulunut', 'tahmea', 'litteä', 'käytännöllinen', 'materiaali', 'villainen', 'metallinen', 'tallentaa', 'tiedosto', 'kansio', 'poistaa', 'asentaa', 'kaapeli', 'klikata', 'painaa', 'latautua', 'lataus', 'ruutu', 'päivitys', 'jumissa']);
    groups['B1.1'] = groups['B1.1'].concat(['läpinäkyvä', 'himmeä', 'äänekäs', 'essee', 'oikeinkirjoitus', 'YKI-testi']);
  // Version 9 additions.
    groups['A1.3'] = groups['A1.3'].concat(['tasan', 'noin', 'yli', 'vaille']);
    groups['A2.1'] = groups['A2.1'].concat(['viisari', 'kellonaika', 'keskipäivä', 'keskiyö']);
    groups['A2.2'] = groups['A2.2'].concat(['viimeistään', 'vuosiluku', 'vuosikymmen', 'vuosisata']);
    groups['B1.1'] = groups['B1.1'].concat(['aikaisintaan']);
  // Version 10 additions.
    groups['A1.2'] = groups['A1.2'].concat(['puu', 'kukka', 'taivas', 'meri', 'aamupala', 'hauska tutustua', 'kuinka voit', 'huomenta', 'hyvää yötä', 'tervetuloa', 'nähdään', 'hei hei']);
    groups['A1.3'] = groups['A1.3'].concat(['kiitos ruoasta', 'hyvää ruokahalua', 'hyvää päivänjatkoa', 'kattila', 'klo', 'esim.', 'kuu', 'kerta', 'kesäloma']);
    groups['A2.1'] = groups['A2.1'].concat(['pitkästä aikaa', 'mukava kuulla', 'keli', 'helle', 'lämpötila', 'salama', 'lumisade', 'sateinen', 'mikro', 'turvavyö', 'kipulääke', 'janottaa', 'nukuttaa', 'voisitko', 'haluaisin', 'saisinko', 'tunnusluku', 'eräpäivä', 'mielestäni', 'minusta', 'mitä mieltä olet', 'olla oikeassa']);
    groups['A2.2'] = groups['A2.2'].concat(['pärjäillään', 'loska', 'kuura', 'sataa kaatamalla', 'tiimipalaveri', 'viikkosuunnitelma', 'tavoite', 'sijainen', 'monikielinen', 'tulkki', 'puheterapeutti']);
    groups['B1.1'] = groups['B1.1'].concat(['erityisruokavalio', 'nollakeli', 'poutainen', 'lähete', 'lääkärintodistus', 'sivuvaikutus', 'kaduttaa', 'mietityttää', 'ihmetyttää', 'olisitko ystävällinen', 'dokumentoida', 'kirjata', 'läsnäolo', 'tiedote', 'kuvatuki', 'tukiviittomat', 'avustaja', 'toimintaterapeutti', 'yhdenvertaisuus', 'tasa-arvo']);
    groups['B1.2'] = groups['B1.2'].concat(['lääkemääräys', 'muutoksenhaku', 'valtakirja', 'vireillä', 'perintä']);
  // Version 11 additions.
    groups['A1.2'] = groups['A1.2'].concat(['tie', 'katu', 'kaupunki', 'kylä', 'puisto', 'kirkko', 'tori', 'silta', 'itä', 'länsi', 'etelä', 'pohjoinen']);
    groups['A1.3'] = groups['A1.3'].concat(['kuja', 'polku', 'satama', 'linna', 'lahti', 'postinumero']);
    groups['B1.1'] = groups['B1.1'].concat(['raitti', 'kaari', 'väylä', 'harju', 'korpi', 'nummi', 'luoto', 'kari', 'aho', 'lehto', 'kumpu', 'salmi', 'vaara', 'kortteli', 'esplanadi', 'bulevardi']);
  // Version 12 additions.
    groups['A1.3'] = groups['A1.3'].concat(['hiekka', 'keskus', 'lentokenttä', 'kenttä']);
    groups['B1.1'] = groups['B1.1'].concat(['neva', 'salo', 'hamina', 'haka', 'santa', 'torppa', 'kataja', 'honka', 'varsi', 'koivikko', 'kuusikko', 'männikkö', 'kivikko', 'perä', 'valkea', 'puna']);
  // Version 13 additions.
    groups['A1.3'] = groups['A1.3'].concat(['ei enää', 'saanko']);
    groups['A2.1'] = groups['A2.1'].concat(['kylpylä']);
  const WORD = {};
  for (const [level, words] of Object.entries(groups)) for (const w of words) WORD[w] = level;

  /** Level of a starter word given its Finnish text and its first category name. */
  function levelFor(finnish, categoryName) {
    return WORD[finnish] || CATEGORY[categoryName] || '';
  }

  return { SCALE, CATEGORY, WORD, levelFor };
});

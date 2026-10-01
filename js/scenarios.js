/*
 * Role-play scenarios. Each situation is a short scripted conversation:
 *   npc:    what the other person says [Finnish, English]. Text in (brackets) is a stage direction.
 *   reply:  the best reply [Finnish, English]
 *   accept: other wordings accepted when typing (Hard level)
 *   wrong:  plausible wrong replies [Finnish, English, why it's wrong] (Easy level options)
 * `category` links the scenario to a word category in the starter words.
 */
(function (root, factory) {
  const scenarios = factory();
  if (typeof module === 'object' && module.exports) module.exports = scenarios;
  else root.VocabScenarios = scenarios;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  return [
    {
      id: 'shop', icon: '🛒', name: 'At the shop', fi: 'Kaupassa', category: 'At the shop',
      situations: [
        {
          title: 'Shoes in your size',
          goal: 'You like a pair of shoes. Ask for them in size 38 and try them on. (They\'ll turn out a bit too small.)',
          steps: [
            {
              npc: ['Hei! Voinko auttaa?', 'Hi! Can I help you?'],
              reply: ['Onko teillä näitä kenkiä koossa 38?', 'Do you have these shoes in size 38?'],
              accept: ['Onko näitä kenkiä koossa 38', 'Löytyykö näitä kenkiä koossa 38', 'Onko teillä näitä koossa 38', 'Löytyykö näitä koossa 38'],
              wrong: [
                ['Onko teillä näitä kenkiä kokossa 38?', 'Do you have these shoes in size 38?', 'koko → koossa: the k disappears in this form (consonant gradation).'],
                ['Haluan kenkä 38.', 'I want shoe 38.', 'Too blunt, and kenkä needs a case ending. Ask politely: Onko teillä…? or Löytyykö…?'],
              ],
            },
            {
              npc: ['Hetkinen, katson varastosta. Tässä, ole hyvä. Haluatko kokeilla?', 'Just a moment, I\'ll check the stockroom. Here you go. Would you like to try them on?'],
              reply: ['Kyllä kiitos. Missä voin kokeilla niitä?', 'Yes please. Where can I try them on?'],
              accept: ['Kyllä kiitos', 'Joo kiitos', 'Missä voin kokeilla niitä', 'Kyllä kiitos. Missä voin kokeilla', 'Missä voin kokeilla'],
              wrong: [
                ['Ei kiitos, ostan ne.', 'No thanks, I\'ll buy them.', 'Your goal is to try them on first.'],
                ['Kyllä kiitos. Missä voin maksaa niitä?', 'Yes please. Where can I pay for them?', 'You want to try them on (kokeilla) before paying.'],
              ],
            },
            {
              npc: ['Voit istua tuohon penkille. Miltä ne tuntuvat?', 'You can sit on that bench. How do they feel?'],
              reply: ['Ne ovat vähän liian pienet. Onko teillä isompaa kokoa?', 'They\'re a bit too small. Do you have a bigger size?'],
              accept: ['Ne ovat liian pienet. Onko teillä isompaa kokoa', 'Onko teillä isompaa kokoa', 'Löytyykö isompaa kokoa', 'Liian pienet. Onko isompaa kokoa', 'Ne ovat vähän liian pienet. Löytyykö isompaa kokoa'],
              wrong: [
                ['Ne ovat vähän liian pieni.', 'They are a bit too small.', 'With a plural subject (ne = they), the adjective is plural too: pienet.'],
                ['Ne ovat vähän liian pienet. Onko teillä pienempää kokoa?', 'They\'re a bit too small. Do you have a smaller size?', 'If they\'re too small, you need a bigger size: isompaa kokoa.'],
              ],
            },
          ],
        },
        {
          title: 'Asking the price and paying',
          goal: 'You want to buy a winter jacket. Ask how much it costs, take it, and pay by card. You\'d like a receipt.',
          steps: [
            {
              npc: ['Päivää! Etsitkö jotain tiettyä?', 'Hello! Are you looking for something in particular?'],
              reply: ['Paljonko tämä takki maksaa?', 'How much does this jacket cost?'],
              accept: ['Paljonko tämä maksaa', 'Mitä tämä takki maksaa', 'Mitä tämä maksaa', 'Kuinka paljon tämä takki maksaa', 'Kuinka paljon tämä maksaa', 'Mikä tämän takin hinta on'],
              wrong: [
                ['Missä tämä takki maksaa?', 'Where does this jacket cost?', 'missä = where. For the price use paljonko or mitä: Mitä tämä maksaa?'],
                ['Paljonko tämä takki on hinta?', 'How much is this jacket price?', 'This mixes two questions. Say Paljonko tämä maksaa? or Mikä tämän hinta on?'],
              ],
            },
            {
              npc: ['Se maksaa 129 euroa, mutta tänään se on alessa: 99 euroa.', 'It costs 129 euros, but today it\'s on sale: 99 euros.'],
              reply: ['Hyvä! Otan sen.', 'Great! I\'ll take it.'],
              accept: ['Otan sen', 'Hyvä, otan sen', 'Otan tämän', 'Ostan sen', 'Hyvä, ostan sen', 'Kiva, otan sen'],
              wrong: [
                ['Hyvä! Otan sitä.', 'Great! I\'ll take some of it.', 'For one whole thing use the accusative: otan sen. Sitä (partitive) means "some of it".'],
                ['Se on liian halpa.', 'It\'s too cheap.', 'A strange thing to say about a sale price!'],
              ],
            },
            {
              npc: ['Maksatko kortilla vai käteisellä?', 'Are you paying by card or in cash?'],
              reply: ['Kortilla, kiitos.', 'By card, please.'],
              accept: ['Kortilla', 'Maksan kortilla', 'Maksan kortilla kiitos'],
              wrong: [
                ['Kortti, kiitos.', 'Card, please.', 'Answer in the same form as the question: kortilla (= by card).'],
                ['Käteisellä, kiitos.', 'In cash, please.', 'Your goal was to pay by card.'],
              ],
            },
            {
              npc: ['Tarvitsetko kuitin?', 'Do you need a receipt?'],
              reply: ['Kyllä, kiitos.', 'Yes, please.'],
              accept: ['Kyllä', 'Joo kiitos', 'Tarvitsen', 'Kyllä tarvitsen', 'Tarvitsen kiitos'],
              wrong: [
                ['Ei tarvitse kuitti.', 'Don\'t need receipt.', 'You wanted a receipt. (And in a negative sentence kuitti becomes kuittia.)'],
                ['Kuitti on kallis.', 'The receipt is expensive.', 'That doesn\'t answer the question.'],
              ],
            },
          ],
        },
        {
          title: 'Returning a sweater',
          goal: 'You bought a sweater yesterday but it\'s too big. You have the receipt. Return it and get your money back.',
          steps: [
            {
              npc: ['Hei, miten voin auttaa?', 'Hi, how can I help?'],
              reply: ['Ostin tämän villapaidan eilen, mutta se on liian iso. Voinko palauttaa sen?', 'I bought this sweater yesterday, but it\'s too big. Can I return it?'],
              accept: ['Voinko palauttaa tämän', 'Voinko palauttaa tämän villapaidan', 'Haluaisin palauttaa tämän', 'Haluaisin palauttaa tämän villapaidan', 'Ostin tämän eilen mutta se on liian iso. Voinko palauttaa sen'],
              wrong: [
                ['Ostin tämän villapaidan huomenna, mutta se on liian iso.', 'I bought this sweater tomorrow, but it\'s too big.', 'The past tense needs a past time: eilen (yesterday), not huomenna (tomorrow).'],
                ['Ostin tämän villapaidan eilen. Voinko vaihtaa sen isompaan?', 'I bought this sweater yesterday. Can I exchange it for a bigger one?', 'It\'s already too big – and you want your money back.'],
              ],
            },
            {
              npc: ['Onnistuu. Onko sinulla kuitti?', 'No problem. Do you have the receipt?'],
              reply: ['On, tässä.', 'Yes, here.'],
              accept: ['On', 'Tässä', 'Kyllä, tässä', 'On, tässä se on', 'On tässä'],
              wrong: [
                ['Kyllä, minulla on kuittia.', 'Yes, I have some receipt.', 'Answer a yes/no question by repeating the verb: On. One receipt is kuitti, not kuittia.'],
                ['Ei ole.', 'No, I don\'t.', 'You do have the receipt.'],
              ],
            },
            {
              npc: ['Haluatko rahat takaisin vai vaihdatko johonkin toiseen tuotteeseen?', 'Do you want your money back, or will you exchange it for something else?'],
              reply: ['Haluaisin rahat takaisin, kiitos.', 'I\'d like my money back, please.'],
              accept: ['Rahat takaisin', 'Rahat takaisin kiitos', 'Haluan rahat takaisin', 'Haluaisin rahat takaisin'],
              wrong: [
                ['Haluaisin rahaa takaisin, kiitos.', 'I\'d like some money back, please.', 'You want all of it back: rahat (the money), not rahaa (some money).'],
                ['Haluaisin vaihtaa sen, kiitos.', 'I\'d like to exchange it, please.', 'Your goal is to get the money back.'],
              ],
            },
          ],
        },
      ],
    },

    {
      id: 'library', icon: '📚', name: 'At the library', fi: 'Kirjastossa', category: 'At the library',
      situations: [
        {
          title: 'Finding crime novels',
          goal: 'You want crime novels (dekkarit) in Finnish. Find out where they are and how long you can borrow them.',
          steps: [
            {
              npc: ['Hei! Voinko auttaa jotenkin?', 'Hi! Can I help you with something?'],
              reply: ['Missä dekkarit ovat?', 'Where are the crime novels?'],
              accept: ['Missä ovat dekkarit', 'Mistä löydän dekkarit', 'Mistä löytyy dekkareita', 'Missä on dekkarit', 'Mistä löydän dekkareita'],
              wrong: [
                ['Mihin dekkarit ovat?', 'Where to are the crime novels?', 'mihin = where to (movement). For where something is, use missä.'],
                ['Missä lastenkirjat ovat?', 'Where are the children\'s books?', 'You\'re looking for crime novels (dekkarit).'],
              ],
            },
            {
              npc: ['Dekkarit ovat toisessa kerroksessa. Haluatko suomenkielisiä vai englanninkielisiä?', 'Crime novels are on the second floor. Do you want them in Finnish or in English?'],
              reply: ['Suomenkielisiä, kiitos. Haluan harjoitella suomea.', 'In Finnish, please. I want to practise Finnish.'],
              accept: ['Suomenkielisiä', 'Suomenkielisiä kiitos', 'Suomenkielisiä, haluan harjoitella suomea'],
              wrong: [
                ['Suomenkielinen, kiitos.', 'A Finnish one, please.', 'Answer in the same form as the question: suomenkielisiä (partitive plural).'],
                ['Englanninkielisiä, kiitos.', 'In English, please.', 'Your goal was books in Finnish.'],
              ],
            },
            {
              npc: ['Selvä. Löydät ne hyllystä C.', 'OK. You\'ll find them on shelf C.'],
              reply: ['Kiitos! Kuinka pitkä laina-aika on?', 'Thanks! How long is the loan period?'],
              accept: ['Kuinka pitkä laina-aika on', 'Kuinka pitkä on laina-aika', 'Mikä on laina-aika', 'Kuinka kauan voin pitää kirjat', 'Kuinka kauan saan pitää kirjat'],
              wrong: [
                ['Kiitos! Kuinka paljon laina-aika on?', 'Thanks! How much is the loan period?', 'For a length of time, use kuinka pitkä or kuinka kauan.'],
                ['Kiitos! Kuinka monta kirjaa hyllyssä on?', 'Thanks! How many books are on the shelf?', 'You wanted to know the loan period.'],
              ],
            },
            {
              npc: ['Laina-aika on neljä viikkoa. Voit uusia lainat netissä.', 'The loan period is four weeks. You can renew your loans online.'],
              reply: ['Hienoa, kiitos avusta!', 'Great, thanks for the help!'],
              accept: ['Kiitos avusta', 'Kiitos', 'Hienoa kiitos', 'Kiitos paljon', 'Kiitos paljon avusta'],
              wrong: [
                ['Hienoa, kiitos apua!', 'Great, thanks help!', 'With kiitos, the reason goes in the elative: kiitos avusta (-sta).'],
                ['Ole hyvä!', 'You\'re welcome!', 'That\'s what the librarian says after you thank them.'],
              ],
            },
          ],
        },
        {
          title: 'Getting a library card',
          goal: 'You\'re new in town. Ask for a library card. You have your ID card with you.',
          steps: [
            {
              npc: ['Päivää! Miten voin auttaa?', 'Hello! How can I help?'],
              reply: ['Haluaisin kirjastokortin.', 'I\'d like a library card.'],
              accept: ['Voinko saada kirjastokortin', 'Saisinko kirjastokortin', 'Haluan kirjastokortin', 'Tarvitsen kirjastokortin', 'Haluaisin tehdä kirjastokortin'],
              wrong: [
                ['Haluaisin kirjastokortti.', 'I\'d like library card.', 'The thing you want takes the accusative here: kirjastokortin.'],
                ['Haluaisin lainata kirjastokortin.', 'I\'d like to borrow a library card.', 'You don\'t borrow the card, you get one: Haluaisin kirjastokortin.'],
              ],
            },
            {
              npc: ['Onnistuu. Onko sinulla henkilöllisyystodistus mukana?', 'Sure. Do you have proof of identity with you?'],
              reply: ['On, tässä on henkilökorttini.', 'Yes, here\'s my ID card.'],
              accept: ['On', 'On, tässä', 'Tässä on henkilökorttini', 'Kyllä, tässä', 'On tässä'],
              wrong: [
                ['On, tässä on henkilökortti minun.', 'Yes, here is ID card my.', 'The possessive goes before the noun: minun henkilökorttini – or just henkilökorttini.'],
                ['Ei ole, mutta minulla on passi kotona.', 'No, but I have a passport at home.', 'You have your ID card with you.'],
              ],
            },
            {
              npc: ['Kiitos. Tässä on korttisi. Kirjat lainataan lainausautomaatilla.', 'Thanks. Here\'s your card. Books are borrowed at the self-service machine.'],
              reply: ['Missä lainausautomaatti on?', 'Where is the self-service machine?'],
              accept: ['Missä on lainausautomaatti', 'Missä automaatti on', 'Missä se on'],
              wrong: [
                ['Mistä lainausautomaatti on?', 'From where is the self-service machine?', 'mistä = from where. For where something is, use missä.'],
                ['Mikä lainausautomaatti on?', 'What is the self-service machine?', 'You want to know where it is: missä.'],
              ],
            },
          ],
        },
        {
          title: 'Reserving a book',
          goal: 'The book Tuntematon sotilas isn\'t on the shelf. Reserve it and find out how you\'ll know when it\'s ready.',
          steps: [
            {
              npc: ['Hei! Miten voin auttaa?', 'Hi! How can I help?'],
              reply: ['Etsin kirjaa Tuntematon sotilas, mutta se ei ole hyllyssä.', 'I\'m looking for the book Tuntematon sotilas, but it isn\'t on the shelf.'],
              accept: ['Etsin kirjaa Tuntematon sotilas', 'Etsin yhtä kirjaa', 'Etsin kirjaa mutta se ei ole hyllyssä', 'Etsin kirjaa'],
              wrong: [
                ['Etsin kirja Tuntematon sotilas, mutta se ei ole hyllyssä.', 'I\'m looking for book Tuntematon sotilas…', 'etsiä takes the partitive: etsin kirjaa.'],
                ['Etsin kirjastoa.', 'I\'m looking for the library.', 'You\'re already in the library – you\'re looking for a book (kirjaa).'],
              ],
            },
            {
              npc: ['Se on lainassa. Haluatko varata sen?', 'It\'s out on loan. Would you like to reserve it?'],
              reply: ['Kyllä kiitos, haluaisin varata sen.', 'Yes please, I\'d like to reserve it.'],
              accept: ['Kyllä kiitos', 'Haluaisin varata sen', 'Kyllä, varaan sen', 'Joo kiitos', 'Kyllä, haluan varata sen'],
              wrong: [
                ['Kyllä kiitos, haluaisin lainata sen nyt.', 'Yes please, I\'d like to borrow it now.', 'It\'s on loan, so you can\'t borrow it now – reserve it (varata).'],
                ['Ei kiitos.', 'No thanks.', 'Your goal is to reserve it.'],
              ],
            },
            {
              npc: ['Varaus on tehty. Olet jonossa toisena.', 'The reservation is made. You\'re second in the queue.'],
              reply: ['Miten tiedän, kun kirja on noudettavissa?', 'How will I know when the book is ready to collect?'],
              accept: ['Miten tiedän kun kirja on noudettavissa', 'Miten tiedän kun se on noudettavissa', 'Miten saan tiedon', 'Miten tiedän kun kirja on valmis'],
              wrong: [
                ['Milloin minä olen toisena?', 'When am I second?', 'You want to know how you\'ll be told the book is ready.'],
                ['Miksi kirja on lainassa?', 'Why is the book on loan?', 'Not a useful question – ask how you\'ll be notified.'],
              ],
            },
          ],
        },
      ],
    },

    {
      id: 'health', icon: '🩺', name: 'At the health centre', fi: 'Terveyskeskuksessa', category: 'At the health centre',
      situations: [
        {
          title: 'Booking an appointment',
          goal: 'Your child has had a fever for three days. Call the health centre and book an appointment.',
          steps: [
            {
              npc: ['Terveyskeskus, hoitaja puhelimessa. Miten voin auttaa?', 'Health centre, nurse speaking. How can I help?'],
              reply: ['Haluaisin varata ajan lääkärille.', 'I\'d like to book an appointment with a doctor.'],
              accept: ['Haluaisin varata ajan', 'Haluaisin varata lääkäriajan', 'Haluan varata ajan lääkärille', 'Voinko varata ajan lääkärille', 'Haluaisin varata ajan lääkärille lapselleni'],
              wrong: [
                ['Haluaisin varata aika lääkärille.', 'I\'d like to book appointment…', 'The object of varata takes the accusative: aika → ajan.'],
                ['Haluaisin ostaa lääkettä.', 'I\'d like to buy medicine.', 'You need an appointment, not medicine.'],
              ],
            },
            {
              npc: ['Mikä on ongelma?', 'What\'s the problem?'],
              reply: ['Lapsellani on ollut kuumetta kolme päivää.', 'My child has had a fever for three days.'],
              accept: ['Lapsellani on kuumetta', 'Lapsella on ollut kuumetta kolme päivää', 'Lapsellani on ollut kuumetta', 'Lapsella on kuumetta'],
              wrong: [
                ['Lapseni on kuumetta kolme päivää.', 'My child is fever three days.', 'Having a fever uses the "have" structure: lapsellani on kuumetta.'],
                ['Lapsellani on ollut kuumetta kolme viikkoa.', 'My child has had a fever for three weeks.', 'It\'s been three days (päivää), not weeks.'],
              ],
            },
            {
              npc: ['Voin antaa ajan huomiseksi kello 9.30. Sopiiko se?', 'I can give you an appointment tomorrow at 9.30. Does that suit you?'],
              reply: ['Sopii hyvin, kiitos.', 'That suits me well, thanks.'],
              accept: ['Sopii', 'Sopii hyvin', 'Se sopii', 'Sopii kiitos', 'Kyllä sopii', 'Se sopii hyvin'],
              wrong: [
                ['Sovin hyvin, kiitos.', 'I agree well, thanks.', 'The time is what suits: se sopii. Sovin means "I agree" or "I fit".'],
                ['Kello on puoli kymmenen.', 'It\'s half past nine.', 'That tells the time – answer whether the time suits you.'],
              ],
            },
          ],
        },
        {
          title: 'Seeing the doctor',
          goal: 'You have a sore throat and a cough, for about a week. No fever, but you\'re very tired. Tell the doctor.',
          steps: [
            {
              npc: ['Päivää. Mikä sinua vaivaa?', 'Hello. What\'s bothering you?'],
              reply: ['Minulla on kurkku kipeä ja yskää.', 'I have a sore throat and a cough.'],
              accept: ['Kurkku on kipeä', 'Minulla on kurkkukipu ja yskä', 'Minulla on kurkkukipua ja yskää', 'Kurkkuun sattuu ja minulla on yskää', 'Minulla on kurkku kipeä'],
              wrong: [
                ['Minä olen kurkku kipeä.', 'I am throat sore.', 'Use the "have" structure: minulla on kurkku kipeä.'],
                ['Minulla on vatsa kipeä.', 'I have a sore stomach.', 'It\'s your throat (kurkku) that\'s sore.'],
              ],
            },
            {
              npc: ['Kuinka kauan oireet ovat jatkuneet?', 'How long have the symptoms lasted?'],
              reply: ['Noin viikon.', 'About a week.'],
              accept: ['Viikon', 'Noin viikko', 'Viikon ajan', 'Noin viikon ajan'],
              wrong: [
                ['Viikolla.', 'In the week.', 'For how long, use the accusative: viikon (or viikon ajan).'],
                ['Ensi viikolla.', 'Next week.', 'That\'s the future – the question is how long it has lasted.'],
              ],
            },
            {
              npc: ['Onko sinulla kuumetta?', 'Do you have a fever?'],
              reply: ['Ei ole, mutta olen tosi väsynyt.', 'No, but I\'m really tired.'],
              accept: ['Ei ole', 'Ei', 'Ei ole kuumetta', 'Ei ole mutta olen väsynyt', 'Ei, mutta olen tosi väsynyt'],
              wrong: [
                ['En ole, mutta olen tosi väsynyt.', 'I\'m not, but I\'m really tired.', 'The question is Onko sinulla…?, so answer Ei ole (there isn\'t), not En ole (I\'m not).'],
                ['Kyllä, minulla on kova kuume.', 'Yes, I have a high fever.', 'In this situation you have no fever.'],
              ],
            },
            {
              npc: ['Kirjoitan sinulle reseptin. Voit hakea lääkkeen apteekista.', 'I\'ll write you a prescription. You can pick up the medicine from the pharmacy.'],
              reply: ['Kiitos. Kuinka monta kertaa päivässä otan lääkettä?', 'Thanks. How many times a day do I take the medicine?'],
              accept: ['Kuinka monta kertaa päivässä', 'Kuinka monta kertaa päivässä otan lääkettä', 'Kuinka usein otan lääkettä', 'Kuinka usein lääke otetaan'],
              wrong: [
                ['Kiitos. Kuinka monta kertaa päivää otan lääkettä?', 'Thanks. How many times day…?', '"A day" is päivässä (inessive): kaksi kertaa päivässä.'],
                ['Kiitos. Kuinka paljon resepti maksaa?', 'Thanks. How much does the prescription cost?', 'Ask how often to take the medicine – that\'s what matters now.'],
              ],
            },
          ],
        },
        {
          title: 'At the pharmacy',
          goal: 'Pick up your medicine. The prescription is electronic and you have your Kela card. Ask if you can take it with food.',
          steps: [
            {
              npc: ['Hei! Onko sinulla resepti?', 'Hi! Do you have a prescription?'],
              reply: ['On, se on sähköinen. Tässä on Kela-korttini.', 'Yes, it\'s electronic. Here\'s my Kela card.'],
              accept: ['On', 'On, se on sähköinen', 'On, tässä on Kela-korttini', 'Tässä on Kela-korttini', 'On sähköinen resepti'],
              wrong: [
                ['On, se on sähköinen. Tässä on kirjastokorttini.', 'Yes, it\'s electronic. Here\'s my library card.', 'At the pharmacy you show your Kela card or ID, not a library card.'],
                ['Ei, minulla ei ole reseptiä.', 'No, I don\'t have a prescription.', 'The doctor wrote you one.'],
              ],
            },
            {
              npc: ['Tässä on lääkkeesi. Ota yksi tabletti kaksi kertaa päivässä.', 'Here\'s your medicine. Take one tablet twice a day.'],
              reply: ['Voinko ottaa sen ruoan kanssa?', 'Can I take it with food?'],
              accept: ['Voiko sen ottaa ruoan kanssa', 'Otetaanko se ruoan kanssa', 'Voinko ottaa lääkkeen ruoan kanssa', 'Saako sen ottaa ruoan kanssa'],
              wrong: [
                ['Voinko ottaa sen ruoalla kanssa?', 'Can I take it food with?', 'kanssa (with) comes after the genitive: ruoan kanssa.'],
                ['Voinko syödä sen?', 'Can I eat it?', 'Too vague – ask whether to take it with food (ruoan kanssa).'],
              ],
            },
            {
              npc: ['Kyllä, se on jopa parempi ottaa ruoan kanssa.', 'Yes, it\'s actually better to take it with food.'],
              reply: ['Selvä. Kiitos paljon!', 'OK. Thank you very much!'],
              accept: ['Kiitos paljon', 'Selvä kiitos', 'Kiitos', 'Selvä, kiitos paljon', 'Hyvä, kiitos'],
              wrong: [
                ['Kiitos, samoin!', 'Thanks, you too!', 'Kiitos, samoin is the reply to a wish like Hyvää päivää!'],
                ['Anteeksi, en ymmärrä.', 'Sorry, I don\'t understand.', 'You did understand – just thank them.'],
              ],
            },
          ],
        },
      ],
    },

    {
      id: 'cafe', icon: '☕', name: 'At the café', fi: 'Kahvilassa', category: 'At the café',
      situations: [
        {
          title: 'Ordering',
          goal: 'Order a coffee and a cinnamon bun (korvapuusti). You want to eat in, and you\'d like regular coffee.',
          steps: [
            {
              npc: ['Hei! Mitä saisi olla?', 'Hi! What can I get you?'],
              reply: ['Saisinko kahvin ja korvapuustin?', 'Could I have a coffee and a cinnamon bun?'],
              accept: ['Kahvi ja korvapuusti, kiitos', 'Yksi kahvi ja korvapuusti kiitos', 'Ottaisin kahvin ja korvapuustin', 'Haluaisin kahvin ja korvapuustin', 'Otan kahvin ja korvapuustin'],
              wrong: [
                ['Saisinko kahvi ja korvapuusti?', 'Could I have coffee and cinnamon bun?', 'The thing you ask for takes the accusative: kahvin ja korvapuustin.'],
                ['Saisinko teetä ja korvapuustin?', 'Could I have tea and a cinnamon bun?', 'You wanted coffee.'],
              ],
            },
            {
              npc: ['Syötkö täällä vai otatko mukaan?', 'Are you eating here or taking it with you?'],
              reply: ['Syön täällä.', 'I\'ll eat here.'],
              accept: ['Täällä', 'Täällä kiitos', 'Syön täällä kiitos'],
              wrong: [
                ['Syön tänne.', 'I\'ll eat to here.', 'tänne = (to) here, for movement. Being here is täällä.'],
                ['Otan mukaan.', 'I\'ll take it with me.', 'Your goal was to eat in.'],
              ],
            },
            {
              npc: ['Tavallinen kahvi vai erikoiskahvi?', 'Regular coffee or a specialty coffee?'],
              reply: ['Tavallinen, kiitos.', 'Regular, please.'],
              accept: ['Tavallinen', 'Tavallinen kahvi', 'Tavallinen kahvi kiitos'],
              wrong: [
                ['Kyllä, kiitos.', 'Yes, please.', 'It\'s an either-or question – say which one: tavallinen.'],
                ['Erikoiskahvi, kiitos.', 'A specialty coffee, please.', 'You wanted regular coffee.'],
              ],
            },
          ],
        },
        {
          title: 'Nut allergy',
          goal: 'You\'re allergic to nuts. Ask whether the cake has nuts in it and choose something safe.',
          steps: [
            {
              npc: ['Hei, mitä saisi olla?', 'Hi, what can I get you?'],
              reply: ['Onko tässä kakussa pähkinöitä?', 'Are there nuts in this cake?'],
              accept: ['Onko kakussa pähkinöitä', 'Sisältääkö tämä kakku pähkinöitä', 'Onko tässä kakussa pähkinää', 'Onko kakussa pähkinää'],
              wrong: [
                ['Onko tämä kakku pähkinöitä?', 'Is this cake nuts?', 'What\'s inside something: tässä kakussa (inessive, -ssa).'],
                ['Onko teillä pähkinöitä?', 'Do you have nuts?', 'You want to know if the cake contains nuts.'],
              ],
            },
            {
              npc: ['Valitettavasti siinä on hasselpähkinää. Mustikkapiirakka on pähkinätön.', 'Unfortunately it has hazelnut in it. The blueberry pie is nut-free.'],
              reply: ['Sitten otan mustikkapiirakan. Olen allerginen pähkinöille.', 'Then I\'ll have the blueberry pie. I\'m allergic to nuts.'],
              accept: ['Otan mustikkapiirakan', 'Sitten otan mustikkapiirakan', 'Mustikkapiirakka kiitos', 'Saisinko mustikkapiirakan', 'Otan sitten mustikkapiirakan'],
              wrong: [
                ['Sitten otan mustikkapiirakan. Olen allerginen pähkinöistä.', 'Then I\'ll have the blueberry pie. I\'m allergic from nuts.', 'allerginen takes the allative: allerginen pähkinöille (-lle).'],
                ['Sitten otan kakun. Olen allerginen pähkinöille.', 'Then I\'ll have the cake. I\'m allergic to nuts.', 'The cake has hazelnut in it!'],
              ],
            },
            {
              npc: ['Hyvä valinta. Haluatko kermavaahtoa sen kanssa?', 'Good choice. Would you like whipped cream with it?'],
              reply: ['Kyllä, kiitos!', 'Yes, please!'],
              accept: ['Kyllä', 'Joo kiitos', 'Mielelläni', 'Ei kiitos', 'Kyllä kiitos'],
              wrong: [
                ['Kyllä, kiitos sinua!', 'Yes, thank you (wrong case)!', 'Just Kyllä, kiitos! – or Kiitos sinulle (with -lle).'],
                ['Kermavaahto on pähkinä.', 'Whipped cream is a nut.', 'It isn\'t! Answer Kyllä kiitos or Ei kiitos.'],
              ],
            },
          ],
        },
        {
          title: 'Paying and the wifi',
          goal: 'Pay for your tea by card and ask for the wifi password.',
          steps: [
            {
              npc: ['Se tekee kolme viisikymmentä.', 'That comes to three fifty.'],
              reply: ['Voinko maksaa kortilla?', 'Can I pay by card?'],
              accept: ['Käykö kortti', 'Maksan kortilla', 'Voiko maksaa kortilla', 'Kortilla kiitos'],
              wrong: [
                ['Voinko maksaa korttia?', 'Can I pay the card?', 'Paying by card: kortilla (adessive, -lla).'],
                ['Voinko maksaa huomenna?', 'Can I pay tomorrow?', 'Not at a café!'],
              ],
            },
            {
              npc: ['Totta kai. Lähimaksu toimii.', 'Of course. Contactless works.'],
              reply: ['Kiitos. Onko teillä wifiä?', 'Thanks. Do you have wifi?'],
              accept: ['Onko teillä wifiä', 'Onko teillä langaton verkko', 'Onko täällä wifiä', 'Mikä on wifin salasana', 'Onko teillä nettiä'],
              wrong: [
                ['Kiitos. Onko teillä wifi?', 'Thanks. Do you have the wifi?', 'In "onko teillä…" questions use the partitive for things like this: wifiä.'],
                ['Kiitos. Missä vessa on?', 'Thanks. Where is the toilet?', 'Useful, but your goal is the wifi.'],
              ],
            },
            {
              npc: ['On. Salasana on kuitissa.', 'Yes. The password is on the receipt.'],
              reply: ['Hienoa, kiitos!', 'Great, thanks!'],
              accept: ['Kiitos', 'Hienoa kiitos', 'Kiitos paljon', 'Selvä kiitos', 'Kiva, kiitos'],
              wrong: [
                ['Ole hyvä!', 'You\'re welcome!', 'That\'s the reply to kiitos – here you say kiitos.'],
                ['Missä kuitti on?', 'Where is the receipt?', 'The cashier has just given it to you.'],
              ],
            },
          ],
        },
      ],
    },

    {
      id: 'transport', icon: '🚌', name: 'Bus & train', fi: 'Bussissa ja junassa', category: 'Bus & train',
      situations: [
        {
          title: 'A train ticket',
          goal: 'At the station ticket desk: buy a single ticket to Tampere for the next train today, and check whether you need to change.',
          steps: [
            {
              npc: ['Seuraava, kiitos! Mihin matka?', 'Next, please! Where are you travelling to?'],
              reply: ['Yksi meno Tampereelle, kiitos.', 'One single to Tampere, please.'],
              accept: ['Yksi lippu Tampereelle', 'Yksi menolippu Tampereelle', 'Tampereelle kiitos', 'Haluaisin lipun Tampereelle', 'Menolippu Tampereelle kiitos'],
              wrong: [
                ['Yksi meno Tampereella, kiitos.', 'One single in Tampere, please.', 'Going to a place uses the allative: Tampereelle (-lle).'],
                ['Yksi meno-paluu Tampereelle, kiitos.', 'One return to Tampere, please.', 'You want a single (meno), not a return (meno-paluu).'],
              ],
            },
            {
              npc: ['Lähdetkö tänään?', 'Are you leaving today?'],
              reply: ['Kyllä, seuraavalla junalla.', 'Yes, on the next train.'],
              accept: ['Kyllä', 'Tänään', 'Kyllä, tänään', 'Joo', 'Seuraavalla junalla'],
              wrong: [
                ['Kyllä, seuraava juna.', 'Yes, the next train.', '"On/by the next train" uses the adessive: seuraavalla junalla.'],
                ['En, huomenna.', 'No, tomorrow.', 'Your goal is to travel today.'],
              ],
            },
            {
              npc: ['Seuraava juna lähtee 14.05 raiteelta viisi. Se tekee 19,90.', 'The next train leaves at 14.05 from track five. That\'s 19.90.'],
              reply: ['Kiitos. Onko juna suora vai pitääkö vaihtaa?', 'Thanks. Is it a direct train or do I need to change?'],
              accept: ['Pitääkö vaihtaa', 'Onko juna suora', 'Pitääkö minun vaihtaa', 'Onko se suora juna', 'Onko juna suora vai pitääkö vaihtaa'],
              wrong: [
                ['Kiitos. Onko juna suora vai pitääkö vaihtua?', 'Thanks. Is it direct or does it need to change itself?', 'Changing trains is vaihtaa (junaa). Vaihtua means "to change by itself".'],
                ['Kiitos. Miltä raiteelta juna lähtee?', 'Thanks. Which track does the train leave from?', 'They just told you: track five.'],
              ],
            },
          ],
        },
        {
          title: 'Which bus?',
          goal: 'You\'re at a bus stop. Ask the person next to you which bus goes to the hospital, and how long the trip takes.',
          steps: [
            {
              npc: ['(Joku odottaa pysäkillä.)', '(Someone is waiting at the stop.)'],
              reply: ['Anteeksi, mikä bussi menee sairaalaan?', 'Excuse me, which bus goes to the hospital?'],
              accept: ['Mikä bussi menee sairaalaan', 'Millä bussilla pääsee sairaalaan', 'Millä bussilla pääsen sairaalaan', 'Anteeksi, millä bussilla pääsee sairaalaan'],
              wrong: [
                ['Anteeksi, mikä bussi menee sairaalassa?', 'Excuse me, which bus goes in the hospital?', 'Going to a place uses the illative: sairaalaan.'],
                ['Hei! Missä sairaala on?', 'Hi! Where is the hospital?', 'You want to know which bus to take.'],
              ],
            },
            {
              npc: ['Numero 23 menee sinne. Se tulee kymmenen minuutin välein.', 'Number 23 goes there. It comes every ten minutes.'],
              reply: ['Kiitos! Kuinka kauan matka kestää?', 'Thanks! How long does the journey take?'],
              accept: ['Kuinka kauan matka kestää', 'Kauanko matka kestää', 'Kuinka kauan se kestää', 'Kauanko se kestää'],
              wrong: [
                ['Kiitos! Kuinka paljon matka kestää?', 'Thanks! How much does the journey last?', 'For duration, ask kuinka kauan or kauanko.'],
                ['Kiitos! Kuinka monta bussia on?', 'Thanks! How many buses are there?', 'Ask how long the trip takes.'],
              ],
            },
            {
              npc: ['Noin vartti. Jää pois pysäkillä Sairaala.', 'About a quarter of an hour. Get off at the Sairaala stop.'],
              reply: ['Selvä, kiitos paljon!', 'OK, thanks a lot!'],
              accept: ['Kiitos paljon', 'Kiitos', 'Selvä kiitos', 'Kiitos avusta'],
              wrong: [
                ['Ei kiitos.', 'No, thank you.', 'They helped you – say Kiitos paljon!'],
                ['Ole hyvä.', 'You\'re welcome.', 'That\'s the reply to kiitos.'],
              ],
            },
          ],
        },
        {
          title: 'Talking to the driver',
          goal: 'Get on the bus, check it goes to the city centre, and ask the driver to tell you when you\'re at Kauppatori.',
          steps: [
            {
              npc: ['(Kuljettaja:) Huomenta!', '(The driver:) Good morning!'],
              reply: ['Huomenta! Meneekö tämä bussi keskustaan?', 'Morning! Does this bus go to the city centre?'],
              accept: ['Meneekö tämä bussi keskustaan', 'Meneekö tämä keskustaan', 'Huomenta, meneekö tämä keskustaan'],
              wrong: [
                ['Huomenta! Tuleeko tämä bussi keskustasta?', 'Morning! Does this bus come from the centre?', 'You want to go to the centre: Meneekö … keskustaan?'],
                ['Huomenta! Onko tämä bussi keskusta?', 'Morning! Is this bus the centre?', 'Use mennä and the illative: Meneekö tämä bussi keskustaan?'],
              ],
            },
            {
              npc: ['Menee. Näytä lippu lukijalle.', 'It does. Show your ticket to the reader.'],
              reply: ['Selvä. Voitteko sanoa, kun olemme Kauppatorilla?', 'OK. Could you tell me when we\'re at Kauppatori?'],
              accept: ['Voitteko sanoa kun olemme Kauppatorilla', 'Voitko sanoa kun ollaan Kauppatorilla', 'Voitko sanoa kun olemme Kauppatorilla', 'Voitteko kertoa kun olemme Kauppatorilla'],
              wrong: [
                ['Selvä. Voitteko sanoa, kun olemme Kauppatorille?', 'OK. Could you tell me when we are to Kauppatori?', 'Being somewhere uses the adessive: Kauppatorilla.'],
                ['Selvä. Missä lippu on?', 'OK. Where is the ticket?', 'You have a ticket – ask the driver to tell you where to get off.'],
              ],
            },
            {
              npc: ['Totta kai. Se on kuudes pysäkki.', 'Of course. It\'s the sixth stop.'],
              reply: ['Kiitos!', 'Thanks!'],
              accept: ['Kiitos paljon', 'Selvä kiitos', 'Kiitos, hyvä'],
              wrong: [
                ['Ole hyvä!', 'You\'re welcome!', 'That\'s the reply to kiitos.'],
                ['Anteeksi!', 'Sorry!', 'No need to apologise – say Kiitos!'],
              ],
            },
          ],
        },
      ],
    },

    {
      id: 'pickup', icon: '🧒', name: 'Daycare pick-up', fi: 'Päiväkodin hakutilanne', category: 'Daycare pick-up',
      situations: [
        {
          title: 'Telling a parent about the day',
          goal: 'You\'re the teacher. Emil\'s dad comes to pick him up. Emil ate well, slept an hour and played outside a lot. Tomorrow it will rain.',
          steps: [
            {
              npc: ['Hei! Miten Emilin päivä meni?', 'Hi! How did Emil\'s day go?'],
              reply: ['Hyvin meni! Hän söi hyvin ja nukkui tunnin.', 'It went well! He ate well and slept for an hour.'],
              accept: ['Hyvin meni', 'Päivä meni hyvin', 'Hän söi hyvin ja nukkui tunnin', 'Hyvin, hän söi hyvin ja nukkui tunnin'],
              wrong: [
                ['Hyvin meni! Hän söi hyvin ja nukkui tuntia.', 'It went well! He ate well and slept hour.', 'For a whole hour, use the accusative: nukkui tunnin.'],
                ['Hyvin meni! Hän ei syönyt ja nukkui huonosti.', 'It went well! He didn\'t eat and slept badly.', 'That\'s the opposite of what happened.'],
              ],
            },
            {
              npc: ['Kiva kuulla. Mitä te teitte tänään?', 'Nice to hear. What did you do today?'],
              reply: ['Olimme paljon ulkona ja leikimme hiekkalaatikolla.', 'We were outside a lot and played in the sandbox.'],
              accept: ['Olimme paljon ulkona', 'Leikimme ulkona', 'Olimme ulkona ja leikimme hiekkalaatikolla', 'Leikimme paljon ulkona'],
              wrong: [
                ['Olimme paljon ulos ja leikimme hiekkalaatikolla.', 'We were a lot out(wards)…', 'Being outside is ulkona. Ulos means going out.'],
                ['Olemme huomenna paljon ulkona.', 'We\'ll be outside a lot tomorrow.', 'He asked about today, so use the past tense.'],
              ],
            },
            {
              npc: ['Hienoa! Tarvitseeko hän jotain huomiseksi?', 'Great! Does he need anything for tomorrow?'],
              reply: ['Kyllä, muistakaa tuoda kurahousut. Huomenna sataa.', 'Yes, please remember to bring rain trousers. It\'s going to rain tomorrow.'],
              accept: ['Muistakaa tuoda kurahousut', 'Tuokaa kurahousut', 'Kyllä, kurahousut', 'Muistakaa kurahousut', 'Kurahousut, huomenna sataa'],
              wrong: [
                ['Kyllä, muistatte tuoda kurahousut.', 'Yes, you remember to bring rain trousers.', 'A request uses the imperative: muistakaa (plural/polite).'],
                ['Kyllä, muistakaa tuoda toppahaalari. Huomenna sataa.', 'Yes, please bring a snowsuit. It will rain tomorrow.', 'For rain he needs kurahousut, not a snowsuit.'],
              ],
            },
          ],
        },
        {
          title: 'Spare clothes ran out',
          goal: 'You\'re the teacher. A child got soaked in puddles and used all their spare clothes. Ask the mum to bring trousers, socks and a top.',
          steps: [
            {
              npc: ['Hei! Onko kaikki hyvin?', 'Hi! Is everything OK?'],
              reply: ['Kaikki hyvin! Mutta vaihtovaatteet loppuivat tänään.', 'All good! But the spare clothes ran out today.'],
              accept: ['Kaikki hyvin', 'Vaihtovaatteet loppuivat', 'Kaikki hyvin, mutta vaihtovaatteet loppuivat', 'Kaikki on hyvin, mutta vaihtovaatteet loppuivat'],
              wrong: [
                ['Kaikki hyvin! Mutta vaihtovaatteet loppuvat eilen.', 'All good! But the spare clothes run out yesterday.', 'It already happened today: loppuivat (past) … tänään.'],
                ['Ei, hän on sairas.', 'No, they\'re ill.', 'The child is fine – this is about spare clothes.'],
              ],
            },
            {
              npc: ['Ai, mitä tapahtui?', 'Oh, what happened?'],
              reply: ['Hän hyppi lätäköissä ja kastui ihan märäksi.', 'They jumped in puddles and got soaking wet.'],
              accept: ['Hän hyppi lätäköissä', 'Hän kastui', 'Hän hyppi lätäköissä ja kastui', 'Hän leikki lätäköissä ja kastui'],
              wrong: [
                ['Hän hyppi lätäköissä ja kastui ihan kuivaksi.', 'They jumped in puddles and got completely dry.', 'Getting wet makes you märkä: kastui märäksi, not kuivaksi (dry).'],
                ['Hän söi lätäköissä.', 'They ate in the puddles.', 'That\'s not what happened!'],
              ],
            },
            {
              npc: ['Selvä, tuon huomenna uudet. Mitä tarvitaan?', 'OK, I\'ll bring new ones tomorrow. What\'s needed?'],
              reply: ['Housut, sukat ja paita, kiitos.', 'Trousers, socks and a top, thanks.'],
              accept: ['Housut, sukat ja paita', 'Housut ja sukat ja paita', 'Sukat, housut ja paita', 'Housut, paita ja sukat'],
              wrong: [
                ['Housu, sukka ja paita, kiitos.', 'Trouser, sock and top, thanks.', 'Housut is always plural, and socks come in pairs: sukat.'],
                ['Pipo ja lapaset, kiitos.', 'A hat and mittens, thanks.', 'After puddle play the child needs trousers, socks and a top.'],
              ],
            },
          ],
        },
        {
          title: 'A small accident',
          goal: 'You\'re the teacher. Tell a parent their child fell in the yard and got a small scratch on the knee. You cleaned it and put on a plaster.',
          steps: [
            {
              npc: ['Hei! Miten päivä meni?', 'Hi! How did the day go?'],
              reply: ['Muuten hyvin, mutta pihalla sattui pieni tapaturma.', 'Fine otherwise, but there was a small accident in the yard.'],
              accept: ['Pihalla sattui pieni tapaturma', 'Muuten hyvin, mutta sattui pieni tapaturma', 'Sattui pieni tapaturma', 'Muuten hyvin mutta pihalla sattui pieni tapaturma'],
              wrong: [
                ['Muuten hyvin, mutta pihalla sattui pientä tapaturmaa.', 'Fine otherwise, but some small accident…', 'One event: pieni tapaturma (basic form).'],
                ['Kaikki meni täydellisesti!', 'Everything went perfectly!', 'You need to tell them about the accident.'],
              ],
            },
            {
              npc: ['Voi ei! Mitä tapahtui?', 'Oh no! What happened?'],
              reply: ['Hän kaatui ja polveen tuli pieni haava.', 'They fell over and got a small cut on the knee.'],
              accept: ['Hän kaatui', 'Hän kaatui ja polveen tuli haava', 'Hän kaatui ja satutti polvensa', 'Hän kaatui ja hänen polveensa tuli haava'],
              wrong: [
                ['Hän kaatoi ja polveen tuli pieni haava.', 'They knocked over and…', 'kaatua = to fall (kaatui). Kaatoi means "knocked something over".'],
                ['Hän kaatui ja polvessa tuli pieni haava.', 'They fell and in the knee came a cut.', 'With tulla, use the illative: polveen tuli haava.'],
              ],
            },
            {
              npc: ['Onko se paha?', 'Is it bad?'],
              reply: ['Ei, se oli pieni naarmu. Puhdistimme sen ja laitoimme laastarin.', 'No, it was a small scratch. We cleaned it and put on a plaster.'],
              accept: ['Ei, se oli pieni naarmu', 'Ei ole paha', 'Puhdistimme sen ja laitoimme laastarin', 'Ei, puhdistimme sen ja laitoimme laastarin', 'Ei, se oli pieni'],
              wrong: [
                ['Ei, se oli pieni naarmu. Puhdistimme sen ja laitoimme laastaria.', 'No… we put on some plaster.', 'One plaster put on: laastarin (accusative).'],
                ['Kyllä, hän meni sairaalaan.', 'Yes, they went to hospital.', 'It was only a small scratch.'],
              ],
            },
          ],
        },
      ],
    },

    {
      id: 'phone', icon: '📞', name: 'On the phone', fi: 'Puhelimessa', category: 'On the phone',
      situations: [
        {
          title: 'Calling in sick',
          goal: 'You\'re ill with a fever and a sore throat. Call your manager Anna and say you can\'t come to work today. You\'ll probably be off a couple of days.',
          steps: [
            {
              npc: ['Päiväkoti Satakieli, Anna puhelimessa.', 'Satakieli daycare, Anna speaking.'],
              reply: ['Hei Anna! Olen sairas enkä pääse tänään töihin.', 'Hi Anna! I\'m ill and can\'t come to work today.'],
              accept: ['Olen sairas enkä pääse töihin', 'Olen kipeä enkä pääse tänään töihin', 'Olen kipeä enkä pääse töihin', 'Hei, olen sairas enkä pääse tänään töihin', 'Olen sairas enkä pääse tänään töihin'],
              wrong: [
                ['Hei Anna! Olen sairas enkä pääse tänään töissä.', 'Hi Anna! I\'m ill and can\'t get at work today.', 'Going to work is töihin (illative). Töissä = at work.'],
                ['Hei Anna! Olen sairas, mutta tulen töihin.', 'Hi Anna! I\'m ill, but I\'m coming to work.', 'You\'re staying at home.'],
              ],
            },
            {
              npc: ['Voi harmi! Mikä sinulla on?', 'Oh, what a shame! What\'s wrong?'],
              reply: ['Minulla on kuumetta ja kurkku on kipeä.', 'I have a fever and my throat is sore.'],
              accept: ['Minulla on kuumetta', 'Minulla on flunssa', 'Kuumetta ja kurkkukipua', 'Minulla on kuumetta ja kurkkukipua'],
              wrong: [
                ['Minä olen kuumetta ja kurkku on kipeä.', 'I am fever and…', 'Use the "have" structure: minulla on kuumetta.'],
                ['Minulla on lomaa.', 'I\'m on holiday.', 'You\'re ill, not on holiday.'],
              ],
            },
            {
              npc: ['Selvä. Kuinka kauan luulet olevasi poissa?', 'OK. How long do you think you\'ll be off?'],
              reply: ['Luultavasti pari päivää. Käyn huomenna lääkärissä.', 'Probably a couple of days. I\'ll see a doctor tomorrow.'],
              accept: ['Pari päivää', 'Luultavasti pari päivää', 'Ehkä pari päivää', 'Pari päivää, käyn lääkärissä'],
              wrong: [
                ['Luultavasti pari päivä.', 'Probably a couple day.', 'After pari, use the partitive: pari päivää.'],
                ['Luultavasti pari tuntia.', 'Probably a couple of hours.', 'You\'re ill for longer than that.'],
              ],
            },
            {
              npc: ['Selvä, parane pian! Ilmoita, jos tarvitset sairauslomaa.', 'OK, get well soon! Let me know if you need sick leave.'],
              reply: ['Kiitos, ilmoitan. Hei hei!', 'Thanks, I will. Bye!'],
              accept: ['Kiitos, ilmoitan', 'Kiitos', 'Kiitos, hei hei', 'Ilmoitan, kiitos', 'Kiitos, ilmoitan'],
              wrong: [
                ['Kiitos, samoin!', 'Thanks, you too!', 'She isn\'t ill – just say Kiitos, ilmoitan.'],
                ['Parane pian!', 'Get well soon!', 'That\'s what she says to you.'],
              ],
            },
          ],
        },
        {
          title: 'Calling a parent: the child has a fever',
          goal: 'You\'re the teacher. Call Aino\'s mum Laura: Aino has a fever of 38.5. She needs to be picked up.',
          steps: [
            {
              npc: ['Haloo, Laura puhelimessa.', 'Hello, Laura speaking.'],
              reply: ['Hei, soitan päiväkodista. Ainolla on kuumetta.', 'Hi, I\'m calling from the daycare. Aino has a fever.'],
              accept: ['Soitan päiväkodista. Ainolla on kuumetta', 'Ainolla on kuumetta', 'Hei, soitan päiväkodista, Ainolla on kuumetta', 'Ainolle nousi kuume', 'Soitan päiväkodista, Ainolle nousi kuume'],
              wrong: [
                ['Hei, soitan päiväkotiin. Ainolla on kuumetta.', 'Hi, I\'m calling the daycare…', 'You\'re calling from the daycare: päiväkodista (elative). Päiväkotiin = to the daycare.'],
                ['Hei, soitan päiväkodista. Aino on kuumetta.', 'Hi… Aino is fever.', 'Use the "have" structure: Ainolla on kuumetta.'],
              ],
            },
            {
              npc: ['Voi ei. Kuinka korkea kuume on?', 'Oh no. How high is the fever?'],
              reply: ['Mittasimme juuri, se on 38,5 astetta.', 'We just took it, it\'s 38.5 degrees.'],
              accept: ['38,5 astetta', 'Se on 38,5 astetta', 'Kuume on 38,5 astetta', '38,5', 'Mittasimme juuri, 38,5 astetta'],
              wrong: [
                ['Mittasimme juuri, se on 38,5 astetta pakkasta.', 'We just took it, it\'s 38.5 degrees below zero.', 'Pakkasta means below zero – that\'s for the weather!'],
                ['Mittaamme huomenna.', 'We\'ll measure it tomorrow.', 'You\'ve just measured it – tell her the number.'],
              ],
            },
            {
              npc: ['Selvä, tulen hakemaan hänet noin puolessa tunnissa.', 'OK, I\'ll come and pick her up in about half an hour.'],
              reply: ['Hyvä, kiitos. Hän lepää nyt sohvalla.', 'Good, thanks. She\'s resting on the sofa now.'],
              accept: ['Hyvä kiitos', 'Kiitos', 'Selvä kiitos', 'Hyvä, kiitos. Hän lepää nyt', 'Kiitos, nähdään pian'],
              wrong: [
                ['Hyvä, kiitos. Hän leikkii nyt pihalla.', 'Good, thanks. She\'s playing in the yard now.', 'A child with a fever rests indoors.'],
                ['Ei tarvitse tulla.', 'No need to come.', 'A child with a fever has to be picked up.'],
              ],
            },
          ],
        },
        {
          title: 'A leaking tap',
          goal: 'The kitchen tap in your flat is leaking. Call the maintenance company (huoltoyhtiö). Your address is Koivutie 5 B 12. The maintenance man may use the master key.',
          steps: [
            {
              npc: ['Huoltoyhtiö, hei.', 'Maintenance company, hello.'],
              reply: ['Hei! Asunnossani keittiön hana vuotaa.', 'Hi! The kitchen tap in my flat is leaking.'],
              accept: ['Hana vuotaa', 'Keittiön hana vuotaa', 'Asunnossani hana vuotaa', 'Hei, keittiön hana vuotaa'],
              wrong: [
                ['Hei! Asuntooni keittiön hana vuotaa.', 'Hi! Into my flat the tap is leaking.', 'Where something happens: asunnossani (inessive, -ssa).'],
                ['Hei! Asunnossani keittiön hana on kaunis.', 'Hi! In my flat the kitchen tap is beautiful.', 'You need to report a problem: hana vuotaa.'],
              ],
            },
            {
              npc: ['Mikä on osoitteesi?', 'What\'s your address?'],
              reply: ['Koivutie 5 B 12.', 'Koivutie 5 B 12.'],
              accept: ['Osoite on Koivutie 5 B 12', 'Osoitteeni on Koivutie 5 B 12', 'Koivutie viisi B kaksitoista'],
              wrong: [
                ['Koivutiellä 5 B 12.', 'On Koivutie 5 B 12.', 'Give the address in its basic form: Koivutie 5 B 12. (Asun Koivutiellä = I live on Koivutie.)'],
                ['Asun Suomessa.', 'I live in Finland.', 'They need your street address.'],
              ],
            },
            {
              npc: ['Kiitos. Huoltomies tulee huomenna aamupäivällä. Saako hän mennä asuntoon yleisavaimella?', 'Thanks. The maintenance man will come tomorrow morning. May he enter the flat with the master key?'],
              reply: ['Kyllä saa. Kiitos!', 'Yes, he may. Thanks!'],
              accept: ['Saa', 'Kyllä saa', 'Saa, kiitos', 'Joo saa', 'Kyllä saa kiitos'],
              wrong: [
                ['Kyllä voi. Kiitos!', 'Yes, he can. Thanks!', 'Answer with the verb of the question: Saako…? → Saa.'],
                ['Ei, minulla ei ole avainta.', 'No, I don\'t have a key.', 'He has the master key – you only need to give permission: Kyllä saa.'],
              ],
            },
          ],
        },
      ],
    },

    {
      id: 'office', icon: '🏢', name: 'At the office', fi: 'Virastossa', category: 'At the office',
      situations: [
        {
          title: 'At Kela',
          goal: 'You\'re at the Kela office to apply for housing allowance (asumistuki). Find out where to get a queue number and what documents you need.',
          steps: [
            {
              npc: ['(Infopisteessä:) Hei! Miten voin auttaa?', '(At the information desk:) Hi! How can I help?'],
              reply: ['Hei! Mistä saan vuoronumeron?', 'Hi! Where do I get a queue number?'],
              accept: ['Mistä saan vuoronumeron', 'Mistä saa vuoronumeron', 'Mistä vuoronumero otetaan', 'Mistä voin ottaa vuoronumeron'],
              wrong: [
                ['Hei! Missä saan vuoronumeron?', 'Hi! In where do I get a queue number?', 'With saada (to get), ask mistä (from where): Mistä saan…?'],
                ['Hei! Mikä on vuoronumeroni?', 'Hi! What\'s my queue number?', 'You don\'t have one yet.'],
              ],
            },
            {
              npc: ['Automaatista oven vierestä. Mitä asiaa sinulla on?', 'From the machine by the door. What is your errand?'],
              reply: ['Haluaisin hakea asumistukea.', 'I\'d like to apply for housing allowance.'],
              accept: ['Haen asumistukea', 'Haluan hakea asumistukea', 'Asumistuki', 'Asumistukiasia', 'Haluaisin hakea asumistukea'],
              wrong: [
                ['Haluaisin hakea asumistuki.', 'I\'d like to apply housing allowance.', 'hakea (apply for) takes the partitive here: asumistukea.'],
                ['Haluaisin ostaa asumistukea.', 'I\'d like to buy housing allowance.', 'You apply for (hakea) benefits, you don\'t buy them.'],
              ],
            },
            {
              npc: ['Voit hakea sitä myös netissä. Tarvitset liitteet.', 'You can also apply online. You\'ll need attachments.'],
              reply: ['Kiitos! Mitä liitteitä tarvitsen?', 'Thanks! What attachments do I need?'],
              accept: ['Mitä liitteitä tarvitsen', 'Mitä papereita tarvitsen', 'Mitä liitteitä tarvitaan', 'Mitä minun pitää tuoda'],
              wrong: [
                ['Kiitos! Mitkä liitteitä tarvitsen?', 'Thanks! Which attachments (wrong case)…?', 'Use mitä with the partitive plural: mitä liitteitä.'],
                ['Kiitos! Missä netti on?', 'Thanks! Where is the internet?', 'Ask which documents (liitteet) you need.'],
              ],
            },
            {
              npc: ['Vuokrasopimuksen ja palkkatodistuksen.', 'The rental agreement and a pay slip.'],
              reply: ['Selvä, kiitos avusta!', 'OK, thanks for the help!'],
              accept: ['Kiitos avusta', 'Selvä kiitos', 'Kiitos', 'Kiitos paljon'],
              wrong: [
                ['Selvä, kiitos apuun!', 'OK, thanks to the help!', 'kiitos takes the elative: kiitos avusta.'],
                ['Vuokrasopimus on kallis.', 'The rental agreement is expensive.', 'Just thank them.'],
              ],
            },
          ],
        },
        {
          title: 'A question on a form',
          goal: 'You don\'t understand a question on a form. Ask for help, ask them to speak more slowly, then answer: your only income is your salary.',
          steps: [
            {
              npc: ['Seuraava! Hei, mikä on asiasi?', 'Next! Hi, what can I do for you?'],
              reply: ['Hei! En ymmärrä tätä kysymystä lomakkeessa.', 'Hi! I don\'t understand this question on the form.'],
              accept: ['En ymmärrä tätä kysymystä', 'En ymmärrä tätä kohtaa', 'Mitä tämä tarkoittaa', 'En ymmärrä tätä kysymystä lomakkeessa'],
              wrong: [
                ['Hei! En ymmärrä tämä kysymys lomakkeessa.', 'Hi! I don\'t understand this question (wrong case).', 'After a negative verb, the object is partitive: en ymmärrä tätä kysymystä.'],
                ['Hei! Ymmärrän kaiken.', 'Hi! I understand everything.', 'Then you wouldn\'t need help!'],
              ],
            },
            {
              npc: ['Siinä kysytään, onko sinulla muita tuloja kuin palkka, esimerkiksi tukia tai vuokratuloja.', 'It asks whether you have any income other than your salary, for example benefits or rental income.'],
              reply: ['Anteeksi, voisitko puhua hitaammin?', 'Sorry, could you speak more slowly?'],
              accept: ['Voisitko puhua hitaammin', 'Puhu hitaammin, kiitos', 'Voisitko toistaa hitaammin', 'Voitteko puhua hitaammin'],
              wrong: [
                ['Anteeksi, voisitko puhua nopeammin?', 'Sorry, could you speak faster?', 'You want them to slow down: hitaammin.'],
                ['Anteeksi, voisitko puhua englanti?', 'Sorry, could you speak English (wrong case)?', 'Languages after puhua are partitive (englantia) – and here you just want them to slow down.'],
              ],
            },
            {
              npc: ['Totta kai. Onko sinulla muita tuloja kuin palkka?', 'Of course. Do you have any income other than your salary?'],
              reply: ['Ei ole, vain palkka.', 'No, just my salary.'],
              accept: ['Ei ole', 'Ei, vain palkka', 'Vain palkka', 'Ei ole muita tuloja'],
              wrong: [
                ['En ole, vain palkka.', 'I\'m not, just salary.', 'The question is Onko sinulla…?, so answer Ei ole.'],
                ['Kyllä, minulla on kolme palkkaa.', 'Yes, I have three salaries.', 'Your only income is one salary.'],
              ],
            },
          ],
        },
        {
          title: 'Collecting a parcel',
          goal: 'Collect a parcel at the post office. The pickup code is in a text message, and you have your driving licence.',
          steps: [
            {
              npc: ['Hei! Miten voin auttaa?', 'Hi! How can I help?'],
              reply: ['Hei! Tulin hakemaan pakettia.', 'Hi! I\'ve come to collect a parcel.'],
              accept: ['Tulin hakemaan pakettia', 'Haluaisin hakea paketin', 'Tulin hakemaan paketin', 'Haen pakettia', 'Minulle on tullut paketti'],
              wrong: [
                ['Hei! Tulin hakemaan paketti.', 'Hi! I came to collect parcel.', 'The object needs a case: pakettia (or paketin).'],
                ['Hei! Tulin lähettämään pakettia.', 'Hi! I\'ve come to send a parcel.', 'You\'re collecting (hakemaan), not sending.'],
              ],
            },
            {
              npc: ['Onko sinulla noutokoodi?', 'Do you have the pickup code?'],
              reply: ['On, se on tekstiviestissä. Tässä.', 'Yes, it\'s in the text message. Here.'],
              accept: ['On', 'On, tässä', 'On, se on tekstiviestissä', 'Kyllä, tässä', 'On tekstiviestissä'],
              wrong: [
                ['On, se on tekstiviestiin.', 'Yes, it\'s into the text message.', 'Inside something: tekstiviestissä (inessive, -ssa).'],
                ['Ei, koodi on kotona.', 'No, the code is at home.', 'You have the code in a text message on your phone.'],
              ],
            },
            {
              npc: ['Kiitos. Tarvitsen vielä henkilöllisyystodistuksen.', 'Thanks. I also need proof of identity.'],
              reply: ['Tässä on ajokorttini.', 'Here\'s my driving licence.'],
              accept: ['Tässä', 'Ole hyvä', 'Tässä on ajokortti', 'Tässä, ole hyvä', 'Tässä on ajokorttini'],
              wrong: [
                ['Tässä on kirjastokorttini.', 'Here\'s my library card.', 'A library card isn\'t ID – use a driving licence, ID card or passport.'],
                ['Minulla ei ole henkilöllisyystodistusta.', 'I don\'t have any ID.', 'You have your driving licence with you.'],
              ],
            },
          ],
        },
      ],
    },
  ];
});

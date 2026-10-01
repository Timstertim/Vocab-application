/*
 * Role-play scenarios. Each situation is a short scripted conversation:
 *   npc:    what the other person says [Finnish, English]. Text in (brackets) is a stage direction.
 *   reply:  the best reply [Finnish, English]
 *   accept: other wordings accepted when typing (Hard level)
 *   wrong:  plausible wrong replies [Finnish, English, why it's wrong] (Easy level options)
 * `category` links the scenario to a word category in the starter words; `level` is the typical level.
 */
(function (root, factory) {
  const scenarios = factory();
  if (typeof module === 'object' && module.exports) module.exports = scenarios;
  else root.VocabScenarios = scenarios;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  return [
    {
      id: 'shop', level: 'A2.1', icon: '🛒', name: 'At the shop', fi: 'Kaupassa', category: 'At the shop',
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
      id: 'library', level: 'A2.1', icon: '📚', name: 'At the library', fi: 'Kirjastossa', category: 'At the library',
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
      id: 'health', level: 'A2.2', icon: '🩺', name: 'At the health centre', fi: 'Terveyskeskuksessa', category: 'At the health centre',
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
      id: 'cafe', level: 'A2.1', icon: '☕', name: 'At the café', fi: 'Kahvilassa', category: 'At the café',
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
      id: 'transport', level: 'A2.1', icon: '🚌', name: 'Bus & train', fi: 'Bussissa ja junassa', category: 'Bus & train',
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
      id: 'pickup', level: 'B1.1', icon: '🧒', name: 'Daycare pick-up', fi: 'Päiväkodin hakutilanne', category: 'Daycare pick-up',
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
      id: 'phone', level: 'A2.2', icon: '📞', name: 'On the phone', fi: 'Puhelimessa', category: 'On the phone',
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
      id: 'office', level: 'A2.2', icon: '🏢', name: 'At the office', fi: 'Virastossa', category: 'At the office',
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
    {
      id: 'emergency', level: 'A2.2', icon: '🚨', name: 'Emergency call 112', fi: 'Hätäpuhelu', category: 'Emergency call',
      intro: 'In Finland 112 is the number for fire, ambulance and police. Say what happened, give the address and municipality, answer the questions and don\'t hang up until you\'re told to.',
      situations: [
        {
          title: 'A fire in the kitchen',
          goal: 'A fire has started in your kitchen. Your address is Kotikatu 3 A 5, Tampere. Everyone is already out of the flat. Call 112.',
          steps: [
            {
              npc: ['Hätäkeskus. Mitä on tapahtunut?', 'Emergency centre. What has happened?'],
              reply: ['Keittiössäni on tulipalo!', 'There\'s a fire in my kitchen!'],
              accept: ['Keittiössä on tulipalo', 'Asunnossani on tulipalo', 'Keittiössä palaa', 'Meillä on tulipalo', 'Asunnossani palaa'],
              wrong: [
                ['Keittiöni on tulipalo!', 'My kitchen is a fire!', 'Where something is: keittiössäni (inessive, -ssa).'],
                ['Haluaisin varata ajan.', 'I\'d like to book an appointment.', 'This is an emergency – say what is happening: Keittiössäni on tulipalo!'],
              ],
            },
            {
              npc: ['Mikä on osoite ja kunta?', 'What is the address and the municipality?'],
              reply: ['Kotikatu 3 A 5, Tampere.', 'Kotikatu 3 A 5, Tampere.'],
              accept: ['Kotikatu 3 A 5 Tampere', 'Osoite on Kotikatu 3 A 5, Tampere', 'Kotikatu 3 A 5, Tampereella'],
              wrong: [
                ['Kotikatu 3 A 5.', 'Kotikatu 3 A 5.', 'Also say the municipality: Tampere. The same street name exists in many towns.'],
                ['Asun Tampereella.', 'I live in Tampere.', 'They need the exact street address too.'],
              ],
            },
            {
              npc: ['Onko kaikki ulkona asunnosta?', 'Is everyone out of the flat?'],
              reply: ['On, kaikki ovat ulkona.', 'Yes, everyone is outside.'],
              accept: ['On', 'Kaikki ovat ulkona', 'Kyllä, kaikki ovat ulkona', 'On, kaikki on ulkona'],
              wrong: [
                ['Kyllä, kaikki ovat ulos.', 'Yes, everyone is out(wards).', 'Being outside is ulkona. Ulos means going out.'],
                ['En tiedä, menen katsomaan.', 'I don\'t know, I\'ll go and look.', 'Never go back into a burning building.'],
              ],
            },
            {
              npc: ['Palokunta on matkalla. Sulje asunnon ovi ja odota ulkona. Älä mene takaisin sisälle.', 'The fire brigade is on its way. Close the flat door and wait outside. Don\'t go back inside.'],
              reply: ['Selvä. Suljin oven ja odotan ulkona.', 'OK. I closed the door and I\'m waiting outside.'],
              accept: ['Selvä', 'Selvä, odotan ulkona', 'Ymmärrän', 'Selvä, suljin oven', 'Odotan ulkona'],
              wrong: [
                ['Selvä, menen hakemaan kissan.', 'OK, I\'ll go and get the cat.', 'Don\'t go back inside – tell the fire brigade if a pet is still in there.'],
                ['Selvä, avaan kaikki ikkunat.', 'OK, I\'ll open all the windows.', 'Fresh air feeds the fire. Close the door and wait outside.'],
              ],
            },
          ],
        },
        {
          title: 'A man has collapsed',
          goal: 'An elderly man has collapsed at a bus stop on Rantatie, next to the library, in Turku. He is breathing but doesn\'t respond. Call 112.',
          steps: [
            {
              npc: ['Hätäkeskus. Mitä on tapahtunut?', 'Emergency centre. What has happened?'],
              reply: ['Vanha mies kaatui bussipysäkillä. Hän ei vastaa.', 'An old man collapsed at the bus stop. He isn\'t responding.'],
              accept: ['Mies kaatui bussipysäkillä', 'Vanha mies kaatui', 'Vanha mies kaatui bussipysäkillä', 'Mies kaatui eikä vastaa', 'Vanha mies kaatui eikä vastaa'],
              wrong: [
                ['Vanha mies kaatui bussipysäkille. Hän ei vastaa.', 'An old man collapsed onto the bus stop…', 'Where it happened: bussipysäkillä (adessive, -lla).'],
                ['Vanha mies odottaa bussia.', 'An old man is waiting for the bus.', 'Say what is wrong: he collapsed and isn\'t responding.'],
              ],
            },
            {
              npc: ['Missä olet? Kerro osoite tai paikka.', 'Where are you? Tell me the address or the place.'],
              reply: ['Rantatiellä, kirjaston vieressä, Turussa.', 'On Rantatie, next to the library, in Turku.'],
              accept: ['Rantatiellä kirjaston vieressä Turussa', 'Rantatie, kirjaston vieressä, Turku', 'Turussa Rantatiellä kirjaston vieressä', 'Rantatiellä Turussa'],
              wrong: [
                ['Rantatiellä, kirjaston vieressä.', 'On Rantatie, next to the library.', 'Also say the town: Turussa.'],
                ['Bussipysäkillä.', 'At the bus stop.', 'There are many bus stops – give the street and the town.'],
              ],
            },
            {
              npc: ['Hengittääkö hän?', 'Is he breathing?'],
              reply: ['Kyllä, hän hengittää.', 'Yes, he is breathing.'],
              accept: ['Hengittää', 'Kyllä hengittää', 'Hän hengittää', 'Kyllä, hengittää'],
              wrong: [
                ['Kyllä, hän hengitti.', 'Yes, he breathed.', 'Use the present tense: hän hengittää (he is breathing now).'],
                ['En ole.', 'I\'m not.', 'Answer with the verb of the question: Hengittää.'],
              ],
            },
            {
              npc: ['Ambulanssi on tulossa. Käännä hänet kylkiasentoon ja pysy hänen luonaan. Älä katkaise puhelua.', 'The ambulance is coming. Turn him into the recovery position and stay with him. Don\'t hang up.'],
              reply: ['Selvä, käännän hänet kyljelleen. Pysyn puhelimessa.', 'OK, I\'ll turn him onto his side. I\'ll stay on the line.'],
              accept: ['Selvä', 'Selvä, pysyn puhelimessa', 'Selvä, käännän hänet kyljelleen', 'Ymmärrän', 'Pysyn puhelimessa'],
              wrong: [
                ['Selvä, lopetan nyt puhelun.', 'OK, I\'ll end the call now.', 'Don\'t hang up until the emergency centre tells you to.'],
                ['Selvä, annan hänelle vettä.', 'OK, I\'ll give him some water.', 'Don\'t give an unresponsive person anything to drink.'],
              ],
            },
          ],
        },
        {
          title: 'A break-in',
          goal: 'You come home: the front door is broken and you see someone running away from your flat. Address: Koivutie 5 B 12, Espoo. Nobody is hurt. Call 112.',
          steps: [
            {
              npc: ['Hätäkeskus. Mitä on tapahtunut?', 'Emergency centre. What has happened?'],
              reply: ['Asuntooni on tehty murto.', 'There\'s been a break-in at my flat.'],
              accept: ['Kotiini on tehty murto', 'Asuntooni on murtauduttu', 'Meille on tehty murto', 'Asunnossani on ollut murto'],
              wrong: [
                ['Asuntoni on murto.', 'My flat is a break-in.', 'Say: Asuntooni on tehty murto (a break-in has been made into my flat).'],
                ['Haluaisin tilata taksin.', 'I\'d like to order a taxi.', 'This is an emergency – tell them about the break-in.'],
              ],
            },
            {
              npc: ['Mikä on osoite?', 'What is the address?'],
              reply: ['Koivutie 5 B 12, Espoo.', 'Koivutie 5 B 12, Espoo.'],
              accept: ['Koivutie 5 B 12 Espoo', 'Osoite on Koivutie 5 B 12, Espoo', 'Koivutie 5 B 12, Espoossa'],
              wrong: [
                ['Koivutie 5 B 12.', 'Koivutie 5 B 12.', 'Always say the municipality too: Espoo.'],
                ['Espoossa.', 'In Espoo.', 'They need the full street address.'],
              ],
            },
            {
              npc: ['Onko murtovaras vielä paikalla? Onko kukaan loukkaantunut?', 'Is the burglar still there? Is anyone hurt?'],
              reply: ['Ei. Hän juoksi pois, eikä kukaan loukkaantunut.', 'No. They ran away, and nobody was hurt.'],
              accept: ['Ei', 'Ei, hän juoksi pois', 'Hän juoksi pois, kukaan ei loukkaantunut', 'Ei, kukaan ei loukkaantunut', 'Ei ole, hän juoksi pois'],
              wrong: [
                ['Ei. Hän juoksee pois huomenna.', 'No. They\'ll run away tomorrow.', 'It already happened: juoksi (past tense).'],
                ['Kyllä, kaikki loukkaantuivat.', 'Yes, everyone was hurt.', 'Nobody was hurt in this situation.'],
              ],
            },
            {
              npc: ['Poliisi tulee paikalle. Älä mene asuntoon äläkä koske mihinkään.', 'The police are coming. Don\'t go into the flat and don\'t touch anything.'],
              reply: ['Selvä, odotan rappukäytävässä.', 'OK, I\'ll wait in the stairwell.'],
              accept: ['Selvä', 'Selvä, odotan', 'Selvä, en koske mihinkään', 'Ymmärrän', 'Odotan ulkona'],
              wrong: [
                ['Selvä, siivoan asunnon ensin.', 'OK, I\'ll clean the flat first.', 'Don\'t touch anything – the police need to investigate.'],
                ['Selvä, menen sisälle katsomaan.', 'OK, I\'ll go in and have a look.', 'Don\'t go in – wait for the police.'],
              ],
            },
          ],
        },
        {
          title: 'An allergic reaction at daycare',
          goal: 'You\'re at work at Päiväkoti Satakieli, Kuusitie 8, Vantaa. A 4-year-old girl ate something with nuts: her face is swelling and she has trouble breathing. She has an adrenaline pen. Call 112.',
          steps: [
            {
              npc: ['Hätäkeskus. Mitä on tapahtunut?', 'Emergency centre. What has happened?'],
              reply: ['Lapsella on vakava allerginen reaktio. Hänen on vaikea hengittää.', 'A child is having a severe allergic reaction. She has trouble breathing.'],
              accept: ['Lapsella on allerginen reaktio', 'Lapsella on vakava allerginen reaktio', 'Lapsen on vaikea hengittää', 'Lapsi ei saa henkeä', 'Lapsella on allerginen reaktio, hänen on vaikea hengittää'],
              wrong: [
                ['Lapsi on allerginen reaktio.', 'The child is an allergic reaction.', 'Use the "have" structure: lapsella on allerginen reaktio.'],
                ['Lapsella on vähän nuhaa.', 'The child has a bit of a runny nose.', 'This is much more serious – say she has trouble breathing.'],
              ],
            },
            {
              npc: ['Mikä on osoite?', 'What is the address?'],
              reply: ['Päiväkoti Satakieli, Kuusitie 8, Vantaa.', 'Satakieli daycare, Kuusitie 8, Vantaa.'],
              accept: ['Kuusitie 8 Vantaa', 'Kuusitie 8, Vantaa', 'Päiväkoti Satakieli Kuusitie 8 Vantaa', 'Osoite on Kuusitie 8, Vantaa'],
              wrong: [
                ['Päiväkodissa.', 'At the daycare.', 'Give the name, the street address and the town.'],
                ['Kuusitie 8.', 'Kuusitie 8.', 'Also say the town: Vantaa.'],
              ],
            },
            {
              npc: ['Kuinka vanha lapsi on? Onko hänellä adrenaliinikynää?', 'How old is the child? Does she have an adrenaline pen?'],
              reply: ['Hän on neljä vuotta vanha. Kyllä, hänellä on adrenaliinikynä.', 'She is four years old. Yes, she has an adrenaline pen.'],
              accept: ['Neljä vuotta', 'Hän on neljävuotias', 'Hän on neljä vuotta vanha', 'Kyllä, hänellä on adrenaliinikynä', 'Neljä vuotta, hänellä on adrenaliinikynä'],
              wrong: [
                ['Hän on neljä vuotta vanhempi.', 'She is four years older.', 'Age: neljä vuotta vanha or neljävuotias.'],
                ['Hän on neljä vuotta vanha. Ei, hänellä on adrenaliinikynä.', 'She is four. No, she has an adrenaline pen.', 'Kyllä means yes – ei means no.'],
              ],
            },
            {
              npc: ['Anna adrenaliini nyt reiteen. Ambulanssi on matkalla. Pysy puhelimessa.', 'Give the adrenaline into the thigh now. The ambulance is on its way. Stay on the line.'],
              reply: ['Selvä, annan sen nyt. Pysyn puhelimessa.', 'OK, I\'ll give it now. I\'ll stay on the line.'],
              accept: ['Selvä', 'Selvä, annan sen nyt', 'Annan sen nyt', 'Pysyn puhelimessa', 'Ymmärrän'],
              wrong: [
                ['Selvä, annan sen huomenna.', 'OK, I\'ll give it tomorrow.', 'It must be given now (nyt).'],
                ['Selvä, lopetan puhelun.', 'OK, I\'ll hang up.', 'Stay on the line until they tell you to hang up.'],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'kids', level: 'A2.1', icon: '🧸', name: 'Talking with children', fi: 'Lasten kanssa', category: 'Daycare: instructions',
      intro: 'You\'re the teacher. The children speak everyday spoken Finnish (mä, sä, haluun…). You answer in clear, kind Finnish: name the feeling, give a simple instruction, and praise when it goes well.',
      situations: [
        {
          title: 'Finish your plate first',
          goal: 'Lunchtime. Eero wants to go and play, but he has hardly eaten. Tell him to eat first – then he can play.',
          steps: [
            {
              npc: ['Mä haluun mennä leikkimään!', 'I wanna go and play!'],
              reply: ['Syö ensin ruokasi, sitten voit mennä leikkimään.', 'Eat your food first, then you can go and play.'],
              accept: ['Syö ensin ruokasi', 'Syö ensin ruoka', 'Ensin syödään, sitten leikitään', 'Syö ensin, sitten voit leikkiä', 'Syö ensin ja sitten voit mennä leikkimään'],
              wrong: [
                ['Mene vain leikkimään.', 'Just go and play.', 'He hasn\'t eaten yet – food comes first.'],
                ['Syö ensin ruokasi, sitten voit mennä leikkiä.', 'Eat first, then you can go play (wrong form).', 'After mennä, the verb takes -maan: mennä leikkimään.'],
              ],
            },
            {
              npc: ['Mä en tykkää tästä.', 'I don\'t like this.'],
              reply: ['Maista edes vähän. Se on hyvää.', 'At least taste a little. It\'s good.'],
              accept: ['Maista edes vähän', 'Maista vähän', 'Maista edes vähän, se on hyvää', 'Maista edes yksi pala'],
              wrong: [
                ['Sitten sinun ei tarvitse syödä mitään.', 'Then you don\'t have to eat anything.', 'Encourage him to taste first – he still needs to eat.'],
                ['Maista edes vähän. Se on pahaa.', 'At least taste a little. It\'s horrible.', 'Say something encouraging: se on hyvää (it\'s good).'],
              ],
            },
            {
              npc: ['No okei… Mä söin kaikki perunat!', 'Well, OK… I ate all the potatoes!'],
              reply: ['Hienoa! Nyt voit viedä lautasen ja mennä leikkimään.', 'Great! Now you can take your plate away and go and play.'],
              accept: ['Hienoa', 'Hienoa, nyt voit mennä leikkimään', 'Hyvin tehty! Nyt voit mennä leikkimään', 'Hienoa, vie lautanen pois', 'Hienoa! Vie lautanen ja mene leikkimään'],
              wrong: [
                ['Hienoa! Nyt voit viedä lautasen ja mennä leikkimässä.', 'Great! Now take your plate and go being playing.', 'Going to do something: leikkimään (-maan). Leikkimässä means "(being) at play".'],
                ['Ei vielä, syö vielä leipä, salaatti ja keitto.', 'Not yet, eat the bread, salad and soup too.', 'He did what you asked – keep your promise and praise him.'],
              ],
            },
          ],
        },
        {
          title: 'Loud at rest time',
          goal: 'It\'s rest time. Aino is singing loudly and the others can\'t fall asleep. Ask her to be quiet and help her settle.',
          steps: [
            {
              npc: ['(Aino laulaa kovaa lepohetkellä.) Lalalaa!', '(Aino is singing loudly at rest time.) La la laa!'],
              reply: ['Aino, nyt on lepohetki. Puhutaan hiljaa.', 'Aino, it\'s rest time now. Let\'s talk quietly.'],
              accept: ['Nyt on lepohetki', 'Aino, nyt ollaan hiljaa', 'Nyt on lepohetki, ollaan hiljaa', 'Aino, nyt on lepohetki, ole hiljaa', 'Nyt on lepohetki, puhutaan hiljaa'],
              wrong: [
                ['Aino, nyt on lepohetki. Lauletaan kovaa!', 'Aino, it\'s rest time. Let\'s sing loudly!', 'The others are trying to sleep – ask for quiet.'],
                ['Aino, nyt on lepohetki. Puhutaan hiljainen.', 'Aino, it\'s rest time. Let\'s talk quiet (wrong form).', 'Use the adverb hiljaa (quietly). Hiljainen is the adjective (a quiet …).'],
              ],
            },
            {
              npc: ['Mut mua ei väsytä!', 'But I\'m not tired!'],
              reply: ['Sinun ei tarvitse nukkua, mutta muut haluavat nukkua. Voit levätä hiljaa.', 'You don\'t have to sleep, but the others want to. You can rest quietly.'],
              accept: ['Sinun ei tarvitse nukkua', 'Ei tarvitse nukkua', 'Voit levätä hiljaa', 'Ei tarvitse nukkua, mutta ollaan hiljaa', 'Muut haluavat nukkua'],
              wrong: [
                ['Sinun täytyy nukkua heti!', 'You must sleep right now!', 'You can\'t force sleep – resting quietly is enough.'],
                ['Sinun ei tarvitse nukkumaan, mutta muut haluavat nukkua.', 'You don\'t need to sleeping…', 'After ei tarvitse, use the basic form: ei tarvitse nukkua.'],
              ],
            },
            {
              npc: ['Saanks mä kuunnella satua?', 'Can I listen to a story?'],
              reply: ['Kyllä saat, jos olet hiljaa.', 'Yes, you can, if you\'re quiet.'],
              accept: ['Kyllä saat', 'Saat', 'Saat, jos olet hiljaa', 'Kyllä, jos olet hiljaa', 'Joo, saat'],
              wrong: [
                ['Kyllä saat, jos olet äänekäs.', 'Yes, you can, if you\'re loud.', 'The condition should be: jos olet hiljaa (if you\'re quiet).'],
                ['Kyllä saat, jos laulat kovaa.', 'Yes, if you sing loudly.', 'Singing is what kept the others awake!'],
              ],
            },
          ],
        },
        {
          title: 'Hitting in the sandbox',
          goal: 'Leo hit Mia with a spade because she took it from him. Stop the hitting, check on Mia, and help Leo use words and say sorry.',
          steps: [
            {
              npc: ['(Leo lyö Miaa lapiolla.) Se otti mun lapion!', '(Leo hits Mia with the spade.) She took my spade!'],
              reply: ['Stop, Leo! Ei saa lyödä. Se sattuu.', 'Stop, Leo! No hitting. It hurts.'],
              accept: ['Ei saa lyödä', 'Stop! Ei saa lyödä', 'Leo, ei saa lyödä', 'Lopeta, ei saa lyödä', 'Ei saa lyödä, se sattuu'],
              wrong: [
                ['Stop, Leo! Ei saa lyö.', 'Stop, Leo! No hit (wrong form).', 'After ei saa, use the basic form: ei saa lyödä.'],
                ['Leo, lyö vielä kerran!', 'Leo, hit her once more!', 'Never! Stop the hitting: Ei saa lyödä.'],
              ],
            },
            {
              npc: ['(Mia itkee.) Auts, sattuu!', '(Mia is crying.) Ow, it hurts!'],
              reply: ['Mia, tule tänne. Mihin sattuu?', 'Mia, come here. Where does it hurt?'],
              accept: ['Mihin sattuu', 'Mia, mihin sattuu', 'Tule tänne, mihin sattuu', 'Mihin sinua sattuu', 'Mia, tule tänne, mihin sattuu'],
              wrong: [
                ['Mia, tule tänne. Missä sattuu?', 'Mia, come here. Where does it hurt (wrong form)?', 'The fixed question is Mihin sattuu? (illative).'],
                ['Mia, älä itke, ei se mitään.', 'Mia, don\'t cry, it\'s nothing.', 'First check where it hurts – comfort her, don\'t brush it off.'],
              ],
            },
            {
              npc: ['(Leo:) Mut se otti mun lapion…', '(Leo:) But she took my spade…'],
              reply: ['Ymmärrän, että harmitti. Käytä sanoja ja sano anteeksi.', 'I understand you were upset. Use your words and say sorry.'],
              accept: ['Käytä sanoja', 'Sano anteeksi', 'Käytä sanoja ja sano anteeksi', 'Ymmärrän, mutta sano anteeksi', 'Ymmärrän, että harmitti. Sano Mialle anteeksi'],
              wrong: [
                ['Ymmärrän, että harmitti. Käytä sanat ja sano anteeksi.', 'I understand… use the words (wrong form) and say sorry.', 'käyttää takes the partitive here: käytä sanoja.'],
                ['Ymmärrän, että harmitti. Ota lapio takaisin väkisin.', 'I understand… take the spade back by force.', 'Help him use words instead – and apologise.'],
              ],
            },
          ],
        },
        {
          title: 'Getting dressed to go out',
          goal: 'It\'s cold and time to go outside. Help Ville get dressed: his overall first, then his hat and mittens.',
          steps: [
            {
              npc: ['Mennäänks ulos?', 'Are we going outside?'],
              reply: ['Mennään! Puetaan ensin haalari päälle.', 'Yes! Let\'s put your overall on first.'],
              accept: ['Mennään', 'Puetaan haalari', 'Pue ensin haalari', 'Mennään, pue haalari päälle', 'Puetaan ensin haalari päälle'],
              wrong: [
                ['Mennään! Puetaan ensin haalari pois.', 'Yes! Let\'s take the overall off first.', 'päälle = on; pois = off.'],
                ['Mennään! Puetaan ensin uimapuku päälle.', 'Yes! Let\'s put your swimsuit on first.', 'It\'s cold – he needs his overall (haalari).'],
              ],
            },
            {
              npc: ['Mä en saa vetoketjua kiinni.', 'I can\'t do up the zip.'],
              reply: ['Autan sinua. Katso, näin se menee.', 'I\'ll help you. Look, this is how it goes.'],
              accept: ['Autan sinua', 'Minä autan', 'Autan, katso näin', 'Autan sinua, näin se menee', 'Katso, näin se menee'],
              wrong: [
                ['Autan sinut. Katso, näin se menee.', 'I\'ll help you (wrong form)…', 'auttaa takes the partitive: autan sinua.'],
                ['Tee se itse, minulla on kiire.', 'Do it yourself, I\'m busy.', 'Help him – and show him how, so he learns.'],
              ],
            },
            {
              npc: ['Valmis! Voinks mä mennä?', 'Ready! Can I go?'],
              reply: ['Melkein! Laita vielä pipo päähän ja lapaset käteen.', 'Almost! Put your hat on your head and your mittens on too.'],
              accept: ['Laita pipo päähän', 'Laita vielä pipo ja lapaset', 'Pipo ja lapaset vielä', 'Melkein, laita vielä pipo päähän', 'Laita vielä pipo päähän ja lapaset käteen'],
              wrong: [
                ['Melkein! Laita vielä pipo käteen ja lapaset päähän.', 'Almost! Put your hat on your hand and mittens on your head.', 'Mixed up: pipo päähän (on the head), lapaset käteen (on the hands).'],
                ['Joo, mene vaan ilman pipoa.', 'Yes, just go without a hat.', 'It\'s cold – he needs his hat and mittens.'],
              ],
            },
          ],
        },
        {
          title: 'Tidy-up time',
          goal: 'Playtime is over and lunch is soon. Tell the children to tidy up and show where the blocks go: in the box under the shelf.',
          steps: [
            {
              npc: ['(Lapset leikkivät palikoilla.) Kato, mun torni!', '(The children are playing with blocks.) Look, my tower!'],
              reply: ['Upea torni! Nyt on siivousaika, kerätään lelut.', 'What a great tower! Now it\'s tidy-up time, let\'s collect the toys.'],
              accept: ['Kerätään lelut', 'Upea torni! Kerätään lelut', 'Nyt kerätään lelut', 'Nyt on siivousaika', 'Hieno torni, nyt kerätään lelut'],
              wrong: [
                ['Upea torni! Nyt on siivousaika, kerätään lelua.', 'Great tower! Tidy-up time, let\'s collect some toy.', 'All the toys: kerätään lelut (plural).'],
                ['Upea torni! Rakennetaan vielä kymmenen tornia.', 'Great tower! Let\'s build ten more towers.', 'It\'s time to tidy up – lunch is soon.'],
              ],
            },
            {
              npc: ['Mihin nää palikat laitetaan?', 'Where do these blocks go?'],
              reply: ['Palikat laitetaan laatikkoon hyllyn alle.', 'The blocks go in the box under the shelf.'],
              accept: ['Laatikkoon', 'Laita ne laatikkoon', 'Palikat laitetaan laatikkoon', 'Tuohon laatikkoon', 'Laatikkoon hyllyn alle'],
              wrong: [
                ['Palikat laitetaan laatikossa hyllyn alla.', 'The blocks are put in the box under the shelf (wrong forms).', 'With laittaa (to put) use the "to" forms: laatikkoon, hyllyn alle.'],
                ['Palikat heitetään ikkunasta ulos.', 'The blocks are thrown out of the window.', 'Ha – no! They go in the box.'],
              ],
            },
            {
              npc: ['Valmista tuli!', 'All done!'],
              reply: ['Kiitos avusta! Nyt mennään pesemään kädet.', 'Thanks for helping! Now let\'s go and wash our hands.'],
              accept: ['Kiitos avusta', 'Hienoa, kiitos', 'Kiitos! Mennään pesemään kädet', 'Hyvin tehty, nyt pestään kädet', 'Kiitos avusta, mennään pesemään kädet'],
              wrong: [
                ['Kiitos avusta! Nyt mennään pesemässä kädet.', 'Thanks! Now let\'s go being washing hands.', 'Going to do something: pesemään (-maan).'],
                ['Ei ole valmista, tee kaikki uudestaan.', 'It isn\'t done, do it all again.', 'They finished – thank them and move on.'],
              ],
            },
          ],
        },
        {
          title: 'Comforting at drop-off',
          goal: 'Morning drop-off. Ella\'s dad has just left and she is crying. Comfort her, tell her Dad will come after nap time, and suggest drawing together.',
          steps: [
            {
              npc: ['(Ella itkee.) Mä haluun iskän luo!', '(Ella is crying.) I want my daddy!'],
              reply: ['Sinulla on ikävä isiä. Isi tulee hakemaan sinut päiväunien jälkeen.', 'You miss Daddy. Daddy will come and get you after nap time.'],
              accept: ['Sinulla on ikävä isiä', 'Isi tulee hakemaan sinut', 'Isi tulee hakemaan sinut päiväunien jälkeen', 'Sinulla on ikävä isiä, isi tulee hakemaan sinut', 'Isi tulee päiväunien jälkeen'],
              wrong: [
                ['Sinulla on ikävä isi.', 'You miss Daddy (wrong form).', 'After ikävä, the person is partitive: ikävä isiä.'],
                ['Älä itke, isi ei tule enää.', 'Don\'t cry, Daddy isn\'t coming any more.', 'Never say that – reassure her that Daddy will come back.'],
              ],
            },
            {
              npc: ['Mä en haluu olla täällä.', 'I don\'t want to be here.'],
              reply: ['Ymmärrän. Haluatko tulla syliin hetkeksi?', 'I understand. Would you like to sit on my lap for a moment?'],
              accept: ['Haluatko tulla syliin', 'Ymmärrän, haluatko syliin', 'Tule syliin', 'Ymmärrän, tule syliin hetkeksi', 'Haluatko tulla syliin hetkeksi'],
              wrong: [
                ['Ymmärrän. Haluatko tulla sylissä?', 'I understand. Do you want to come on the lap (wrong form)?', 'Moving onto the lap: syliin (illative). Sylissä = sitting on the lap.'],
                ['Sinun pitää olla täällä, lopeta itku.', 'You have to be here, stop crying.', 'Acknowledge her feelings first – comfort comes before rules.'],
              ],
            },
            {
              npc: ['(Ella rauhoittuu vähän.) Mitä me tehdään?', '(Ella calms down a little.) What are we going to do?'],
              reply: ['Mennään yhdessä piirtämään. Voit piirtää kuvan isille!', 'Let\'s go and draw together. You can draw a picture for Daddy!'],
              accept: ['Mennään piirtämään', 'Mennään yhdessä piirtämään', 'Piirretään kuva isille', 'Voit piirtää kuvan isille', 'Mennään piirtämään kuva isille'],
              wrong: [
                ['Mennään yhdessä piirtää.', 'Let\'s go draw together (wrong form).', 'mennä + the -maan form: mennään piirtämään.'],
                ['En tiedä, mene itse jonnekin.', 'I don\'t know, go somewhere by yourself.', 'Stay with her and suggest something nice to do together.'],
              ],
            },
          ],
        },
        {
          title: 'Taking turns on the swing',
          goal: 'Onni has been on the swing for a long time and Sara is waiting. Help them take turns – Onni\'s idea of counting to ten is a good one.',
          steps: [
            {
              npc: ['(Sara:) Onni ei anna mun keinua!', '(Sara:) Onni won\'t let me swing!'],
              reply: ['Onni, nyt on Saran vuoro. Vuorotellaan.', 'Onni, now it\'s Sara\'s turn. Let\'s take turns.'],
              accept: ['Nyt on Saran vuoro', 'Vuorotellaan', 'Onni, nyt on Saran vuoro', 'Onni, vuorotellaan', 'Nyt on Saran vuoro, vuorotellaan'],
              wrong: [
                ['Onni, nyt on Sara vuoro.', 'Onni, now it\'s Sara turn.', 'Whose turn: Saran vuoro (genitive, -n).'],
                ['Sara, mene pois, Onni keinuu.', 'Sara, go away, Onni is swinging.', 'Sara has waited – it\'s fair to take turns.'],
              ],
            },
            {
              npc: ['(Onni:) Mut mä haluun vielä!', '(Onni:) But I want more!'],
              reply: ['Voit keinua taas, kun Sara on keinunut. Odota vuoroasi.', 'You can swing again when Sara has had a go. Wait for your turn.'],
              accept: ['Odota vuoroasi', 'Voit keinua taas myöhemmin', 'Kohta on taas sinun vuoro', 'Voit keinua sitten taas', 'Odota vuoroasi, kohta saat taas'],
              wrong: [
                ['Voit keinua taas, kun Sara on keinunut. Odota vuorosi.', 'You can swing again… wait your turn (wrong form).', 'odottaa takes the partitive: odota vuoroasi.'],
                ['Hyvä on, keinu koko päivä.', 'Fine, swing all day.', 'That isn\'t fair to Sara – help them take turns.'],
              ],
            },
            {
              npc: ['(Onni:) No okei. Lasketaanks kymmeneen?', '(Onni:) Well OK. Shall we count to ten?'],
              reply: ['Hyvä idea! Lasketaan yhdessä kymmeneen, ja sitten vaihdetaan.', 'Good idea! Let\'s count to ten together and then swap.'],
              accept: ['Hyvä idea', 'Lasketaan yhdessä', 'Lasketaan kymmeneen', 'Hyvä idea, lasketaan yhdessä', 'Lasketaan kymmeneen ja sitten vaihdetaan'],
              wrong: [
                ['Hyvä idea! Lasketaan yhdessä kymmenen, ja sitten vaihdetaan.', 'Good idea! Let\'s count ten together (wrong form).', 'Counting up to a number: kymmeneen (illative).'],
                ['Ei, me ei lasketa mitään.', 'No, we\'re not counting anything.', 'It\'s a great idea from Onni – go with it.'],
              ],
            },
          ],
        },
        {
          title: 'Washing hands before lunch',
          goal: 'Lunch is ready. Send the children to wash their hands – one of them forgot the soap. Then tell them to dry their hands and sit in their own places.',
          steps: [
            {
              npc: ['(Lapset tulevat ulkoa.) Onks jo ruoka-aika?', '(The children come in from outside.) Is it lunchtime already?'],
              reply: ['On! Mennään ensin pesemään kädet.', 'Yes! Let\'s go and wash our hands first.'],
              accept: ['On, mennään pesemään kädet', 'Pese ensin kädet', 'Ensin pestään kädet', 'Mennään pesemään kädet', 'On! Pestään ensin kädet'],
              wrong: [
                ['On! Mennään ensin syömään kädet.', 'Yes! Let\'s go and eat our hands first.', 'Ha! Pesemään (to wash) – not syömään (to eat).'],
                ['Ei, ruoka on kylmää.', 'No, the food is cold.', 'Lunch is ready – send them to wash their hands.'],
              ],
            },
            {
              npc: ['Mä pesin jo! (Vain vedellä.)', 'I already washed them! (Only with water.)'],
              reply: ['Muista myös saippua. Pestään uudestaan yhdessä.', 'Remember the soap too. Let\'s wash them again together.'],
              accept: ['Muista saippua', 'Muista myös saippua', 'Pestään uudestaan saippualla', 'Pese saippualla', 'Käytä saippuaa'],
              wrong: [
                ['Muista myös shampoo.', 'Remember the shampoo too.', 'Shampoo is for hair – hands are washed with soap (saippua).'],
                ['Hienoa, mennään syömään.', 'Great, let\'s go and eat.', 'Water alone isn\'t enough – remind them about soap.'],
              ],
            },
            {
              npc: ['Nyt on puhtaat kädet!', 'Now my hands are clean!'],
              reply: ['Hienoa! Kuivaa kädet ja istu omalle paikallesi.', 'Great! Dry your hands and sit in your own place.'],
              accept: ['Kuivaa kädet', 'Hienoa, kuivaa kädet', 'Kuivaa kädet ja istu paikallesi', 'Istu omalle paikallesi', 'Hienoa! Kuivaa kädet ja istu'],
              wrong: [
                ['Hienoa! Kuivaa kädet ja istu omalla paikallasi.', 'Great! Dry your hands and sit (being) in your place.', 'Moving to your seat: omalle paikallesi (allative). Omalla paikallasi = already sitting there.'],
                ['Hienoa! Kastele kädet uudestaan.', 'Great! Get your hands wet again.', 'They\'re done – dry them and sit down.'],
              ],
            },
          ],
        },
      ],
    },
  ];
});

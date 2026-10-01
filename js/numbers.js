/*
 * Numbers in use: Finnish number words, ordinals and their common case forms, and
 * generators for practice exercises (dates, clock times, prices, positions, spoken forms…).
 * Pure functions, shared by the app and the tests.
 */
(function (root, factory) {
  const numbers = factory();
  if (typeof module === 'object' && module.exports) module.exports = numbers;
  else root.VocabNumbers = numbers;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const ONES = ['nolla', 'yksi', 'kaksi', 'kolme', 'neljä', 'viisi', 'kuusi', 'seitsemän', 'kahdeksan', 'yhdeksän'];

  function below100(n) {
    if (n < 10) return ONES[n];
    if (n === 10) return 'kymmenen';
    if (n < 20) return ONES[n - 10] + 'toista';
    const t = Math.floor(n / 10), u = n % 10;
    return ONES[t] + 'kymmentä' + (u ? ONES[u] : '');
  }
  function below1000(n) {
    if (n < 100) return below100(n);
    const h = Math.floor(n / 100), r = n % 100;
    return (h === 1 ? 'sata' : ONES[h] + 'sataa') + (r ? below100(r) : '');
  }
  /** Cardinal number as one word, 0–999 999 (Finnish writes numbers together). */
  function cardinal(n) {
    if (n < 1000) return below1000(n);
    const th = Math.floor(n / 1000), r = n % 1000;
    return (th === 1 ? 'tuhat' : below1000(th) + 'tuhatta') + (r ? below1000(r) : '');
  }

  // Ordinals 1–31: the last part is a full ordinal; earlier parts use the compound stem (yhdes-, kahdes-).
  const ORD = ['', 'ensimmäinen', 'toinen', 'kolmas', 'neljäs', 'viides', 'kuudes', 'seitsemäs', 'kahdeksas', 'yhdeksäs'];
  const ORD_PREFIX = ['', 'yhdes', 'kahdes', 'kolmas', 'neljäs', 'viides', 'kuudes', 'seitsemäs', 'kahdeksas', 'yhdeksäs'];
  const ORD_ESS = ['', 'ensimmäisenä', 'toisena', 'kolmantena', 'neljäntenä', 'viidentenä', 'kuudentena', 'seitsemäntenä', 'kahdeksantena', 'yhdeksäntenä'];
  const ORD_ESS_PREFIX = ['', 'yhdentenä', 'kahdentena', 'kolmantena', 'neljäntenä', 'viidentenä', 'kuudentena', 'seitsemäntenä', 'kahdeksantena', 'yhdeksäntenä'];
  function compoundOrdinal(n, last, prefix, ten) {
    if (n < 10) return last[n];
    if (n === 10) return ten;
    if (n < 20) return prefix[n - 10] + 'toista';
    const t = Math.floor(n / 10), u = n % 10;
    return prefix[t] + ten + (u ? last[u] : '');
  }
  /** "6." → kuudes. */
  const ordinal = (n) => compoundOrdinal(n, ORD, ORD_PREFIX, 'kymmenes');
  /** "on the 6th" → kuudentena. */
  const ordinalEssive = (n) => compoundOrdinal(n, ORD_ESS, ORD_ESS_PREFIX, 'kymmenentenä');

  // Ordinals 1–10 in the cases learners meet most.
  const ORD_INESSIVE = ['', 'ensimmäisessä', 'toisessa', 'kolmannessa', 'neljännessä', 'viidennessä', 'kuudennessa', 'seitsemännessä', 'kahdeksannessa', 'yhdeksännessä', 'kymmenennessä'];
  const ORD_TRANSLATIVE = ['', 'ensimmäiseksi', 'toiseksi', 'kolmanneksi', 'neljänneksi', 'viidenneksi', 'kuudenneksi', 'seitsemänneksi', 'kahdeksanneksi', 'yhdeksänneksi', 'kymmenenneksi'];

  const MONTHS_PARTITIVE = ['', 'tammikuuta', 'helmikuuta', 'maaliskuuta', 'huhtikuuta', 'toukokuuta', 'kesäkuuta',
    'heinäkuuta', 'elokuuta', 'syyskuuta', 'lokakuuta', 'marraskuuta', 'joulukuuta'];
  const MONTH_DAYS = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Clock hours 1–12: "at" (-lta) and "until" (-an … asti).
  const HOUR_AT = ['', 'yhdeltä', 'kahdelta', 'kolmelta', 'neljältä', 'viideltä', 'kuudelta', 'seitsemältä', 'kahdeksalta', 'yhdeksältä', 'kymmeneltä', 'yhdeltätoista', 'kahdeltatoista'];
  const HOUR_UNTIL = ['', 'yhteen', 'kahteen', 'kolmeen', 'neljään', 'viiteen', 'kuuteen', 'seitsemään', 'kahdeksaan', 'yhdeksään', 'kymmeneen', 'yhteentoista', 'kahteentoista'];
  // Minutes past / to, in the partitive.
  const MINUTES = { 5: 'viittä', 10: 'kymmentä', 15: 'varttia', 20: 'kahtakymmentä', 25: 'kahtakymmentäviittä' };

  // Number nouns used for buses, grades, room numbers… and their adessive / accusative.
  const NUMBER_NOUNS = [null,
    ['ykkönen', 'ykkösellä', 'ykkösen'], ['kakkonen', 'kakkosella', 'kakkosen'], ['kolmonen', 'kolmosella', 'kolmosen'],
    ['nelonen', 'nelosella', 'nelosen'], ['vitonen', 'vitosella', 'vitosen'], ['kutonen', 'kutosella', 'kutosen'],
    ['seiska', 'seiskalla', 'seiskan'], ['kasi', 'kasilla', 'kasin'], ['ysi', 'ysillä', 'ysin'], ['kymppi', 'kympillä', 'kympin']];

  // Everyday spoken forms of numbers.
  const SPOKEN = [[2, 'kaks'], [5, 'viis'], [6, 'kuus'], [7, 'seittemän'], [8, 'kaheksan'], [9, 'yheksän'], [11, 'ykstoist'],
    [12, 'kakstoist'], [15, 'viistoist'], [20, 'kakskyt'], [25, 'kakskytviis'], [30, 'kolkyt'], [35, 'kolkytviis'],
    [40, 'nelkyt'], [50, 'viiskyt'], [60, 'kuuskyt'], [70, 'seiskyt'], [80, 'kasikyt'], [90, 'ysikyt']];
  const SPOKEN_DIGITS = { yks: 'yksi', kaks: 'kaksi', viis: 'viisi', kuus: 'kuusi', seittemän: 'seitsemän', kaheksan: 'kahdeksan', yheksän: 'yhdeksän' };

  /* ---------- Checking answers ---------- */

  /** Compare number answers ignoring case, punctuation, spaces and hyphens ("kaksi tuhatta" = "kaksituhatta"). */
  function squash(s) {
    return String(s || '').toLowerCase().normalize('NFC').replace(/[\s.,!?;:–—-]+/g, '');
  }
  function lev(a, b) {
    let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
    for (let i = 1; i <= a.length; i++) {
      const cur = [i];
      for (let j = 1; j <= b.length; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = cur;
    }
    return prev[b.length];
  }
  /** { correct, close } for a typed answer to an exercise. */
  function checkNumberAnswer(typed, ex) {
    let given = squash(typed);
    if (ex.kind === 'phone') {
      given = String(typed || '').toLowerCase().split(/[\s,]+/).map((w) => SPOKEN_DIGITS[w] || w).join('');
      given = squash(given);
    }
    if (!given) return { correct: false, close: false };
    const answers = [ex.answer].concat(ex.accept || []).map(squash);
    if (answers.includes(given)) return { correct: true, close: false };
    // A known mistake (e.g. the wrong case) is never "close enough".
    if ((ex.wrong || []).map(squash).includes(given)) return { correct: false, close: false };
    const close = answers.some((a) => a.length >= 8 && lev(a, given) <= 1);
    return { correct: close, close };
  }

  /* ---------- Exercise generators ---------- */

  const pick = (arr, rng) => arr[Math.floor(rng() * arr.length)];
  const int = (a, b, rng) => a + Math.floor(rng() * (b - a + 1));
  const uniq = (list, answer) => Array.from(new Set(list.filter((x) => x && squash(x) !== squash(answer))));

  const SETS = {
    dates: { name: 'Dates', icon: '📅', blurb: 'Tänään on kuudes joulukuuta · juhla on kuudentena joulukuuta' },
    times: { name: 'Clock times', icon: '🕒', blurb: 'puoli neljä, varttia yli kaksi, kymmentä vaille viisi' },
    atuntil: { name: 'At & until', icon: '⏰', blurb: 'kahdelta (at two), neljään asti (until four)' },
    prices: { name: 'Prices', icon: '💶', blurb: '3,50 € = kolme euroa viisikymmentä senttiä' },
    positions: { name: 'Ordinals & positions', icon: '🥇', blurb: 'kolmannessa kerroksessa, tuli toiseksi, jonossa neljäntenä' },
    spoken: { name: 'Spoken numbers', icon: '🗣️', blurb: 'kakskyt, viiskyt · Mennään ysillä · Sain kympin' },
    other: { name: 'Years, ages & phone numbers', icon: '☎️', blurb: 'vuonna kaksituhattakaksikymmentäneljä, neljävuotias' },
  };

  function dateExercise(rng) {
    const m = int(1, 12, rng), d = int(1, MONTH_DAYS[m], rng);
    const shown = d + '.' + m + '.';
    if (rng() < 0.5) {
      return {
        kind: 'dates', shown, task: 'Say the date', context: pick(['Tänään on ___.', 'Huomenna on ___.', 'Eilen oli ___.'], rng),
        answer: ordinal(d) + ' ' + MONTHS_PARTITIVE[m],
        accept: [ordinal(d) + ' ' + ordinal(m)],
        wrong: uniq([ordinalEssive(d) + ' ' + MONTHS_PARTITIVE[m], cardinal(d) + ' ' + MONTHS_PARTITIVE[m],
          ordinal(d) + ' ' + MONTHS_PARTITIVE[m === 12 ? 11 : m + 1], ordinal(d === 1 ? 2 : d - 1) + ' ' + MONTHS_PARTITIVE[m]], ''),
        note: 'Day = ordinal (' + ordinal(d) + '), month = partitive (' + MONTHS_PARTITIVE[m] + '). People also say the month as an ordinal: ' + ordinal(d) + ' ' + ordinal(m) + '.',
      };
    }
    return {
      kind: 'dates', shown, task: 'Say "on" this date', context: pick(['Juhla on ___.', 'Synnyin ___.', 'Loma alkaa ___.', 'Vanhempainilta on ___.'], rng),
      answer: ordinalEssive(d) + ' ' + MONTHS_PARTITIVE[m],
      accept: [],
      wrong: uniq([ordinal(d) + ' ' + MONTHS_PARTITIVE[m], ordinalEssive(d) + ' ' + MONTHS_PARTITIVE[m].replace(/kuuta$/, 'kuussa'),
        ordinalEssive(d === 1 ? 2 : d - 1) + ' ' + MONTHS_PARTITIVE[m]], ''),
      note: '"On the …" uses the essive of the ordinal: ' + ordinalEssive(d) + '. The month stays partitive: ' + MONTHS_PARTITIVE[m] + '.',
    };
  }

  function timeExercise(rng) {
    const h = int(1, 23, rng), m = pick([0, 0, 5, 10, 15, 20, 25, 30, 30, 35, 40, 45, 50, 55], rng);
    const h12 = h % 12 || 12, next = h12 % 12 + 1;
    const hour = (x) => cardinal(x);
    const shown = h + '.' + String(m).padStart(2, '0');
    const official = m === 0 ? 'kello ' + cardinal(h) : cardinal(h) + ' ' + cardinal(m);
    let answer, wrong, note, spoken = '';
    if (m === 0) {
      answer = 'kello ' + hour(h12);
      wrong = ['kello ' + hour(next), 'puoli ' + hour(h12), 'varttia yli ' + hour(h12)];
      note = 'On the hour: kello + number.';
    } else if (m === 30) {
      answer = 'puoli ' + hour(next);
      wrong = ['puoli ' + hour(h12), 'kolmekymmentä yli ' + hour(h12), 'varttia vaille ' + hour(next)];
      note = '"puoli ' + hour(next) + '" = half (way) to ' + next + ', i.e. ' + h12 + '.30. A very common trap!';
    } else if (m < 30) {
      answer = MINUTES[m] + ' yli ' + hour(h12);
      spoken = m === 15 ? '' : cardinal(m) + ' yli ' + hour(h12);
      wrong = [MINUTES[m] + ' vaille ' + hour(h12), MINUTES[m] + ' yli ' + hour(next), MINUTES[m] + ' yli ' + hour(h12 === 1 ? 12 : h12 - 1)];
      note = 'Minutes past: partitive (' + MINUTES[m] + ') + yli + hour.' + (spoken ? ' In speech you also hear ' + spoken + '.' : '');
    } else {
      answer = MINUTES[60 - m] + ' vaille ' + hour(next);
      spoken = m === 45 ? '' : cardinal(60 - m) + ' vaille ' + hour(next);
      wrong = [MINUTES[60 - m] + ' yli ' + hour(next), MINUTES[60 - m] + ' vaille ' + hour(h12), MINUTES[60 - m] + ' vaille ' + hour(next % 12 + 1)];
      note = 'Minutes to: partitive (' + MINUTES[60 - m] + ') + vaille + the next hour.' + (spoken ? ' In speech you also hear ' + spoken + '.' : '');
    }
    return {
      kind: 'times', shown, task: 'Say the time (everyday way)', context: 'Kello on ___.',
      answer, accept: ['kello ' + answer, official, 'kello ' + official].concat(m === 0 ? [hour(h12), 'tasan ' + hour(h12)] : [], spoken ? [spoken] : []),
      wrong: uniq(wrong, answer), note: note + ' Official (24 h): ' + official + '.',
    };
  }

  function atUntilExercise(rng) {
    const h = int(1, 12, rng), other = h === 12 ? 11 : h + 1;
    if (rng() < 0.5) {
      const [context, en] = pick([['Päiväkoti aukeaa ___.', 'opens'], ['Lounas on ___.', 'is'], ['Tulen kotiin ___.', 'come home'], ['Palaveri alkaa ___.', 'starts']], rng);
      return {
        kind: 'atuntil', shown: 'at ' + h + ' o\'clock', task: 'Say "at ' + h + '" (one word)', context, en,
        answer: HOUR_AT[h], accept: ['kello ' + HOUR_AT[h], 'kello ' + cardinal(h)],
        wrong: uniq([HOUR_UNTIL[h], cardinal(h) + 'lle', HOUR_AT[other], cardinal(h)], HOUR_AT[h]),
        note: '"At" a clock time: -lta / -ltä (ablative): ' + HOUR_AT[h] + '. Kello ' + cardinal(h) + ' is also fine.',
      };
    }
    const context = pick(['Olen töissä ___ asti.', 'Päiväkoti on auki ___ asti.', 'Lapset nukkuvat ___ asti.', 'Odotan ___ asti.'], rng);
    return {
      kind: 'atuntil', shown: 'until ' + h + ' o\'clock', task: 'Say "until ' + h + '" (… asti)', context,
      answer: HOUR_UNTIL[h], accept: ['kello ' + HOUR_UNTIL[h]],
      wrong: uniq([HOUR_AT[h], cardinal(h), HOUR_UNTIL[other], cardinal(h) + 'aan'], HOUR_UNTIL[h]),
      note: '"Until" a time: illative + asti: ' + HOUR_UNTIL[h] + ' asti.',
    };
  }

  function priceExercise(rng) {
    const e = pick([1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 19, 20, 24, 49, 99], rng);
    const c = pick([0, 10, 20, 50, 50, 75, 90, 95, 99], rng);
    const euros = e === 1 ? 'yksi euro' : cardinal(e) + ' euroa';
    const answer = euros + (c ? ' ' + cardinal(c) + ' senttiä' : '');
    const shown = e + (c ? ',' + String(c).padStart(2, '0') : '') + ' €';
    return {
      kind: 'prices', shown, task: 'Say the price', context: pick(['Se maksaa ___.', 'Kahvi maksaa ___.', 'Lippu maksaa ___.'], rng),
      answer,
      accept: c ? [euros + ' ' + cardinal(c), cardinal(e) + ' ' + cardinal(c)] : [cardinal(e)],
      wrong: uniq([
        (e === 1 ? 'yksi euroa' : cardinal(e) + ' euro') + (c ? ' ' + cardinal(c) + ' senttiä' : ''),
        cardinal(c || 50) + ' euroa ' + cardinal(e) + ' senttiä',
        cardinal(e + 1) + ' euroa' + (c ? ' ' + cardinal(c) + ' senttiä' : ''),
      ], answer),
      note: 'After numbers above one, euro and sentti are partitive: ' + (e === 1 ? 'yksi euro, kaksi euroa' : cardinal(e) + ' euroa') +
        '. In shops you often hear just the numbers: ' + (c ? cardinal(e) + ' ' + cardinal(c) : cardinal(e)) + '.',
    };
  }

  function positionExercise(rng) {
    const n = int(1, 10, rng);
    const forms = { nom: ordinal(n), ess: ORD_ESS[n] || 'kymmenentenä', ine: ORD_INESSIVE[n], tra: ORD_TRANSLATIVE[n] };
    const tmpl = pick([
      ['ine', 'Asun ___ kerroksessa.', 'floor ' + n, 'Where: inessive (-ssa) – like kerroksessa: ' + forms.ine + ' kerroksessa.'],
      ['ine', 'Luokkamme on ___ kerroksessa.', 'floor ' + n, 'Where: inessive (-ssa) to match kerroksessa.'],
      ['ess', 'Olen jonossa ___.', n + '. in the queue', 'Position "as …": essive (-na): ' + forms.ess + '.'],
      ['ess', 'Hän tuli maaliin ___.', 'finished ' + n + '.', 'Arriving "as …": essive (-na): ' + forms.ess + '.'],
      ['tra', 'Joukkue sijoittui ___.', 'came ' + n + '.', 'Ending up in a place: translative (-ksi): ' + forms.tra + '.'],
      ['tra', 'Hän tuli kilpailussa ___.', n + '. place', 'Placing in a race: translative (-ksi): tuli ' + forms.tra + '.'],
      ['nom', 'Tämä on ___ kerta.', n + '. time', 'Basic form (nominative): ' + forms.nom + ' kerta.'],
      ['nom', 'Tänään on ___ työpäiväni.', n + '. day', 'Basic form (nominative): ' + forms.nom + '.'],
    ], rng);
    const answer = forms[tmpl[0]];
    return {
      kind: 'positions', shown: n + '.', task: 'Fill in the ordinal (' + tmpl[2] + ')', context: tmpl[1],
      answer, accept: [], wrong: uniq(Object.values(forms).concat(n < 10 ? [ordinal(n + 1)] : []), answer), note: tmpl[3],
    };
  }

  function spokenExercise(rng) {
    const r = rng();
    if (r < 0.4) {
      const [n, s] = pick(SPOKEN, rng);
      const others = uniq(SPOKEN.map((x) => String(x[0])).concat(String(n + 1), String(n * 2)), String(n));
      return {
        kind: 'spoken', shown: '“' + s + '”', task: 'Which number is this (spoken Finnish)?', context: '',
        answer: String(n), accept: [cardinal(n)], wrong: Core_shuffle(others, rng).slice(0, 3), digits: true,
        note: '"' + s + '" is how people often say ' + cardinal(n) + ' (' + n + ').',
      };
    }
    const n = int(1, 10, rng);
    const [nom, ade, acc] = NUMBER_NOUNS[n];
    if (r < 0.7) {
      return {
        kind: 'spoken', shown: 'bus ' + n, task: 'Say "by bus number ' + n + '"', context: 'Mennään ___.',
        answer: ade, accept: [ade + ' bussilla'], wrong: uniq([nom, acc, NUMBER_NOUNS[n === 10 ? 9 : n + 1][1], cardinal(n) + 'llä'], ade),
        note: 'Bus and tram lines are called by number nouns: ' + nom + ' (' + n + '). "By it" = adessive: ' + ade + '.',
      };
    }
    return {
      kind: 'spoken', shown: 'grade ' + n, task: 'Say "I got a ' + n + '" (school grade)', context: 'Sain kokeesta ___.',
      answer: acc, accept: [], wrong: uniq([nom, ade, NUMBER_NOUNS[n === 10 ? 9 : n + 1][2]], acc),
      note: 'School grades (4–10) use number nouns: ' + nom + '. Sain + accusative: ' + acc + '.',
    };
  }

  function otherExercise(rng) {
    const r = rng();
    if (r < 0.35) {
      const y = int(1950, 2030, rng);
      return {
        kind: 'years', shown: String(y), task: 'Say the year', context: pick(['Muutin Suomeen vuonna ___.', 'Synnyin vuonna ___.', 'Valmistuin vuonna ___.'], rng),
        answer: cardinal(y), accept: [], wrong: uniq([cardinal(y + 1), cardinal(y + 10), cardinal(y - 100)], cardinal(y)),
        note: 'Years are read as one long number: ' + cardinal(y) + '.',
      };
    }
    if (r < 0.65) {
      const n = int(1, 12, rng);
      return {
        kind: 'ages', shown: n + '-vuotias', task: 'Say the age in one word', context: pick(['Lapsi on ___.', 'Tyttäreni on ___.', 'Ryhmässä on yksi ___.'], rng),
        answer: cardinal(n) + 'vuotias', accept: [cardinal(n) + ' vuotias', cardinal(n) + ' vuotta vanha'],
        wrong: uniq([cardinal(n) + 'vuotta', cardinal(n === 12 ? 11 : n + 1) + 'vuotias', ordinal(n) + 'vuotias'], cardinal(n) + 'vuotias'),
        note: 'number + -vuotias in one word: ' + cardinal(n) + 'vuotias (= ' + cardinal(n) + ' vuotta vanha).',
      };
    }
    const digits = '04' + int(0, 9, rng) + ' ' + Array.from({ length: 3 }, () => int(0, 9, rng)).join('') + ' ' + Array.from({ length: 4 }, () => int(0, 9, rng)).join('');
    const say = (ds) => ds.split(' ').map((g) => g.split('').map((x) => ONES[+x]).join(' ')).join(', ');
    const swapped = digits.slice(0, 4) + digits[5] + digits[4] + digits.slice(6);
    const lastChanged = digits.slice(0, -1) + ((+digits.slice(-1) + 1) % 10);
    const middleChanged = digits.slice(0, 5) + ((+digits[5] + 3) % 10) + digits.slice(6);
    return {
      kind: 'phone', shown: digits, task: 'Read the phone number digit by digit', context: 'Numeroni on ___.',
      answer: say(digits), accept: [], wrong: uniq([say(swapped), say(digits.replace(/^04/, '05')), say(lastChanged), say(middleChanged)], say(digits)),
      note: 'Phone numbers are read one digit at a time. Spoken forms like yks, kaks, viis are fine too.',
    };
  }

  // Small shuffle so this file has no dependencies.
  function Core_shuffle(arr, rng) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }

  const GENERATORS = { dates: dateExercise, times: timeExercise, atuntil: atUntilExercise, prices: priceExercise,
    positions: positionExercise, spoken: spokenExercise, other: otherExercise };

  /** A round of `n` exercises from one set, or 'mixed', without exact repeats. */
  function round(set, n, rng) {
    rng = rng || Math.random;
    const keys = set === 'mixed' ? Object.keys(GENERATORS) : [set];
    const out = [];
    const seen = new Set();
    for (let tries = 0; out.length < n && tries < n * 20; tries++) {
      const ex = GENERATORS[pick(keys, rng)](rng);
      const key = ex.shown + '|' + ex.context;
      if (seen.has(key)) continue;
      seen.add(key);
      ex.options = Core_shuffle([ex.answer].concat(ex.wrong.slice(0, 3)), rng);
      out.push(ex);
    }
    return out;
  }

  return {
    cardinal, ordinal, ordinalEssive, ORD_INESSIVE, ORD_TRANSLATIVE, MONTHS_PARTITIVE, HOUR_AT, HOUR_UNTIL,
    NUMBER_NOUNS, SPOKEN, SETS, round, checkNumberAnswer, squash,
  };
});

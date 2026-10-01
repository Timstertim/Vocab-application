# Sanasto – Finnish vocabulary app

A personal vocabulary notebook for learning Finnish as a foreign language. Save words,
look up definitions and example sentences, group words into categories, and practise
with Quizlet-style mini games.

## Features

- **Word list**: add Finnish words or phrases with an English meaning, part of speech,
  definition, example sentences and notes. Search across all fields (typing `aiti` finds
  `äiti`), filter by category, and sort A–Ö, by newest, or by "needs practice".
- **Dictionary lookup**: press **🔎 Look up** while adding a word, or **Find definitions &
  examples online** on a word's page. The app pulls Finnish definitions and example
  sentences from [Wiktionary](https://en.wiktionary.org) and fills in empty fields. You
  can add more definitions or examples one at a time.
- **Categories**: colour-coded groups such as "Food & drink" or "Chapter 3". A word can be
  in several categories, and you can create a new category straight from the word form.
- **Category suggestions**: while you add a word, the app suggests categories based on its
  English meaning, definition and part of speech. It offers your existing categories when they
  fit (e.g. "to eat" → *Food & drink* and *Verbs*), or proposes a new one (e.g. "dog" →
  *+ New: Animals*). One tap creates the category and ticks it. Suggestions come from a
  built-in list of about 20 everyday topics in `js/topics.js`, so they work offline.
- **Games** (pick a category and a direction: Finnish → English, English → Finnish or mixed):
  - 🃏 **Flashcards**: flip cards and mark each one "know it" or "still learning".
  - ✅ **Multiple choice**: four options per question.
  - ✍️ **Write**: type the answer, with ä / ö / å buttons. It flags near misses and brings
    missed words back at the end of the round.
  - ⚡ **Match**: pair Finnish words with their meanings against the clock. Your best
    time is saved.
- **Your own mini games**: save a game type, its categories, direction and round size
  under a name, then replay it from the Games page.
- **Progress**: every answer is recorded per word. Games pick weak words more often, and
  the results screen lets you practise the words you missed.
- **Pronunciation**: 🔊 buttons read words aloud using your device's text-to-speech
  (install a Finnish voice for the best result).
- **Backup**: export and import everything as JSON from Settings.
- Starts with 194 starter words in 12 categories, including **Feelings**, **Shapes**,
  **A2.2 verbs** and **Daycare** (words a Finnish daycare teacher uses at work). Each verb shows its verb type, "minä" form, past form and, where it
  matters, which case it takes. You can delete starter words, or add them back from Settings.
  When new starter words are released, they're added to your list once; words you already
  have, edited or deleted are left alone.

## Running it

It is a static site with no build step and no dependencies.

- Open `index.html` directly in a browser, **or**
- serve the folder with `npm start` (runs `python3 -m http.server 8000`) and visit
  http://localhost:8000, **or**
- host it on GitHub Pages (Settings → Pages → deploy from this branch).

Your data is stored in the browser's `localStorage`, so it stays on that device and in that
browser. To move it elsewhere, use Settings → Export / Import.

Online lookup needs an internet connection. Everything else works offline.

## Development

```
npm test        # unit tests for answer checking, search, Wiktionary parsing, import
```

| File | Purpose |
| --- | --- |
| `js/core.js` | Pure logic (answer checking, search, round selection, Wiktionary parsing, import), shared with the tests |
| `js/store.js` | State and `localStorage` persistence |
| `js/lookup.js` | Wiktionary API client |
| `js/games.js` | The four game modes and the results screen |
| `js/app.js` | Routing, pages and forms |
| `js/ui.js` | Shared helpers (escaping, speech, ä/ö buttons) |
| `js/topics.js` | Topics and keywords used for category suggestions |
| `js/starter.js` | Starter vocabulary |

Dictionary content from Wiktionary is available under CC BY-SA.

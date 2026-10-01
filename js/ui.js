/* Small DOM helpers shared by the views and the games. */
(function (root) {
  'use strict';

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  let toastTimer;
  function toast(msg) {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
  }

  let fiVoice;
  function pickVoice() {
    if (!('speechSynthesis' in root)) return null;
    const voices = speechSynthesis.getVoices();
    fiVoice = voices.find((v) => /^fi(-|_|$)/i.test(v.lang)) || null;
    return fiVoice;
  }
  if ('speechSynthesis' in root) {
    pickVoice();
    speechSynthesis.onvoiceschanged = pickVoice;
  }

  /** Read text aloud; Finnish uses a Finnish voice when the device has one. */
  function speak(text, lang) {
    if (!('speechSynthesis' in root) || !root.Store.get().settings.speech) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang === 'en' ? 'en-GB' : 'fi-FI';
    if (lang !== 'en' && (fiVoice || pickVoice())) u.voice = fiVoice;
    u.rate = 0.9;
    speechSynthesis.speak(u);
  }

  function speakButton(text, lang) {
    if (!('speechSynthesis' in root) || !root.Store.get().settings.speech) return '';
    return '<button type="button" class="icon-btn speak" data-speak="' + esc(text) +
      '" data-lang="' + (lang || 'fi') + '" title="Listen" aria-label="Listen">🔊</button>';
  }

  /** Buttons that insert Finnish letters into the nearest text input. */
  function letterBar(targetSelector) {
    return '<div class="letter-bar" data-target="' + esc(targetSelector) + '">' +
      ['ä', 'ö', 'å'].map((l) => '<button type="button" class="letter" data-letter="' + l + '">' + l + '</button>').join('') +
      '</div>';
  }

  document.addEventListener('click', (e) => {
    const sp = e.target.closest('[data-speak]');
    if (sp) { e.preventDefault(); e.stopPropagation(); speak(sp.dataset.speak, sp.dataset.lang); return; }
    const lb = e.target.closest('.letter');
    if (lb) {
      e.preventDefault();
      const bar = lb.closest('.letter-bar');
      const input = document.querySelector(bar.dataset.target);
      if (!input) return;
      const start = input.selectionStart ?? input.value.length;
      const end = input.selectionEnd ?? input.value.length;
      input.value = input.value.slice(0, start) + lb.dataset.letter + input.value.slice(end);
      input.focus();
      input.setSelectionRange(start + 1, start + 1);
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
  });

  function catChip(cat) {
    if (!cat) return '';
    return '<span class="chip" style="--chip:' + esc(cat.color) + '">' + esc(cat.name) + '</span>';
  }

  root.UI = { esc, toast, speak, speakButton, letterBar, catChip };
})(window);

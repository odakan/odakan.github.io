/* Home slideshow — dependency-free vanilla JS.
   Autoplays, supports prev/next arrows and dots, pauses on hover/focus,
   and respects prefers-reduced-motion. Add or remove .slide elements
   freely; dots and looping adapt to the slide count automatically. */
(function () {
  var root = document.querySelector('.slideshow');
  if (!root) return;

  var slides = Array.prototype.slice.call(root.querySelectorAll('.slide'));
  if (!slides.length) return;

  var dotsWrap = root.querySelector('.slide-dots');
  var prevBtn = root.querySelector('.slide-nav.prev');
  var nextBtn = root.querySelector('.slide-nav.next');

  var i = slides.findIndex(function (s) { return s.classList.contains('is-active'); });
  if (i < 0) i = 0;

  var dots = slides.map(function (_, n) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'slide-dot';
    b.setAttribute('aria-label', 'Go to slide ' + (n + 1));
    b.addEventListener('click', function () { go(n); restart(); });
    if (dotsWrap) dotsWrap.appendChild(b);
    return b;
  });

  function render() {
    slides.forEach(function (s, n) { s.classList.toggle('is-active', n === i); });
    dots.forEach(function (d, n) {
      d.classList.toggle('is-current', n === i);
      d.setAttribute('aria-current', n === i ? 'true' : 'false');
    });
  }
  function go(n) { i = (n + slides.length) % slides.length; render(); }
  function next() { go(i + 1); }
  function prev() { go(i - 1); }

  if (prevBtn) prevBtn.addEventListener('click', function () { prev(); restart(); });
  if (nextBtn) nextBtn.addEventListener('click', function () { next(); restart(); });

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var timer = null;
  function start() { if (reduce || slides.length < 2) return; timer = window.setInterval(next, 15000); }
  function stop() { if (timer) { window.clearInterval(timer); timer = null; } }
  function restart() { stop(); start(); }

  root.addEventListener('mouseenter', stop);
  root.addEventListener('mouseleave', start);
  root.addEventListener('focusin', stop);
  root.addEventListener('focusout', start);

  render();
  start();
})();

/* Contact form — POSTs to a Google Apps Script web app that appends to your Sheet.
   Setup + Apps Script code: see .plans/contact-form-setup.md */
(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;

  // After deploying the Apps Script (see .plans/contact-form-setup.md),
  // paste its Web App URL between the quotes below:
  var CONTACT_ENDPOINT = 'https://script.google.com/macros/s/AKfycbyqMou1WgEsEpwkGrcb05vEh0iUy1KvnRbHqZk9YkE_WaJRgd2LpjdGKOCX_4TvLnmL/exec';

  var statusEl = form.querySelector('.form-status');
  var button = form.querySelector('button[type="submit"]');
  var field = function (n) { return form.querySelector('[name="' + n + '"]'); };

  function setStatus(msg, kind) {
    statusEl.textContent = msg;
    statusEl.className = 'form-status' + (kind ? ' ' + kind : '');
  }

  // Live character counter for the message box (limit enforced by maxlength="4000").
  var msgEl = field('message');
  var counterEl = document.getElementById('char-count');
  if (msgEl && counterEl) {
    var updateCount = function () { counterEl.textContent = msgEl.value.length + ' / 4000'; };
    msgEl.addEventListener('input', updateCount);
    updateCount();
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var hp = field('company');
    if (hp && hp.value) return; // honeypot tripped — silently ignore bots
    if (!form.checkValidity()) { form.reportValidity(); return; }
    if (CONTACT_ENDPOINT.indexOf('PASTE_') === 0) {
      setStatus('Form endpoint not configured yet.', 'err');
      return;
    }

    setStatus('Sending…', '');
    button.disabled = true;

    var data = new URLSearchParams();
    data.append('name', field('name').value);
    data.append('email', field('email').value);
    data.append('subject', field('subject').value);
    data.append('message', field('message').value);

    fetch(CONTACT_ENDPOINT, { method: 'POST', mode: 'no-cors', body: data })
      .then(function () { form.reset(); setStatus('Thanks — your message was sent.', 'ok'); })
      .catch(function () { setStatus('Something went wrong. Please email onur.akan@iusspavia.it directly.', 'err'); })
      .finally(function () { button.disabled = false; });
  });
})();

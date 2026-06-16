/* ============================================================
   Behavior layer. The page is littered with ads; two of them move.
   Timings live up here so they're easy to tweak.
   ============================================================ */

const CONFIG = {
  popupDelay: 1200,      // pop-up ad appears shortly after load
  popupSkip: 5,          // seconds before the pop-up can be skipped
  stickyReturn: 15000,   // closing the sticky banner only pauses it
};

const $ = (id) => document.getElementById(id);
const show = (el) => el.classList.remove('hidden');
const hide = (el) => el.classList.add('hidden');

/* clicking any ad just... does nothing useful (it's an ad) */
document.addEventListener('click', (e) => {
  if (e.target.closest('a[href="#"]')) e.preventDefault();
});

/* ================= POP-UP AD ================= */
(() => {
  const overlay = $('popup-overlay');
  const x = $('popup-x');
  const count = $('popup-count');
  let n = CONFIG.popupSkip;

  function open() {
    overlay.style.display = 'flex';
    const t = setInterval(() => {
      n--;
      if (n <= 0) {
        clearInterval(t);
        x.classList.add('ready');
        x.textContent = '✕';
      } else {
        count.textContent = n;
      }
    }, 1000);
  }

  x.addEventListener('click', () => { if (x.classList.contains('ready')) overlay.style.display = 'none'; });

  overlay.style.display = 'none';
  setTimeout(open, CONFIG.popupDelay);
})();

/* ================= STICKY BOTTOM BANNER ================= */
(() => {
  const sticky = $('sticky-ad');
  $('sticky-x').addEventListener('click', () => {
    hide(sticky);
    setTimeout(() => show(sticky), CONFIG.stickyReturn);
  });
})();

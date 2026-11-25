/* Autohaus Voigt – Interaktionen */
(function () {
  const body = document.body;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Intro (nur Startseite) ---------- */
  const intro = document.querySelector('.intro');
  function finishIntro() {
    body.classList.remove('is-intro');
    body.classList.add('intro-done');
    if (intro) intro.hidden = true;
  }
  function playIntro() {
    if (!intro) { finishIntro(); return; }
    body.classList.remove('intro-done');
    body.classList.add('is-intro');
    intro.hidden = false;
    intro.classList.remove('play');
    void intro.offsetWidth;            // Animation neu starten
    intro.classList.add('play');
    window.scrollTo(0, 0);
    clearTimeout(playIntro.t);
    playIntro.t = setTimeout(finishIntro, 4250);
  }
  if (intro) {
    // Pfade des Pferds nacheinander zeichnen (links -> rechts)
    const paths = intro.querySelectorAll('.intro-horse path');
    paths.forEach((p, i) => {
      p.setAttribute('pathLength', '1');
      p.style.animationDelay = (0.05 + 1.25 * i / paths.length).toFixed(2) + 's';
    });
    playIntro();
    // Klick aufs Logo spielt das Intro erneut ab
    document.querySelectorAll('[data-replay-intro]').forEach((el) =>
      el.addEventListener('click', (e) => { e.preventDefault(); playIntro(); }));
  } else {
    finishIntro();
  }

  /* ---------- Mobiles Menü ---------- */
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.mobile-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      body.style.overflow = open ? 'hidden' : '';
    });
    menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      body.style.overflow = '';
    }));
  }

  /* ---------- Scroll-Reveal ---------- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('in'));
  }

  /* ---------- Statement: Wörter färben sich beim Scrollen ein ---------- */
  const statement = document.querySelector('.statement p');
  let words = [];
  if (statement) {
    const text = statement.textContent.trim();
    statement.innerHTML = text.split(/\s+/).map((w) => '<span class="word">' + w + '</span>').join(' ');
    words = Array.from(statement.querySelectorAll('.word'));
  }

  /* ---------- Hero schrumpft beim Scrollen, Quickbar erscheint ---------- */
  const hero = document.querySelector('.hero');
  const quickbar = document.querySelector('.quickbar');
  let ticking = false;
  function onScroll() {
    const vh = window.innerHeight;
    if (hero && !reduced) {
      const h = hero.offsetHeight;
      const p = Math.min(Math.max(window.scrollY / h, 0), 1);
      hero.style.transform = 'scale(' + (1 - p * 0.1).toFixed(4) + ')';
      hero.style.borderRadius = (p * 32).toFixed(1) + 'px';
      hero.style.opacity = (1 - p * 0.5).toFixed(3);
    }
    if (words.length) {
      const r = statement.getBoundingClientRect();
      // 0 wenn der Satz unten reinkommt, 1 wenn er in der oberen Hälfte ist
      const prog = Math.min(Math.max((vh * 0.85 - r.top) / (vh * 0.5), 0), 1);
      const on = Math.round(prog * words.length);
      words.forEach((w, i) => w.classList.toggle('on', i < on));
    }
    if (quickbar) quickbar.classList.toggle('show', window.scrollY > vh * 0.6);
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  /* ---------- Fahrzeugfilter ---------- */
  const chips = document.querySelectorAll('.chip[data-filter]');
  const cars = document.querySelectorAll('.car[data-type]');
  const count = document.querySelector('[data-count]');
  chips.forEach((chip) => chip.addEventListener('click', () => {
    const f = chip.dataset.filter;
    chips.forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
    let n = 0;
    cars.forEach((car) => {
      const show = f === 'alle' || car.dataset.type === f;
      car.hidden = !show;
      if (show) n++;
    });
    if (count) count.textContent = n;
  }));
})();

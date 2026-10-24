(() => {
  const toggle = document.getElementById('languageToggle');
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  const STORAGE_KEY = 'kalkidan-site-language';
  let language = 'de';

  function getInitialLanguage() {
    const params = new URLSearchParams(window.location.search);
    const queryLanguage = params.get('lang');
    if (queryLanguage === 'de' || queryLanguage === 'am') return queryLanguage;
    try {
      const savedLanguage = localStorage.getItem(STORAGE_KEY);
      if (savedLanguage === 'de' || savedLanguage === 'am') return savedLanguage;
    } catch (_) {}
    return document.documentElement.lang === 'am' ? 'am' : 'de';
  }

  function setLanguage(next, persist = true) {
    language = next === 'am' ? 'am' : 'de';
    document.documentElement.lang = language === 'de' ? 'de' : 'am';
    document.body.classList.toggle('amharic', language === 'am');

    document.querySelectorAll('[data-de][data-am]').forEach((el) => {
      el.textContent = el.dataset[language];
    });

    document.querySelectorAll('[data-placeholder-de][data-placeholder-am]').forEach((el) => {
      el.placeholder = el.dataset[language === 'de' ? 'placeholderDe' : 'placeholderAm'];
    });

    if (toggle) {
      toggle.textContent = language === 'de' ? 'አማርኛ' : 'Deutsch';
      toggle.classList.toggle('flag-am', language === 'de');
      toggle.classList.toggle('flag-de', language === 'am');
      toggle.setAttribute('aria-label', language === 'de' ? 'Auf Amharisch umschalten' : 'Auf Deutsch umschalten');
    }
    document.title = language === 'de' ? 'Kalkidan e.V. | ቃልኪዳን እድር' : 'ቃልኪዳን እድር | Kalkidan e.V.';

    if (persist) {
      try { localStorage.setItem(STORAGE_KEY, language); } catch (_) {}
    }
  }

  if (toggle) {
    toggle.addEventListener('click', () => setLanguage(language === 'de' ? 'am' : 'de'));
  }

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.textContent = isOpen ? '✕' : '☰';
    });

    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.textContent = '☰';
    }));
  }

  // Carry the selected language across every internal HTML navigation, including the logo and footer links.
  document.querySelectorAll('a[href]').forEach((link) => {
    const rawHref = link.getAttribute('href');
    if (!rawHref || rawHref.startsWith('#') || /^(https?:|mailto:|tel:|javascript:)/i.test(rawHref)) return;
    const url = new URL(rawHref, window.location.href);
    if (url.origin !== window.location.origin || !url.pathname.toLowerCase().endsWith('.html')) return;
    link.addEventListener('click', () => {
      try { localStorage.setItem(STORAGE_KEY, language); } catch (_) {}
      url.searchParams.set('lang', language);
      link.href = url.pathname.split('/').pop() + url.search + url.hash;
    });
  });

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
  setLanguage(getInitialLanguage(), true);
})();

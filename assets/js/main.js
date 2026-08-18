(() => {
  const body = document.body;
  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('[data-menu-button]');
  const menuPanel = document.querySelector('[data-menu-panel]');
  const menuLabel = menuButton?.querySelector('[data-menu-label]');
  const searchButton = document.querySelector('[data-search-button]');
  const searchPanel = document.querySelector('[data-search-panel]');
  const searchClose = document.querySelector('[data-search-close]');
  const searchInput = document.querySelector('[data-search-input]');
  const searchResults = document.querySelector('[data-search-results]');
  const lang = document.documentElement.lang === 'es' ? 'es' : 'en';
  const pageName = (window.location.pathname.split('/').pop() || 'index.html').split('?')[0];

  const labels = {
    en: {
      menu: 'Menu', close: 'Close', noResults: 'No matching pages.',
      mobileSearch: 'Search SB²CS site', mobilePlaceholder: 'Keywords',
      spanish: 'Español', english: 'English'
    },
    es: {
      menu: 'Menú', close: 'Cerrar', noResults: 'No se encontraron páginas.',
      mobileSearch: 'Buscar en el sitio SB²CS', mobilePlaceholder: 'Palabras clave',
      spanish: 'Español', english: 'English'
    }
  }[lang];

  function closeMenu() {
    if (!menuButton || !menuPanel) return;
    menuButton.setAttribute('aria-expanded', 'false');
    menuPanel.dataset.open = 'false';
    if (menuLabel) menuLabel.textContent = labels.menu;
    body.classList.remove('menu-open');
  }
  function closeSearch() {
    if (!searchPanel) return;
    searchPanel.dataset.open = 'false';
    searchPanel.setAttribute('aria-hidden', 'true');
    body.classList.remove('search-open');
  }
  function openMenu() {
    closeSearch();
    menuButton?.setAttribute('aria-expanded', 'true');
    if (menuPanel) menuPanel.dataset.open = 'true';
    if (menuLabel) menuLabel.textContent = labels.close;
    body.classList.add('menu-open');
  }
  function openSearch() {
    closeMenu();
    if (searchPanel) {
      searchPanel.dataset.open = 'true';
      searchPanel.setAttribute('aria-hidden', 'false');
    }
    body.classList.add('search-open');
    window.setTimeout(() => searchInput?.focus(), 80);
  }

  menuButton?.addEventListener('click', () => {
    menuButton.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu();
  });
  menuPanel?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  searchButton?.addEventListener('click', openSearch);
  searchClose?.addEventListener('click', closeSearch);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeMenu(); closeSearch(); }
  });

  const index = lang === 'es' ? [
    ['Inicio','index.html','Laboratorio, bioinformática estructural, síntesis y compuestos bioactivos'],
    ['Sobre SB²CS','about.html','Misión, visión y ciclo de investigación del laboratorio'],
    ['Investigación','research.html','Bioinformática estructural, síntesis multicomponente y diseño molecular'],
    ['Equipo','people.html','Investigadores, estudiantes y colaboradores'],
    ['Publicaciones','publications.html','Artículos, resultados y producción científica'],
    ['Noticias','news.html','Novedades, software, publicaciones y actividades del laboratorio'],
    ['Contacto','contact.html','Colaboración, oportunidades y Universidad de La Frontera']
  ] : [
    ['Home','index.html','Laboratory, structural bioinformatics, synthesis and bioactive compounds'],
    ['About SB²CS','about.html','Mission, vision and research cycle'],
    ['Research','research.html','Structural bioinformatics, multicomponent synthesis and molecular design'],
    ['People','people.html','Researchers, students and collaborators'],
    ['Publications','publications.html','Papers, outputs and scholarly work'],
    ['News','news.html','Updates, software, publications and laboratory activities'],
    ['Contact','contact.html','Collaboration, opportunities and Universidad de La Frontera']
  ];

  const base = './';

  function filteredIndex(q='') {
    const term = q.trim().toLowerCase();
    return term ? index.filter(item => item.join(' ').toLowerCase().includes(term)) : index.slice(0,4);
  }

  function renderSearchInto(target, q='', emptyWhenBlank=false) {
    if (!target) return;
    const term = q.trim();
    if (emptyWhenBlank && !term) {
      target.innerHTML = '';
      target.hidden = true;
      return;
    }
    const matches = filteredIndex(q);
    target.hidden = false;
    target.innerHTML = matches.length ? matches.map(item =>
      `<a class="search-result" href="${base}${item[1]}"><strong>${item[0]}</strong><span>${item[2]}</span></a>`
    ).join('') : `<p class="search-empty">${labels.noResults}</p>`;
  }

  function renderSearch(q='') {
    renderSearchInto(searchResults, q, false);
  }
  searchInput?.addEventListener('input', () => renderSearch(searchInput.value));
  renderSearch();

  // Science Tokyo-inspired tools are embedded directly into the mobile menu.
  // Desktop keeps the existing utility search/language controls in the header.
  const megaInner = menuPanel?.querySelector('.mega-menu-inner');
  if (megaInner) {
    const altHref = lang === 'es' ? `../${pageName}` : `./es/${pageName}`;
    const tools = document.createElement('section');
    tools.className = 'mobile-menu-tools';
    tools.setAttribute('aria-label', lang === 'es' ? 'Herramientas del menú' : 'Menu tools');
    tools.innerHTML = `
      <div class="mobile-menu-search-block">
        <label class="mobile-menu-search-label" for="mobile-menu-search">${labels.mobileSearch}</label>
        <div class="mobile-menu-search-field">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="m15.5 15.5 5 5" fill="none" stroke="currentColor" stroke-width="2"/></svg>
          <input id="mobile-menu-search" data-menu-search-input type="search" placeholder="${labels.mobilePlaceholder}" autocomplete="off">
        </div>
        <div class="mobile-menu-search-results" data-menu-search-results hidden></div>
      </div>
      <div class="mobile-menu-language" aria-label="${lang === 'es' ? 'Idioma' : 'Language'}">
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M4.5 12h15M12 4c2.2 2.2 3.2 4.9 3.2 8S14.2 17.8 12 20c-2.2-2.2-3.2-4.9-3.2-8S9.8 6.2 12 4Z" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>
        ${lang === 'es'
          ? `<span class="is-active">${labels.spanish}</span><span class="divider">|</span><a href="${altHref}" lang="en">${labels.english}</a>`
          : `<a href="${altHref}" lang="es">${labels.spanish}</a><span class="divider">|</span><span class="is-active">${labels.english}</span>`}
      </div>`;
    megaInner.prepend(tools);

    const menuSearchInput = tools.querySelector('[data-menu-search-input]');
    const menuSearchResults = tools.querySelector('[data-menu-search-results]');
    menuSearchInput?.addEventListener('input', () => renderSearchInto(menuSearchResults, menuSearchInput.value, true));
  }

  const slides = [...document.querySelectorAll('[data-hero-slide]')];
  const dots = [...document.querySelectorAll('[data-hero-dot]')];
  let slideIndex = 0;
  let timer;
  function showSlide(i) {
    if (!slides.length) return;
    slideIndex = (i + slides.length) % slides.length;
    slides.forEach((s,n) => s.classList.toggle('is-active', n === slideIndex));
    dots.forEach((d,n) => d.classList.toggle('is-active', n === slideIndex));
  }
  function restartSlides() {
    clearInterval(timer);
    if (slides.length > 1 && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      timer = setInterval(() => showSlide(slideIndex + 1), 6500);
    }
  }
  dots.forEach((d,n) => d.addEventListener('click', () => { showSlide(n); restartSlides(); }));
  showSlide(0); restartSlides();

  let lastY = window.scrollY;
  window.addEventListener('scroll', () => {
    if (!header || body.classList.contains('menu-open') || body.classList.contains('search-open')) return;
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 8);
    if (window.innerWidth > 900 && y > 220 && y > lastY + 5) header.classList.add('is-hidden');
    else if (y < lastY - 5 || y < 220) header.classList.remove('is-hidden');
    lastY = y;
  }, { passive: true });

  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
})();

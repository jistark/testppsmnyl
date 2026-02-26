/* =========================================================
   SMNYL TESTBED — Navegación interactiva v2
   Basado en patrones de NYL: mega-menu, search drawer,
   login drawer, focus-trap, email subscribe, sticky header
   ========================================================= */

'use strict';

// ─── Datos del menú ───────────────────────────────────────
const MENU_DATA = {
  individuales: {
    title: 'Seguros individuales',
    items: [
      {
        id: 'vida',
        label: 'Seguros de Vida',
        ctaLabel: 'Seguros de Vida',
        products: [
          { name: 'Temporales',        desc: 'Protección por un período definido con primas accesibles.' },
          { name: 'Vida Entera',       desc: 'Cobertura de por vida con acumulación de valor en efectivo.' },
          { name: 'Universal de Vida', desc: 'Flexibilidad en pagos y suma asegurada con componente de inversión.' },
          { name: 'Dotal',             desc: 'Combina protección y ahorro con fecha de vencimiento.' },
        ],
      },
      {
        id: 'gmm',
        label: 'Seguros de Gastos Médicos Mayores',
        ctaLabel: 'Seguros de Gastos Médicos Mayores',
        products: [
          {
            name: 'Alfa Medical®',
            desc: 'El Seguro de Gastos Médicos Mayores con el cual puedes recibir atención para recuperar tu salud, según tus necesidades.',
          },
          {
            name: 'Alfa Medical Flex®',
            desc: 'Un Seguro de Gastos Médicos Mayores que se adapta a tu presupuesto para acceder a diversos hospitales en México.',
          },
          {
            name: 'Alfa Medical Internacional®',
            desc: 'El Seguro de Gastos Médicos Mayores que te permite recibir la atención hospitalaria de especialistas en México y el extranjero.',
          },
          {
            name: 'Accidentes Personales Individual',
            desc: 'Un seguro de gastos médicos mayores individual que te ofrece protección por daño físico.',
          },
        ],
      },
    ],
  },
  grupales: {
    title: 'Seguros grupales',
    items: [
      {
        id: 'vida-grupal',
        label: 'Vida Grupal',
        products: [
          { name: 'Vida Grupal Básico', desc: 'Protección colectiva para tus colaboradores.' },
          { name: 'Vida Grupal Plus',   desc: 'Cobertura extendida con beneficios adicionales.' },
        ],
      },
      {
        id: 'gmm-grupal',
        label: 'GMM Grupal',
        products: [
          { name: 'Alfa Medical Grupal',           desc: 'Gastos médicos para empresas con amplia red hospitalaria.' },
          { name: 'Accidentes Personales Grupal',  desc: 'Protección grupal ante accidentes laborales.' },
        ],
      },
    ],
  },
};

// ─── DOM Refs ─────────────────────────────────────────────
const header        = document.getElementById('header');
const megaMenu      = document.getElementById('megaMenu');
const sidebarL1Nav  = document.getElementById('sidebarL1Nav');
const sidebarL2     = document.getElementById('sidebarL2');
const sidebarL2Cont = document.getElementById('sidebarL2Content');
const menuTitle     = document.querySelector('.js-menu-title');

const searchPanel   = document.getElementById('searchPanel');
const searchInput   = document.getElementById('searchInput');
const searchClear   = document.querySelector('.js-search-clear');
const searchDropdown = document.getElementById('searchDropdown');

const loginPanel    = document.getElementById('loginPanel');
const loginForm     = document.getElementById('loginForm');
const loginUsername = document.getElementById('loginUsername');
const loginPassword = document.getElementById('loginPassword');
const loginSubmit   = document.getElementById('loginSubmitBtn');

const menuTriggers  = document.querySelectorAll('.js-menu-trigger');
const searchTrigger = document.querySelector('.js-search-trigger');
const loginTrigger  = document.querySelector('.js-login-trigger');

function normalizeLabel(value = '') {
  return value
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function getFooterLinksBySection(sectionLabel, fallback = []) {
  const target = normalizeLabel(sectionLabel);
  const headings = [...document.querySelectorAll('.footer__col-title')];
  const heading = headings.find(el => normalizeLabel(el.textContent) === target);
  const list = heading?.nextElementSibling;

  if (!list || !list.classList.contains('footer__links')) {
    return fallback.map(item => ({ ...item }));
  }

  const links = [...list.querySelectorAll('a')]
    .map(anchor => ({
      label: anchor.textContent.trim(),
      href: anchor.getAttribute('href') || '#',
    }))
    .filter(link => link.label.length > 0);

  return links.length ? links : fallback.map(item => ({ ...item }));
}

function linksToProducts(links) {
  return links.map(link => ({
    name: link.label,
    href: link.href || '#',
    desc: '',
  }));
}

const footerConocenosLinks = getFooterLinksBySection('Conócenos', [
  { label: 'Nuestra filosofía', href: '#' },
  { label: 'Nuestra historia', href: '#' },
  { label: 'New York Life en el mundo', href: '#' },
  { label: 'Informe corporativo', href: '#' },
  { label: 'Sustentabilidad', href: '#' },
  { label: 'Integridad y cumplimiento', href: '#' },
]);

const footerUneteLinks = getFooterLinksBySection('Únete', [
  { label: 'Como colaborador', href: '#' },
  { label: 'Como asesor', href: '#' },
  { label: 'Como promotor o partner', href: '#' },
]);

MENU_DATA.conocenos = {
  title: 'Conócenos',
  ctaLabel: 'Conócenos',
  ctaHref: footerConocenosLinks[0]?.href || '#',
  items: [
    {
      id: 'conocenos-links',
      label: 'Conócenos',
      href: footerConocenosLinks[0]?.href || '#',
      products: linksToProducts(footerConocenosLinks),
    },
  ],
};

MENU_DATA.unete = {
  title: 'Únete',
  ctaLabel: 'Únete',
  ctaHref: footerUneteLinks[0]?.href || '#',
  items: [
    {
      id: 'unete-links',
      label: 'Únete',
      href: footerUneteLinks[0]?.href || '#',
      products: linksToProducts(footerUneteLinks),
    },
  ],
};

let currentMenu = null;

// ─── SVG helpers ──────────────────────────────────────────
const chevronRight = `
  <svg class="icon sidebar__link-arrow" viewBox="0 0 8 14" fill="none" aria-hidden="true">
    <path d="M1 1L7 7L1 13" stroke="currentColor" stroke-width="1.5"
          stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

const arrowLong = `
  <svg class="icon icon--arrow-long" viewBox="0 0 26 14" fill="none" aria-hidden="true">
    <path d="M0 7H24M24 7L18 1.5M24 7L18 12.5" stroke="currentColor" stroke-width="1.5"
          stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

// ─── Focus trap ───────────────────────────────────────────
// Patrón tomado del drawer de NYL (tabindex=-1 + keyboard cycle)
function trapFocus(container) {
  const sel = 'button:not([disabled]), [href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';
  const focusable = [...container.querySelectorAll(sel)].filter(el => !el.closest('[hidden]'));
  if (!focusable.length) return;

  const first = focusable[0];
  const last  = focusable[focusable.length - 1];

  function handler(e) {
    if (e.key !== 'Tab') return;
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
    }
  }

  container.addEventListener('keydown', handler);
  // Devuelve cleanup
  return () => container.removeEventListener('keydown', handler);
}

const cleanups = {};

function resetL2(clearPrimaryState = false) {
  sidebarL2.classList.remove('is-visible');
  sidebarL2.setAttribute('aria-hidden', 'true');
  sidebarL2Cont.innerHTML = '';

  if (clearPrimaryState) {
    sidebarL1Nav.querySelectorAll('.sidebar__link').forEach(btn => {
      btn.classList.remove('is-active');
      btn.setAttribute('aria-expanded', 'false');
    });
  }
}

// ─── Renderizado menú ─────────────────────────────────────
function renderL1(menuId) {
  const data = MENU_DATA[menuId];
  sidebarL1Nav.innerHTML = data.items.map(item => `
    <li role="listitem">
      <button
        class="sidebar__link"
        data-item="${item.id}"
        type="button"
        aria-expanded="false"
      >
        <span class="sidebar__link-label">${item.label}</span>
      </button>
    </li>
  `).join('');

  sidebarL1Nav.querySelectorAll('.sidebar__link').forEach(btn => {
    btn.addEventListener('click', () => {
      const alreadyActive = btn.classList.contains('is-active');

      sidebarL1Nav.querySelectorAll('.sidebar__link').forEach(b => {
        b.classList.remove('is-active');
        b.setAttribute('aria-expanded', 'false');
      });

      if (alreadyActive) {
        resetL2();
        return;
      }

      btn.classList.add('is-active');
      btn.setAttribute('aria-expanded', 'true');
      renderL2(menuId, btn.dataset.item);
    });
  });

  // Estado inicial: primer item activo para preservar estado visual.
  const firstItem = sidebarL1Nav.querySelector('.sidebar__link');
  if (firstItem) {
    firstItem.classList.add('is-active');
    firstItem.setAttribute('aria-expanded', 'true');
    renderL2(menuId, firstItem.dataset.item);
  }
}

function renderL2(menuId, itemId) {
  const menu = MENU_DATA[menuId];
  const item = MENU_DATA[menuId].items.find(i => i.id === itemId);
  if (!item) return;

  const sectionHref = item.href || item.products?.[0]?.href || '#';
  const ctaLabel = item.ctaLabel || menu.ctaLabel || 'Me interesa';
  const ctaHref = item.ctaHref || menu.ctaHref || sectionHref;

  sidebarL2Cont.innerHTML = `
    <h6 class="sidebar__section-title">
      <a href="${sectionHref}">${item.label}</a>
      ${chevronRight}
    </h6>
    <div class="product-list">
      ${item.products.map(p => `
        <a href="${p.href || '#'}" class="product-item">
          <p class="product-item__name">${p.name}</p>
          ${p.desc ? `<p class="product-item__desc">${p.desc}</p>` : ''}
        </a>
      `).join('')}
    </div>
    <div class="sidebar__l2-cta">
      <a href="${ctaHref}" class="btn btn--text">
        ${ctaLabel} ${arrowLong}
      </a>
    </div>
  `;

  sidebarL2.classList.add('is-visible');
  sidebarL2.setAttribute('aria-hidden', 'false');
}

// ─── Mega menú ────────────────────────────────────────────
function openMenu(menuId) {
  if (!MENU_DATA[menuId]) return;
  currentMenu = menuId;

  menuTitle.textContent = MENU_DATA[menuId].title;
  resetL2(true);
  renderL1(menuId);

  menuTriggers.forEach(t => {
    const active = t.dataset.menu === menuId;
    t.classList.toggle('is-active', active);
    t.setAttribute('aria-expanded', active ? 'true' : 'false');
  });

  closeSearch(false);
  closeLogin(false);

  megaMenu.classList.add('is-open');
  megaMenu.setAttribute('aria-hidden', 'false');

  // Focus trap
  cleanups.menu = trapFocus(megaMenu);

  // Foco al primer link del L1 con pequeño delay
  setTimeout(() => {
    const first = sidebarL1Nav.querySelector('.sidebar__link');
    if (first) first.focus();
  }, 80);
}

function closeMenu(restoreFocus = true) {
  megaMenu.classList.remove('is-open');
  megaMenu.setAttribute('aria-hidden', 'true');
  resetL2(true);
  menuTriggers.forEach(t => { t.classList.remove('is-active'); t.setAttribute('aria-expanded', 'false'); });
  currentMenu = null;
  if (cleanups.menu) { cleanups.menu(); cleanups.menu = null; }
}

// ─── Search panel ─────────────────────────────────────────
function getSearchSuggestions() {
  const seen = new Set();
  const suggestions = [];

  function push(label, href = '#') {
    const cleanLabel = (label || '').trim();
    const key = normalizeLabel(cleanLabel);
    if (!cleanLabel || seen.has(key)) return;
    seen.add(key);
    suggestions.push({ label: cleanLabel, href: href || '#' });
  }

  Object.values(MENU_DATA).forEach(menu => {
    (menu.items || []).forEach(item => {
      push(item.label, item.href);
      (item.products || []).forEach(product => push(product.name, product.href));
    });
  });

  return suggestions;
}

function renderSearchDropdown(rawQuery = '') {
  if (!searchDropdown) return;
  const query = normalizeLabel(rawQuery);
  if (!query) {
    searchDropdown.hidden = true;
    searchDropdown.innerHTML = '';
    return;
  }

  const matches = getSearchSuggestions()
    .filter(item => normalizeLabel(item.label).includes(query))
    .slice(0, 8);

  searchDropdown.hidden = matches.length === 0;
  searchDropdown.innerHTML = matches.map(item => `
    <li role="option">
      <a class="search-dropdown__item" href="${item.href}">${item.label}</a>
    </li>
  `).join('');
}

function syncSearchClear() {
  if (!searchClear || !searchInput) return;
  const hasQuery = searchInput.value.trim().length > 0;
  searchClear.hidden = !hasQuery;
  searchClear.disabled = !hasQuery;
}

function openSearch() {
  closeMenu(false);
  closeLogin(false);

  searchPanel.classList.add('is-open');
  searchPanel.setAttribute('aria-hidden', 'false');
  searchTrigger.setAttribute('aria-expanded', 'true');
  searchTrigger.classList.add('is-active');

  cleanups.search = trapFocus(searchPanel);
  syncSearchClear();
  renderSearchDropdown(searchInput.value);
  setTimeout(() => searchInput.focus(), 80);
}

function closeSearch(restoreFocus = true) {
  searchPanel.classList.remove('is-open');
  searchPanel.setAttribute('aria-hidden', 'true');
  searchTrigger.setAttribute('aria-expanded', 'false');
  searchTrigger.classList.remove('is-active');
  if (searchDropdown) {
    searchDropdown.hidden = true;
    searchDropdown.innerHTML = '';
  }
  if (searchClear) {
    searchClear.hidden = true;
    searchClear.disabled = true;
  }
  if (cleanups.search) { cleanups.search(); cleanups.search = null; }
}

// Search: clear button
searchInput.addEventListener('input', () => {
  syncSearchClear();
  renderSearchDropdown(searchInput.value);
});

searchClear.addEventListener('click', () => {
  searchInput.value = '';
  syncSearchClear();
  renderSearchDropdown('');
  searchInput.focus();
});

searchDropdown?.addEventListener('click', () => {
  closeSearch(false);
});

searchInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const q = searchInput.value.trim();
    if (q) console.log('[SMNYL Search]', q);
  }
});

// ─── Login panel ──────────────────────────────────────────
function openLogin() {
  closeMenu(false);
  closeSearch(false);

  loginPanel.classList.add('is-open');
  loginPanel.setAttribute('aria-hidden', 'false');
  loginTrigger.setAttribute('aria-expanded', 'true');
  loginTrigger.classList.add('is-active');

  cleanups.login = trapFocus(loginPanel);
  setTimeout(() => loginUsername.focus(), 80);
}

function closeLogin(restoreFocus = true) {
  loginPanel.classList.remove('is-open');
  loginPanel.setAttribute('aria-hidden', 'true');
  loginTrigger.setAttribute('aria-expanded', 'false');
  loginTrigger.classList.remove('is-active');
  if (cleanups.login) { cleanups.login(); cleanups.login = null; }
}

// Login: habilitar submit solo si ambos campos tienen contenido
// Patrón: cmp-header__login-btn--disable de NYL
function syncLoginButton() {
  const hasUser = loginUsername.value.trim().length > 0;
  const hasPass = loginPassword.value.trim().length > 0;
  loginSubmit.disabled = !(hasUser && hasPass);
}

loginUsername.addEventListener('input', syncLoginButton);
loginPassword.addEventListener('input', syncLoginButton);

loginForm.addEventListener('submit', e => {
  e.preventDefault();
  console.log('[SMNYL Login] Enviando credenciales...');
  // Aquí se conectaría el POST real al portal
});

// ─── Email subscribe (3 estados) ──────────────────────────
// Patrón: cmp-email-subscribe con novalidate + JS custom de NYL
const emailSubscribeEl = document.getElementById('emailSubscribe');
const subscribeFormEl  = document.getElementById('subscribeFormEl');
const subscribeInput   = document.getElementById('subscribeInput');
const subscribeSuccess = document.getElementById('subscribeSuccess');
const subscribeFormWrap = document.getElementById('subscribeForm');
const errorClient      = subscribeFormEl?.querySelector('.subscribe-error--client');
const errorServer      = subscribeFormEl?.querySelector('.subscribe-error--server');

function resetSubscribeErrors() {
  if (errorClient) errorClient.hidden = true;
  if (errorServer) errorServer.hidden = true;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

if (subscribeFormEl) {
  subscribeFormEl.addEventListener('submit', async e => {
    e.preventDefault();
    resetSubscribeErrors();

    const email = subscribeInput.value.trim();

    // Client-side validation
    if (!isValidEmail(email)) {
      if (errorClient) errorClient.hidden = false;
      subscribeInput.focus();
      return;
    }

    // Loading state
    emailSubscribeEl.classList.add('is-loading');

    try {
      // Simulación de llamada al servidor (testbed)
      await new Promise(resolve => setTimeout(resolve, 1400));

      // Éxito → mostrar mensaje de confirmación
      subscribeFormWrap.hidden = true;
      subscribeSuccess.hidden  = false;
    } catch {
      // Error de servidor
      emailSubscribeEl.classList.remove('is-loading');
      if (errorServer) errorServer.hidden = false;
    }
  });
}

// ─── Sticky header (patrón data-enable-sticky de NYL) ────
const headerEl = document.querySelector('[data-enable-sticky="true"]');
if (headerEl) {
  const observer = new IntersectionObserver(
    ([entry]) => headerEl.classList.toggle('is-scrolled', !entry.isIntersecting),
    { threshold: 0, rootMargin: '0px 0px 0px 0px' }
  );
  // Observamos un sentinel al tope del main
  const sentinel = document.createElement('div');
  sentinel.style.cssText = 'height:1px;position:absolute;top:80px;pointer-events:none';
  document.body.prepend(sentinel);
  observer.observe(sentinel);
}

// ─── Event listeners ──────────────────────────────────────
menuTriggers.forEach(trigger => {
  trigger.addEventListener('click', () => {
    const id = trigger.dataset.menu;
    if (currentMenu === id && megaMenu.classList.contains('is-open')) {
      closeMenu();
    } else {
      openMenu(id);
    }
  });
});

searchTrigger.addEventListener('click', () => {
  searchPanel.classList.contains('is-open') ? closeSearch() : openSearch();
});

loginTrigger.addEventListener('click', () => {
  loginPanel.classList.contains('is-open') ? closeLogin() : openLogin();
});

// Overlay clicks
document.querySelectorAll('.js-close-menu').forEach(el =>
  el.addEventListener('click', () => closeMenu())
);
document.querySelectorAll('.js-close-search').forEach(el =>
  el.addEventListener('click', () => closeSearch())
);
document.querySelectorAll('.js-close-login').forEach(el =>
  el.addEventListener('click', () => closeLogin())
);

// Botón "Regresar" en L2 mobile
document.querySelectorAll('.js-drawer-back').forEach(el =>
  el.addEventListener('click', () => {
    resetL2(true);
    const first = sidebarL1Nav.querySelector('.sidebar__link');
    if (first) first.focus();
  })
);

// Escape cierra todo
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  if (megaMenu.classList.contains('is-open'))    { closeMenu();   return; }
  if (searchPanel.classList.contains('is-open')) { closeSearch(); return; }
  if (loginPanel.classList.contains('is-open'))  { closeLogin();  return; }
});

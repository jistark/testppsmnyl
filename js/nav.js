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
        products: [
          { name: 'Alfa Medical®',                desc: 'GMM con la más amplia red hospitalaria del país.' },
          { name: 'Alfa Medical Flex®',            desc: 'Plan flexible con suma asegurada adaptable a tus necesidades.' },
          { name: 'Alfa Medical Internacional®',   desc: 'Cobertura médica en México y el extranjero.' },
          { name: 'Accidentes Personales Individual', desc: 'Protección económica ante lesiones y accidentes fortuitos.' },
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

const loginPanel    = document.getElementById('loginPanel');
const loginForm     = document.getElementById('loginForm');
const loginUsername = document.getElementById('loginUsername');
const loginPassword = document.getElementById('loginPassword');
const loginSubmit   = document.getElementById('loginSubmitBtn');

const menuTriggers  = document.querySelectorAll('.js-menu-trigger');
const searchTrigger = document.querySelector('.js-search-trigger');
const loginTrigger  = document.querySelector('.js-login-trigger');

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

// ─── Renderizado menú ─────────────────────────────────────
function renderL1(menuId) {
  const data = MENU_DATA[menuId];
  sidebarL1Nav.innerHTML = data.items.map((item, i) => `
    <li role="listitem">
      <button
        class="sidebar__link${i === 0 ? ' is-active' : ''}"
        data-item="${item.id}"
        type="button"
        aria-expanded="${i === 0}"
      >
        ${item.label}
        ${chevronRight}
      </button>
    </li>
  `).join('');

  sidebarL1Nav.querySelectorAll('.sidebar__link').forEach(btn => {
    btn.addEventListener('click', () => {
      sidebarL1Nav.querySelectorAll('.sidebar__link').forEach(b => {
        b.classList.remove('is-active');
        b.setAttribute('aria-expanded', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-expanded', 'true');
      renderL2(menuId, btn.dataset.item);
    });
  });
}

function renderL2(menuId, itemId) {
  const item = MENU_DATA[menuId].items.find(i => i.id === itemId);
  if (!item) return;

  sidebarL2Cont.innerHTML = `
    <h6 class="sidebar__section-title">
      <a href="#">${item.label}</a>
      ${chevronRight}
    </h6>
    <div class="product-list">
      ${item.products.map(p => `
        <a href="#" class="product-item">
          <p class="product-item__name">${p.name}</p>
          <p class="product-item__desc">${p.desc}</p>
        </a>
      `).join('')}
    </div>
    <div class="sidebar__l2-cta">
      <a href="#" class="btn btn--text">
        Me interesa ${arrowLong}
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
  renderL1(menuId);
  renderL2(menuId, MENU_DATA[menuId].items[0].id);

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
  sidebarL2.classList.remove('is-visible');
  sidebarL2.setAttribute('aria-hidden', 'true');
  menuTriggers.forEach(t => { t.classList.remove('is-active'); t.setAttribute('aria-expanded', 'false'); });
  currentMenu = null;
  if (cleanups.menu) { cleanups.menu(); cleanups.menu = null; }
}

// ─── Search panel ─────────────────────────────────────────
function openSearch() {
  closeMenu(false);
  closeLogin(false);

  searchPanel.classList.add('is-open');
  searchPanel.setAttribute('aria-hidden', 'false');
  searchTrigger.setAttribute('aria-expanded', 'true');
  searchTrigger.classList.add('is-active');

  cleanups.search = trapFocus(searchPanel);
  setTimeout(() => searchInput.focus(), 80);
}

function closeSearch(restoreFocus = true) {
  searchPanel.classList.remove('is-open');
  searchPanel.setAttribute('aria-hidden', 'true');
  searchTrigger.setAttribute('aria-expanded', 'false');
  searchTrigger.classList.remove('is-active');
  if (cleanups.search) { cleanups.search(); cleanups.search = null; }
}

// Search: clear button
searchInput.addEventListener('input', () => {
  searchClear.hidden = searchInput.value.length === 0;
});

searchClear.addEventListener('click', () => {
  searchInput.value = '';
  searchClear.hidden = true;
  searchInput.focus();
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
    sidebarL2.classList.remove('is-visible');
    sidebarL2.setAttribute('aria-hidden', 'true');
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

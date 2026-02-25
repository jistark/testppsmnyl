/* =========================================================
   SMNYL TESTBED – Navegación interactiva
   Mega menu (L1 + L2) + panel de búsqueda
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
        sectionHref: '#',
        products: [
          { name: 'Temporales',       desc: 'Protección por un período definido con primas accesibles.' },
          { name: 'Vida Entera',      desc: 'Cobertura de por vida con acumulación de valor en efectivo.' },
          { name: 'Universal de Vida',desc: 'Flexibilidad en pagos y suma asegurada con componente de inversión.' },
          { name: 'Dotal',            desc: 'Combina protección y ahorro en un solo producto con fecha de vencimiento.' },
        ],
      },
      {
        id: 'gmm',
        label: 'Seguros de Gastos Médicos Mayores',
        sectionHref: '#',
        products: [
          { name: 'Alfa Medical®',               desc: 'Gastos médicos mayores con la más amplia red hospitalaria del país.' },
          { name: 'Alfa Medical Flex®',           desc: 'Plan flexible con suma asegurada adaptable a tus necesidades.' },
          { name: 'Alfa Medical Internacional®',  desc: 'Cobertura médica integral con alcance en México y el extranjero.' },
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
        sectionHref: '#',
        products: [
          { name: 'Vida Grupal Básico', desc: 'Protección colectiva para tus colaboradores con primas competitivas.' },
          { name: 'Vida Grupal Plus',   desc: 'Cobertura extendida con beneficios adicionales de accidentes personales.' },
        ],
      },
      {
        id: 'gmm-grupal',
        label: 'GMM Grupal',
        sectionHref: '#',
        products: [
          { name: 'Alfa Medical Grupal',          desc: 'Gastos médicos para empresas con amplia red hospitalaria.' },
          { name: 'Accidentes Personales Grupal', desc: 'Protección colectiva ante accidentes laborales e incapacidades.' },
        ],
      },
    ],
  },
};

// ─── Referencias DOM ──────────────────────────────────────
const megaMenu      = document.getElementById('megaMenu');
const sidebarL1Nav  = document.getElementById('sidebarL1Nav');
const sidebarL2     = document.getElementById('sidebarL2');
const sidebarL2Cont = document.getElementById('sidebarL2Content');
const menuTitle     = document.querySelector('.js-menu-title');
const searchPanel   = document.getElementById('searchPanel');
const searchInput   = document.getElementById('searchInput');
const menuTriggers  = document.querySelectorAll('.js-menu-trigger');
const searchTrigger = document.querySelector('.js-search-trigger');

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

// ─── Renderizado ──────────────────────────────────────────
function renderL1(menuId) {
  const data = MENU_DATA[menuId];
  sidebarL1Nav.innerHTML = data.items.map((item, i) => `
    <li>
      <button
        class="sidebar__link${i === 0 ? ' is-active' : ''}"
        data-item="${item.id}"
        aria-expanded="${i === 0}"
      >
        ${item.label}
        ${chevronRight}
      </button>
    </li>
  `).join('');

  // Delegar clicks dentro del nav
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
      <a href="${item.sectionHref}">${item.label}</a>
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
      <a href="#" class="cta-link">
        Me interesa
        ${arrowLong}
      </a>
    </div>
  `;

  sidebarL2.classList.add('is-visible');
  sidebarL2.setAttribute('aria-hidden', 'false');
}

// ─── Abrir/cerrar mega menú ───────────────────────────────
function openMenu(menuId) {
  const data = MENU_DATA[menuId];
  if (!data) return;

  currentMenu = menuId;
  menuTitle.textContent = data.title;

  renderL1(menuId);
  renderL2(menuId, data.items[0].id);

  // Marcar trigger activo
  menuTriggers.forEach(t => {
    const active = t.dataset.menu === menuId;
    t.classList.toggle('is-active', active);
    t.setAttribute('aria-expanded', active ? 'true' : 'false');
  });

  closeSearch(false);

  megaMenu.classList.add('is-open');
  megaMenu.setAttribute('aria-hidden', 'false');
}

function closeMenu(restoreFocus = true) {
  megaMenu.classList.remove('is-open');
  megaMenu.setAttribute('aria-hidden', 'true');
  sidebarL2.classList.remove('is-visible');
  sidebarL2.setAttribute('aria-hidden', 'true');
  menuTriggers.forEach(t => {
    t.classList.remove('is-active');
    t.setAttribute('aria-expanded', 'false');
  });
  currentMenu = null;
}

// ─── Abrir/cerrar búsqueda ────────────────────────────────
function openSearch() {
  closeMenu(false);
  searchPanel.classList.add('is-open');
  searchPanel.setAttribute('aria-hidden', 'false');
  searchTrigger.setAttribute('aria-expanded', 'true');
  searchTrigger.classList.add('is-active');
  // Focus al input con pequeño delay para la transición
  setTimeout(() => searchInput.focus(), 80);
}

function closeSearch(restoreFocus = true) {
  searchPanel.classList.remove('is-open');
  searchPanel.setAttribute('aria-hidden', 'true');
  searchTrigger.setAttribute('aria-expanded', 'false');
  searchTrigger.classList.remove('is-active');
}

// ─── Event listeners ──────────────────────────────────────

// Triggers del menú principal
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

// Trigger de búsqueda
searchTrigger.addEventListener('click', () => {
  if (searchPanel.classList.contains('is-open')) {
    closeSearch();
  } else {
    openSearch();
  }
});

// Overlay del mega menú
document.querySelector('.js-close-menu').addEventListener('click', () => closeMenu());

// Overlay del panel de búsqueda
document.querySelector('.js-close-search').addEventListener('click', () => closeSearch());

// Tecla Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeMenu();
    closeSearch();
  }
});

// Búsqueda con Enter
searchInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    console.log('Búsqueda:', searchInput.value.trim());
    // Aquí se conectaría con el motor de búsqueda real
  }
});

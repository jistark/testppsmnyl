# NYL Homologation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Homologate the SMNYL testbed to NYL design patterns — chrome first, then six content sections generated in Figma and implemented pixel-perfect.

**Architecture:** Phase 1 modifies existing `index.html` / `css/styles.css` / `js/nav.js` for chrome changes. Phase 2 uses Figma MCP (`mcp__plugin_figma_figma__generate_figma_design` or `get_design_context`) to create content frames, then replaces the `<main>` content sections in `index.html`.

**Tech Stack:** Vanilla HTML5, CSS custom properties, vanilla JS (ES2020). No build step. No frameworks. Figma MCP for design generation.

**Design doc:** `docs/plans/2026-02-25-nyl-homologation-design.md`

---

## PHASE 1 — Chrome

---

### Task 1: Header — split "Mi SMNYL" into two buttons

**Files:**
- Modify: `index.html:41-57` (header alt nav)
- Modify: `css/styles.css:142-173` (nav-item-alt styles)
- Modify: `js/nav.js:79` (loginTrigger selector)

**Context:** Currently the alt nav has a single `<button class="nav-item-alt nav-item-alt--account js-login-trigger">Mi SMNYL</button>`. The Figma spec requires two separate items: "Mi SMNYL Clientes" (opens login drawer) and "Mi SMNYL Asesores" (external `<a>` link).

**Step 1: Update the HTML alt nav**

In `index.html`, replace the single Mi SMNYL button block (lines ~42–46) with:

```html
<!-- Mi SMNYL Clientes → abre login drawer -->
<button class="nav-item-alt nav-item-alt--account js-login-trigger"
        type="button" aria-expanded="false" aria-controls="loginPanel"
        aria-label="Mi SMNYL Clientes, iniciar sesión">
  Mi SMNYL Clientes
</button>

<!-- Mi SMNYL Asesores → portal externo -->
<a href="https://www.mnyl.com.mx/asesores"
   class="nav-item-alt nav-item-alt--account"
   target="_blank" rel="noopener noreferrer"
   aria-label="Mi SMNYL Asesores, portal de asesores">
  Mi SMNYL Asesores
</a>
```

**Step 2: Update login panel aria-label**

In `index.html` around line 140, update loginPanel label:
```html
aria-labelledby="loginPanelTitle"
```
Change `login-panel__eyebrow` text from "Mi SMNYL" to "Mi SMNYL Clientes".

**Step 3: Verify visually**

Open `index.html` in browser. Alt nav should show:
`Ayuda y contacto | Documentos | Mi SMNYL Clientes | Mi SMNYL Asesores | 🔍`
- Clicking "Mi SMNYL Clientes" opens login drawer ✓
- "Mi SMNYL Asesores" is a plain link ✓

**Step 4: Commit**

```bash
git add index.html
git commit -m "feat: split Mi SMNYL into Clientes + Asesores in alt nav"
```

---

### Task 2: Footer — update column content

**Files:**
- Modify: `index.html:401-562` (entire footer)

**Context:** Figma spec (node `10738:3169`) defines 4 columns with different content than current. See design doc for full column spec. The HTML structure (4 `.footer__col`) stays the same — only the titles and links change.

**Step 1: Replace Col 1 content (Seguros Grupales + Individuales)**

Replace current Col 1 block with:
```html
<div class="footer__col">
  <h3 class="footer__col-title">Seguros Grupales</h3>
  <ul class="footer__links">
    <li><a href="#">Seguros de Vida Grupo</a></li>
    <li><a href="#">Seguro de GMM Colectivo</a></li>
  </ul>
  <h3 class="footer__col-title footer__col-title--spaced">Seguros Individuales</h3>
  <ul class="footer__links">
    <li><a href="#">Seguros de Gastos Médicos Mayores</a></li>
    <li><a href="#">Seguros de Vida</a></li>
  </ul>
</div>
```

**Step 2: Replace Col 2 content (Ayuda)**

Replace current Col 2 ("Únete") with:
```html
<div class="footer__col">
  <h3 class="footer__col-title">Ayuda</h3>
  <ul class="footer__links">
    <li><a href="#">¿Cómo hacer válido tu seguro de vida?</a></li>
    <li><a href="#">¿Cómo hacer válido tu seguro de accidentes personales?</a></li>
    <li><a href="#">¿Qué hacer en caso de siniestro?</a></li>
    <li><a href="#">Formas de pago</a></li>
    <li><a href="#">Documentación contractual</a></li>
    <li><a href="#">Descarga Mi SMNYL Clientes</a></li>
  </ul>
</div>
```

**Step 3: Replace Col 3 content (Únete + Conócenos)**

Replace current Col 3 ("Ayuda + Conócenos") with:
```html
<div class="footer__col">
  <h3 class="footer__col-title">Únete</h3>
  <ul class="footer__links">
    <li><a href="#">Como colaborador</a></li>
    <li><a href="#">Como asesor</a></li>
    <li><a href="#">Como promotor o partner</a></li>
  </ul>
  <h3 class="footer__col-title footer__col-title--spaced">Conócenos</h3>
  <ul class="footer__links">
    <li><a href="#">Nuestra filosofía</a></li>
    <li><a href="#">Nuestra historia</a></li>
    <li><a href="#">New York Life en el mundo</a></li>
    <li><a href="#">Informe corporativo</a></li>
    <li><a href="#">Sustentabilidad</a></li>
    <li><a href="#">Integridad y cumplimiento</a></li>
  </ul>
</div>
```

**Step 4: Add description text to Col 4 (Suscríbete)**

In Col 4, add a description paragraph BEFORE the `cmp-email-subscribe` div:
```html
<div class="footer__col footer__col--subscribe">
  <h3 class="footer__col-title">Suscríbete</h3>
  <p class="footer__subscribe-desc">Recibe periódicamente consejos y novedades de Seguros Monterrey para crecer más fuertes, juntos.</p>
  <!-- cmp-email-subscribe ... (existing, unchanged) -->
```

Add to `css/styles.css` after `.footer__col-title--spaced` rule:
```css
.footer__subscribe-desc {
  font-family: var(--f-body); font-weight: 400;
  font-size: 14px; line-height: 16.4px;
  color: var(--c-white);
  margin-bottom: 16px;
}
```

**Step 5: Update footer bottom bar**

Replace `footer__bottom` content with:
```html
<div class="footer__bottom">
  <a href="tel:8009062100" class="footer__phone">800 906 2100</a>
  <span class="footer__copyright">© 2026 Seguros Monterrey New York Life. Todos los derechos reservados.</span>
  <nav class="footer__legal" aria-label="Avisos legales">
    <a href="#">Términos y condiciones para el uso de medios electrónicos</a>
    <a href="#">Aviso de privacidad</a>
    <a href="#">UNE</a>
  </nav>
</div>
```

**Step 6: Verify visually**

Open browser. Footer should show 4 columns with updated content, description text under "Suscríbete", updated legal links.

**Step 7: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: update footer content to match Figma spec"
```

---

### Task 3: Footer — social icons filled circles

**Files:**
- Modify: `css/styles.css:922-935` (`.social-icon` rule)

**Context:** Current social icons use `border: 0.75px solid var(--c-primary)` with transparent background. Figma spec shows filled circles with solid dark background + white icon.

**Step 1: Update `.social-icon` CSS**

Replace the `.social-icon` rule:
```css
.social-icon {
  display: flex; align-items: center; justify-content: center;
  width: 42px; height: 42px;
  background: rgba(255,255,255,0.12);
  border: 0.75px solid rgba(255,255,255,0.25);
  border-radius: 50%;
  color: var(--c-white); text-decoration: none;
  transition: background 0.15s, border-color 0.15s;
}
.social-icon:hover {
  background: rgba(255,255,255,0.25);
  border-color: rgba(255,255,255,0.5);
}
.social-icon svg { width: 20px; height: 20px; }
```

**Step 2: Verify visually**

Footer social icons should show as solid filled circles matching Figma screenshot.

**Step 3: Commit**

```bash
git add css/styles.css
git commit -m "feat: update footer social icons to filled circles per Figma"
```

---

### Task 4: Footer — trust badges with real logos

**Files:**
- Modify: `index.html` (`.footer__badges` section in Col 4)
- Modify: `css/styles.css` (`.badge-item` rule)

**Context:** Current badges are text-only placeholders. Figma spec shows image-based badges (Las Mejores Empresas, Buró, CONDUSEF). Use inline SVG placeholders that match the badge proportions until real assets are provided.

**Step 1: Update badges HTML**

Replace `.footer__badges` block with:
```html
<div class="footer__badges">
  <div class="badge-item badge-item--mejores" title="Las Mejores Empresas para Trabajar">
    <span class="badge-item__label">Las Mejores<br>Empresas</span>
  </div>
  <div class="badge-item badge-item--buro" title="Buró de Entidades Financieras">
    <span class="badge-item__label">Buró de<br>Entidades</span>
  </div>
  <div class="badge-item badge-item--condusef" title="CONDUSEF">
    <span class="badge-item__label">CONDUSEF</span>
  </div>
</div>
```

**Step 2: Update badge CSS**

Replace `.badge-item` rule and add variants:
```css
.footer__badges { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; margin-top: 16px; }

.badge-item {
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.25);
  border-radius: 4px;
  padding: 8px 12px;
  min-width: 60px; min-height: 44px;
  display: flex; align-items: center; justify-content: center;
}

.badge-item__label {
  font-family: var(--f-body); font-weight: 700;
  font-size: 9px; line-height: 11px;
  color: var(--c-white); text-align: center;
  text-transform: uppercase; letter-spacing: 0.05em;
}
```

**Step 3: Verify visually**

Three badge placeholders visible in footer, proportioned correctly.

**Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: update footer trust badges to structured placeholders"
```

---

## PHASE 2 — Content Sections (Figma → Code)

---

### Task 5: Generate Figma content frames

**Files:** No code files — Figma MCP calls only.

**Context:** Use `mcp__plugin_figma_figma__generate_figma_design` (or equivalent) to create 6 new frames in file `c7AVjPDwzoDgIMzM4jGJhs` appended to the existing testbed section. Each frame at 1512px width. After generation, capture node IDs for Task 6.

**Step 1: Generate Hero frame**

Call Figma MCP to generate frame with:
- Name: `Content / Hero`
- Pattern: `cmp-hero__billboard` (full-width image + left-aligned content card)
- Tokens: `--c-navy`, `--c-sand`, `--c-primary`, `--f-heading` (Alverata), `--f-body` (Roboto)
- Content: Per design doc Section 1

**Step 2: Generate Brand Promise Strip frame**

- Name: `Content / Brand Promise Strip`
- Pattern: single-row text band, `--c-sand` background
- Content: Per design doc Section 2

**Step 3: Generate ¿Cómo te ayudamos? frame**

- Name: `Content / Como te ayudamos`
- Pattern: 3-col value props + dual CTA
- Content: Per design doc Section 3

**Step 4: Generate Nuestros seguros frame**

- Name: `Content / Nuestros Seguros`
- Pattern: 4-col card grid, white cards on sand background
- Content: Per design doc Section 4

**Step 5: Generate Por qué SMNYL frame**

- Name: `Content / Por Que SMNYL`
- Pattern: 4 differentiators horizontal + supporting image, `--c-white` background
- Content: Per design doc Section 5

**Step 6: Generate Cierre / Asesor frame**

- Name: `Content / Cierre Asesor`
- Pattern: centered closing CTA, `--c-navy` background
- Content: Per design doc Section 6

**Step 7: Screenshot each frame and record node IDs**

Use `mcp__plugin_figma_figma__get_screenshot` on each new frame. Save node IDs.

**Step 8: Commit node IDs to design doc**

Add a "Figma node IDs" section to `docs/plans/2026-02-25-nyl-homologation-design.md`:
```markdown
## Figma Content Frame Node IDs
- Hero: [node_id]
- Brand Promise Strip: [node_id]
- Como te ayudamos: [node_id]
- Nuestros Seguros: [node_id]
- Por Que SMNYL: [node_id]
- Cierre Asesor: [node_id]
```

```bash
git add docs/plans/2026-02-25-nyl-homologation-design.md
git commit -m "docs: add Figma node IDs for content frames"
```

---

### Task 6: Implement Hero section from Figma

**Files:**
- Modify: `index.html` — replace existing `<section class="hero">` block
- Modify: `css/styles.css` — update `.hero` rules

**Step 1: Fetch Figma design context**

Call `mcp__plugin_figma_figma__get_design_context` with Hero node ID from Task 5.
Call `mcp__plugin_figma_figma__get_screenshot` for visual reference.

**Step 2: Translate to HTML/CSS**

Convert React+Tailwind output to semantic HTML + CSS custom properties.
Key rules:
- Use `var(--c-navy)`, `var(--c-sand)`, `var(--c-primary)` — NO hardcoded hex
- Use `var(--f-heading)` for headlines — NOT system fonts
- Use `var(--f-body)` for body text
- Max-width: `var(--max-w)` with `padding: 0 24px`

**Step 3: Verify against screenshot**

Place screenshot and browser side by side. Check:
- [ ] Layout matches (image + content card proportions)
- [ ] Typography: eyebrow, headline size/weight, body size
- [ ] Colors match exactly
- [ ] CTA buttons match `btn--primary` and `btn--outline` patterns

**Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: implement Hero section from Figma pixel-perfect"
```

---

### Task 7: Implement Brand Promise Strip from Figma

**Files:**
- Modify: `index.html` — add `<section class="brand-promise">` after hero
- Modify: `css/styles.css` — add `.brand-promise` rules

**Step 1:** Fetch design context + screenshot for Brand Promise Strip node.

**Step 2:** Implement HTML/CSS. Expected structure:
```html
<section class="brand-promise">
  <div class="brand-promise__inner">
    <p class="brand-promise__text">75 años junto a las familias mexicanas · Con el respaldo de New York Life</p>
    <a href="#" class="btn btn--text">Conoce nuestra historia <svg…/></a>
  </div>
</section>
```

**Step 3:** Verify against screenshot.

**Step 4:** Commit.
```bash
git add index.html css/styles.css
git commit -m "feat: implement Brand Promise Strip from Figma"
```

---

### Task 8: Implement ¿Cómo te ayudamos? section from Figma

**Files:**
- Modify: `index.html` — replace existing `<section class="howhelp">` block
- Modify: `css/styles.css` — update `.howhelp` rules

**Step 1:** Fetch design context + screenshot.

**Step 2:** Implement. The NYL §4 pattern uses a heading, 3 value props (each with optional icon, title, body), and two CTAs below. Replace current link-list pattern.

**Step 3:** Verify against screenshot.

**Step 4:** Commit.
```bash
git add index.html css/styles.css
git commit -m "feat: implement Como te ayudamos section from Figma"
```

---

### Task 9: Implement Nuestros seguros section from Figma

**Files:**
- Modify: `index.html` — replace existing `<section class="products">` block
- Modify: `css/styles.css` — update `.products` / `.product-card` rules

**Step 1:** Fetch design context + screenshot.

**Step 2:** Implement 4-col card grid (was 3-col). Add 4th card:
```html
<a href="#" class="product-card">
  <p class="product-card__pretitle">Empresarial</p>
  <h3 class="product-card__name">Para tu empresa</h3>
  <div class="product-card__desc">
    <p>Médico Empresarial, Accidentes Personales Colectivo — protección para tus colaboradores.</p>
  </div>
  <span class="product-card__link btn btn--text">Conoce más <svg…/></span>
</a>
```

Update grid:
```css
.products__grid { grid-template-columns: repeat(4, 1fr); }
```

**Step 3:** Verify against screenshot.

**Step 4:** Commit.
```bash
git add index.html css/styles.css
git commit -m "feat: implement Nuestros Seguros 4-col section from Figma"
```

---

### Task 10: Implement Por qué SMNYL section from Figma

**Files:**
- Modify: `index.html` — replace existing `<section class="trust">` block
- Modify: `css/styles.css` — update `.trust` rules (rename to `.why-smnyl` or extend)

**Step 1:** Fetch design context + screenshot.

**Step 2:** Implement 4-differentiator layout with supporting image. Replace stat-band pattern:
```html
<section class="why-smnyl">
  <div class="why-smnyl__inner">
    <div class="why-smnyl__differentiators">
      <div class="differentiator">
        <span class="differentiator__value">75 años</span>
        <span class="differentiator__label">en México, protegiendo a las familias mexicanas</span>
      </div>
      <!-- × 4 -->
    </div>
    <div class="why-smnyl__media" aria-hidden="true"></div>
  </div>
</section>
```

**Step 3:** Verify against screenshot.

**Step 4:** Commit.
```bash
git add index.html css/styles.css
git commit -m "feat: implement Por Que SMNYL differentiators section from Figma"
```

---

### Task 11: Implement Cierre / Asesor section from Figma

**Files:**
- Modify: `index.html` — replace existing `<section class="agents">` block
- Modify: `css/styles.css` — update `.agents` rules (or rename to `.closing-cta`)

**Step 1:** Fetch design context + screenshot.

**Step 2:** Implement closing CTA (navy background, centered, single CTA):
```html
<section class="closing-cta">
  <div class="closing-cta__inner">
    <h2 class="closing-cta__title">¿Qué seguro es el indicado para ti?</h2>
    <p class="closing-cta__body">Nuestros asesores te orientan sin compromiso. Encuéntralos en todo México.</p>
    <a href="#" class="btn btn--primary">Consulta un asesor financiero</a>
  </div>
</section>
```

**Step 3:** Verify against screenshot.

**Step 4:** Commit.
```bash
git add index.html css/styles.css
git commit -m "feat: implement Cierre Asesor closing CTA from Figma"
```

---

### Task 12: Final validation pass

**Files:** Read-only review.

**Step 1: Full-page visual check**

Open `index.html` in browser at 1512px width. Check every section top to bottom:
- [ ] Header: 5 alt-nav items, active states work, drawers open/close
- [ ] Mega menu: L1 + L2 sidebars open correctly
- [ ] Search panel: opens, clears, closes
- [ ] Login panel: opens from "Mi SMNYL Clientes" only
- [ ] Hero: matches Figma screenshot
- [ ] Brand promise strip: matches
- [ ] ¿Cómo te ayudamos?: matches
- [ ] Nuestros seguros (4 cards): matches
- [ ] Por qué SMNYL: matches
- [ ] Cierre asesor: matches
- [ ] Footer: 4 cols, description text, filled social icons, badges, updated legal links
- [ ] Escape key closes all panels
- [ ] No console errors

**Step 2: Commit final validation note**

```bash
git add docs/plans/2026-02-25-nyl-homologation-design.md
git commit -m "docs: mark homologation implementation as complete"
```

---

## Execution Order

```
Task 1  → Task 2 → Task 3 → Task 4     (Phase 1, sequential)
Task 5                                  (Figma generation, before Tasks 6-11)
Task 6 → Task 7 → Task 8 → Task 9 → Task 10 → Task 11  (Phase 2, sequential)
Task 12                                 (Final validation)
```

Phase 1 (Tasks 1–4) can be executed immediately.
Phase 2 (Tasks 5–11) requires Figma MCP connection.

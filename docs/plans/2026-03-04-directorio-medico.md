# Directorio Médico Section Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a "Directorio de Proveedores Médicos en Convenio" search widget as section §2.5 in the home page, between the brand-promise strip and §3 howhelp, fully aligned to the SMNYL DS2 design system.

**Architecture:** Static HTML section + companion CSS component block. No JS needed (UI-only; Buscar button is non-interactive). The section reuses existing DS2 tokens (`--shell-w`, `--menu-pad`, `--c-primary`, `--f-heading`, `--f-body`, `btn--primary`) and introduces a `.med-directory` BEM component. The search bar is an elevated white card with custom-styled selects.

**Tech Stack:** Vanilla HTML5, CSS (BEM, DS2 token system), no JS, no build step.

---

## Reference

- Design doc: `docs/plans/2026-03-04-directorio-medico-design.md`
- Reference HTML: `ref/mnyl-com-mx.html` lines 1183–1289
- Insertion point in `index.html`: after `</section>` at line ~284 (brand-promise), before `<!-- §3 ¿CÓMO TE AYUDAMOS? -->`
- DS2 token reference: `css/styles.css` lines 7–30

---

### Task 1: Add HTML section to index.html

**Files:**
- Modify: `index.html` — insert after `</section>` closing the brand-promise (~line 284)

**Step 1: Locate the insertion point**

In `index.html`, find:
```html
    </section>

    <!-- §3 ¿CÓMO TE AYUDAMOS? (feature cards) -------------- -->
```

**Step 2: Insert the section HTML**

Insert between those two elements:

```html
    <!-- §2.5 DIRECTORIO MÉDICO ------------------------------ -->
    <section class="med-directory" id="directorio-medico" aria-labelledby="med-directory-title">
      <div class="med-directory__inner">

        <!-- Header -->
        <div class="med-directory__header">
          <p class="med-directory__eyebrow">GASTOS MÉDICOS MAYORES</p>
          <h2 class="med-directory__title" id="med-directory-title">
            Directorio de proveedores médicos en convenio
          </h2>
        </div>

        <!-- Search bar card -->
        <div class="med-directory__bar" role="search" aria-label="Directorio de proveedores médicos">
          <div class="med-directory__controls">

            <div class="med-directory__field">
              <label class="sr-only" for="md-plan">Tipo de plan</label>
              <div class="med-directory__select-wrap">
                <select id="md-plan" class="med-directory__select" aria-label="Tipo de plan">
                  <option value="">Tipo de plan</option>
                  <option value="1">Plan Individual</option>
                  <option value="2">Plan Colectivo</option>
                  <option value="3">Hospitales y Clínicas</option>
                  <option value="4">Médicos Especialistas</option>
                  <option value="5">Servicios Especializados</option>
                </select>
              </div>
            </div>

            <div class="med-directory__divider" aria-hidden="true"></div>

            <div class="med-directory__field">
              <label class="sr-only" for="md-subplan">Subplan</label>
              <div class="med-directory__select-wrap">
                <select id="md-subplan" class="med-directory__select" aria-label="Subplan">
                  <option value="">Subplan</option>
                  <option value="int">Internacional</option>
                  <option value="amfa">AM Flex A</option>
                  <option value="pt">Práctico Total</option>
                  <option value="pleno">Pleno</option>
                  <option value="integro">Íntegro</option>
                  <option value="prac">Práctico</option>
                  <option value="orig">Origina</option>
                  <option value="orig1">Origina 1</option>
                </select>
              </div>
            </div>

            <div class="med-directory__divider" aria-hidden="true"></div>

            <div class="med-directory__field">
              <label class="sr-only" for="md-estado">Estado</label>
              <div class="med-directory__select-wrap">
                <select id="md-estado" class="med-directory__select" aria-label="Estado">
                  <option value="">Estado</option>
                  <option value="AGS">Aguascalientes</option>
                  <option value="BC">Baja California</option>
                  <option value="BCS">Baja California Sur</option>
                  <option value="CAMP">Campeche</option>
                  <option value="CHIS">Chiapas</option>
                  <option value="CHIH">Chihuahua</option>
                  <option value="CDMX">Ciudad de México</option>
                  <option value="COAH">Coahuila</option>
                  <option value="COL">Colima</option>
                  <option value="DGO">Durango</option>
                  <option value="GTO">Guanajuato</option>
                  <option value="GRO">Guerrero</option>
                  <option value="HGO">Hidalgo</option>
                  <option value="JAL">Jalisco</option>
                  <option value="MEX">Estado de México</option>
                  <option value="MICH">Michoacán</option>
                  <option value="MOR">Morelos</option>
                  <option value="NAY">Nayarit</option>
                  <option value="NL">Nuevo León</option>
                  <option value="OAX">Oaxaca</option>
                  <option value="PUE">Puebla</option>
                  <option value="QRO">Querétaro</option>
                  <option value="QROO">Quintana Roo</option>
                  <option value="SLP">San Luis Potosí</option>
                  <option value="SIN">Sinaloa</option>
                  <option value="SON">Sonora</option>
                  <option value="TAB">Tabasco</option>
                  <option value="TAMPS">Tamaulipas</option>
                  <option value="TLAX">Tlaxcala</option>
                  <option value="VER">Veracruz</option>
                  <option value="YUC">Yucatán</option>
                  <option value="ZAC">Zacatecas</option>
                </select>
              </div>
            </div>

            <div class="med-directory__divider" aria-hidden="true"></div>

            <div class="med-directory__field med-directory__field--grow">
              <label class="sr-only" for="md-keyword">Búsqueda abierta</label>
              <input
                id="md-keyword"
                class="med-directory__input"
                type="text"
                placeholder="Buscar proveedor o especialidad"
                aria-label="Buscar proveedor o especialidad"
                autocomplete="off"
              >
            </div>

          </div>

          <button class="btn btn--primary med-directory__submit" type="button" aria-label="Buscar en el directorio">
            Buscar
          </button>

          <!-- Quick-link buttons -->
          <div class="med-directory__quick-links" aria-label="Accesos rápidos">
            <div class="med-directory__ql-divider" aria-hidden="true"></div>

            <a href="https://www.odontoprev.com.mx/mapa/"
               class="med-directory__ql-btn"
               target="_blank"
               rel="noopener noreferrer"
               aria-label="Proveedor dental — abre en nueva pestaña">
              <svg class="med-directory__ql-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M12 2C9.5 2 7 3.5 6 6C5 7.5 5 9 5.5 10.5C6 12 6.5 13 6.5 14.5C6.5 16.5 7 20 8.5 22C9 22.5 9.5 22 9.5 21.5C9.5 19.5 9.5 17 11 15.5C11.5 15 12 15 12 15C12 15 12.5 15 13 15.5C14.5 17 14.5 19.5 14.5 21.5C14.5 22 15 22.5 15.5 22C17 20 17.5 16.5 17.5 14.5C17.5 13 18 12 18.5 10.5C19 9 19 7.5 18 6C17 3.5 14.5 2 12 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span class="med-directory__ql-label">Proveedor<br>dental</span>
            </a>

            <a href="https://www.smnyl-clientes.com.mx/WATabuladoresMedicos/BuscadorTabuladoresGMMI.aspx"
               class="med-directory__ql-btn"
               target="_blank"
               rel="noopener noreferrer"
               aria-label="Tabulador médico — abre en nueva pestaña">
              <svg class="med-directory__ql-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.5"/>
                <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.5"/>
                <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.5"/>
                <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.5"/>
              </svg>
              <span class="med-directory__ql-label">Tabulador<br>médico</span>
            </a>
          </div>
        </div>

      </div>
    </section>
```

**Step 3: Verify structure in browser**

Open `index.html` in browser. Confirm the section appears between the brand-promise banner and the "Asesoría personalizada" section. It should render unstyled but structurally correct.

---

### Task 2: Add CSS component styles

**Files:**
- Modify: `css/styles.css` — append new component block after the `§2 BRAND PROMISE STRIP` block (around line 970) — before `§3 ¿CÓMO TE AYUDAMOS?`

**Step 1: Locate the insertion point in styles.css**

Find the comment block:
```css
/* =========================================================
   §3 ¿CÓMO TE AYUDAMOS? (feature cards)
   ========================================================= */
```

**Step 2: Insert the CSS block immediately before it**

```css
/* =========================================================
   §2.5 DIRECTORIO MÉDICO
   ========================================================= */
.med-directory {
  background: #f8f7f7;
  padding: 64px 24px;
}

.med-directory__inner {
  width: var(--shell-w);
  margin: 0 auto;
  padding: 0 var(--menu-pad);
  display: flex;
  flex-direction: column;
  gap: 32px;
}

/* Header */
.med-directory__eyebrow {
  font-family: var(--f-body);
  font-size: 12px; font-weight: 400;
  letter-spacing: 0.08em; text-transform: uppercase;
  color: #474952; margin-bottom: 10px;
}

.med-directory__title {
  font-family: var(--f-heading);
  font-weight: 400; font-size: clamp(24px, 2.2vw, 32px);
  line-height: 1.15; color: var(--c-black);
}

/* Search bar card */
.med-directory__bar {
  background: var(--c-white);
  border-radius: 8px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: stretch;
  gap: 0;
  overflow: hidden;
}

.med-directory__controls {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 6px 0 6px 20px;
  gap: 0;
}

/* Individual field wrapper */
.med-directory__field {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.med-directory__field--grow {
  flex: 1;
}

/* Vertical dividers between controls */
.med-directory__divider {
  width: 1px;
  height: 24px;
  background: var(--c-border);
  flex-shrink: 0;
  margin: 0 4px;
}

/* Select wrapper (for custom chevron) */
.med-directory__select-wrap {
  position: relative;
}

.med-directory__select-wrap::after {
  content: '';
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 10px;
  height: 6px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23474952' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-size: contain;
  pointer-events: none;
}

.med-directory__select {
  appearance: none;
  -webkit-appearance: none;
  height: 48px;
  padding: 0 36px 0 12px;
  border: none;
  background: transparent;
  font-family: var(--f-body);
  font-size: 14px; font-weight: 400;
  color: var(--c-black);
  cursor: pointer;
  outline: none;
  white-space: nowrap;
  min-width: 150px;
}

.med-directory__select:focus-visible {
  outline: 2px solid var(--c-primary);
  outline-offset: -2px;
  border-radius: 4px;
}

/* Text input */
.med-directory__input {
  height: 48px;
  width: 100%;
  padding: 0 16px;
  border: none;
  background: transparent;
  font-family: var(--f-body);
  font-size: 14px; font-weight: 400;
  color: var(--c-black);
  outline: none;
}

.med-directory__input::placeholder {
  color: #999;
}

.med-directory__input:focus-visible {
  outline: 2px solid var(--c-primary);
  outline-offset: -2px;
  border-radius: 4px;
}

/* Search button — flush right, no border-radius on left side */
.med-directory__submit {
  border-radius: 0 8px 8px 0;
  padding: 0 32px;
  height: auto;
  align-self: stretch;
  font-size: 15px;
  letter-spacing: 0.02em;
  flex-shrink: 0;
}

/* Quick-links */
.med-directory__quick-links {
  display: flex;
  align-items: center;
  gap: 0;
  flex-shrink: 0;
}

.med-directory__ql-divider {
  width: 1px;
  height: 48px;
  background: var(--c-border);
  flex-shrink: 0;
}

.med-directory__ql-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 12px 20px;
  color: var(--c-primary);
  text-decoration: none;
  transition: background 0.15s, color 0.15s;
  min-width: 88px;
}

.med-directory__ql-btn:hover {
  background: #f0f4ff;
  color: var(--c-navy);
}

.med-directory__ql-icon {
  width: 24px; height: 24px;
  flex-shrink: 0;
}

.med-directory__ql-label {
  font-family: var(--f-body);
  font-size: 11px; font-weight: 400;
  line-height: 14px;
  text-align: center;
  color: inherit;
}

/* Screen reader only utility (if not already present) */
.sr-only {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

**Step 3: Verify visually in browser**

Open `index.html`. The section should show:
- `#f8f7f7` background
- Eyebrow "GASTOS MÉDICOS MAYORES" in small uppercase
- Title in Alverata serif
- White elevated card with 3 selects, text input, and blue "Buscar" button flush-right
- Two quick-link icon buttons after a vertical divider

Check that:
- [ ] Card has visible drop shadow
- [ ] Selects show custom chevron arrow
- [ ] Input placeholder reads "Buscar proveedor o especialidad"
- [ ] "Buscar" button matches `btn--primary` styling from other sections
- [ ] Quick-links show tooth and grid icons in blue
- [ ] Section aligns horizontally with §3 below it (same `--menu-pad` indentation)

---

### Task 3: Check for `.sr-only` duplication and commit

**Step 1: Search for existing `.sr-only` in styles.css**

```bash
grep -n "\.sr-only" css/styles.css
```

If `.sr-only` already exists in the file, remove the one added in Task 2 (avoid duplication).

**Step 2: Final visual check**

Scroll through the full home page in browser. Confirm:
- [ ] Brand-promise strip (warm beige) → Med directory (light grey) → Howhelp (light grey) flows naturally
- [ ] No horizontal overflow
- [ ] Section title uses Alverata (serif), not Roboto
- [ ] `btn--primary` on Buscar is the same dark-navy blue as on other CTAs

**Step 3: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: add §2.5 directorio médico section to home"
```

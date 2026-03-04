# Design: Directorio de Proveedores Médicos en Convenio

**Date:** 2026-03-04
**Section:** §2.5 — inserted after brand-promise strip, before §3 howhelp

---

## Summary

A new home-page section implementing the medical provider directory search widget,
fully aligned to SMNYL DS2. UI-only (static) for now; search button does not connect
to a live API.

---

## Layout

Two-row structure within a `--shell-w` container with `--menu-pad` horizontal padding:

**Row 1 — Header**
- Eyebrow: `GASTOS MÉDICOS MAYORES` — Roboto 12px, uppercase, `letter-spacing: 0.08em`, `#474952`
- Title: `Directorio de proveedores médicos en convenio` — Alverata ~32px, weight 400, `var(--c-black)`

**Row 2 — Search bar card**
- White card, `border-radius: 8px`, `box-shadow: 0 2px 16px rgba(0,0,0,0.08)`, `padding: 6px 6px 6px 20px`
- Left group: 3 selects + 1 text input (flex: 1) in a horizontal flex row, separated by `1px solid var(--c-border)` dividers
- Right: `btn--primary` "Buscar" button with `border-radius: 4px` (square, no pill)
- Far right: Divider `1px solid var(--c-border)` + 2 quick-link icon buttons stacked label below icon

---

## Controls

| Control | Type | Options |
|---|---|---|
| Tipo de plan | `<select>` | Selecciona / Plan Individual / Plan Colectivo / Hospitales y Clínicas / Médicos Especialistas / Servicios Especializados |
| Subplan | `<select>` | Selecciona / Internacional / AM Flex A / Práctico Total / Pleno / Íntegro / Práctico / Origina / Origina 1 |
| Estado | `<select>` | All 31 estados + CDMX |
| Búsqueda abierta | `<input type="text">` | placeholder "Buscar proveedor o especialidad" |
| Buscar | `<button>` | `btn--primary`, static (no action) |

---

## Quick-link Buttons

Two vertically-stacked icon+label buttons after a divider:
1. **Proveedor dental** — tooth SVG icon, links to `https://www.odontoprev.com.mx/mapa/` (target blank)
2. **Tabulador médico** — grid/table SVG icon, links to `https://www.smnyl-clientes.com.mx/WATabuladoresMedicos/BuscadorTabuladoresGMMI.aspx` (target blank)

---

## Styling

- **Section background:** `#f8f7f7` (same as howhelp — visual continuity)
- **Section padding:** `64px 24px`
- **Selects:** `appearance: none` + custom chevron via `background-image` SVG (data URI), consistent with nav dropdowns
- **Select/input height:** `48px` (consistent with login-form__input update)
- **Dividers between controls:** `1px solid var(--c-border)`
- **Section shell:** `width: var(--shell-w); margin: 0 auto; padding: 0 var(--menu-pad);`

---

## Files to modify

- `index.html` — add section §2.5 between brand-promise and howhelp
- `css/styles.css` — add `.med-directory` component styles

---

## Out of scope

- Live API / form submission
- Dependent-select JS (subplan filtering based on plan type)
- Mobile breakpoints (beyond basic reflow)

# SMNYL Testbed — NYL Homologation Design
**Date:** 2026-02-25
**Approach:** A — Chrome first, then Figma content frames, then pixel-perfect implementation
**Fonts:** Alverata (headings) + Roboto (body) — local/Figma governs, NOT newyorklife.com

---

## Scope

Two phases:

1. **Phase 1 — Chrome homologation** in code (`index.html`, `css/styles.css`, `js/nav.js`) using existing Figma testbed node `10769:4686` as spec
2. **Phase 2 — Content sections** generated as Figma frames → implemented pixel-perfect

---

## Phase 1 — Chrome Changes

### Header

**Alt nav** — split "Mi SMNYL" into two separate buttons:

| Item | Type | Behavior |
|------|------|----------|
| Ayuda y contacto | `<a>` | Link |
| Documentos | `<a>` | Link |
| Mi SMNYL Clientes | `<button>` | Opens existing login drawer |
| Mi SMNYL Asesores | `<a>` | External link (advisor portal) |
| 🔍 | `<button>` | Opens search panel |

No other header changes.

### Footer

**4 columns** (same quantity, updated content + structure):

#### Col 1 — SEGUROS GRUPALES + SEGUROS INDIVIDUALES
- **SEGUROS GRUPALES:** Seguros de Vida Grupo · Seguro de GMM Colectivo
- **SEGUROS INDIVIDUALES:** Seguros de Gastos Médicos Mayores · Seguros de Vida

#### Col 2 — AYUDA
- ¿Cómo hacer válido tu seguro de vida?
- ¿Cómo hacer válido tu seguro de accidentes personales?
- ¿Qué hacer en caso de siniestro?
- Formas de pago
- Documentación contractual
- Descarga Mi SMNYL Clientes

#### Col 3 — ÚNETE + CONÓCENOS
- **ÚNETE:** Como colaborador · Como asesor · Como promotor o partner
- **CONÓCENOS:** Nuestra filosofía · Nuestra historia · New York Life en el mundo · Informe corporativo · Sustentabilidad · Integridad y cumplimiento

#### Col 4 — SUSCRÍBETE
- Description text: *"Recibe periódicamente consejos y novedades de Seguros Monterrey para crecer más fuertes, juntos."*
- Email form (existing component, unchanged)
- Social icons: Facebook, X, Instagram, LinkedIn — **filled solid circles** (not bordered)
- Trust badges: Las Mejores Empresas · Buró · CONDUSEF

#### Footer bottom
- Phone: `800 906 2100`
- Copyright: `© 2026 Seguros Monterrey New York Life. Todos los derechos reservados.`
- Legal links: `Términos y condiciones para el uso de medios electrónicos` · `Aviso de privacidad` · `UNE`

---

## Phase 2 — Content Sections (Figma → Code)

All frames generated at **1512px width** in Figma file `c7AVjPDwzoDgIMzM4jGJhs`, appended to the existing testbed section.

### Section 1 — Hero (`cmp-hero__billboard`)
NYL pattern: full-width image + content card overlay (left-aligned)

| Element | Content |
|---------|---------|
| Eyebrow | *"La aseguradora más confiable de México"* |
| Headline | *"Siempre contigo, protegiéndote mejor cada día"* |
| Body | *"Con 75 años en México y el respaldo de New York Life, seguros de vida y gastos médicos para proteger lo que más amas."* |
| CTA primario | **Cotiza tu seguro** |
| CTA secundario | **Encuentra un asesor** |
| Image | Full-width placeholder (familia) |

### Section 2 — Brand Promise Strip
NYL pattern §3: single-row text band

| Element | Content |
|---------|---------|
| Text | *"75 años junto a las familias mexicanas · Con el respaldo de New York Life"* |
| CTA | **Conoce nuestra historia →** |
| Background | `--c-sand` (#E3E0DD) |

### Section 3 — ¿Cómo te ayudamos? (Personalized Guidance)
NYL pattern §4: headline + 3 value props (icon + title + copy) + dual CTA

| Value prop | Title | Copy |
|-----------|-------|------|
| 1 | Seguros a la medida de tu vida | Vida, salud y protección empresarial diseñados para cada etapa. |
| 2 | Atención humana y cercana | Asesores certificados que te acompañan cuando más lo necesitas. |
| 3 | Solidez financiera comprobada | 75 años en México respaldados por New York Life, la mutualista más grande de EE.UU. |

CTAs: **Cotiza ahora** + **Consulta un asesor**

### Section 4 — Nuestros seguros (4-col card grid)
NYL pattern §6: card grid with title, short description, "Explorar →" CTA per card

| Card | Nombre | Productos destacados |
|------|--------|----------------------|
| 1 | Seguros de Vida | Imagina Ser®, Realiza®, Vida Mujer®, Objetivo Vida® |
| 2 | Gastos Médicos Mayores | Alfa Medical®, Alfa Medical Flex®, Alfa Medical Internacional® |
| 3 | Vida Grupal y Colectivo | Seguro de Vida Grupo, Visualiza®, GMM Colectivo |
| 4 | Para tu empresa | Médico Empresarial, Accidentes Personales Colectivo |

CTA per card: **Conoce más →**

### Section 5 — Por qué SMNYL (4 differentiators)
NYL pattern §8: 4-col horizontal layout + supporting image

| # | Stat / Claim | Descripción |
|---|-------------|-------------|
| 1 | 75 años | En México, protegiendo a las familias mexicanas |
| 2 | 175+ años | New York Life, la mutualista más grande de EE.UU. |
| 3 | Expertos de la Vida | Asesores certificados a tu lado |
| 4 | Great Place to Work | Empresa reconocida · CONDUSEF |

### Section 6 — Cierre / Asesor (Closing CTA)
NYL pattern §9: centered text + single primary CTA

| Element | Content |
|---------|---------|
| Headline | *"¿Qué seguro es el indicado para ti?"* |
| Body | *"Nuestros asesores te orientan sin compromiso. Encuéntralos en todo México."* |
| CTA | **Consulta un asesor financiero** |
| Background | `--c-navy` (#000A62) |

---

## Design Tokens (unchanged)

```css
--c-primary: #0468FF
--c-navy:    #000A62
--c-sand:    #E3E0DD
--c-white:   #FFFFFF
--f-heading: 'Alverata', Georgia, serif
--f-body:    'Roboto', sans-serif
--header-h:  80px
--sidebar-w: 301px
--max-w:     1512px
```

---

## Out of Scope

- Announcement/alert banner (operational content, dynamic)
- Financial resources tiles (articles + calculators)
- Community impact cards
- Mobile responsive changes (separate task)
- Hero image assets (placeholders sufficient for testbed)

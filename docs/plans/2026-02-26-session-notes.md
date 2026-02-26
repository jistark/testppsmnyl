# SMNYL Testbed — Notas de sesión
**Fecha:** 2026-02-26
**Workspace:** `/Users/ji/Sites/testppsmnyll`
**Objetivo:** Documentar el estado actual de implementación y definir la ruta para mover elementos/estilos al testbed en Figma.

---

## Resumen de la sesión

- Se revisó el estado del repositorio y los documentos de homologación del 2026-02-25.
- Se confirmó que el worktree local está en progreso (`index.html`, `css/styles.css`, `js/nav.js` y assets visuales pendientes de commit).
- Se confirmó acceso activo a Figma MCP con `jstark@mnyl.com.mx`.

---

## Estado actual del proyecto

- El plan vigente se mantiene:
  - Fase 1: homologación de chrome (header/footer/navegación y estilos).
  - Fase 2: secciones de contenido desde Figma a código con paridad visual.
- Ya existen capturas y assets de referencia para validación visual.
- No se requieren cambios de tooling (flujo plano HTML/CSS/JS).

---

## Transferencia a testbed en Figma (elementos + estilos)

Sí, podemos mover elementos y estilos al testbed en Figma.

Orden recomendado:
1. Mover primero componentes reutilizables (header/footer, cards, CTAs).
2. Mover/aplicar estilos compartidos (color/text/effect styles o variables).
3. Re-vincular instancias del testbed a los componentes transferidos.
4. Validar variantes y constraints responsivos contra los frames actuales.

Datos mínimos para ejecutar:
- Link(s) de origen con node IDs exactos.
- File key de destino (testbed) + página/frame objetivo.
- Alcance confirmado:
  - Solo componentes.
  - Componentes + estilos/variables.
  - Migración completa de frame.

### Parámetros confirmados en esta sesión

- Link de trabajo:
  - `https://www.figma.com/design/c7AVjPDwzoDgIMzM4jGJhs/SMNYL-Design-System-2-v0?node-id=10769-4686&m=dev`
- Link de destino con permisos de edición:
  - `https://www.figma.com/design/c7AVjPDwzoDgIMzM4jGJhs/SMNYL-Design-System-2-v0?node-id=226-1450&m=dev`
- Alcance confirmado por usuario:
  - Migración de frame completo + componentes + estilos + variables.
- Nodo raíz inspeccionado:
  - `10769:4686` (`Testbed main elements`)
- Frames principales detectados:
  - `10723:11237` (`Testbed 2026`)
  - `10742:3378` (`Testbed | Primary, secondary sidebars`)
- Variables/tokens detectados en uso (extracto):
  - `ref-color-primary-nyl-blue` = `#0468ff`
  - `ref/color/primary/dark-blue` = `#000a62`
  - `ref/color/primary/light-grey` = `#e3e0dd`
  - `ref-color-primary-nyl-white` = `#ffffff`
  - `Body/Small/Bold`, `Body/Small/Regular`, `Body/Medium/Regular`, `Headings/H6/Regular`

### Dependencia pendiente para ejecutar el move

- Destino ya confirmado:
  - Canvas `226:1450` (`🎮 Playground`) en el mismo archivo de origen.
- Nota:
  - El origen `10769:4686` ya existe dentro de ese canvas; no hay migración cross-file. La tarea pasa a ser reubicación/duplicación y normalización de componentes+variables.

### Procedimiento de ejecución en Figma (manual guiado)

1. En `🎮 Playground`, localizar `Testbed main elements` (`10769:4686`).
2. Duplicar el bloque completo (`Cmd/Ctrl + D`) para conservar respaldo.
3. Mover el duplicado al área objetivo del canvas y renombrar:
   - `Testbed | Full migration | YYYY-MM-DD`.
4. En cada instancia del bloque duplicado, ejecutar `Reset all overrides` solo donde aplique, para recuperar bindings de componente.
5. En Variables, confirmar modo/colección:
   - `ref-color-primary-nyl-blue`, `ref/color/primary/dark-blue`, `ref/color/primary/light-grey`, `ref-color-primary-nyl-white`.
6. En Text styles, re-vincular estilos base:
   - `Headings/H6/Regular`, `Body/Small/Regular`, `Body/Small/Bold`, `Body/Medium/Regular`.
7. Verificar que los íconos y símbolos sigan como instancias:
   - `Base/Search`, `Arrows/Chevron-right`, íconos sociales.
8. Correr validación visual contra el frame original (before/after en paralelo).

---

## Siguiente paso de ejecución

Con links de origen y destino, correr flujo MCP:
- `get_metadata` para mapear estructura de nodos origen/destino.
- `get_design_context` sobre nodos exactos para preservar estructura/variantes.
- Aplicar transferencia y re-vincular estilos/variables en el testbed.
- Generar screenshots para validación antes/después.

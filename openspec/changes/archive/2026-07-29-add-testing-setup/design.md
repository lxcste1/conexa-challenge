## Context

El proyecto es un Next.js 16 (App Router) recién creado con estructura mínima: `app/layout.tsx`, `app/page.tsx`, `app/globals.css`. No hay framework de testing instalado. Los coding conventions exigen React 19, TypeScript 5 strict, Tailwind CSS v4, y pnpm como package manager. El proyecto usa `next/font/google` (Geist, Geist_Mono) en el layout y `next/image` en la página, ambas dependencias que requieren mocking en tests unitarios.

## Goals / Non-Goals

**Goals:**
- Instalar y configurar Jest como test runner con soporte para TypeScript (vía SWC, usando `next/jest`) y entorno jsdom
- Integrar `@testing-library/react` y `@testing-library/jest-dom` para tests declarativos de componentes
- Generar un primer snapshot test para `RootLayout` que valide que el entorno funciona correctamente
- Agregar scripts `test` / `test:watch` al `package.json`

**Non-Goals:**
- Tests de integración o e2e (Cypress, Playwright)
- Cobertura de código (coverage thresholds)
- Tests para `page.tsx` u otros componentes — solo layout como punto de partida
- CI/CD pipeline configuration
- Tests de hooks o utilidades (no existen aún)

## Decisions

### 1. Test runner: Jest (no Vitest)

**Alternativa considerada:** Vitest ofrece arranque más rápido, configuración más simple y soporte nativo ESM/TypeScript. Sin embargo:

- La documentación oficial de Next.js recomienda y documenta Jest con `next/jest`
- `next/jest` provee transforms vía SWC (mismo compilador que Next) sin configuración adicional, eliminando la necesidad de `ts-jest` o `@swc/jest`
- Vitest usa Vite como bundler, lo que genera fricción con las características de Next.js (webpack/turbopack, `next/font`, `next/image`)
- Para tests unitarios de componentes, Jest es la opción con menor riesgo de incompatibilidad

### 2. Configuración vía `next/jest`

Se usa `next/jest` (incluido en Next.js) que:
- Configura SWC para transformar TypeScript/JSX automáticamente
- Resuelve path aliases (`@/*`) del `tsconfig.json`
- Ignora `.next/`, `node_modules/` automáticamente
- Permite sobrescribir entorno a `jsdom` y agregar setup files

No se necesita `ts-jest`, `@swc/jest`, ni configuraciones manuales de `transform`.

### 3. Tests co-ubicados en `app/__tests__/`

En lugar de una carpeta `__tests__/` raíz, los tests se ubican en `app/__tests__/`. Ventajas:
- Proximidad al código que prueban
- Patrón recomendado por Next.js
- Escala bien: cuando surjan `app/components/`, `app/hooks/`, etc., cada uno tendrá su `__tests__/` correspondiente

### 4. Snapshot testing para el layout

Se usa `toMatchSnapshot()` de Jest en lugar de assertions estructurales individuales. Esto captura la estructura completa del HTML renderizado (`<html>`, `<body>`, clases CSS, `lang`). Las snapshots se actualizan intencionalmente con `jest --updateSnapshot` cuando el layout cambia.

### 5. Mock de `next/font/google`

`Geist` y `Geist_Mono` se mockean a nivel módulo con `jest.mock()` (hoisted). El mock devuelve objetos con la propiedad `variable` poblada con el nombre de la CSS variable. Esto evita que las fuentes se descarguen durante los tests y garantiza estabilidad en los snapshots.

## Risks / Trade-offs

### Snapshots frágiles ante cambios de dependencias

- **Riesgo:** Si `next/font/google` o React cambian la forma de renderizar class names, el snapshot fallará incluso sin cambios en el código propio.
- **Mitigación:** El mock de `next/font/google` controla exactamente qué valores de `variable` se renderizan, eliminando la fuente de inestabilidad. Los snapshots solo cambian cuando el layout cambia intencionalmente. Además, `jest --updateSnapshot` permite actualizarlos en un solo comando.

### `next/jest` depende de next

- **Riesgo:** La configuración de Jest está acoplada a la versión de Next.js. Un cambio mayor en Next podría requerir ajustes en la configuración de Jest.
- **Mitigación:** Este acoplamiento es intencional y beneficioso — elimina la necesidad de mantener configuraciones separadas de transform y resolución de módulos.

### Tests no ejercitan CSS

- **Riesgo:** jsdom no procesa Tailwind CSS — los snapshots capturan nombres de clases pero no validan que los estilos se apliquen visualmente.
- **Mitigación:** Aceptado. Para validación visual, se necesitarían tests e2e con un navegador real (fuera de scope). Los snapshots validan la estructura del markup y la presencia de clases, que es suficiente para tests unitarios.

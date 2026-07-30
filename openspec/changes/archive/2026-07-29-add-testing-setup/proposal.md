## Why

El proyecto no tiene framework de testing configurado. A medida que crezca la base de código (componentes, hooks, utilidades), la falta de tests automatizados incrementará el riesgo de regresiones y relentizará el desarrollo. Implementar el entorno ahora, con el proyecto aún pequeño, establece una base sólida sin deuda técnica acumulada.

## What Changes

- Instalación de Jest como test runner junto con `@testing-library/react` y `@testing-library/jest-dom` para tests de componentes React
- Configuración de Jest vía `jest.config.ts` usando el helper `next/jest` para compatibilidad con SWC, path aliases (`@/*`) y entorno jsdom
- Setup file (`jest.setup.ts`) para importar los matchers de `@testing-library/jest-dom`
- Carpeta `app/__tests__/` co-ubicada para tests del App Router
- Primer test de snapshot para el `RootLayout` (`app/layout.tsx`) como referencia y validación del entorno
- Scripts `test` y `test:watch` en `package.json`
- Actualización de `AGENTS.md`: nuevos comandos y mención del framework de testing
- Actualización de `CODING_CONVENTIONS.md`: sección de Testing con reglas de ubicación, naming, snapshots, mocking y cobertura obligatoria

## Capabilities

### New Capabilities

- `testing-setup`: Entorno de testing unitario con Jest + React Testing Library, incluyendo configuración base, mocks para dependencias de Next.js y snapshot testing de componentes del App Router.

### Modified Capabilities

<!-- Ninguna — primer cambio del proyecto, no hay specs existentes para modificar -->

## Impact

- `package.json` — nuevos scripts y devDependencies
- `jest.config.ts` — nuevo archivo de configuración
- `jest.setup.ts` — nuevo archivo de setup
- `app/__tests__/layout.test.tsx` — nuevo test de snapshot
- `app/layout.tsx` — indirectamente afectado (se mockea `next/font/google`)
- `AGENTS.md` — nuevos comandos y descripción del stack de testing
- `CODING_CONVENTIONS.md` — nueva sección de Testing con políticas obligatorias

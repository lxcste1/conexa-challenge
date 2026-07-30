# PortalDex — Rick & Morty | Character Episode Explorer

**Conexa Challenge** — [Ver challenge](https://app.notion.com/p/Ssr-Frontend-Developer-NextJS-c50de301d03e8348b48201ba50cdd870)

PortalDex es una aplicación web que permite comparar dos personajes de Rick and Morty
y descubrir en qué episodios aparecen juntos y en cuáles aparecen por separado.
Seleccionás un personaje en cada columna, y la app calcula automáticamente la
partición de episodios: solo del Personaje #1, compartidos, solo del Personaje #2.

---

## Stack

| Categoría       | Tecnología                                                     |
| --------------- | -------------------------------------------------------------- |
| Framework       | Next.js 16 (App Router)                                        |
| UI              | React 19 + Tailwind CSS v4                                     |
| Lenguaje        | TypeScript 5 (strict mode)                                     |
| Componentes     | shadcn/ui + base-ui + CVA                                      |
| Íconos          | Lucide React                                                   |
| Testing         | Jest + React Testing Library                                   |
| Linting         | ESLint 9 (flat config)                                         |
| Package Manager | pnpm                                                           |
| API externa     | [Rick and Morty API](https://rickandmortyapi.com/) (pública, sin auth) |

## Metodología: Specification-Driven Development (SDD)

El proyecto sigue SDD usando [OpenSpec](https://github.com/anomalyco/openspec).
Cada feature se diseña primero como una especificación formal (propuesta, diseño,
casos de uso) y luego se implementa contra esa spec. Las specs vivas documentan
el comportamiento actual del sistema y sirven como source of truth.

### Historial de cambios

| #   | Cambio                      | Descripción                                                                                       |
| --- | --------------------------- | ------------------------------------------------------------------------------------------------- |
| 1   | `add-testing-setup`         | Configuración de Jest + React Testing Library, primer snapshot test                               |
| 2   | `add-api-layer`             | Tipos `Character`, `Episode`, `PaginatedResponse<T>` y fetch wrappers con ISR (24h)               |
| 3   | `add-character-explorer`    | Feature principal: `/explorer` con dual-column, selección, paginación y partición de episodios    |
| 4   | `fix-and-add-layout-tests`  | Tests de Header y Footer, fix del layout test roto por cambio de fonts                            |
| 5   | `add-home-page`             | Landing page (SSG) con Hero, Features y How It Works                                              |

### Specs activas

`character-explorer` · `episode-partition` · `header-component` · `footer-component` · `home-page` · `rick-and-morty-api` · `testing-setup`

## Arquitectura

### Estrategias de rendering

| Ruta         | Estrategia      | Detalle                                                                                                                                   |
| ------------ | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `/`          | SSG             | Landing estática, cero fetching, HTML generado en build                                                                                   |
| `/explorer`  | SSR + CSR híbrido | El servidor fetchea la primera página de personajes (ISR 24h). La interactividad (selección, paginación, partición de episodios) corre client-side en un solo boundary `"use client"` |

### Separación de concerns

- **Componentes `.tsx`**: solo renderizado, cero estado, cero llamadas a API
- **Hooks `.ts`**: toda la lógica de negocio, estado y fetching
- **Tipos en `types/`**: todas las interfaces están centralizadas, nada inline

### Hooks principales

| Hook                   | Responsabilidad                                                  |
| ---------------------- | ---------------------------------------------------------------- |
| `useExplorer`          | Estado de selección de ambos personajes, IDs de episodios particionados |
| `useCharacterColumn`   | Paginación y fetching de personajes por columna                  |
| `useEpisodes`          | Fetching de episodios por IDs                                    |
| `useEpisodePartition`  | Cálculo de conjuntos: solo #1, compartidos, solo #2              |

## Features

- **Dual-column character browser** — dos columnas independientes con paginación. Un personaje seleccionado en una columna se deshabilita en la otra.
- **Episode partition** — al seleccionar ambos personajes, se muestran tres secciones: episodios exclusivos del #1, compartidos, exclusivos del #2.
- **Status indicators** — cada personaje muestra su estado (Alive/Dead/Unknown) con un dot coloreado y glow.
- **Responsive design** — mobile-first, desde 320px hasta desktop.
- **Dark-first theme** — paleta oscura con los colores marca de Rick and Morty (portal green, lab cyan).

## Cómo empezar

```bash
pnpm install        # Instalar dependencias
pnpm dev            # Dev server en http://localhost:3000
pnpm build          # Build de producción
pnpm lint           # ESLint
pnpm test           # Jest
pnpm test:watch     # Jest en modo watch
```

## Testing

- **Framework**: Jest 30 + React Testing Library 16 + jest-dom
- **Entorno**: jsdom configurado vía `next/jest`
- **Estrategia**:
  - Componentes de layout → snapshot tests (`toMatchSnapshot()`)
  - Hooks y utilidades → tests de comportamiento con assertions
  - API → `fetch` mockeado, nunca requests reales
  - Next.js internals → mockeados a nivel módulo (`next/font`, `next/image`, `next/navigation`)
- **Cobertura**: todo componente, hook y utilidad nuevo requiere tests co-ubicados en `__tests__/`

## API

El proyecto consume la [Rick and Morty API](https://rickandmortyapi.com/), una REST API pública y gratuita. Los endpoints utilizados:

- `GET /api/character?page={n}` — listado paginado de personajes
- `GET /api/episode/{ids}` — uno o varios episodios por ID

Las llamadas server-side usan ISR con revalidación cada 24 horas. Las llamadas client-side usan `fetch` directo desde hooks.

## Convenciones

El proyecto sigue guías estrictas de código documentadas en [`CODING_CONVENTIONS.md`](./CODING_CONVENTIONS.md):
tipado estricto (prohibido `any`), separación hooks/UI, mobile-first,
shadcn/ui como primera opción, tests obligatorios, y una matriz de decisión
para elegir la estrategia de rendering correcta (SSG/ISR/SSR/CSR).

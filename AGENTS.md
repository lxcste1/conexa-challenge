# AGENTS.md

## Commands
- `pnpm dev` — start dev server (port 3000)
- `pnpm build` — production build
- `pnpm lint` — ESLint (Next.js core-web-vitals + typescript configs)
- `pnpm install` — install dependencies (use pnpm, not npm/yarn)

## Stack
- Next.js 16 (App Router), React 19, TypeScript 5
- Tailwind CSS v4 with `@tailwindcss/postcss`
- pnpm (lockfile: `pnpm-lock.yaml`)

## Path alias
- `@/*` maps to project root (`./*`)

## Tailwind CSS v4 notes
- Global CSS uses `@import "tailwindcss"` (no `@tailwind base/components/utilities` directives)
- Config is done via CSS `@theme` blocks, not `tailwind.config.js`

## Architecture
- `app/` — Next.js App Router (layout.tsx, page.tsx, globals.css)
- No test framework configured yet
- No `.env` or API keys needed — uses public Rick and Morty API (`https://rickandmortyapi.com/`)

## Conventions
- TypeScript strict mode enabled
- ESLint via `eslint.config.mjs` (ESLint 9 flat config, not `.eslintrc`)
- Use `@/` imports for internal modules (e.g. `@/components/...`)

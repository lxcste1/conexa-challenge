## Why

The root route (`/`) currently shows the Next.js default boilerplate. Users land on a meaningless placeholder instead of an informative landing page that introduces the Rick & Morty Character Episode Explorer, explains what it does, and guides them to the `/explorer` tool.

## What Changes

- Replace `app/page.tsx` with a new landing page composed of three sections: Hero, Features, and How It Works
- Add `HomeHero`, `HomeFeatures`, `HomeHowItWorks` server components under `components/ui/`
- Add reusable `FeatureCard` and `StepCard` presentational sub-components
- Add `types/home.ts` with props interfaces for new components
- Add co-located test files (`__tests__/`) for all new components

## Capabilities

### New Capabilities

- `home-page`: Static landing page (SSG) with hero section, feature cards, and step-by-step guide — no data fetching, no client interactivity

### Modified Capabilities

<!-- None -->

## Impact

- `app/page.tsx` — replaced entirely (SSG, no dynamic APIs)
- `components/ui/home-hero/` — new
- `components/ui/home-features/` — new (with sub-component `FeatureCard`)
- `components/ui/home-how-it-works/` — new (with sub-component `StepCard`)
- `types/home.ts` — new prop interfaces
- `public/portal-glow.png` — reused as hero background image

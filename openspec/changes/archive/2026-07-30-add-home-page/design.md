## Context

The root route (`/`) currently renders the Next.js default boilerplate (`app/page.tsx` line 1-64). The `/explorer` route is already fully implemented following the v0 design. The project already has:

- **Shared layout**: `Header` and `Footer` in `app/layout.tsx` wrapping all routes
- **Theme**: Dark-first theme in `globals.css` with Rick and Morty brand colors (`--primary` portal green, `--accent` lab cyan)
- **Component library**: Button (base-ui), Badge, Skeleton, StatusDot, CharacterCard, etc.
- **Path alias**: `@/*` maps to project root
- **Image domains**: `rickandmortyapi.com` already configured in `next.config.ts`

The v0 design reference lives at `/home/lxcste/workspace/docs/rick-and-morty/` and provides the visual blueprint.

## Goals / Non-Goals

**Goals:**
- Replace the boilerplate `app/page.tsx` with a landing page that matches the v0 design
- Decompose the page into server components under `components/ui/` per conventions
- Use SSG rendering (static content, no dynamic APIs, no per-user data)
- Follow mobile-first responsive design (Tailwind `sm:`, `lg:` breakpoints)
- Reuse existing Button component for CTAs
- Include snapshot tests for all new components

**Non-Goals:**
- No data fetching from the Rick and Morty API (purely static content)
- No client interactivity or state management
- No changes to header, footer, layout, or theme
- No search params, cookies, or auth integration
- No animation or parallax effects

## Decisions

### 1. Rendering Strategy: SSG

**Choice**: Static Site Generation (no `dynamic`, no `revalidate`).

**Rationale**: Following the rendering decision matrix:
1. Content is the same for every user → YES
2. Does it change frequently? → NO (static marketing copy)
3. → **SSG**

The page contains only static text, a background image, and links. No `cookies()`, `headers()`, or `searchParams` are used. Build output must show `○ (Static)`.

**Alternative considered**: ISR with `revalidate = 86400`. Rejected because the content literally never changes at runtime — it's source-controlled text, not CMS-driven data. SSG is simpler and more appropriate.

### 2. Component Decomposition

**Choice**: Three top-level Server Components + two reusable sub-components:

```
components/ui/home-hero/HomeHero.tsx       ← Hero section (badge, title, CTA)
components/ui/home-features/HomeFeatures.tsx    ← Grid wrapper
  └── components/FeatureCard.tsx                ← Reusable card
components/ui/home-how-it-works/HomeHowItWorks.tsx  ← Section wrapper
  └── components/StepCard.tsx                      ← Reusable card
```

**Rationale**:
- Conventions require "every component SHALL live in its own folder under `components/ui/`"
- `FeatureCard` and `StepCard` follow DRY — same card structure with different visual treatment (icon vs number), avoiding 3 copies of nearly identical markup
- `HomeFeatures` and `HomeHowItWorks` are simple list renderers that delegate to cards
- Each component folder contains its own data constants (e.g., `home-features-data.ts`) per the rule: "If a constant/mapping is used by only one component, it SHALL live in the component's folder"

**Alternative considered**: Flat `components/` at project root (like the v0 reference). Rejected because the project already follows the nested convention for all 11 existing components under `components/ui/`.

### 3. CTA Buttons: Reuse Existing Button

**Choice**: Use `@/components/ui/button/Button` with `render` prop for Link integration.

```tsx
<Button size="lg" render={<Link href="/explorer" />}>
  Launch the Explorer
  <ArrowRight className="size-4" />
</Button>
```

**Rationale**: The base-ui `Button` supports `render` (equivalent to Radix `asChild`). The `variant="secondary"` variant already exists in the CVA config for the secondary CTA in `HowItWorks`. No new Button variants needed.

### 4. Images: next/image

**Choice**: Use `next/image` for the hero background via `<Image fill />` inside a positioned container.

**Rationale**: Convention mandates `next/image` over native `<img>`. The hero background uses `/portal-glow.png` (already in `public/`). External character images are NOT used on the home page.

### 5. Types Location

**Choice**: `types/home.ts` with `FeatureCardProps` and `StepCardProps`.

**Rationale**: Convention states "All interfaces and types MUST live in `types/`." Both are simple props interfaces.

## Risks / Trade-offs

- **[Risk] Button `render` prop incompatibility**: The base-ui `Button` render API may differ from what the v0 shadcn Button used. → **Mitigation**: Test during implementation. Fallback: use `<Link>` with `buttonVariants()` className directly.
- **[Risk] portal-glow.png missing**: The image must exist in `public/`. → **Mitigation**: Confirmed present via `layout.tsx` icons config. Graceful degradation with gradient background if image fails to load.
- **[Trade-off] No skeleton/loading state**: Since the page is SSG with zero data fetching, there is no loading state to render. Layout shift prevention doesn't apply — the entire page is delivered as static HTML.

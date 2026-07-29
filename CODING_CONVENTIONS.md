# Coding Conventions

Loaded via `opencode.json` — agents must follow these when writing, refactoring, or reviewing code.

## Authorized Tech Stack

Only: **React**, **Next.js**, **TypeScript**, **Tailwind CSS**, **CVA**, **shadcn/ui**.

## Strict Typing

- `any` is strictly prohibited.
- Always define explicit types for components, functions, props, and return values.
- Prefer `interface` over `type` for Props and domain entities. Use `type` only for unions, intersections, and utility types.
- **All interfaces and types MUST live in `types/`.** Component Props, domain entities, hook return types — everything goes in `types/`. Never define types inline in `.tsx` or `.ts` files.
- **Keep them minimal:** Props interfaces should pass only data and callbacks, not domain objects.

## Next.js Architecture & Rendering

- **Maximize RSC:** All components, layouts, and pages MUST be Server Components by default.
- **Strict use of `"use client"`:** The `"use client"` directive is only permitted in leaf components that strictly require user interactivity (e.g., `onClick`), access to browser APIs (e.g., `window`), or React state hooks.
- **Prevent Layout Shifts:** Any client-side component that is dynamically imported or might cause a layout shift during loading MUST be wrapped in a `<Suspense>` boundary accompanied by a representative `Skeleton` component. Loading client components without a corresponding Skeleton is strictly prohibited.

### Rendering Strategy Decision Matrix

Every route, page, or data-fetching boundary MUST follow exactly one of the four strategies below. Mixing strategies within the same data-fetching boundary is prohibited unless explicitly justified and documented. The decision tree is:

```
                    ┌─── Is the content the same for every user?
                    │
             ┌──────┤
             │ YES  │ NO
             ▼      ▼
   Does it change   Must content be
   frequently?      real-time fresh?
     │                 │
  ┌──┴──┐         ┌───┴───┐
  │ NO  │ YES     │ YES   │ NO
  ▼     ▼         ▼       ▼
 SSG   ISR       SSR    ISR (per-user cache key)
```

---

### SSG — Static Site Generation

**Definition:** HTML is generated once at build time (`next build`) and served as a static file for every request. Zero server compute per request.

| Aspect          | Rule                                                                                 |
| --------------- | ------------------------------------------------------------------------------------ |
| **When to use** | Content is identical for all visitors **and** changes rarely or never.               |
| **Examples**    | Landing pages, marketing copy, documentation, legal pages (ToS, privacy), about us.  |
| **Detection**   | Next.js App Router default behavior — any Server Component that does **not** call `cookies()`, `headers()`, `draftMode()`, or `searchParams` is statically rendered at build time. |
| **How to enforce** | Do **not** add `export const dynamic` or `export const revalidate`. The absence of dynamic APIs triggers SSG automatically. For dynamic routes, use `generateStaticParams`. |
| **Forbidden**   | Calling `fetch` without `cache: 'force-cache'` (or equivalent) inside an SSG page — every `fetch` must omit revalidation or use `force-cache`. Accessing `searchParams` props without wrapping in a `<Suspense>` boundary. |
| **Verification** | `pnpm build` must show `○ (Static)` in the route table for the page. |

---

### ISR — Incremental Static Regeneration

**Definition:** HTML is generated at build time and re-generated on-demand in the background after a configurable time-to-live (TTL) expires, without requiring a full rebuild.

| Aspect          | Rule                                                                                 |
| --------------- | ------------------------------------------------------------------------------------ |
| **When to use** | Content is the same for all users **but** changes periodically (minutes/hours/days). Need near-static performance with eventual freshness. |
| **Examples**    | Product catalog pages, blog post index and detail, CMS-driven pages, changelog, job listings. |
| **How to enforce** | Add `export const revalidate = <seconds>` in `layout.tsx` or `page.tsx`. The revalidation interval must be documented with a comment explaining the business reason for the chosen value. |
| **Minimum interval** | Never set `revalidate` below 60 seconds. If data must be fresher than 60 seconds, use SSR instead. |
| **Forbidden**   | Using ISR for user-specific data (use SSR), real-time dashboards (use CSR), or auth-gated content without a revalidation strategy. Setting `revalidate` to 0 (that is SSR, not ISR). |
| **Verification** | `pnpm build` must show `○ (Static)` with `revalidate` in the output. |

---

### SSR — Server-Side Rendering

**Definition:** HTML is generated fresh on **every** HTTP request. The server executes the component tree and `fetch` calls for each incoming request before sending the response.

| Aspect          | Rule                                                                                 |
| --------------- | ------------------------------------------------------------------------------------ |
| **When to use** | Content is personalized per user AND must be fresh on every request. Content changes too rapidly for ISR. Data is gated behind authentication/tokens that must be validated per-request. |
| **Examples**    | User dashboards with real-time metrics, authenticated settings pages, shopping cart summary, search results pages. |
| **How to enforce** | Call any dynamic function (`cookies()`, `headers()`, `draftMode()`) in the server component tree, **or** add `export const dynamic = 'force-dynamic'` explicitly. Always prefer `force-dynamic` as the explicit signal of intent. |
| **Caching**     | Data fetched inside an SSR page MUST NOT be cached by default. Use `cache: 'no-store'` on every `fetch` call unless there is a specific, documented reason to cache. |
| **Forbidden**   | Using SSR for static public content (use SSG or ISR). Calling `fetch` with `cache: 'force-cache'` in an SSR route without justification. |
| **Verification** | `pnpm build` must show `λ (Dynamic)` in the route table for the page. |

---

### CSR — Client-Side Rendering

**Definition:** The server sends an empty shell (or a loading skeleton). Data is fetched from the browser after JavaScript hydration, using client-side `fetch` / React hooks.

| Aspect          | Rule                                                                                 |
| --------------- | ------------------------------------------------------------------------------------ |
| **When to use** | Data is highly user-specific, private, and does **not** need SEO indexing. The UI involves frequent real-time interactions (e.g., WebSocket updates). Data depends exclusively on browser APIs (localStorage, IndexedDB, geolocation). |
| **Examples**    | Real-time notification panels, chat widgets, media players, interactive map components, browser-only analytics dashboards. |
| **How to enforce** | Add `"use client"` to the leaf component. Fetch data inside a dedicated custom hook (`use[Name].ts`) using `useEffect` or a data-fetching library (SWR, TanStack Query). Never inline `fetch` in the component body. |
| **Mandatory**   | Every CSR component MUST render a `loading` state (skeleton or spinner) while data is pending, and an `error` state when the fetch fails. Omitting either is a violation. |
| **Forbidden**   | Using CSR for public, SEO-critical content. Using CSR as the default strategy for an entire page — SSR/SSG/ISR MUST be the top-level strategy; CSR is only a leaf-node enhancement. |
| **Verification** | The component must not block rendering; the parent server component must not await CSR data. |

---

### Strategy Selection Protocol

When adding or modifying any route or data-fetching code, you MUST complete the following checklist and include the answers in the pull request description (or as a comment if pair-programming):

1. **Is the content user-specific?** → Yes: go to (2). No: go to (3).
2. **Must data be real-time?** → Yes: **SSR**. No: **ISR** with user-aware cache key.
3. **Does content change faster than every 60s?** → Yes: **SSR**. No: go to (4).
4. **Does content change at all?** → Yes: **ISR**. No: **SSG**.
5. **Is there a leaf UI that depends on browser-only APIs?** → Yes: wrap that specific leaf in a CSR boundary (`"use client"` + hook). The top-level strategy remains SSG/ISR/SSR.

Violating this protocol (e.g., using SSR for static marketing text, using CSR for a search results page, or omitting `revalidate` on an ISR page that needs it) is treated as a blocking review finding.

## Separation of Concerns

- **Zero state in the view:** It is strictly forbidden to declare `useState`, `useEffect`, `useReducer`, or event handlers directly within the body of a UI component (`.tsx`). React components are purely presentational.
- **Encapsulation:** All business logic, complex state management, API calls, and event handling MUST be extracted and encapsulated into a dedicated Custom Hook (e.g., `use[ComponentName].ts`) or utilities (`utils/`).
- **Clean UI:** The UI component must only consume the data and methods returned by its hook, containing ONLY presentation and rendering code.

## UI & Styling

- **shadcn/ui first:** Before creating a component from scratch, check if a shadcn/ui implementation exists. Use it as foundation.
- **Tailwind + CVA:** Use CVA to manage visual variants (size, color, etc.) instead of manual string concatenation.

## Naming Conventions

| Category                  | Convention                               | Example                                |
| ------------------------- | ---------------------------------------- | -------------------------------------- |
| Folders / routes          | `kebab-case`                             | `components/ui`, `app/dashboard-panel` |
| React components (`.tsx`) | `PascalCase` file + export               | `UserProfile.tsx`                      |
| Hooks (`.ts`)             | `camelCase`                              | `useUserSession.ts`                    |
| Utilities (`.ts`)         | `camelCase`                              | `formatCurrency.ts`                    |
| Types / Interfaces        | `PascalCase` (no `I`/`T` prefixes)       | `UserProps`                            |
| Global constants          | `UPPER_SNAKE_CASE`                       | `MAX_PAGINATION_LIMIT`                 |
| Boolean vars / props      | prefix with `is`, `has`, `should`, `can` | `isLoading`, `hasError`                |

## Code Style

- **React components MUST NOT contain state or API calls.** All business logic, complex state management, and API calls MUST be extracted to custom hooks or utilities.
- **Files MUST be focused on a single responsibility.** If a file handles both rendering and data fetching, split it.
- **Utility functions (helpers, formatters, constants) MUST NOT be duplicated.** Define them once in `utils/` and import where needed. If the same helper appears in 3+ files, extract immediately.
- Use early returns for error/edge cases. Avoid deep nesting.
- Apply established design patterns (Strategy, Observer, Factory, etc.) for logic problems.
- Don't hand-edit generated files (`.next/`, `next-env.d.ts`, `tsconfig.tsbuildinfo`).
- Use `@/` alias for imports (maps to project root `./*`).

## Mobile First

- **Every UI development MUST start from the mobile viewport.** Desktop is an enhancement, not the default.
- Use Tailwind's `sm:`, `md:`, `lg:` breakpoints to progressively enhance layouts — never the reverse.
- Navigation must be usable on 320px-wide screens before adding desktop variants.
- Test all new pages at 375px width before considering them complete.
- Tables on mobile: use stacked cards or horizontal scroll (never force desktop table layout on mobile).
- Modals and dialogs must be full-screen on mobile, centered panel on desktop.
- Touch targets must be at least 44x44px on mobile.

## Validation

- Run `pnpm lint` (ESLint) before committing.
- Run `pnpm build` before committing to catch TypeScript and build errors.

## Context

The project has no data layer — no types, no API utilities. Any component that needs Rick and Morty data would have to `fetch` directly with inline URLs and untyped `json()`. This change creates the foundation before any UI is built.

Constraints from coding conventions:
- All types MUST live in `types/`
- Utility functions MUST be in `utils/`
- No `any` types allowed
- Tests are mandatory and co-located in `__tests__/`

## Goals / Non-Goals

**Goals:**
- Define clean, strict TypeScript interfaces for `Character`, `Episode`, and `PaginatedResponse<T>`
- Provide typed fetch wrapper functions that components can `await` directly in Server Components
- Cache API responses using Next.js `fetch` extensions (ISR-compatible `revalidate`)
- Unit-test all wrappers with mocked `fetch`

**Non-Goals:**
- GraphQL integration (the API supports it, but REST is simpler and sufficient)
- Search/filter parameters on fetch functions (will be added in future changes)
- UI components or pages
- Data-fetching libraries (TanStack Query, SWR) — native `fetch` is sufficient for server-side usage

## Decisions

### Decision 1: Native `fetch` over data-fetching libraries

**Chosen:** `utils/api.ts` with native `fetch` + Next.js caching extensions.

**Alternatives considered:**
- **TanStack Query**: Excellent for CSR with infinite scroll and cache invalidation. Overkill for server-side data fetching where Next.js already provides fetch-level caching via `next.revalidate`.
- **SWR**: Similar trade-off — designed for client-side hook usage. Adds a dependency with no benefit for Server Components.
- **Axios**: Adds a dependency. `fetch` is built into Node.js 18+ and Next.js extends it with caching semantics.

**Rationale:** All data will be fetched in Server Components (SSG/SSR), where Next.js's native `fetch` caching is the idiomatic approach. If CSR needs arise later, a library can be added at that point.

### Decision 2: Thin wrappers, not an API client class

**Chosen:** Individual exported functions: `fetchCharacters(page)`, `fetchCharacter(id)`, `fetchEpisodes(ids)`.

**Alternatives considered:**
- **Class-based API client** (`class RickAndMortyAPI`): Adds ceremony without benefit. No shared state needed.
- **Single generic function** (`fetchFromAPI<T>(endpoint)`): Loses discoverability. Explicit functions document the API surface.

**Rationale:** Simple functions are tree-shakeable, easy to import, and self-documenting. TypeScript inference works naturally with explicit return types.

### Decision 3: Data model — minimal fields

**Chosen:** Only fields needed by the challenge.

The Rick and Morty API returns 20+ fields per character. The challenge only requires `id`, `name`, `status`, `species`, `image`, and `episode` URLs. Including unused fields violates the "keep them minimal" conventions.

### Decision 4: Cache strategy — revalidate daily

**Chosen:** `fetch(url, { next: { revalidate: 86400 } })`.

**Rationale:** Rick and Morty data is essentially static. A 24-hour TTL provides freshness if new episodes drop, but avoids unnecessary API calls. This aligns with ISR strategy for pages that will consume these utilities.

## Risks / Trade-offs

- **API rate limiting**: The Rick and Morty API is public and free. No documented rate limits, but aggressive pagination (fetching all 42 pages at once) could be throttled. → Mitigation: functions fetch one page at a time; the consumer controls parallelism.
- **Network failures**: No retry logic initially. → Mitigation: Components handle rejected promises gracefully (error boundaries, fallback UI). Retry can be added later.
- **Episode data requires additional requests**: `Character.episode` is a list of URLs, not episode objects. `fetchEpisodes` must be called separately. → By design: this avoids fetching episode data for characters that won't be selected.

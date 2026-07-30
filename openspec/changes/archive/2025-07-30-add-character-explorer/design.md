## Context

The project has a static layout (Header, Footer, dark theme) and a server-side API layer (`utils/api.ts`) with ISR-based fetch functions for the Rick and Morty API. Types are defined in `types/` but are minimal — missing fields the explorer UI needs.

The target design (from v0) is a dark-themed, mobile-first dual-column explorer where users pick two characters and instantly see their solo/shared episode breakdown. The implementation must comply with the project's strict conventions: zero state in views (all logic in hooks), types in `types/`, Server Components as the default rendering strategy.

## Goals / Non-Goals

**Goals:**
- Deliver the `/explorer` page as a Server Component wrapping a Client Component explorer
- Server pre-fetches page 1 of character data to eliminate initial loading flash
- Client-side pagination for pages 2+ (no SSR for subsequent pages — acceptable UX tradeoff)
- Episode partition logic computed client-side from character episode URL lists
- No external data-fetching dependencies (no SWR) — plain `fetch` in custom hooks
- All state and logic extracted to custom hooks (`useExplorer`, `useCharacterColumn`, `useEpisodes`, `useEpisodePartition`)
- Full TypeScript strict typing with types in `types/`

**Non-Goals:**
- Character search/filtering (removed from v0 design per decision)
- Light mode toggle (dark-only MVP)
- Real-time updates or WebSocket — data changes slowly enough
- The landing page (`app/page.tsx`) — scoped to a future change

## Decisions

### Decision 1: Hybrid SSR + CSR for initial data

**Chosen**: Page 1 of characters is fetched server-side in `page.tsx` (ISR, revalidated every 24h) and passed as `initialCharacters` prop to the Explorer client component. Pages 2+ are fetched client-side via plain `fetch` in `useCharacterColumn`.

**Rationale**: Eliminates skeleton flash on first paint. The character list is public, identical for all users, and changes slowly — perfect for ISR. Subsequent pagination is user-triggered interaction, where CSR is the correct strategy per the project's rendering decision matrix.

**Alternative considered**: Pure CSR (fetch everything client-side). Rejected because it adds unnecessary latency for the first render when the server can do it at build/request time.

### Decision 2: No SWR dependency

**Chosen**: Use plain `fetch` with `useState` + `useEffect` in custom hooks, plus a lightweight `useCallback`-based refetch pattern.

**Rationale**: SWR would be the right choice for a production app with complex caching needs, but for this scope the data-fetching is straightforward: list endpoints (characters by page) and detail endpoints (episodes by IDs). Plain fetch keeps dependencies minimal and the logic transparent. The `rickandmortyapi.com` responses are small and fast.

**Alternative considered**: SWR. Rejected to keep the dependency surface small and avoid over-engineering for simple paginated lists.

### Decision 3: Episodes fetched by ID batch, not pre-computed server-side

**Chosen**: When both characters are selected, the hook extracts episode IDs from character episode URLs (`episodeIdsFromUrls`), then fetches them in a batch from `GET /episode/[ids]`. The API returns a single object for one ID and an array for multiple — the hook normalizes to always return an array.

**Rationale**: The API supports batch episode fetch natively (comma-separated IDs). Computing the partition client-side via `useMemo` over episode ID sets is cheap (Set operations on small arrays). No need to move this to the server.

### Decision 4: Character type expansion

**Chosen**: Expand `Character` to include `type`, `gender`, `origin`, `location`, `url`, `created` — the full API shape. Add `CharacterStatus` as `'Alive' | 'Dead' | 'unknown'`.

**Rationale**: The current minimal Character type rejects `character.origin` (per the existing spec scenario). The explorer needs `origin.name`, `location.name`, and a typed `status` field. Rather than creating a separate "rich" type, expand the canonical one — the extra fields cost nothing and make the type useful across the app.

### Decision 5: Zero state in the view — hooks architecture

**Chosen**:

| Hook                    | Owns                                      | Returns                              |
|--------------------------|-------------------------------------------|--------------------------------------|
| `useExplorer`            | `first`, `second` selection state         | selection state + setters + partition |
| `useCharacterColumn`     | `page`, loading, error, character list    | characters, pagination controls       |
| `useEpisodes`            | Fetch + normalize episodes by ID array    | `{ episodes, isLoading, error }`     |
| `useEpisodePartition`    | Pure computation over two character sets  | `{ onlyFirstIds, sharedIds, onlySecondIds }` |

**Rationale**: Per convention "It is strictly forbidden to declare useState, useEffect, or event handlers directly within the body of a UI component." Each hook is a single-responsibility unit that the pure presentational component consumes.

### Decision 6: Component tree and client boundaries

```
app/explorer/page.tsx          ← Server Component (SSG/ISR)
├── <h1> (static copy)
└── <Explorer />               ← "use client" boundary
    ├── <SelectionSummary />   ← reads props from useExplorer
    ├── <CharacterColumn />    ← "use client", uses useCharacterColumn
    │   └── <CharacterCard />  ← "use client" (button, onClick)
    ├── <CharacterColumn />    ← "use client"
    │   └── <CharacterCard />  ← "use client"
    └── <EpisodeSection />     ← "use client", uses useEpisodes
        └── <EpisodeCard />    ← Server Component (no state)
```

The only `"use client"` components are those with interactivity: Explorer (state), CharacterColumn (pagination/search state), CharacterCard (onClick), EpisodeSection (data fetching). EpisodeCard and StatusDot are pure presentation — no directive needed.

## Risks / Trade-offs

- **[Risk] API rate limits**: The Rick and Morty API may rate-limit. → **Mitigation**: Characters are fetched once per page navigation (human-paced). Episodes batch fetch. ISR caches page 1 server-side. No rapid polling.
- **[Risk] 404 from episode endpoint when IDs array is empty**: The hook handles this by returning `null` key for SWR-like pattern — `useEpisodes([])` skips fetch and returns empty array.
- **[Risk] Character type expansion may break existing test snapshots or type assertions**: → **Mitigation**: Existing tests for `utils/api.ts` use mocked fetch — they won't break. Type-only expansion is backward-compatible (adding fields, not removing).
- **[Trade-off] Plain fetch vs SWR**: No stale-while-revalidate caching or deduplication. Acceptable for low-frequency human interaction. If pagination feels slow later, SWR can be added incrementally.

## 1. Expand types

- [x] 1.1 Add `CharacterStatus` union type and expand `Character` interface with `type`, `gender`, `origin`, `location`, `url`, `created` in `types/character.ts`
- [x] 1.2 Add component props interfaces to `types/character.ts`: `CharacterCardProps`, `CharacterColumnProps`, `StatusDotProps`
- [x] 1.3 Expand `Episode` interface with `url`, `created` in `types/episode.ts`
- [x] 1.4 Add component props interfaces to `types/episode.ts`: `EpisodeCardProps`, `EpisodeSectionProps`
- [x] 1.5 Add `ExplorerProps`, `SelectionSummaryProps`, `SummaryChipProps` to a new `types/explorer.ts`
- [x] 1.6 Add `ApiInfo` interface (extracted from `PaginatedResponse`) to `types/api.ts`

## 2. Extend API utilities

- [x] 2.1 Add `fetcher<T>` generic client-side fetch function to `utils/api.ts`
- [x] 2.2 Add `charactersUrl(page, name?)` URL builder to `utils/api.ts`
- [x] 2.3 Add `episodeIdsFromUrls(urls)` extractor to `utils/api.ts`
- [x] 2.4 Add `episodesUrl(ids)` URL builder to `utils/api.ts`
- [x] 2.5 Update existing `utils/__tests__/api.test.ts` to cover new utilities

## 3. Add shadcn/ui components

- [x] 3.1 Create `components/ui/badge.tsx` (shadcn Badge, base-nova style matching `components.json`)
- [x] 3.2 Create `components/ui/skeleton.tsx`
- [x] 3.3 Add snapshot test for Badge (`components/ui/__tests__/badge.test.tsx`)
- [x] 3.4 Add snapshot test for Skeleton (`components/ui/__tests__/skeleton.test.tsx`)

## 4. Build presentational components

- [x] 4.1 Create `components/status-dot.tsx` — status indicator with glow, consumes `StatusDotProps`
- [x] 4.2 Create `components/episode-card.tsx` — pure display, consumes `EpisodeCardProps`
- [x] 4.3 Add snapshot test for StatusDot (`components/__tests__/status-dot.test.tsx`)
- [x] 4.4 Add snapshot test for EpisodeCard (`components/__tests__/episode-card.test.tsx`)

## 5. Build custom hooks

- [x] 5.1 Create `hooks/useEpisodes.ts` — fetches episodes by ID array, normalizes single/array response
- [x] 5.2 Create `hooks/useEpisodePartition.ts` — computes onlyFirstIds, sharedIds, onlySecondIds via Set logic
- [x] 5.3 Create `hooks/useCharacterColumn.ts` — pagination state, character fetching, selection callback
- [x] 5.4 Create `hooks/useExplorer.ts` — orchestrates first/second selection, delegates to useEpisodePartition
- [x] 5.5 Add behavioral test for `useEpisodes` (`hooks/__tests__/useEpisodes.test.ts`)
- [x] 5.6 Add behavioral test for `useEpisodePartition` (`hooks/__tests__/useEpisodePartition.test.ts`)

## 6. Build interactive components

- [x] 6.1 Create `components/character-card.tsx` — interactive card with selected/disabled states
- [x] 6.2 Create `components/character-column.tsx` — paginated column, uses useCharacterColumn hook
- [x] 6.3 Create `components/episode-section.tsx` — episode listing section, uses useEpisodes hook
- [x] 6.4 Create `components/explorer.tsx` — main orchestrator, uses useExplorer hook
- [x] 6.5 Add snapshot test for CharacterCard (`components/__tests__/character-card.test.tsx`)
- [x] 6.6 Add snapshot test for EpisodeSection (`components/__tests__/episode-section.test.tsx`)

## 7. Create explorer page

- [x] 7.1 Create `app/explorer/page.tsx` — Server Component with metadata, server-fetched page 1, renders Explorer
- [x] 7.2 Add snapshot test for explorer page (`app/explorer/__tests__/page.test.tsx`)

## 8. Validation

- [x] 8.1 Run `pnpm lint` and fix all errors
- [x] 8.2 Run `pnpm test` and ensure all tests pass
- [x] 8.3 Run `pnpm build` and fix TypeScript/build errors

## 9. Refactor — Apply coding conventions

- [x] 9.1 Extract `SummaryChip` and `EmptyGate` from `explorer.tsx` into `components/ui/explorer/components/`
- [x] 9.2 Move `Explorer` to `components/ui/explorer/Explorer.tsx`
- [x] 9.3 Extract `Paginator` and `CharacterSkeleton` from `character-column.tsx` into `components/ui/character-column/components/`
- [x] 9.4 Move `CharacterColumn` to `components/ui/character-column/CharacterColumn.tsx`
- [x] 9.5 Extract `STATUS_STYLES` constant from `status-dot.tsx` to `utils/status-styles.ts`
- [x] 9.6 Create `utils/accent-variants.ts` with CVA-based accent variants (text, bar, border, dot, count, ring, badge)
- [x] 9.7 Replace ternary accent operators in `character-card.tsx` with CVA imports
- [x] 9.8 Replace ternary accent operators in `character-column.tsx` with CVA imports
- [x] 9.9 Replace ternary accent operators in `episode-section.tsx` with CVA imports
- [x] 9.10 Replace ternary accent operators in `SummaryChip.tsx` with CVA imports
- [x] 9.11 Replace `<img>` with `<Image />` from `next/image` in `character-card.tsx` and `SummaryChip.tsx`
- [x] 9.12 Add `images.remotePatterns` for `rickandmortyapi.com` to `next.config.ts`
- [x] 9.13 Add `EmptyGateProps` to `types/explorer.ts`
- [x] 9.14 Add `next/image` rule to `CODING_CONVENTIONS.md`
- [x] 9.15 Delete old `components/explorer.tsx` and `components/character-column.tsx`
- [x] 9.16 Update imports in `app/explorer/page.tsx`
- [x] 9.17 Update test mocks and snapshots
- [x] 9.18 Run `pnpm lint`, `pnpm test`, `pnpm build` — all pass

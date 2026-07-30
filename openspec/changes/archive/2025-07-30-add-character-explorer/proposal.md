## Why

The app currently has a boilerplate homepage and no functional UI. The core value proposition — comparing two Rick and Morty characters and discovering their solo and shared episodes — needs a dedicated interactive page. This is the primary feature the challenge requires.

## What Changes

- **New `/explorer` route** with metadata, static page layout, and a server-fetched initial page of characters to eliminate loading flash
- **Dual-column character selection** with pagination (no search), each column independently browseable. A character selected in one column is disabled in the other to prevent duplicates
- **Episode partition display**: When both characters are selected, three sections unlock showing episodes only for Character #1, shared episodes, and episodes only for Character #2 — powered by set-difference logic on episode IDs
- **Interactive UI components**: CharacterCard (image + status + episode count, selectable with visual feedback), EpisodeCard (season code + title + air date), StatusDot (alive/dead/unknown with glow)
- **Custom hooks for all business logic**: `useExplorer`, `useCharacterColumn`, `useEpisodes`, `useEpisodePartition` — extracting state and data fetching from components per the zero-state-in-the-view convention
- **Expand Character type** in `types/character.ts` to include `type`, `gender`, `origin`, `location`, `url`, `created`, and add `CharacterStatus` as a discriminated union (`'Alive' | 'Dead' | 'unknown'`)
- **Expand Episode type** in `types/episode.ts` to include `url` and `created`
- **Add API URL builders and client-side fetch utilities** in `utils/api.ts`: `charactersUrl`, `episodesUrl`, `episodeIdsFromUrls`, and a generic `fetcher` for client-side use
- **New shadcn/ui components**: `Badge`, `Input`, `Skeleton`

## Capabilities

### New Capabilities
- `character-explorer`: The `/explorer` page route, dual-column character browser with pagination, selection state management, and episode result display
- `episode-partition`: Splitting two characters' episode lists into three categories (Character #1 only, shared, Character #2 only) and rendering them in dedicated sections

### Modified Capabilities
- `rick-and-morty-api`: Expand Character type with full API fields (`type`, `gender`, `origin`, `location`, `url`, `created`) and add `CharacterStatus` union type. Expand Episode type (`url`, `created`). Add client-side fetch utilities (`fetcher`, `charactersUrl`, `episodesUrl`, `episodeIdsFromUrls`). Existing server-side ISR functions (`fetchCharacters`, `fetchCharacter`, `fetchEpisodes`) are preserved intact.

## Impact

- **New files**: `app/explorer/page.tsx`, `components/explorer.tsx`, `components/character-column.tsx`, `components/character-card.tsx`, `components/episode-section.tsx`, `components/episode-card.tsx`, `components/status-dot.tsx`, `components/ui/badge.tsx`, `components/ui/input.tsx`, `components/ui/skeleton.tsx`, `hooks/useExplorer.ts`, `hooks/useCharacterColumn.ts`, `hooks/useEpisodes.ts`, `hooks/useEpisodePartition.ts`
- **Modified files**: `types/character.ts`, `types/episode.ts`, `utils/api.ts`
- **Dependencies**: None added (no SWR — uses plain fetch in hooks). `lucide-react` already present, `@base-ui/react` already present
- **Test files**: `__tests__/` directories co-located with all new components and hooks

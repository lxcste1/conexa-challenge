## Why

The application needs to consume the Rick and Morty public API. Without a typed, centralized API layer, fetch calls would be scattered across components, leading to duplicated request logic, untyped responses, and harder testing. This is the foundational building block — no UI can display characters or episodes without it.

## What Changes

- Add TypeScript interfaces for `Character` and `Episode` domain entities, plus `PaginatedResponse<T>` for paginated API payloads
- Add typed fetch wrappers in `utils/api.ts`: `fetchCharacters`, `fetchCharacter`, `fetchEpisodes`
- Add unit tests for all fetch wrappers with mocked `fetch`

## Capabilities

### New Capabilities
- `rick-and-morty-api`: Typed data layer for the Rick and Morty REST API. Covers character and episode entities, paginated responses, and fetch wrappers with proper error handling and caching configuration.

### Modified Capabilities
<!-- None for this change — no existing specs are affected -->

## Impact

- New files: `types/character.ts`, `types/episode.ts`, `types/api.ts`, `utils/api.ts`, `utils/__tests__/api.test.ts`
- No existing files modified
- No new dependencies required (native `fetch` only)

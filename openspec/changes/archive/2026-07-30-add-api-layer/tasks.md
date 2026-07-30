## 1. Types

- [x] 1.1 Create `types/character.ts` with `Character` interface (id, name, status, species, image, episode)
- [x] 1.2 Create `types/episode.ts` with `Episode` interface (id, name, episode, air_date, characters)
- [x] 1.3 Create `types/api.ts` with `PaginatedResponse<T>` interface (info.count, info.pages, info.next, info.prev, results)

## 2. API Utilities

- [x] 2.1 Create `utils/api.ts` with `fetchCharacters(page: number): Promise<PaginatedResponse<Character>>`
- [x] 2.2 Add `fetchCharacter(id: number): Promise<Character>` to `utils/api.ts`
- [x] 2.3 Add `fetchEpisodes(ids: number[]): Promise<Episode[]>` to `utils/api.ts`
- [x] 2.4 Set `next: { revalidate: 86400 }` on all fetch calls

## 3. Tests

- [x] 3.1 Create `utils/__tests__/api.test.ts` with mocked `fetch`
- [x] 3.2 Test `fetchCharacters` returns correct response shape
- [x] 3.3 Test `fetchCharacter` returns single character
- [x] 3.4 Test `fetchEpisodes` returns array of correct length
- [x] 3.5 Test error handling for non-OK responses on all functions

## 4. Validation

- [x] 4.1 Run `pnpm lint` and fix any issues
- [x] 4.2 Run `pnpm test` and ensure all tests pass
- [x] 4.3 Run `pnpm build` to catch TypeScript errors

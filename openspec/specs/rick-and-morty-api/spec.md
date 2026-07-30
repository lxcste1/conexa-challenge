## ADDED Requirements

### Requirement: Character type is defined

The project SHALL define a `Character` interface in `types/character.ts` containing all fields from the Rick and Morty API: `id`, `name`, `status`, `species`, `type`, `gender`, `image`, `origin`, `location`, `episode`, `url`, and `created`. Additionally, the project SHALL define `CharacterStatus` as a union type `'Alive' | 'Dead' | 'unknown'` in the same file.

#### Scenario: Character type includes all API fields

- **WHEN** a developer imports `Character` from `@/types/character`
- **THEN** the type includes `id: number`, `name: string`, `status: CharacterStatus`, `species: string`, `type: string`, `gender: string`, `image: string`, `origin: { name: string; url: string }`, `location: { name: string; url: string }`, `episode: string[]`, `url: string`, and `created: string`
- **AND** the type is exported as a named export

#### Scenario: CharacterStatus restricts status values

- **WHEN** a developer assigns a string literal other than `'Alive'`, `'Dead'`, or `'unknown'` to a `CharacterStatus` variable
- **THEN** TypeScript reports a type error

### Requirement: Episode type is defined

The project SHALL define an `Episode` interface in `types/episode.ts` containing all fields from the Rick and Morty API: `id`, `name`, `air_date`, `episode`, `characters`, `url`, and `created`.

#### Scenario: Episode type includes all API fields

- **WHEN** a developer imports `Episode` from `@/types/episode`
- **THEN** the type includes `id: number`, `name: string`, `air_date: string`, `episode: string`, `characters: string[]`, `url: string`, and `created: string`
- **AND** the type is exported as a named export

### Requirement: PaginatedResponse type is defined

The project SHALL define a generic `PaginatedResponse<T>` interface in `types/api.ts` representing the Rick and Morty API pagination envelope with `info` (containing `count`, `pages`, `next`, `prev`) and `results: T[]`.

#### Scenario: PaginatedResponse wraps Character results

- **WHEN** `PaginatedResponse<Character>` is used as a return type
- **THEN** the `results` field is typed as `Character[]`
- **AND** the `info` field includes `count: number`, `pages: number`, `next: string | null`, `prev: string | null`

### Requirement: fetchCharacters returns paginated characters

The project SHALL provide a `fetchCharacters` function in `utils/api.ts` that accepts a page number, calls the Rick and Morty API, and returns `PaginatedResponse<Character>`.

#### Scenario: Fetch first page of characters

- **WHEN** `fetchCharacters(1)` is called
- **THEN** the function fetches `https://rickandmortyapi.com/api/character?page=1`
- **AND** returns a `PaginatedResponse<Character>` with 20 results and pagination info

#### Scenario: Fetch applies cache revalidation

- **WHEN** `fetchCharacters(1)` is called
- **THEN** the underlying `fetch` call includes `{ next: { revalidate: 86400 } }` for 24-hour cache

#### Scenario: Fetch handles non-OK HTTP responses

- **WHEN** `fetchCharacters(9999)` is called and the API returns a 404 status
- **THEN** the function throws an error

### Requirement: fetchCharacter returns a single character

The project SHALL provide a `fetchCharacter` function in `utils/api.ts` that accepts a character ID and returns a single `Character`.

#### Scenario: Fetch character by ID

- **WHEN** `fetchCharacter(1)` is called
- **THEN** the function fetches `https://rickandmortyapi.com/api/character/1`
- **AND** returns a `Character` object with id 1

#### Scenario: Fetch character with cache revalidation

- **WHEN** `fetchCharacter(1)` is called
- **THEN** the underlying `fetch` call includes `{ next: { revalidate: 86400 } }`

### Requirement: fetchEpisodes returns multiple episodes

The project SHALL provide a `fetchEpisodes` function in `utils/api.ts` that accepts an array of episode IDs and returns `Episode[]`.

#### Scenario: Fetch multiple episodes by IDs

- **WHEN** `fetchEpisodes([1, 2, 3])` is called
- **THEN** the function fetches `https://rickandmortyapi.com/api/episode/1,2,3`
- **AND** returns an `Episode[]` array with 3 episodes

#### Scenario: Fetch single episode as array

- **WHEN** `fetchEpisodes([1])` is called
- **THEN** the function returns an `Episode[]` with one episode (not an `Episode` object)

#### Scenario: Fetch with cache revalidation

- **WHEN** `fetchEpisodes([1, 2])` is called
- **THEN** the underlying `fetch` call includes `{ next: { revalidate: 86400 } }`

### Requirement: All API functions are unit tested

The project SHALL include a test file `utils/__tests__/api.test.ts` that mocks `fetch` and tests `fetchCharacters`, `fetchCharacter`, and `fetchEpisodes`.

#### Scenario: fetchCharacters test verifies response shape

- **WHEN** `fetchCharacters` is tested with a mocked `fetch` returning valid API data
- **THEN** the test asserts the returned object has `info` and `results` properties
- **AND** the test asserts the URL called matches the expected pattern

#### Scenario: fetchCharacter test verifies single character response

- **WHEN** `fetchCharacter` is tested with a mocked `fetch` returning a valid character
- **THEN** the test asserts the returned character has the expected `id`

#### Scenario: fetchEpisodes test verifies array response

- **WHEN** `fetchEpisodes` is tested with a mocked `fetch` returning valid episodes
- **THEN** the test asserts the returned value is an array with the correct length

#### Scenario: Error response test

- **WHEN** any API function is tested with a mocked `fetch` returning `ok: false`
- **THEN** the test asserts the function throws an error

### Requirement: Types directory structure is created

The project SHALL create the `types/` directory at project root containing `character.ts`, `episode.ts`, and `api.ts`.

#### Scenario: Types directory exists with expected files

- **WHEN** the change is implemented
- **THEN** `types/character.ts`, `types/episode.ts`, and `types/api.ts` exist at the project root
- **AND** each file exports at least one named type

### Requirement: Client-side API URL builders are provided

The project SHALL provide utility functions `charactersUrl`, `episodesUrl`, and `episodeIdsFromUrls` in `utils/api.ts` for building Rick and Morty API URLs client-side.

#### Scenario: Paginated characters URL

- **WHEN** `charactersUrl(1)` is called
- **THEN** it returns `"https://rickandmortyapi.com/api/character/?page=1"`

#### Scenario: Characters URL with name filter

- **WHEN** `charactersUrl(1, "rick")` is called
- **THEN** it returns a URL containing `?page=1&name=rick`

#### Scenario: Episodes URL by IDs

- **WHEN** `episodesUrl([1, 2, 3])` is called
- **THEN** it returns `"https://rickandmortyapi.com/api/episode/1,2,3"`

#### Scenario: Empty IDs returns null

- **WHEN** `episodesUrl([])` is called
- **THEN** it returns `null`

### Requirement: Generic client-side fetcher is provided

The project SHALL provide a generic `fetcher<T>` function in `utils/api.ts` that accepts a URL, performs a fetch, and returns the parsed JSON. It SHALL throw an error with a `status` property on non-OK responses.

#### Scenario: Successful fetch

- **WHEN** `fetcher<Character>("https://rickandmortyapi.com/api/character/1")` is called
- **THEN** it returns the parsed Character JSON

#### Scenario: Failed fetch

- **WHEN** `fetcher` receives a URL that returns 404
- **THEN** it throws an Error with `status: 404`

### Requirement: Episode IDs extracted from character episode URLs

The project SHALL provide `episodeIdsFromUrls` that accepts an array of episode API URLs and returns an array of numeric IDs, filtering out non-finite values.

#### Scenario: Extract IDs from standard URLs

- **WHEN** `episodeIdsFromUrls(["https://rickandmortyapi.com/api/episode/10", "https://rickandmortyapi.com/api/episode/25"])` is called
- **THEN** it returns `[10, 25]`

#### Scenario: Invalid URLs produce empty result

- **WHEN** `episodeIdsFromUrls(["not-a-url", ""])` is called
- **THEN** it returns `[]`

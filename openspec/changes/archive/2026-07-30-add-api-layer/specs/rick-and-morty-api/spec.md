## ADDED Requirements

### Requirement: Character type is defined

The project SHALL define a `Character` interface in `types/character.ts` containing the minimal fields needed by the application: `id`, `name`, `status`, `species`, `image`, and `episode`.

#### Scenario: Character type includes required fields

- **WHEN** a developer imports `Character` from `@/types/character`
- **THEN** the type includes `id: number`, `name: string`, `status: string`, `species: string`, `image: string`, and `episode: string[]`
- **AND** the type is exported as a named export

#### Scenario: Character type rejects unknown fields

- **WHEN** a developer tries to access a field not defined in the `Character` interface (e.g., `character.origin`)
- **THEN** TypeScript reports a type error

### Requirement: Episode type is defined

The project SHALL define an `Episode` interface in `types/episode.ts` containing the minimal fields needed: `id`, `name`, `episode`, `air_date`, and `characters`.

#### Scenario: Episode type includes required fields

- **WHEN** a developer imports `Episode` from `@/types/episode`
- **THEN** the type includes `id: number`, `name: string`, `episode: string`, `air_date: string`, and `characters: string[]`
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

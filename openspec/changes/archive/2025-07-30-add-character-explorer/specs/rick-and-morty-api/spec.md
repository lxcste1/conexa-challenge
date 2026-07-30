## ADDED Requirements

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

## MODIFIED Requirements

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

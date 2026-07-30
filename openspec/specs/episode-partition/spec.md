## ADDED Requirements

### Requirement: Episode IDs are extracted from character URLs

The project SHALL provide an `episodeIdsFromUrls` utility that accepts an array of episode API URLs and returns an array of numeric episode IDs.

#### Scenario: Extract IDs from standard URLs

- **WHEN** `episodeIdsFromUrls(["https://rickandmortyapi.com/api/episode/1", "https://rickandmortyapi.com/api/episode/2"])` is called
- **THEN** the function returns `[1, 2]`

#### Scenario: Invalid URLs are filtered out

- **WHEN** `episodeIdsFromUrls(["https://rickandmortyapi.com/api/episode/1", "invalid"])` is called
- **THEN** the function returns `[1]`

### Requirement: Episode partition splits character episode lists

The project SHALL provide a `useEpisodePartition` hook that, given two Character objects, computes three sorted arrays: episode IDs only the first character appears in, episode IDs both share, and episode IDs only the second character appears in.

#### Scenario: Both characters have overlapping episodes

- **WHEN** Character #1 has episodes [1, 2, 3] and Character #2 has episodes [2, 3, 4]
- **THEN** `onlyFirstIds` is `[1]`, `sharedIds` is `[2, 3]`, `onlySecondIds` is `[4]`

#### Scenario: Characters have no shared episodes

- **WHEN** Character #1 has episodes [1, 2] and Character #2 has episodes [3, 4]
- **THEN** `onlyFirstIds` is `[1, 2]`, `sharedIds` is `[]`, `onlySecondIds` is `[3, 4]`

#### Scenario: Only one character is selected

- **WHEN** `first` is a Character and `second` is `null`
- **THEN** `onlyFirstIds` contains all of first's episode IDs, `sharedIds` is `[]`, `onlySecondIds` is `[]`

#### Scenario: Both characters are null

- **WHEN** both `first` and `second` are `null`
- **THEN** all three arrays are empty

#### Scenario: Result arrays are sorted ascending

- **WHEN** any partition result contains multiple IDs
- **THEN** the IDs are in ascending numeric order

### Requirement: Episodes are fetched by IDs client-side

The project SHALL provide a `useEpisodes` hook that accepts an array of episode IDs, fetches them from the API batch endpoint, and normalizes the response to always return an array.

#### Scenario: Fetch multiple episodes

- **WHEN** `useEpisodes([1, 2, 3])` is called
- **THEN** the hook fetches `GET /episode/1,2,3`
- **AND** returns an array of 3 Episode objects

#### Scenario: Fetch single episode (normalization)

- **WHEN** `useEpisodes([1])` is called
- **THEN** the hook fetches `GET /episode/1`
- **AND** returns an array with one Episode object (not a bare Episode)

#### Scenario: Empty ID array skips fetch

- **WHEN** `useEpisodes([])` is called
- **THEN** no fetch is performed
- **AND** `episodes` is `[]` and `isLoading` is `false`

### Requirement: EpisodeSection renders three accent variants

The EpisodeSection component SHALL support three visual accent variants: `"primary"` (green bar, for Character #1 only), `"accent"` (cyan bar, for Character #2 only), and `"shared"` (gradient bar from primary to accent, for shared episodes).

#### Scenario: Primary accent variant

- **WHEN** EpisodeSection receives `accent="primary"`
- **THEN** the left accent bar uses `bg-primary` and the episode count badge uses `text-primary`

#### Scenario: Shared accent variant

- **WHEN** EpisodeSection receives `accent="shared"`
- **THEN** the left accent bar uses `bg-gradient-to-b from-primary to-accent`
- **AND** the episode count badge uses `text-foreground`

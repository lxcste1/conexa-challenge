## ADDED Requirements

### Requirement: Explorer page renders at /explorer

The project SHALL provide a `/explorer` route implemented as a Server Component page that renders the explorer layout: a SiteHeader, page title, description copy, the interactive Explorer component, and SiteFooter.

#### Scenario: Page renders with correct metadata

- **WHEN** a user navigates to `/explorer`
- **THEN** the page title is "Explorer | Rick & Morty Character Episodes"
- **AND** the meta description mentions comparing characters across episodes

#### Scenario: Page renders static layout before explorer

- **WHEN** the page loads
- **THEN** a heading "Compare characters across the multiverse" is visible
- **AND** a subtitle explains the dual-selection mechanic

### Requirement: Explorer is a Client Component

The Explorer component SHALL be marked with `"use client"` and SHALL be the single client-side boundary for character selection, pagination, and episode display.

#### Scenario: Explorer wraps interactive children

- **WHEN** the Explorer component renders
- **THEN** it contains two CharacterColumn components and, when both characters are selected, three EpisodeSection components

### Requirement: Character type is expanded

The `Character` interface in `types/character.ts` SHALL be expanded to include `type: string`, `gender: string`, `origin: { name: string; url: string }`, `location: { name: string; url: string }`, `url: string`, and `created: string`.

#### Scenario: Full character fields accessible

- **WHEN** a developer accesses `character.origin.name` or `character.location.name`
- **THEN** TypeScript does not report a type error
- **AND** the fields match the Rick and Morty API response shape

### Requirement: CharacterStatus is a union type

The project SHALL define `CharacterStatus` as a type alias in `types/character.ts` with values `'Alive' | 'Dead' | 'unknown'`.

#### Scenario: Status field is type-safe

- **WHEN** a developer compares `character.status === 'Alive'`
- **THEN** TypeScript narrows the type correctly
- **AND** assigning an arbitrary string to a `CharacterStatus` variable produces a type error

### Requirement: Dual-column character selection

The Explorer SHALL render two independent CharacterColumn components labeled "Character #1" and "Character #2". Each column SHALL allow paginated browsing of characters. A character selected in one column SHALL be visually disabled in the other to prevent duplicate selection.

#### Scenario: Selecting a character

- **WHEN** a user clicks a CharacterCard in Column #1
- **THEN** the card shows a selected visual state (colored ring, checkmark)
- **AND** the same character in Column #2 becomes disabled (dimmed, not clickable)

#### Scenario: Deselecting a character

- **WHEN** a user clicks an already-selected CharacterCard
- **THEN** the selection is cleared
- **AND** the character becomes available in the other column again

### Requirement: CharacterCard displays character info

Each CharacterCard SHALL display the character's image, name, status indicator (via StatusDot), species, and episode count.

#### Scenario: Card renders character data

- **WHEN** a CharacterCard receives a Character prop
- **THEN** it renders an `<img>` with the character's image URL
- **AND** it renders the character's name, status dot, and episode count as "X episodes"

#### Scenario: Card shows selected state

- **WHEN** a CharacterCard has `selected={true}`
- **THEN** it renders a colored ring border and a filled checkmark icon

#### Scenario: Card shows disabled state

- **WHEN** a CharacterCard has `disabled={true}`
- **THEN** it is not clickable and appears at reduced opacity

### Requirement: CharacterColumn paginates characters

Each CharacterColumn SHALL fetch and display characters page by page from the Rick and Morty API, with Previous and Next navigation.

#### Scenario: Initial page renders from server data

- **WHEN** a CharacterColumn receives initial page 1 data as a prop
- **THEN** 20 CharacterCards are rendered immediately without a loading state

#### Scenario: Navigating to next page

- **WHEN** the user clicks "Next"
- **THEN** the column fetches the next page client-side
- **AND** shows skeleton placeholders during loading
- **AND** the "Prev" button is enabled if a previous page exists

#### Scenario: No results for out-of-range page

- **WHEN** the user navigates to a page beyond the last page
- **THEN** an empty state message is displayed
- **AND** the Next button is disabled

### Requirement: StatusDot indicates character status

The StatusDot component SHALL render a colored dot with glow effect for each character status: green (`bg-status-alive`) for Alive, red (`bg-status-dead`) for Dead, gray (`bg-status-unknown`) for Unknown. It SHALL also display the species if provided.

#### Scenario: Alive character status dot

- **WHEN** StatusDot receives `status="Alive"` and `species="Human"`
- **THEN** it renders a green dot with glow and text "Alive · Human"

#### Scenario: Dead character status dot

- **WHEN** StatusDot receives `status="Dead"`
- **THEN** it renders a red dot with glow and text "Dead"

#### Scenario: Unknown character status dot

- **WHEN** StatusDot receives `status="unknown"`
- **THEN** it renders a gray dot without glow and text "Unknown"

### Requirement: Selection summary displays current picks

A selection summary section SHALL display the currently selected characters (if any) as chips with avatar, name, and status. Empty slots SHALL show a placeholder with guidance text.

#### Scenario: No characters selected

- **WHEN** neither character is selected
- **THEN** two placeholder chips display "Pick Character #1" and "Pick Character #2"
- **AND** the episode display section shows a locked/empty state

#### Scenario: One character selected

- **WHEN** only Character #1 is selected
- **THEN** the first chip shows the character's avatar, name, and status
- **AND** the second chip still shows the placeholder text
- **AND** the episode section remains locked

### Requirement: EpisodeSection displays episode cards

An EpisodeSection SHALL fetch episodes by their IDs via a custom hook and render them as EpisodeCards. It SHALL show a header with a colored accent bar, title, subtitle, and episode count badge.

#### Scenario: Episodes are loading

- **WHEN** episodes are being fetched
- **THEN** skeleton placeholder cards are displayed

#### Scenario: No episodes in category

- **WHEN** the episode ID array is empty
- **THEN** a message "No episodes in this category" is displayed with an icon

#### Scenario: Episodes are displayed

- **WHEN** episodes finish loading
- **THEN** each episode renders as an EpisodeCard with season code, title, and air date

### Requirement: EpisodeCard displays episode info

The EpisodeCard component SHALL display the episode's season/episode code (e.g., "S01E02") in a Badge, the episode name as a heading, and the air date with a calendar icon.

#### Scenario: EpisodeCard renders episode data

- **WHEN** EpisodeCard receives an Episode with `episode: "S01E02"`, `name: "Lawnmower Dog"`, `air_date: "December 9, 2013"`
- **THEN** it renders the badge "S01E02", the name, and the air date

### Requirement: All explorer logic is extracted to hooks

The Explorer and CharacterColumn components SHALL NOT contain state declarations, event handlers, or API calls. All such logic SHALL reside in dedicated custom hooks.

#### Scenario: useExplorer hook manages selection state

- **WHEN** `useExplorer()` is called
- **THEN** it returns `{ first, second, setFirst, setSecond, onlyFirstIds, sharedIds, onlySecondIds, bothSelected }`

#### Scenario: useCharacterColumn hook manages pagination

- **WHEN** `useCharacterColumn({ accent, initialData, selectedId, disabledId })` is called
- **THEN** it returns `{ characters, info, isLoading, error, page, setPage, onSelect }`

### Requirement: All types are defined in types/

Every interface and type introduced by this change SHALL be defined in files under `types/`. No inline type definitions are permitted in `.tsx` component files.

#### Scenario: Component props types are in types/

- **WHEN** a component like CharacterCard declares its Props
- **THEN** the Props interface is defined in `types/character.ts` (or the appropriate types file)
- **AND** it is imported by the component file

### Requirement: Components are tested

Every new component and hook SHALL have a co-located test file in a `__tests__/` directory. Layout components SHALL use snapshot tests. Hooks SHALL use behavioral assertions.

#### Scenario: CharacterCard has a snapshot test

- **WHEN** a CharacterCard is rendered with test props
- **THEN** the output matches a committed snapshot

#### Scenario: useEpisodePartition has behavioral tests

- **WHEN** `useEpisodePartition` receives two characters with overlapping episodes
- **THEN** the returned `sharedIds` array contains the overlapping episode IDs
- **AND** `onlyFirstIds` and `onlySecondIds` contain the non-overlapping IDs

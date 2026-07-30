## MODIFIED Requirements

### Requirement: RootLayout snapshot test passes

The project SHALL have a snapshot test at `app/__tests__/layout.test.tsx` that renders `RootLayout` with sample children and verifies the output matches a stored snapshot.

#### Scenario: Layout renders with children and matches snapshot

- **WHEN** `RootLayout` is rendered with `<p>Test</p>` as children
- **THEN** the rendered output contains an `<html lang="en">` element
- **AND** the output contains the font CSS variables `--font-inter` and `--font-bungee` in the `<html>` className
- **AND** the output contains a `<body>` with the children and Header/Footer rendered inside
- **AND** the serialized output matches the stored snapshot

#### Scenario: Snapshot is updated when layout changes

- **WHEN** `pnpm test -- --updateSnapshot` is executed after modifying the layout component
- **THEN** the snapshot file is updated to reflect the new output
- **AND** subsequent test runs pass against the updated snapshot

### Requirement: next/font/google is mocked in tests

The project SHALL mock `next/font/google` at the module level so that font-related CSS variables render predictably without downloading font files. The mock SHALL use a generic factory function that returns a font constructor accepting any font name and returning an object with the `variable` CSS custom property.

#### Scenario: Font mock returns a stable variable value for any font

- **WHEN** `RootLayout` calls any font constructor (e.g., `Inter({ variable: "--font-inter", ... })` or `Bungee({ variable: "--font-bungee", ... })`) at module scope
- **THEN** the mock returns an object with the `variable` value matching the argument passed to the constructor

### Requirement: Transitive dependencies are mocked in layout tests

The layout test SHALL mock `next/link` and `lucide-react` at the module level so that components rendered inside the layout (Header, Footer) do not fail due to unresolved module imports.

#### Scenario: next/link mock prevents module resolution errors

- **WHEN** the layout test renders `RootLayout` which contains components using `next/link`
- **THEN** `next/link` SHALL be mocked to render an `<a>` element with the provided `href`
- **AND** no module resolution error SHALL be thrown

#### Scenario: lucide-react mock prevents module resolution errors

- **WHEN** the layout test renders `RootLayout` which contains components using `lucide-react` icons
- **THEN** `lucide-react` SHALL be mocked to return a null-rendering component
- **AND** no module resolution error SHALL be thrown

## ADDED Requirements

### Requirement: Header and Footer components have co-located tests

New presentational components added to `components/ui/` SHALL have corresponding test files in a sibling `__tests__/` directory following the project's testing conventions.

#### Scenario: Header test exists

- **WHEN** a developer checks `components/ui/header/`
- **THEN** a `__tests__/Header.test.tsx` file SHALL exist

#### Scenario: Footer test exists

- **WHEN** a developer checks `components/ui/footer/`
- **THEN** a `__tests__/Footer.test.tsx` file SHALL exist

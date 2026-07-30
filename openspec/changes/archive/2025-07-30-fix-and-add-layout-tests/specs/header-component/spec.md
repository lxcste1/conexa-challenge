## ADDED Requirements

### Requirement: Header component renders with logo and app name

The `Header` component SHALL render a sticky top bar containing the app logo (Atom icon) and the text "PortalDex" with styled brand colors.

#### Scenario: Header renders logo icon

- **WHEN** the `Header` component is rendered
- **THEN** the output SHALL contain an element with the `lucide-react` Atom icon

#### Scenario: Header renders brand name "PortalDex"

- **WHEN** the `Header` component is rendered
- **THEN** the output SHALL contain the text "PortalDex"

### Requirement: Header component renders navigation links

The `Header` component SHALL render two navigation links: "Home" pointing to `/` and "Explorer" pointing to `/explorer`.

#### Scenario: Home link navigates to root

- **WHEN** the `Header` component is rendered
- **THEN** a link with text "Home" SHALL have `href="/"`

#### Scenario: Explorer link navigates to /explorer

- **WHEN** the `Header` component is rendered
- **THEN** a link with text "Explorer" SHALL have `href="/explorer"`

### Requirement: Header snapshot test is co-located

The project SHALL have a snapshot test at `components/ui/header/__tests__/Header.test.tsx` that renders `Header` and verifies the output matches a stored snapshot.

#### Scenario: Header matches snapshot

- **WHEN** `Header` is rendered
- **THEN** the serialized output SHALL match the stored snapshot

#### Scenario: Snapshot is updated when Header changes

- **WHEN** `pnpm test -- --updateSnapshot` is executed after modifying the Header component
- **THEN** the snapshot file SHALL be updated to reflect the new output

### Requirement: next/link and lucide-react are mocked in Header test

The Header test SHALL mock `next/link` and `lucide-react` at the module level to prevent runtime errors from unresolved modules.

#### Scenario: next/link renders as a standard anchor

- **WHEN** the test renders the `Header` component
- **THEN** `next/link` SHALL be mocked to render an `<a>` element with the provided `href`
- **AND** the mock SHALL NOT throw a module resolution error

#### Scenario: lucide-react icons render without error

- **WHEN** the test renders the `Header` component
- **THEN** all `lucide-react` icon imports SHALL resolve to a null-rendering mock

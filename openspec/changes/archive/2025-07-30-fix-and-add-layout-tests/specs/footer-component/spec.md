## ADDED Requirements

### Requirement: Footer component renders with logo and app name

The `Footer` component SHALL render a page footer containing the app logo (Atom icon) and the brand name "PortalDex".

#### Scenario: Footer renders logo icon

- **WHEN** the `Footer` component is rendered
- **THEN** the output SHALL contain an element with the `lucide-react` Atom icon

#### Scenario: Footer renders brand name "PortalDex"

- **WHEN** the `Footer` component is rendered
- **THEN** the output SHALL contain the text "PortalDex"

### Requirement: Footer component renders social links

The `Footer` component SHALL render social media links: GitHub repository, LinkedIn profile, and Email contact.

#### Scenario: GitHub link renders

- **WHEN** the `Footer` component is rendered
- **THEN** a link labeled "GitHub repository" SHALL be present

#### Scenario: LinkedIn link renders

- **WHEN** the `Footer` component is rendered
- **THEN** a link labeled "LinkedIn" SHALL be present

#### Scenario: Email link renders

- **WHEN** the `Footer` component is rendered
- **THEN** a link labeled "Email" SHALL be present

### Requirement: Footer component renders author credit

The `Footer` component SHALL render a credit line containing the text "development by" and a link to the author's GitHub profile (`https://github.com/lxcste`).

#### Scenario: Author credit text renders

- **WHEN** the `Footer` component is rendered
- **THEN** the output SHALL contain the text "development by"

#### Scenario: Author GitHub link renders

- **WHEN** the `Footer` component is rendered
- **THEN** a link with text "@lxcste" and `href="https://github.com/lxcste"` SHALL be present

### Requirement: Footer snapshot test is co-located

The project SHALL have a snapshot test at `components/ui/footer/__tests__/Footer.test.tsx` that renders `Footer` and verifies the output matches a stored snapshot.

#### Scenario: Footer matches snapshot

- **WHEN** `Footer` is rendered
- **THEN** the serialized output SHALL match the stored snapshot

#### Scenario: Snapshot is updated when Footer changes

- **WHEN** `pnpm test -- --updateSnapshot` is executed after modifying the Footer component
- **THEN** the snapshot file SHALL be updated to reflect the new output

### Requirement: next/link and lucide-react are mocked in Footer test

The Footer test SHALL mock `next/link` and `lucide-react` at the module level to prevent runtime errors from unresolved modules.

#### Scenario: next/link renders as a standard anchor

- **WHEN** the test renders the `Footer` component
- **THEN** `next/link` SHALL be mocked to render an `<a>` element with the provided `href`
- **AND** the mock SHALL NOT throw a module resolution error

#### Scenario: lucide-react icons render without error

- **WHEN** the test renders the `Footer` component
- **THEN** all `lucide-react` icon imports SHALL resolve to a null-rendering mock

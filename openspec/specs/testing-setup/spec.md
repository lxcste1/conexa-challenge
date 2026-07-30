## ADDED Requirements

### Requirement: Jest test runner is configured

The project SHALL include Jest as the test runner, configured via `jest.config.ts` using the `next/jest` helper with the jsdom test environment and `@testing-library/jest-dom` setup.

#### Scenario: Jest configuration loads successfully

- **WHEN** `pnpm test` is executed
- **THEN** Jest finds and executes test files matching the default pattern (`**/__tests__/**/*.{ts,tsx}`)
- **AND** the jsdom environment is active for all test files

#### Scenario: TypeScript and JSX are transpiled correctly

- **WHEN** a test file imports a `.tsx` component that uses TypeScript syntax and JSX
- **THEN** Jest transpiles the file via SWC (through `next/jest`) without errors

#### Scenario: Path alias `@/*` is resolved

- **WHEN** a test or source file uses `import { something } from "@/..."` 
- **THEN** Jest resolves the path alias to the project root (`./*`)

### Requirement: React Testing Library is integrated

The project SHALL include `@testing-library/react` for rendering React components in tests and `@testing-library/jest-dom` for DOM-specific matchers.

#### Scenario: Custom matchers are available

- **WHEN** a test uses `toBeInTheDocument()`, `toHaveClass()`, or any other `@testing-library/jest-dom` matcher
- **THEN** the matcher is recognized by Jest without additional imports in the test file

#### Scenario: React component can be rendered in a test

- **WHEN** a test renders a React component using `render()` from `@testing-library/react`
- **THEN** the component's output is accessible via `screen` and `container`

### Requirement: Test scripts are available in package.json

The project SHALL provide `test` and `test:watch` scripts in `package.json` for running Jest.

#### Scenario: Run all tests

- **WHEN** `pnpm test` is executed
- **THEN** Jest runs all test files and reports results

#### Scenario: Watch mode

- **WHEN** `pnpm test:watch` is executed
- **THEN** Jest enters watch mode, re-running tests on file changes

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

The project SHALL mock `next/font/google` at the module level so that font-related CSS variables render predictably without downloading font files. The mock SHALL use a generic Proxy-based factory that returns a font constructor for any font name, accepting `{ variable: string }` options and returning `{ variable }`.

#### Scenario: Font mock returns a stable variable value for any font

- **WHEN** `RootLayout` calls any font constructor (e.g., `Inter({ variable: "--font-inter", ... })` or `Bungee({ variable: "--font-bungee", ... })`) at module scope
- **THEN** the mock returns an object with the `variable` value matching the argument passed to the constructor

### Requirement: Tests are mandatory for every change

The project SHALL require that every change introducing new components, hooks, or utilities includes corresponding tests. Tests MUST be co-located in `__tests__/` folders next to the code they test.

#### Scenario: New component must have tests

- **WHEN** a new `.tsx` component is added to the codebase
- **THEN** a corresponding `__tests__/ComponentName.test.tsx` file SHALL exist
- **AND** the test file SHALL exercise the component's public API

#### Scenario: New hook must have tests

- **WHEN** a new custom hook file (e.g., `use[Name].ts`) is added
- **THEN** a corresponding `__tests__/use[Name].test.ts` file SHALL exist
- **AND** the test file SHALL exercise all public return values and callbacks

#### Scenario: Modified component without existing tests must get tests

- **WHEN** an existing component's behavior is modified and no test file exists for it
- **THEN** a test file SHALL be created covering at minimum the modified behavior

#### Scenario: Validation step requires passing tests

- **WHEN** a developer runs `pnpm lint` or `pnpm build` before committing
- **THEN** `pnpm test` SHALL also pass as part of the pre-commit validation pipeline

### Requirement: Testing conventions are documented

The project SHALL document testing conventions in `CODING_CONVENTIONS.md` covering test location, naming, snapshot guidelines, mocking rules, and the mandatory coverage policy.

#### Scenario: AGENTS.md references testing commands

- **WHEN** a developer reads `AGENTS.md`
- **THEN** the Commands section SHALL list `pnpm test` and `pnpm test:watch`

#### Scenario: AGENTS.md reflects testing stack

- **WHEN** a developer reads `AGENTS.md`
- **THEN** the Architecture section SHALL describe the testing framework (Jest + React Testing Library) instead of stating "No test framework configured yet"

#### Scenario: CODING_CONVENTIONS.md defines testing rules

- **WHEN** a developer reads `CODING_CONVENTIONS.md`
- **THEN** the document SHALL contain a Testing section with rules for:
  - Test location (`__tests__/` co-located folders)
  - File naming (`*.test.tsx` / `*.test.ts`)
  - Mandatory coverage for every change introducing new code
  - Snapshot testing guidelines for layout and presentational components
  - Mocking conventions for Next.js internals (`next/font/google`, `next/link`, `lucide-react`)
  - `pnpm test` as a required validation step

### Requirement: Transitive dependencies are mocked in layout tests

Tests that render components with transitive dependencies on Next.js internals SHALL mock those dependencies at the module level. Specifically, `next/link` SHALL be mocked to render as a plain `<a>` element and `lucide-react` SHALL be mocked using a Proxy returning null-rendering components.

#### Scenario: next/link mock prevents module resolution errors

- **WHEN** a test renders a component tree that uses `next/link` (directly or transitively via Header/Footer)
- **THEN** `next/link` SHALL be mocked to render an `<a>` element with the provided `href`
- **AND** no module resolution error SHALL be thrown

#### Scenario: lucide-react mock prevents module resolution errors

- **WHEN** a test renders a component tree that uses `lucide-react` icons (directly or transitively)
- **THEN** `lucide-react` SHALL be mocked using a Proxy returning a null-rendering component factory
- **AND** no module resolution error SHALL be thrown

### Requirement: Header and Footer components have co-located tests

New presentational components added to `components/ui/` SHALL have corresponding test files in a sibling `__tests__/` directory following the project's testing conventions.

#### Scenario: Header test exists

- **WHEN** a developer checks `components/ui/header/`
- **THEN** a `__tests__/Header.test.tsx` file SHALL exist

#### Scenario: Footer test exists

- **WHEN** a developer checks `components/ui/footer/`
- **THEN** a `__tests__/Footer.test.tsx` file SHALL exist

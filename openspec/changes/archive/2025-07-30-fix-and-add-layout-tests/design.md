## Context

The `RootLayout` (SSG, static) renders a `<Header />`, `<Footer />`, and uses `Inter` + `Bungee` fonts from `next/font/google`. The existing layout test mocks `Geist`/`Geist_Mono` and doesn't mock the transitive dependencies (`next/link`, `lucide-react`) introduced by Header/Footer. Additionally, Header and Footer have no tests, violating the mandatory testing convention from `CODING_CONVENTIONS.md`.

The test environment uses Jest with `next/jest`, jsdom, and `@testing-library/react`. Path alias `@/*` is configured in `tsconfig.json` and resolved by `next/jest`'s moduleNameMapper.

## Goals / Non-Goals

**Goals:**
- Fix the broken `layout.test.tsx` so it passes with new fonts and component structure
- Add co-located tests for `Header` and `Footer` components
- Update the `testing-setup` spec to reflect the new font names and mocking strategy
- Document the transitive dependency mocking pattern for future component additions

**Non-Goals:**
- Changing the Header, Footer, or Layout components themselves
- Adding tests for `lib/utils.ts`, `cn()` utility, or other edge code
- Modifying the Jest configuration
- Testing at mobile viewports for Header/Footer (those belong in integration/E2E)

## Decisions

### Decision 1: Mock `next/link` and `lucide-react` instead of mocking Header/Footer directly

**Rationale:** `jest.mock("@/components/ui/header/Header", ...)` fails during Jest's hoisted module resolution — the `@/` path alias is not consistently resolved by `jest.mock` blocks. Mocking the leaf dependencies (`next/link`, `lucide-react`) at the module level lets Header and Footer render their full JSX without needing to resolve `@/` paths in mock declarations.

**Alternatives considered:**
- Mock Header/Footer via `jest.mock("../../components/ui/header/Header")` — fails because the module under test imports with `@/`, not relative paths, and `jest.mock` must match the exact import string.
- Move mocks to `jest.setup.ts` — over-engineered for a single test file; makes test behavior implicit.
- Use `jest.mock` with a virtual module — unnecessary complexity.

### Decision 2: Generic font mock factory

**Rationale:** A factory `return () => ({ variable })` supports any font name (`Inter`, `Bungee`, or future additions) without updating the mock every time. The `variable` CSS custom property is the only value consumed by the layout.

**Alternatives considered:**
- Explicitly list `Inter` and `Bungee` in the mock return — simpler but requires updating whenever fonts change.
- Ignore the second argument (the font name) and return `{ variable: "mocked" }` — loses the ability to assert specific CSS variable names in tests.

### Decision 3: Co-located `__tests__/` folders for Header and Footer

**Rationale:** Follows the project convention defined in `CODING_CONVENTIONS.md`. Test files go in `__tests__/` directories next to the component they test.

**File paths:**
- `components/ui/header/__tests__/Header.test.tsx`
- `components/ui/footer/__tests__/Footer.test.tsx`

### Decision 4: Snapshot tests for Header and Footer

**Rationale:** Both components are purely presentational. Snapshot tests capture the full rendered structure and flag unintended markup changes. Content assertions verify critical elements (logo text, nav links, social links) even if the snapshot matches.

### Decision 5: Mock lucide-react globally in Footer test via same `jest.mock`

**Rationale:** Footer's `items.ts` imports `Mail` from `lucide-react` and custom icons from `./Icons.tsx` (which also use lucide-react). Mocking `lucide-react` at the top of the test file covers both. Same pattern as the layout test.

## Risks / Trade-offs

- **Risk:** Mocking all of `lucide-react` makes icons render as empty/null, so the snapshot won't catch icon-specific regressions.
  - **Mitigation:** Content assertions verify key text elements (app name, nav labels, author credit). Icon structure is considered stable enough that snapshot + text content coverage is sufficient.
- **Risk:** The generic font mock factory `return () => mockFont` is less explicit than listing each font.
  - **Mitigation:** The className assertions (`--font-inter`, `--font-bungee`) serve as the explicit check that correct fonts are used.

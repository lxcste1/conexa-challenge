## 1. Fix layout test

- [x] 1.1 Update `next/font/google` mock to generic factory (`return () => mockFont`) so it supports any font name
- [x] 1.2 Add `jest.mock("next/link")` — render as `<a href={href}>{children}</a>`
- [x] 1.3 Add `jest.mock("lucide-react")` — return null-rendering components for all icon imports
- [x] 1.4 Update className assertions from `--font-geist-sans`/`--font-geist-mono` to `--font-inter`/`--font-bungee`
- [x] 1.5 Run `pnpm test -- --updateSnapshot` to regenerate the layout snapshot
- [x] 1.6 Run `pnpm test` to verify all existing tests pass

## 2. Add Header component test

- [x] 2.1 Create `components/ui/header/__tests__/` directory
- [x] 2.2 Create `Header.test.tsx` with mocks for `next/link` and `lucide-react`
- [x] 2.3 Add snapshot test that renders `Header` and asserts on key content (logo, "PortalDex", "Home" link, "Explorer" link)
- [x] 2.4 Run `pnpm test` to verify Header test passes

## 3. Add Footer component test

- [x] 3.1 Create `components/ui/footer/__tests__/` directory
- [x] 3.2 Create `Footer.test.tsx` with mocks for `next/link` and `lucide-react`
- [x] 3.3 Add snapshot test that renders `Footer` and asserts on key content (logo, "PortalDex", social link labels, "@lxcste" credit)
- [x] 3.4 Run `pnpm test` to verify Footer test passes

## 4. Final validation

- [x] 4.1 Run `pnpm lint` to ensure no ESLint errors
- [x] 4.2 Run `pnpm test` to ensure all test suites pass

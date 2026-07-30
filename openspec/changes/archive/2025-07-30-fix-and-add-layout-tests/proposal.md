## Why

The `RootLayout` was updated with a `Header`, `Footer`, and new fonts (`Inter`, `Bungee`). The existing layout test at `app/__tests__/layout.test.tsx` is now broken — it still mocks the old fonts (`Geist`, `Geist_Mono`), asserts against old CSS variables, and doesn't mock the transitive dependencies (`next/link`, `lucide-react`) introduced by the new components. Additionally, the `Header` and `Footer` components lack tests entirely, violating the mandatory testing convention.

## What Changes

- Fix `app/__tests__/layout.test.tsx`: update `next/font/google` mock from `Geist`/`Geist_Mono` to a generic factory supporting any font, update className assertions to `--font-inter` and `--font-bungee`, add mocks for `next/link` and `lucide-react`, update snapshot
- Add `components/ui/header/__tests__/Header.test.tsx`: snapshot + content verification for the Header component
- Add `components/ui/footer/__tests__/Footer.test.tsx`: snapshot + content verification for the Footer component
- **BREAKING**: Update `testing-setup` spec — font mock scenarios now reference `Inter`/`Bungee` instead of `Geist`/`Geist_Mono`, className assertions updated accordingly

## Capabilities

### New Capabilities
- `header-component`: Header component renders with logo, app name ("PortalDex"), and navigation links (Home, Explorer)
- `footer-component`: Footer component renders with logo, social links (GitHub, LinkedIn, email), and author credit

### Modified Capabilities
- `testing-setup`: Font mock requirements change from `Geist`/`Geist_Mono` to a generic factory supporting `Inter` and `Bungee`; className assertions change from `--font-geist-sans`/`--font-geist-mono` to `--font-inter`/`--font-bungee`; transitive dependency mocking (`next/link`, `lucide-react`) is now documented

## Impact

- `app/__tests__/layout.test.tsx` — update mocks, assertions, snapshot
- `app/__tests__/__snapshots__/layout.test.tsx.snap` — regenerated snapshot
- `components/ui/header/__tests__/Header.test.tsx` — new test file
- `components/ui/footer/__tests__/Footer.test.tsx` — new test file + mocks for `SOCIALS` dependency
- `openspec/specs/testing-setup/spec.md` — update font and className scenarios

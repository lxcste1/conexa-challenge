## 1. Dependencies

- [x] 1.1 Install Jest and types: `pnpm add -D jest @types/jest`
- [x] 1.2 Install jsdom environment: `pnpm add -D jest-environment-jsdom`
- [x] 1.3 Install React Testing Library: `pnpm add -D @testing-library/react @testing-library/jest-dom`

## 2. Jest Configuration

- [x] 2.1 Create `jest.config.ts` at project root using `next/jest` helper with `jsdom` environment, `@/*` module name mapping, and `jest.setup.ts` as setup file
- [x] 2.2 Create `jest.setup.ts` at project root importing `@testing-library/jest-dom`

## 3. RootLayout Snapshot Test

- [x] 3.1 Create `app/__tests__/` directory
- [x] 3.2 Create `app/__tests__/layout.test.tsx` with a `jest.mock("next/font/google", ...)` call and a snapshot test that renders `RootLayout` with sample children

## 4. Package Scripts

- [x] 4.1 Add `"test": "jest"` to `scripts` in `package.json`
- [x] 4.2 Add `"test:watch": "jest --watch"` to `scripts` in `package.json`

## 5. Documentation

- [x] 5.1 Update `AGENTS.md`: add `test` and `test:watch` to Commands section, replace "No test framework configured yet" with Jest + RTL description in Architecture section
- [x] 5.2 Update `CODING_CONVENTIONS.md`: add Testing section with rules for test location (`__tests__/` co-located), file naming (`*.test.tsx`), mandatory coverage for every change, snapshot testing guidelines, mocking conventions, and `pnpm test` as required validation step

## 6. Verification

- [x] 6.1 Run `pnpm test` and confirm the snapshot test passes (snapshot file is created automatically)
- [x] 6.2 Run `pnpm lint` and confirm no new lint errors
- [x] 6.3 Run `pnpm build` and confirm the project builds successfully

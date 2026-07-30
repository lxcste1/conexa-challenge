## 1. Types

- [x] 1.1 Create `types/home.ts` with `FeatureCardProps` and `StepCardProps` interfaces

## 2. FeatureCard & HomeFeatures

- [x] 2.1 Create `components/ui/home-features/components/FeatureCard.tsx` — Server Component, renders icon + title + description
- [x] 2.2 Create `components/ui/home-features/home-features-data.ts` — FEATURES array with icon, title, description
- [x] 2.3 Create `components/ui/home-features/HomeFeatures.tsx` — Server Component, maps FEATURES into responsive grid of FeatureCards

## 3. StepCard & HomeHowItWorks

- [x] 3.1 Create `components/ui/home-how-it-works/components/StepCard.tsx` — Server Component, renders number + title + description inside `<li>`
- [x] 3.2 Create `components/ui/home-how-it-works/home-how-it-works-data.ts` — STEPS array with n, title, description
- [x] 3.3 Create `components/ui/home-how-it-works/HomeHowItWorks.tsx` — Server Component, renders heading + ordered list of StepCards + secondary CTA

## 4. HomeHero

- [x] 4.1 Create `components/ui/home-hero/HomeHero.tsx` — Server Component with portal background, badge, heading, subtitle, and primary CTA button

## 5. Page Assembly

- [x] 5.1 Replace `app/page.tsx` with SSG Server Component composing HomeHero, HomeFeatures, and HomeHowItWorks; export Metadata

## 6. Tests

- [x] 6.1 Create `components/ui/home-features/components/__tests__/FeatureCard.test.tsx` — snapshot test
- [x] 6.2 Create `components/ui/home-features/__tests__/HomeFeatures.test.tsx` — snapshot test
- [x] 6.3 Create `components/ui/home-how-it-works/components/__tests__/StepCard.test.tsx` — snapshot test
- [x] 6.4 Create `components/ui/home-how-it-works/__tests__/HomeHowItWorks.test.tsx` — snapshot test
- [x] 6.5 Create `components/ui/home-hero/__tests__/HomeHero.test.tsx` — snapshot test
- [x] 6.6 Create `app/__tests__/HomePage.test.tsx` — snapshot test for the assembled page

## 7. Validation

- [x] 7.1 Run `pnpm lint` and fix any issues
- [x] 7.2 Run `pnpm test` and ensure all tests pass
- [x] 7.3 Run `pnpm build` and verify `○ (Static)` for `/` route and no TypeScript errors

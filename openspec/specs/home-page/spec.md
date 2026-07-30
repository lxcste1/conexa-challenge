## ADDED Requirements

### Requirement: Landing page displays hero section
The system SHALL render a hero section at the top of the home page containing a badge label, a main heading, a subtitle, and a call-to-action button linking to `/explorer`. The hero section SHALL use a semi-transparent background image (`/portal-glow.png`) with a gradient overlay.

#### Scenario: Hero renders with all elements
- **WHEN** a user navigates to `/`
- **THEN** the page displays a badge reading "Multiverse Episode Explorer"
- **AND** a heading reading "Compare any two Rick and Morty characters"
- **AND** a subtitle describing the explorer functionality
- **AND** a "Launch the Explorer" button that links to `/explorer`

### Requirement: Landing page displays feature cards
The system SHALL render three feature cards in a responsive grid below the hero section. Each card SHALL display an icon, a title, and a description.

#### Scenario: Feature cards grid renders
- **WHEN** a user navigates to `/`
- **THEN** the page displays three cards: "Dual selection", "Solo & shared episodes", and "Live from the API"
- **AND** cards are laid out in a single column on mobile, 2 columns at `sm:` breakpoint, and 3 columns at `lg:` breakpoint

#### Scenario: Each feature card has correct structure
- **WHEN** a feature card renders
- **THEN** it contains an icon inside a styled container
- **AND** a title rendered as an `h3`
- **AND** a description paragraph

### Requirement: Landing page displays how-it-works section
The system SHALL render a "How it works" section below the features grid containing a heading and three numbered steps, followed by a secondary call-to-action button linking to `/explorer`.

#### Scenario: How-it-works section renders three steps
- **WHEN** a user navigates to `/`
- **THEN** the section displays a "Three steps to the answer" heading
- **AND** three steps numbered 01, 02, 03 with titles and descriptions
- **AND** a "Start exploring" button that links to `/explorer`

### Requirement: FeatureCard component is reusable
The `FeatureCard` component SHALL accept `icon`, `title`, and `description` props and render a styled card. It SHALL be a Server Component with no client interactivity.

#### Scenario: FeatureCard renders with provided props
- **WHEN** `FeatureCard` receives `icon={Users}`, `title="Dual selection"`, `description="Browse..."` props
- **THEN** it renders the `Users` icon, the title "Dual selection", and the description "Browse..."

### Requirement: StepCard component is reusable
The `StepCard` component SHALL accept `number`, `title`, and `description` props and render a numbered step card. It SHALL be a Server Component with no client interactivity.

#### Scenario: StepCard renders with provided props
- **WHEN** `StepCard` receives `number="01"`, `title="Select Character #1"`, `description="Search..."` props
- **THEN** it renders "01" as a large number, the title, and the description

### Requirement: Page metadata is configured
The home page SHALL export a `Metadata` object with a descriptive title and description for SEO.

#### Scenario: Metadata is exported
- **WHEN** the page is analyzed for metadata
- **THEN** `title` is set to "Rick & Morty | Character Episode Explorer"
- **AND** `description` describes the dual-character episode comparison functionality

### Requirement: Types are defined in types/ directory
All component prop interfaces for the home page SHALL be defined in `types/home.ts`.

#### Scenario: FeatureCardProps is defined in types/home.ts
- **WHEN** `types/home.ts` is inspected
- **THEN** it exports `FeatureCardProps` with `icon`, `title`, and `description` fields

#### Scenario: StepCardProps is defined in types/home.ts
- **WHEN** `types/home.ts` is inspected
- **THEN** it exports `StepCardProps` with `number`, `title`, and `description` fields

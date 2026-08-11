---
name: Maritime Modernism
colors:
  surface: '#eafdfe'
  surface-dim: '#cbdedf'
  surface-bright: '#eafdfe'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#e4f7f8'
  surface-container: '#def2f2'
  surface-container-high: '#d9eced'
  surface-container-highest: '#d3e6e7'
  on-surface: '#0d1e1f'
  on-surface-variant: '#3d494a'
  inverse-surface: '#223334'
  inverse-on-surface: '#e1f4f5'
  outline: '#6d797a'
  outline-variant: '#bcc9c9'
  surface-tint: '#00696e'
  primary: '#00666c'
  on-primary: '#ffffff'
  primary-container: '#008188'
  on-primary-container: '#f4ffff'
  inverse-primary: '#6ad6de'
  secondary: '#576061'
  on-secondary: '#ffffff'
  secondary-container: '#d8e1e2'
  on-secondary-container: '#5b6465'
  tertiary: '#795600'
  on-tertiary: '#ffffff'
  tertiary-container: '#986d00'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#88f3fa'
  primary-fixed-dim: '#6ad6de'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f53'
  secondary-fixed: '#dbe4e5'
  secondary-fixed-dim: '#bfc8c9'
  on-secondary-fixed: '#151d1e'
  on-secondary-fixed-variant: '#404849'
  tertiary-fixed: '#ffdea8'
  tertiary-fixed-dim: '#ffba20'
  on-tertiary-fixed: '#271900'
  on-tertiary-fixed-variant: '#5e4200'
  background: '#eafdfe'
  on-background: '#0d1e1f'
  surface-variant: '#d3e6e7'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
  price-display:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '800'
    lineHeight: 32px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style

The design system is built on the philosophy of "Maritime Modernism"—combining the precision of a high-tech marketplace with the fluid, organic nature of the ocean. It targets health-conscious consumers and culinary professionals who prioritize ingredient provenance and immediate freshness.

The visual style is **Corporate Modern** with a **Tactile** twist. It utilizes expansive whitespace to denote cleanliness (sanitation is key in seafood), balanced by soft, layered elevations that mimic the depth of water. The emotional response should be one of absolute trust, clarity, and the "cold-chain" efficiency of a premium logistics service.

Key aesthetic drivers:
- **Clarity:** High-contrast information clusters for dynamic pricing.
- **Fluidity:** Subtle, non-intrusive wave motifs used in backgrounds and page transitions.
- **Innovation:** Modern data visualization for freshness metrics.

## Colors

The palette is anchored by a "Deep Teal" primary color, representing the intersection of technology and the sea. 

- **Primary (#09949b):** Used for primary actions, brand presence, and the "Peak Freshness" state.
- **Secondary (#f2fbfc):** An "Ice Blue" wash used for backgrounds to evoke a refrigerated, fresh environment.
- **Tertiary (#ffb800):** A "Sunset Amber" used sparingly for highlights, alerts, or loyalty-related elements.
- **Neutral (#1a2b2c):** A "Deep Sea Navy" used for maximum legibility in typography, replacing standard blacks.

**Freshness Spectrum:**
The dynamic pricing system utilizes a semantic scale from Teal (Peak) to Red (Discounted). This ensures users can visually scan the "catch of the day" and understand value versus time-since-catch instantly.

## Typography

This design system exclusively employs **Plus Jakarta Sans** for its friendly yet geometric precision. 

- **Headlines:** Use ExtraBold and Bold weights with tighter letter-spacing to create a "premium magazine" feel.
- **Body Text:** Standard weights with generous line height to ensure readability of technical fish data (origin, weight, catch method).
- **Labels:** Uppercase styles are used for "Freshness Meters" and technical specs to differentiate data from descriptive copy.
- **Price Display:** A specific role for dynamic pricing, ensuring the fluctuating cost is the most visible element on product cards.

## Layout & Spacing

The layout follows a **Fluid Grid** model with a heavy emphasis on "Safe Harbor" margins—wide gutters that keep content centered and premium.

- **Desktop:** 12-column grid with 24px gutters. Content is housed in a 1280px max-width container.
- **Mobile:** 4-column grid with 16px margins.
- **Vertical Rhythm:** A strict 8px baseline grid. Spacing between product cards and sections should feel "airy" to reinforce the brand's premium positioning.
- **Freshness Bars:** In-card meters use a sub-grid of 4px units for high-density data display without cluttering the UI.

## Elevation & Depth

Hierarchy is established through **Tonal Layering** and **Ambient Shadows**.

- **Surface 0 (Background):** Secondary color (#f2fbfc) provides a "cool" base.
- **Surface 1 (Cards/Containers):** Pure white (#FFFFFF) with a very soft, diffused shadow (10% opacity of the Primary color) to make elements feel like they are floating on water.
- **Interactive States:** On hover, cards should lift slightly (larger shadow) and a subtle "inner glow" of the Primary color should appear.
- **Freshness Indicators:** These elements use high-contrast color fills rather than elevation to ensure they are the first thing the eye catches.

## Shapes

The shape language is **Rounded**, reflecting the organic curves of aquatic life.

- **Standard Elements:** Buttons and input fields use a 0.5rem (8px) radius.
- **Product Cards:** Use `rounded-lg` (1rem / 16px) to appear friendly and approachable.
- **Freshness Badges:** Use `rounded-xl` (1.5rem / 24px) or full pill-shapes to distinguish them as floating, dynamic status indicators.
- **Wave Patterns:** Soft, SVG-based sine waves are used as structural dividers between major landing page sections to break the rigidity of the grid.

## Components

**Buttons:**
- **Primary:** Solid Teal (#09949b) with white text. Rounded (8px). 
- **Secondary:** Outlined Teal with a light Teal tint on hover.

**Freshness Indicators (The Core Component):**
- **Freshness Meter:** A horizontal gauge component. The fill color changes based on the freshness level (Teal → Green → Orange → Red).
- **Time-Stamp Badge:** A pill-shaped label showing "Hours since catch" positioned in the top-right of product images.

**Product Cards:**
- High-quality photography with an "Ice Blue" overlay on the bottom third to house white typography for the fish name and price.
- The Freshness Meter must be positioned immediately below the price for instant value association.

**Inputs & Selection:**
- Search bars should have a "Water Ripple" focus effect—a soft, expanding Primary color border.
- Filter chips should use the pill-shape to allow users to sort by "Catch Method" (e.g., Line Caught, Farmed, Wild).

**Lists:**
- Transactional lists (Order History) use subtle dividers with a 1px wave pattern instead of a solid line to maintain brand character even in boring layouts.
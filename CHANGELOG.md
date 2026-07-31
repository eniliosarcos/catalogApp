# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Centralized environment config (`environment.ts` / `environment.prod.ts`) with contact data
- `@env` path alias in tsconfig.json
- Environment policy: files in `.gitignore`, never committed
- Catalog-component skill for standardized component creation
- Pre-flight checklist and component creation checklist in AGENTS.md
- Brand colors reference in AGENTS.md

### Fixed
- Cart now stores full `Product` object instead of `{} as Product` placeholder
- Cart-item component displays real product name, image, and price
- Cart-summary calculates subtotal from actual product prices (`discountPrice ?? price`)
- `addItem` signature changed from `productId: string` to `product: Product`

### Changed
- Typography: DM Serif Display (headings) + DM Sans (body) via CSS variables
- Fluid typography scale with `clamp()` in styles.css (`--text-xs` to `--text-2xl`)
- Header responsive: `h-12` mobile / `h-14` desktop, smaller fonts and icons
- Hero section height: 210px
- Category card images: `aspect-[3/2]` (was `aspect-video` 16/9)
- Footer compact: `py-8`, reduced gaps and font sizes
- Removed hero scroll animation (opacity + height collapse)
- Removed `@HostListener` scroll from HomeComponent

### Architecture
- Added ADR-007: Environment configuration pattern
- Added ADR-008: Cart stores full Product object

## [0.1.0] - 2026-07-29

### Added
- Initial project setup
- Monorepo structure with Angular CLI workspaces
- Catalog application with public product browsing
- Admin application shell with sidebar layout
- Shared library with models and services
- Product catalog with categories, products, and detail views
- Shopping cart with localStorage persistence
- Alphanumeric cart code generation
- Tailwind CSS 4 integration
- Lucide Angular for icons
- Breadcrumbs navigation
- Loading states and empty states
- Responsive design
- All components converted to separate HTML and SCSS files
- Unit tests for cart, product, and category services
- Component tests for cart-view and product-detail
- ErrorState model for typed error handling
- ErrorDisplayComponent for consistent error UI

### Fixed
- Tailwind CSS v4 utilities not generating in Angular 19
  - Replaced `postcss.config.js` with `.postcssrc.json` (Angular 19 format)
  - Added `@reference "tailwindcss"` to all SCSS files using `@apply`
  - Confirmed `application` builder (esbuild) has built-in Tailwind v4 support

### Design
- L'Essence de Cerise branding
- Brand color palette: gold (#C9A96E), cherry (#8B2252), pink (#D4739D)
- Header with LC monogram and fixed positioning
- Hero section with pink/cherry gradient
- Category cards with gold borders and cherry hover
- Product cards with gold prices and cherry discounts
- Footer with cherry background

### Architecture Decisions
- ADR-001: Angular 19 as framework
- ADR-002: Monorepo with Angular CLI workspaces
- ADR-003: Tailwind CSS + Lucide for styling
- ADR-004: Cart with localStorage and alphanumeric code
- ADR-005: Node.js + MongoDB as future backend
- ADR-006: Tailwind v4 + Angular 19 integration details
- ADR-007: Separate HTML and SCSS files for components

### Technical Details
- Angular 19.2.27
- Node.js 20.16.0
- Tailwind CSS 4.3.3
- Lucide Angular (latest)
- TypeScript strict mode
- ESLint configured

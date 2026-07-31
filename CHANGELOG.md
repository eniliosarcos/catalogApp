# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
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
- Hero scroll animation: subtle scale, fade, and translate on scroll (0-100px range)

### Fixed
- Tailwind CSS v4 utilities not generating in Angular 19
  - Replaced `postcss.config.js` with `.postcssrc.json` (Angular 19 format)
  - Added `@reference "tailwindcss"` to all 16 SCSS files using `@apply`
  - Confirmed `application` builder (esbuild) has built-in Tailwind v4 support

### Changed
- Enhanced AGENTS.md with development guidelines:
  - Tailwind CSS v4 rules and @reference requirement
  - Component creation workflow (7-step process)
  - Pre-commit build verification checklist
  - Shared library structure documentation
  - Directory structure conventions
  - Testing guidelines
  - Error handling patterns
  - Accessibility (a11y) rules
  - Performance guidelines
  - **Commit policy: always ask user before committing**
- Enabled test generation in angular.json schematics
- Renamed project to LCeriseApp
- Updated index.html titles to "L'Essence de Cerise"

### Design
- L'Essence de Cerise branding redesign
  - Brand color palette: gold (#C9A96E), cherry (#8B2252), pink (#D4739D)
  - Header with LC monogram and fixed positioning
  - Hero section with pink/cherry gradient
  - Category cards with gold borders and cherry hover
  - Product cards with gold prices and cherry discounts
  - Footer with cherry background
- Typography improvements
  - Google Fonts: Playfair Display (headings) + Cormorant Garamond (body)
  - Improved hero contrast with cherry title on pink gradient
  - Refined card typography with larger spacing

### Architecture Decisions
- ADR-001: Angular 19 as framework
- ADR-002: Monorepo with Angular CLI workspaces
- ADR-003: Tailwind CSS + Lucide for styling
- ADR-004: Cart with localStorage and alphanumeric code
- ADR-005: Node.js + MongoDB as future backend
- ADR-006: Tailwind v4 + Angular 19 integration details

## [0.1.0] - 2026-07-29

### Added
- Initial project setup
- Catalog app: Home, Category, Product Detail pages
- Cart functionality with localStorage
- Admin shell with placeholder pages
- Mock data for categories and products
- Shared library with models and services

### Technical Details
- Angular 19.2.27
- Node.js 20.16.0
- Tailwind CSS 4.3.3
- Lucide Angular (latest)
- TypeScript strict mode
- ESLint configured

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

### Architecture Decisions
- ADR-001: Angular 19 as framework
- ADR-002: Monorepo with Angular CLI workspaces
- ADR-003: Tailwind CSS + Lucide for styling
- ADR-004: Cart with localStorage and alphanumeric code
- ADR-005: Node.js + MongoDB as future backend

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

# CatalogApp - Development Guidelines

## Project Overview
Informational product catalog with admin panel built with Angular 19 monorepo.

## Architecture
- **Monorepo**: Angular CLI workspaces
- **Apps**: `projects/catalog` (public) + `projects/admin` (shell)
- **Shared Library**: `projects/shared` (models, services, UI components)

## Tech Stack
- Angular 19 (standalone components, signals)
- Tailwind CSS 4
- Lucide Angular (icons)
- TypeScript strict mode

## Development Rules

### Commit Policy (CRITICAL)
- **NEVER commit without explicit user approval**
- Always ask: "¿Commiteamos estos cambios?" before running `git commit`
- User decides when changes are ready to commit
- Group related changes into meaningful commits
- One feature/fix = one commit (not one commit per file)

### Code Style
- Use standalone components (no NgModules)
- Use signals for reactive state
- Use `@if`, `@for`, `@else` control flow
- Prefer `inject()` over constructor injection
- Use `@shared/` path alias for shared library

### Component Structure
```typescript
@Component({
  selector: 'app-[name]',
  standalone: true,
  imports: [CommonModule, ...],
  template: `...`
})
export class NameComponent {}
```

### File Naming
- Components: `[name].component.ts`
- Services: `[name].service.ts`
- Models: `[name].model.ts`
- Pages: `[name].component.ts` (in pages/ directory)

### Import Paths
- Use `@shared/models/...` for shared models
- Use `@shared/services/...` for shared services
- Use `@shared/ui/...` for shared UI components

### Tailwind CSS v4
- SCSS files using `@apply` MUST start with `@reference "tailwindcss"`
- PostCSS config: `.postcssrc.json` (NOT `postcss.config.js`)
- Builder: `application` (esbuild) in angular.json
- Import in global styles: `@import "tailwindcss"`

### Component Creation Workflow
1. Define model in `projects/shared/src/lib/models/`
2. Create mock data in `projects/catalog/src/assets/data/`
3. Create service in `projects/shared/src/lib/services/`
4. Create component with HTML + SCSS separation
5. Add lazy route in app routes
6. Export in `public-api.ts` if shared
7. Verify: `ng build catalog && ng build admin`

### Build Verification (Pre-Commit)
- [ ] `ng build catalog` succeeds
- [ ] `ng build admin` succeeds
- [ ] No TypeScript errors
- [ ] SCSS files with @apply have @reference

### Shared Library Structure
- `projects/shared/src/lib/models/` - Data models
- `projects/shared/src/lib/services/` - Abstract services
- `projects/shared/src/lib/ui/components/` - Reusable UI
- `projects/shared/src/public-api.ts` - Public exports

### Directory Structure
```
projects/{app}/src/app/
├── features/
│   └── {feature}/
│       ├── components/    # Feature-specific components
│       └── pages/         # Route components
├── shared/
│   └── components/        # App-shared components
└── app.routes.ts          # Lazy routes
```

### Testing Guidelines
- Services: test all public methods
- Components: test rendering with mock data
- Cart: test localStorage persistence
- Run: `ng test catalog` before commit
- Tests are in `.spec.ts` files next to source

### Error Handling
- Services return Observable on failure
- Components use `@if` to show error state
- Use `ErrorDisplayComponent` for consistent error UI
- Never silently swallow errors
- localStorage errors: fallback to in-memory

### Accessibility (a11y)
- Use `sr-only` for screen reader text
- Use `focus:ring` for keyboard navigation
- Use `aria-label` for icon-only buttons
- Use semantic HTML (nav, main, section, article)
- Use `role` attributes where needed
- Images must have alt text

### Performance
- Use OnPush change detection (default is Default)
- Always use `trackBy` with `@for`
- Use `signal()` for reactive state
- Lazy load routes (already done)
- Use `@defer` for non-critical components

## Build Commands
```bash
# Install dependencies
npm install

# Build catalog
ng build catalog

# Build admin
ng build admin

# Serve catalog
ng serve catalog

# Serve admin
ng serve admin
```

## Environment
- Node.js: 20.16.0 (use `nvm use 20.16.0`)
- Angular CLI: 19.2.27
- Package Manager: npm

## Key Files
- `angular.json` - Workspace configuration
- `tsconfig.json` - TypeScript paths and compiler options
- `projects/shared/src/public-api.ts` - Shared library exports
- `docs/adr/` - Architecture Decision Records
- `CHANGELOG.md` - Project changelog

## Notes
- Cart uses localStorage (no backend yet)
- Mock data in `projects/catalog/src/assets/data/`
- Admin is shell only - full implementation comes later
- Backend will be Node.js + MongoDB (not yet implemented)

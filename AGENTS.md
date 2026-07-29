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

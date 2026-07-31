---
name: catalog-component
description: "Trigger: crear componente, nueva feature, agregar componente, new component. Create full catalog component following project conventions."
license: Apache-2.0
metadata:
  author: eniliosarcos
  version: "1.0"
---

## Activation Contract

Create a skill when building a new feature component in the catalog app. This covers the full workflow from model to working build.

## Hard Rules

- NEVER commit without explicit user approval — always ask "¿Commiteamos?"
- Run `ng build catalog` AND `ng build admin` after every change
- Use standalone components (no NgModules)
- Use `@if`, `@for`, `@else` control flow (not *ngIf, *ngFor)
- Use `inject()` over constructor injection
- All SCSS files with `@apply` MUST start with `@reference "tailwindcss"`
- Use `@shared/` path alias for shared library imports
- All types/interfaces/enums go in `projects/shared/src/lib/models/`
- Export new types from `models/index.ts`

## Execution Steps

For every new component, follow this order:

### 1. Model (`projects/shared/src/lib/models/`)
```typescript
export interface FeatureName {
  id: string;
  name: string;
  // add fields as needed
}
```
Then add `export * from './feature.model';` to `models/index.ts`

### 2. Mock Data (`projects/catalog/src/assets/data/`)
```typescript
export const MOCK_FEATURES: FeatureName[] = [
  { id: '1', name: 'Example' }
];
```

### 3. Service (`projects/shared/src/lib/services/`)
- Create abstract service in shared
- Implement with mock data in `projects/catalog/src/app/core/services/`
- Return `Observable` from all methods
- Handle errors with `of([])` fallback

### 4. Component
- Location: `projects/catalog/src/app/features/{feature}/components/` or `pages/`
- Files: `.component.ts` + `.component.html` + `.component.scss`
- SCSS: start with `@reference "tailwindcss"`
- Use brand colors: `#8B2252` (cherry), `#C9A96E` (gold), `#F5E6E0` (bg)

### 5. Route (`app.routes.ts`)
```typescript
{
  path: 'feature',
  loadComponent: () => import('./features/feature/pages/...').then(m => m.FeatureComponent)
}
```

### 6. Export (if shared)
- Add to `projects/shared/src/public-api.ts`

### 7. Verify
- [ ] `ng build catalog` succeeds
- [ ] `ng build admin` succeeds
- [ ] No TypeScript errors
- [ ] No SCSS @apply without @reference

## Output Checklist

After completing the task, confirm:
- [ ] Model created/updated
- [ ] Mock data created
- [ ] Service created
- [ ] Component created (HTML + SCSS)
- [ ] Route added
- [ ] Export added (if shared)
- [ ] Both apps build successfully

# ADR-007: Environment Configuration Pattern

## Status
Accepted

## Context
Contact information (WhatsApp number, Instagram handle, Telegram) was hardcoded in multiple templates. This created duplication and risk of exposing real data in version control.

## Decision
- Create `environment.ts` (dev) and `environment.prod.ts` (prod) with contact config
- Add `@env` path alias in tsconfig.json for clean imports
- Configure `fileReplacements` in angular.json for production builds
- Add both files to `.gitignore` — never commit real contact data
- Components import from `@env` and expose `contact` property

## Consequences
- Single source of truth for contact info
- Production builds automatically use prod environment
- Real data stays local, safe to share repo
- Easy to update contact info in one place

## Files
- `projects/catalog/src/environments/environment.ts`
- `projects/catalog/src/environments/environment.prod.ts`
- `tsconfig.json` (path alias)
- `angular.json` (fileReplacements)

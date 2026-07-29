# ADR-003: Tailwind CSS + Lucide for Styling

## Status
Accepted

## Context
We need a styling solution for the catalog that is fast to develop, looks good, and doesn't add too much bundle size.

## Decision
Use Tailwind CSS 4 for utility-first styling and Lucide for icons.

## Consequences

### Positive
- ~15KB gzip total (Tailwind ~10KB, Lucide ~5KB)
- Rapid prototyping with utility classes
- Consistent design system
- Tree-shaking: only used classes are included
- Responsive design out of the box

### Negative
- HTML can become verbose with many classes
- Learning curve for Tailwind syntax
- Less semantic HTML

## Alternatives Considered
- **Bootstrap**: ~80KB, component-based, less flexible
- **Angular Material**: ~40KB, Google design, limited customization
- **CSS/SCSS pure**: 0KB, but slow to develop

## Notes
Tailwind 4 uses `@import "tailwindcss"` instead of `@tailwind` directives. PostCSS plugin is `@tailwindcss/postcss`.

## Angular 19 Integration (2026-07-29)

### Requirements
1. Use `.postcssrc.json` (not `postcss.config.js`) — Angular 19 looks for this format
2. Use `application` builder (esbuild) — has built-in Tailwind v4 PostCSS support
3. Add `@reference "tailwindcss"` to all SCSS files that use `@apply`

### Root Cause
Tailwind v4 requires `@reference` directive in any CSS/SCSS file using `@apply`. Without it, the build fails with "Cannot apply unknown utility class". This is because Tailwind v4 uses CSS-native cascade layers and `@reference` tells Tailwind to include those layer definitions.

### Files Changed
- `.postcssrc.json` (new) — Angular 19 PostCSS config format
- `angular.json` — builder set to `application` (esbuild)
- `projects/catalog/src/styles.css` — `@import "tailwindcss"` 
- `projects/admin/src/styles.css` — `@import "tailwindcss"`
- 16 component SCSS files — added `@reference "tailwindcss"` at top

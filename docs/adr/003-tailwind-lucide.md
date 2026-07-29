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

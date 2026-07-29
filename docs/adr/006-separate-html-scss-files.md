# ADR-006: Separate HTML and SCSS Files for Components

## Status
Accepted

## Context
Components were initially created with inline templates and styles for faster implementation. However, as the project grows, maintainability becomes a concern.

## Decision
All components use separate HTML and SCSS files instead of inline templates.

## Consequences

### Positive
- Better separation of concerns
- IDE support: syntax highlighting, linting, IntelliSense
- Easier to maintain for complex templates
- SCSS organization with proper styling structure
- Better for team collaboration

### Negative
- More files to manage
- Slightly slower initial development
- More folder navigation

## Alternatives Considered
- **Inline templates**: Faster to implement, but harder to maintain
- **Template URLs with external styles**: Current approach (best balance)

## Notes
- Components use `templateUrl` and `styleUrls` instead of `template` and `styles`
- Each component has its own `.html` and `.scss` file
- SCSS files use `:host` for component-specific styles
- Tailwind classes are used in HTML, custom styles in SCSS

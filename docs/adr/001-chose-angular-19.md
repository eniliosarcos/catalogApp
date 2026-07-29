# ADR-001: Use Angular 19 as Framework

## Status
Accepted

## Context
We need to build an informational product catalog with the possibility of expanding to an admin panel. The user has advanced Angular experience.

## Decision
We will use Angular 19 with standalone components and signals.

## Consequences

### Positive
- Standalone components reduce boilerplate and improve tree-shaking
- Signals provide reactive state management without RxJS complexity
- Lazy loading is built-in and easy to configure
- Strong typing with TypeScript
- Excellent CLI tooling

### Negative
- Larger bundle size compared to React/Vue
- Steeper learning curve for beginners (not an issue here)
- More opinionated structure

## Alternatives Considered
- **React**: Lighter, more flexible, but user prefers Angular
- **Vue**: Good middle ground, but Angular is more mature for enterprise
- **Svelte**: Smallest bundle, but less ecosystem

## Notes
Angular 19 requires Node 18.19.1+ or Node 20.11.1+. We're using Node 20.16.0.

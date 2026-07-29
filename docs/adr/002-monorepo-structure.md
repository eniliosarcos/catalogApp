# ADR-002: Monorepo with Angular CLI Workspaces

## Status
Accepted

## Context
We need a public catalog app and an admin panel that are separate concerns but share models and services.

## Decision
Use Angular CLI workspaces to create a monorepo with two applications (catalog and admin) and one shared library.

## Consequences

### Positive
- Single deployment unit (one hosting)
- Shared models and services via library
- No admin routes exposed to catalog users
- Easy to split later if needed
- Consistent dependency versions

### Negative
- Larger repository size
- More complex build configuration
- Both apps share the same `package.json`

## Alternatives Considered
- **Separate repos**: More isolation, but double deployment and maintenance
- **Module Federation**: Dynamic loading, but complex Webpack config
- **Single app with lazy routes**: Simpler, but admin code leaks into catalog bundle

## Notes
The admin app is a shell with placeholder routes. Full implementation comes later.

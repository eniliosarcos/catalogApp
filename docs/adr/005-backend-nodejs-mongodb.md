# ADR-005: Node.js + MongoDB as Future Backend

## Status
Accepted (planned)

## Context
The catalog will eventually need a backend for:
- Product management
- Image uploads
- Admin authentication
- Order management

## Decision
Use Node.js with Express and MongoDB as the backend.

## Consequences

### Positive
- Full control over API
- No vendor lock-in
- Flexible schema with MongoDB
- JavaScript/TypeScript across the stack
- Large ecosystem of npm packages

### Negative
- More infrastructure to manage
- Need to handle authentication manually
- MongoDB can be complex for relational data

## Alternatives Considered
- **Firebase**: Faster development, but high vendor lock-in
- **Supabase**: Open source, but more expensive at scale
- **PostgreSQL**: Better for relational data, but MongoDB is simpler for catalog

## Notes
Mock services in the catalog use static JSON data. When the backend is ready, only the service implementations need to change.

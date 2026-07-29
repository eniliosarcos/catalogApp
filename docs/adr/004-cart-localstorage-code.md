# ADR-004: Cart with localStorage and Alphanumeric Code

## Status
Accepted

## Context
Users need to browse products, add them to a cart, and contact the seller via social media with a cart code to finalize the purchase.

## Decision
Use localStorage for cart persistence and generate an alphanumeric code (e.g., CAR-7X9K2) that users send via WhatsApp/Instagram/Telegram.

## Consequences

### Positive
- No backend required
- Instant persistence
- Simple implementation
- Works offline
- Code is easy to copy and share

### Negative
- Cart is browser-specific (no cross-device sync)
- Data lost if localStorage is cleared
- No server-side validation

## Alternatives Considered
- **IndexedDB**: More storage, but more complex API
- **Session storage**: Lost on tab close
- **Backend cart**: Full sync, but requires authentication
- **PDF/Image generation**: Nice UX, but overkill for MVP

## Notes
The cart service uses a BehaviorSubject to provide reactive updates. When a backend is added, the service can be swapped without changing components.

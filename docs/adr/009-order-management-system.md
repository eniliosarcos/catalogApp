# ADR-009: Order Management System

## Status
Accepted (planned — requires backend)

## Context

The catalog is currently informational only. Users browse products, add to cart, and send a code via WhatsApp. The seller has no visibility into orders, no stock management, and no sales tracking.

This ADR defines the order system that bridges the catalog (customer) and admin panel (seller) via WhatsApp as the communication channel.

## Decision

### Flow

```
CATALOGO (cliente)          WHATSAPP           ADMIN (vendedor)
      │                        │                      │
      ├─ Agrega productos      │                      │
      ├─ Ve código CAR-XXX     │                      │
      ├─ Envía código + nombre ──────────────────────→│
      │                        │                      ├─ Ve orden pendiente
      │                        │  ←──对话──────────→  │
      │                        │                      ├─ Confirma
      │                        │                      ├─ Stock se descuenta
      │                        │                      ├─ Orden = completada
```

### Order Model

```typescript
interface Order {
  id: string;
  code: string;              // CAR-N8Q3U (existing format)
  customerName: string;      // Customer's name
  customerPhone?: string;    // Optional phone
  items: OrderItem[];
  status: OrderStatus;
  total: number;
  createdAt: string;
  confirmedAt?: string;
}

interface OrderItem {
  productId: string;
  productName: string;       // Snapshot at order time
  quantity: number;
  price: number;             // Snapshot at order time
}

type OrderStatus = 'pending' | 'confirmed' | 'cancelled';
```

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders` | Create order from cart |
| GET | `/api/orders` | List orders (admin) |
| GET | `/api/orders/:code` | Find by code |
| PATCH | `/api/orders/:id/confirm` | Confirm → deducts stock |
| PATCH | `/api/orders/:id/cancel` | Cancel order |
| GET | `/api/orders/stats` | Sales summary |

### Stock Management

- Stock is deducted ONLY when seller confirms the order (Option A)
- If stock is insufficient at confirmation time, order cannot be confirmed
- Seller must resolve stock issues with customer via WhatsApp before confirming

### Admin Panel

- List of orders filtered by status (pending, confirmed, cancelled)
- Order detail: code, customer name, items, total, date
- "Confirm" button → deducts stock automatically
- "Cancel" button
- Dashboard: daily sales, revenue, low stock alerts

### What We Do NOT Build

- No order editing by seller (customer is responsible for what they buy)
- No timeline/history of changes
- No push notifications (WhatsApp IS the notification)
- No integrated chat (WhatsApp handles communication)
- No customer accounts (orders are identified by code)

## Consequences

### Positive
- Simple, focused system that solves the real problem
- WhatsApp as communication channel = zero learning curve
- Stock only deducted on confirmation = no false deductions
- Snapshots (productName, price) protect against product changes
- Cart code already exists and works

### Negative
- Seller must manually check admin panel for new orders
- No real-time sync (polling or manual refresh required)
- Customer cannot see order status from catalog

## Integration with Existing Code

- Cart already generates CAR-XXX codes ✅
- Cart already stores full Product object ✅
- Cart-summary already has WhatsApp link ✅
- Only change needed: add customer name/phone form before sending

## Future Considerations

- WebSockets for real-time updates (if multiple sellers)
- Customer-facing order status page
- Sales reports and analytics
- PDF invoice generation

## Related ADRs

- ADR-004: Cart with localStorage and alphanumeric code
- ADR-005: Node.js + MongoDB as future backend

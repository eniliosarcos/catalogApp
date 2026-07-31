# ADR-008: Cart Stores Full Product Object

## Status
Accepted

## Context
`addItem` stored only `productId` and an empty `{} as Product` placeholder. The cart displayed "Producto ID: 1", placeholder images, and $0.00 prices.

## Decision
- Change `addItem` signature from `addItem(productId: string, qty)` to `addItem(product: Product, qty)`
- Store the complete `Product` object in `CartItem.product`
- Cart-item template reads `item.product.name`, `item.product.images[0].url`, `item.product.price`
- Cart-summary calculates subtotal from `discountPrice ?? price`

## Consequences
- Cart shows real product data (name, image, price)
- localStorage persists full product info
- Old cart items without product data show gracefully (fallback to "Producto")
- `addItem` callers must pass the full Product object

## Files
- `projects/shared/src/lib/services/cart.service.ts` (abstract)
- `projects/catalog/src/app/core/services/mock-cart.service.ts`
- `projects/catalog/src/app/features/cart/components/cart-item/cart-item.component.html`
- `projects/catalog/src/app/features/cart/components/cart-summary/cart-summary.component.ts`
- `projects/catalog/src/app/features/catalog/pages/product-detail/product-detail.component.ts`

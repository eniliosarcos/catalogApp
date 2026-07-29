import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cart } from '@shared/models/cart.model';

@Component({
  selector: 'app-cart-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss']
})
export class CartSummaryComponent {
  @Input({ required: true }) cart!: Cart;

  getTotalItems(): number {
    return this.cart.items.reduce((total, item) => total + item.quantity, 0);
  }

  getSubtotal(): number {
    // In a real app, we'd calculate based on product prices
    // For now, return 0 since we don't have product details in cart items
    return 0;
  }
}

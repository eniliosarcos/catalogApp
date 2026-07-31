import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cart } from '@shared/models/cart.model';
import { environment } from '@env';

@Component({
  selector: 'app-cart-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss']
})
export class CartSummaryComponent {
  @Input({ required: true }) cart!: Cart;
  contact = environment.contact;

  getTotalItems(): number {
    return this.cart.items.reduce((total, item) => total + item.quantity, 0);
  }

  getSubtotal(): number {
    return this.cart.items.reduce((total, item) => {
      const price = item.product?.discountPrice ?? item.product?.price ?? 0;
      return total + (price * item.quantity);
    }, 0);
  }
}

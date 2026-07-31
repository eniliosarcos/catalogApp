import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItem, CartItemQuantity } from '@shared/models/cart.model';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent {
  @Input({ required: true }) item!: CartItem;
  @Output() remove = new EventEmitter<string>();
  @Output() updateQuantity = new EventEmitter<CartItemQuantity>();

  increaseQuantity(): void {
    this.updateQuantity.emit({ productId: this.item.productId, quantity: this.item.quantity + 1 });
  }

  decreaseQuantity(): void {
    if (this.item.quantity > 1) {
      this.updateQuantity.emit({ productId: this.item.productId, quantity: this.item.quantity - 1 });
    }
  }

  onRemove(): void {
    this.remove.emit(this.item.productId);
  }
}

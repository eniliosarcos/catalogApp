import { Component, Input, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cart } from '@shared/models/cart.model';
import { ContactConfig } from '@shared/models/environment.model';
import { ContactService } from '@shared/services/contact.service';

@Component({
  selector: 'app-cart-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss']
})
export class CartSummaryComponent implements OnInit {
  @Input({ required: true }) cart!: Cart;

  private contactService = inject(ContactService);

  contact: ContactConfig | null = null;

  ngOnInit(): void {
    this.contactService.getContact().subscribe(config => {
      this.contact = config;
    });
  }

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

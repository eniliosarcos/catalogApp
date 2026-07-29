import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Cart } from '@shared/models/cart.model';
import { CartService } from '@shared/services/cart.service';
import { CartItemComponent } from '../../components/cart-item/cart-item.component';
import { CartSummaryComponent } from '../../components/cart-summary/cart-summary.component';
import { BreadcrumbsComponent } from '../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { LoadingComponent } from '@shared/ui/components/loading/loading.component';

@Component({
  selector: 'app-cart-view',
  standalone: true,
  imports: [CommonModule, RouterModule, CartItemComponent, CartSummaryComponent, BreadcrumbsComponent, LoadingComponent],
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.scss']
})
export class CartViewComponent implements OnInit {
  cart: Cart | null = null;
  loading = true;
  breadcrumbItems = [
    { label: 'Inicio', link: '/' },
    { label: 'Carrito', link: '' }
  ];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe(cart => {
      this.cart = cart;
      this.loading = false;
    });
  }

  removeItem(productId: string): void {
    this.cartService.removeItem(productId).subscribe();
  }

  updateQuantity(productId: string, quantity: number): void {
    this.cartService.updateQuantity(productId, quantity).subscribe();
  }
}

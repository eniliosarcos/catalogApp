import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';
import { Product } from '../models/product.model';

@Injectable()
export abstract class CartService {
  abstract getCart(): Observable<Cart>;
  abstract addItem(product: Product, quantity: number): Observable<Cart>;
  abstract removeItem(productId: string): Observable<Cart>;
  abstract updateQuantity(productId: string, quantity: number): Observable<Cart>;
  abstract clearCart(): Observable<Cart>;
  abstract generateCode(): string;
}

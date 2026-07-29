import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';

@Injectable()
export abstract class CartService {
  abstract getCart(): Observable<Cart>;
  abstract addItem(productId: string, quantity: number): Observable<Cart>;
  abstract removeItem(productId: string): Observable<Cart>;
  abstract updateQuantity(productId: string, quantity: number): Observable<Cart>;
  abstract clearCart(): Observable<Cart>;
  abstract generateCode(): string;
}

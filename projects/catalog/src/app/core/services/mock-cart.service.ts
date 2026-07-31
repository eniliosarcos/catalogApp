import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Cart, CartItem } from '@shared/models/cart.model';
import { Product } from '@shared/models/product.model';

@Injectable()
export class MockCartService {
  private readonly CART_KEY = 'catalog_cart';
  private cartSubject: BehaviorSubject<Cart>;

  constructor() {
    const savedCart = this.loadFromStorage();
    this.cartSubject = new BehaviorSubject<Cart>(savedCart);
  }

  private loadFromStorage(): Cart {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem(this.CART_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    }
    return this.createEmptyCart();
  }

  private saveToStorage(cart: Cart): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
    }
  }

  private createEmptyCart(): Cart {
    return {
      id: this.generateId(),
      items: [],
      code: this.generateCode(),
      createdAt: new Date().toISOString()
    };
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  generateCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = 'CAR-';
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  getCart(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  addItem(product: Product, quantity: number = 1): Observable<Cart> {
    const cart = this.cartSubject.value;
    const existingItem = cart.items.find(item => item.productId === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        productId: product.id,
        product,
        quantity
      });
    }

    this.saveToStorage(cart);
    this.cartSubject.next(cart);
    return of(cart);
  }

  removeItem(productId: string): Observable<Cart> {
    const cart = this.cartSubject.value;
    cart.items = cart.items.filter(item => item.productId !== productId);
    this.saveToStorage(cart);
    this.cartSubject.next(cart);
    return of(cart);
  }

  updateQuantity(productId: string, quantity: number): Observable<Cart> {
    const cart = this.cartSubject.value;
    const item = cart.items.find(i => i.productId === productId);
    if (item) {
      if (quantity <= 0) {
        return this.removeItem(productId);
      }
      item.quantity = quantity;
    }
    this.saveToStorage(cart);
    this.cartSubject.next(cart);
    return of(cart);
  }

  clearCart(): Observable<Cart> {
    const emptyCart = this.createEmptyCart();
    this.saveToStorage(emptyCart);
    this.cartSubject.next(emptyCart);
    return of(emptyCart);
  }
}

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '@shared/models/product.model';
import productsData from '../../../assets/data/products.json';

@Injectable()
export class MockProductService {
  private products: Product[] = productsData as Product[];

  getAll(): Observable<Product[]> {
    return of(this.products.filter(p => p.isActive));
  }

  getById(id: string): Observable<Product | undefined> {
    return of(this.products.find(p => p.id === id));
  }

  getBySlug(slug: string): Observable<Product | undefined> {
    return of(this.products.find(p => p.slug === slug));
  }

  getByCategory(categoryId: string): Observable<Product[]> {
    return of(this.products.filter(p => p.categoryId === categoryId && p.isActive));
  }

  create(product: Omit<Product, 'id' | 'createdAt'>): Observable<Product> {
    const newProduct: Product = {
      ...product,
      id: (this.products.length + 1).toString(),
      createdAt: new Date().toISOString()
    };
    this.products.push(newProduct);
    return of(newProduct);
  }

  update(id: string, product: Partial<Product>): Observable<Product> {
    const index = this.products.findIndex(p => p.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...product };
      return of(this.products[index]);
    }
    throw new Error('Product not found');
  }

  delete(id: string): Observable<void> {
    const index = this.products.findIndex(p => p.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
    }
    return of(void 0);
  }
}

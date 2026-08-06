import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '@shared/models/product.model';
import { ProductService } from '@shared/services/product.service';
import productsData from '../../../catalog/src/assets/data/products.json';

@Injectable()
export class MockProductService implements ProductService {
  private products: Product[] = productsData as Product[];

  getAll(): Observable<Product[]> {
    return of(this.products);
  }

  getById(id: string): Observable<Product | undefined> {
    return of(this.products.find(p => p.id === id));
  }

  getBySlug(slug: string): Observable<Product | undefined> {
    return of(this.products.find(p => p.slug === slug));
  }

  getByCategory(categoryId: string): Observable<Product[]> {
    return of(this.products.filter(p => p.categoryId === categoryId));
  }

  create(product: Omit<Product, 'id' | 'createdAt'>): Observable<Product> {
    const newProduct: Product = {
      ...product,
      id: (this.products.length + 1).toString(),
      createdAt: new Date().toISOString(),
    };
    this.products.push(newProduct);
    return of(newProduct);
  }

  update(id: string, updates: Partial<Product>): Observable<Product> {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error(`Product ${id} not found`);
    }
    this.products[index] = { ...this.products[index], ...updates };
    return of(this.products[index]);
  }

  delete(id: string): Observable<void> {
    this.products = this.products.filter(p => p.id !== id);
    return of(void 0);
  }
}

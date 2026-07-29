import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable()
export abstract class ProductService {
  abstract getAll(): Observable<Product[]>;
  abstract getById(id: string): Observable<Product | undefined>;
  abstract getBySlug(slug: string): Observable<Product | undefined>;
  abstract getByCategory(categoryId: string): Observable<Product[]>;
  abstract create(product: Omit<Product, 'id' | 'createdAt'>): Observable<Product>;
  abstract update(id: string, product: Partial<Product>): Observable<Product>;
  abstract delete(id: string): Observable<void>;
}

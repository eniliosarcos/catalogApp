import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable()
export abstract class CategoryService {
  abstract getAll(): Observable<Category[]>;
  abstract getById(id: string): Observable<Category | undefined>;
  abstract getBySlug(slug: string): Observable<Category | undefined>;
  abstract create(category: Omit<Category, 'id'>): Observable<Category>;
  abstract update(id: string, category: Partial<Category>): Observable<Category>;
  abstract delete(id: string): Observable<void>;
}

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from '@shared/models/category.model';
import { CategoryService } from '@shared/services/category.service';
import categoriesData from '../../../catalog/src/assets/data/categories.json';

@Injectable()
export class MockCategoryService implements CategoryService {
  private categories: Category[] = categoriesData as Category[];

  getAll(): Observable<Category[]> {
    return of(this.categories);
  }

  getById(id: string): Observable<Category | undefined> {
    return of(this.categories.find(c => c.id === id));
  }

  getBySlug(slug: string): Observable<Category | undefined> {
    return of(this.categories.find(c => c.slug === slug));
  }

  create(category: Omit<Category, 'id'>): Observable<Category> {
    const newCategory: Category = {
      ...category,
      id: (this.categories.length + 1).toString(),
    };
    this.categories.push(newCategory);
    return of(newCategory);
  }

  update(id: string, updates: Partial<Category>): Observable<Category> {
    const index = this.categories.findIndex(c => c.id === id);
    if (index === -1) {
      throw new Error(`Category ${id} not found`);
    }
    this.categories[index] = { ...this.categories[index], ...updates };
    return of(this.categories[index]);
  }

  delete(id: string): Observable<void> {
    this.categories = this.categories.filter(c => c.id !== id);
    return of(void 0);
  }
}

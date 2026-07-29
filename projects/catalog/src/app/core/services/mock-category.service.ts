import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from '@shared/models/category.model';
import categoriesData from '../../../assets/data/categories.json';

@Injectable()
export class MockCategoryService {
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
      id: (this.categories.length + 1).toString()
    };
    this.categories.push(newCategory);
    return of(newCategory);
  }

  update(id: string, category: Partial<Category>): Observable<Category> {
    const index = this.categories.findIndex(c => c.id === id);
    if (index !== -1) {
      this.categories[index] = { ...this.categories[index], ...category };
      return of(this.categories[index]);
    }
    throw new Error('Category not found');
  }

  delete(id: string): Observable<void> {
    const index = this.categories.findIndex(c => c.id === id);
    if (index !== -1) {
      this.categories.splice(index, 1);
    }
    return of(void 0);
  }
}

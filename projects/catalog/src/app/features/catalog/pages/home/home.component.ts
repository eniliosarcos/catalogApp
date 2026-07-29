import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category } from '@shared/models/category.model';
import { CategoryService } from '@shared/services/category.service';
import { CategoryGridComponent } from '../../components/category-grid/category-grid.component';
import { LoadingComponent } from '@shared/ui/components/loading/loading.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CategoryGridComponent, LoadingComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categories: Category[] = [];
  loading = true;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  private loadCategories(): void {
    this.categoryService.getAll().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading categories:', error);
        this.loading = false;
      }
    });
  }
}

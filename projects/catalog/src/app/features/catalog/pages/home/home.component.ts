import { Component, OnInit, HostListener, signal } from '@angular/core';
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
  scrollProgress = signal(0);

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    const scrollY = window.scrollY;
    const maxScroll = 100;
    const progress = Math.min(scrollY / maxScroll, 1);
    this.scrollProgress.set(progress);
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

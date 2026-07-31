import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Category } from '@shared/models/category.model';
import { Product } from '@shared/models/product.model';
import { BreadcrumbItem } from '@shared/models/breadcrumb.model';
import { CategoryService } from '@shared/services/category.service';
import { ProductService } from '@shared/services/product.service';
import { ProductGridComponent } from '../../components/product-grid/product-grid.component';
import { BreadcrumbsComponent } from '../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { LoadingComponent } from '@shared/ui/components/loading/loading.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductGridComponent, BreadcrumbsComponent, LoadingComponent],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  category: Category | null = null;
  products: Product[] = [];
  loading = true;
  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Inicio', link: '/' },
    { label: 'Categoría', link: '' }
  ];

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.loadCategory(slug);
    }
  }

  private loadCategory(slug: string): void {
    this.categoryService.getBySlug(slug).subscribe({
      next: (category) => {
        if (category) {
          this.category = category;
          this.breadcrumbItems = [
            { label: 'Inicio', link: '/' },
            { label: category.name, link: '' }
          ];
          this.loadProducts(category.id);
        } else {
          this.loading = false;
        }
      },
      error: (error) => {
        console.error('Error loading category:', error);
        this.loading = false;
      }
    });
  }

  private loadProducts(categoryId: string): void {
    this.productService.getByCategory(categoryId).subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.loading = false;
      }
    });
  }
}

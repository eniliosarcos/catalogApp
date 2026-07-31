import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Product } from '@shared/models/product.model';
import { BreadcrumbItem } from '@shared/models/breadcrumb.model';
import { ProductService } from '@shared/services/product.service';
import { CartService } from '@shared/services/cart.service';
import { ProductGalleryComponent } from '../../components/product-gallery/product-gallery.component';
import { BreadcrumbsComponent } from '../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { LoadingComponent } from '@shared/ui/components/loading/loading.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ProductGalleryComponent, BreadcrumbsComponent, LoadingComponent],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  loading = true;
  quantity = 1;
  addedToCart = false;
  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Inicio', link: '/' },
    { label: 'Producto', link: '' }
  ];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.loadProduct(slug);
    }
  }

  private loadProduct(slug: string): void {
    this.productService.getBySlug(slug).subscribe({
      next: (product) => {
        if (product) {
          this.product = product;
          this.breadcrumbItems = [
            { label: 'Inicio', link: '/' },
            { label: product.name, link: '' }
          ];
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading product:', error);
        this.loading = false;
      }
    });
  }

  getDiscountPercentage(): number {
    if (!this.product?.discountPrice) return 0;
    return Math.round(((this.product.price - this.product.discountPrice) / this.product.price) * 100);
  }

  addToCart(): void {
    if (this.product && this.quantity > 0) {
      this.cartService.addItem(this.product, this.quantity).subscribe({
        next: () => {
          this.addedToCart = true;
          setTimeout(() => this.addedToCart = false, 3000);
        },
        error: (error) => {
          console.error('Error adding to cart:', error);
        }
      });
    }
  }
}

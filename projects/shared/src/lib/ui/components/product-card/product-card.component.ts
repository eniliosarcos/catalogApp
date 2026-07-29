import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'shared-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;

  getPrimaryImage(): string {
    const primary = this.product.images.find(img => img.isPrimary);
    return primary?.url || this.product.images[0]?.url || '';
  }

  getDiscountPercentage(): number {
    if (!this.product.discountPrice) return 0;
    return Math.round(((this.product.price - this.product.discountPrice) / this.product.price) * 100);
  }
}

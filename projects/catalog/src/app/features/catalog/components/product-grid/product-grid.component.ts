import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '@shared/models/product.model';
import { ProductCardComponent } from '@shared/ui/components/product-card/product-card.component';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.scss']
})
export class ProductGridComponent {
  @Input({ required: true }) products: Product[] = [];
}

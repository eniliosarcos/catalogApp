import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductImage } from '@shared/models/product.model';

@Component({
  selector: 'app-product-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-gallery.component.html',
  styleUrls: ['./product-gallery.component.scss']
})
export class ProductGalleryComponent {
  @Input({ required: true }) images: ProductImage[] = [];
  selectedImage: ProductImage | null = null;

  ngOnInit(): void {
    this.selectedImage = this.getPrimaryImage();
  }

  getPrimaryImage(): ProductImage | null {
    return this.images.find(img => img.isPrimary) || this.images[0] || null;
  }

  selectImage(image: ProductImage): void {
    this.selectedImage = image;
  }
}

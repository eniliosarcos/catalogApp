export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPrice?: number;
  stock: number;
  sku: string;
  categoryId: string;
  images: ProductImage[];
  tags: string[];
  isActive: boolean;
  createdAt: string;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  order: number;
}

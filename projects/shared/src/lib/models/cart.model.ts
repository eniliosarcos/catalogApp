import { Product } from './product.model';

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
}

export interface Cart {
  id: string;
  items: CartItem[];
  code: string;
  createdAt: string;
}

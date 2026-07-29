import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/catalog/pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'category/:slug',
    loadComponent: () => import('./features/catalog/pages/category/category.component').then(m => m.CategoryComponent)
  },
  {
    path: 'product/:slug',
    loadComponent: () => import('./features/catalog/pages/product-detail/product-detail.component').then(m => m.ProductDetailComponent)
  },
  {
    path: 'cart',
    loadComponent: () => import('./features/cart/pages/cart-view/cart-view.component').then(m => m.CartViewComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

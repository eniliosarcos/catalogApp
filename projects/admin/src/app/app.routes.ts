import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './features/admin/components/admin-layout/admin-layout.component';
import { DashboardComponent } from './features/admin/pages/dashboard/dashboard.component';
import { ProductsComponent } from './features/admin/pages/products/products.component';
import { CategoriesComponent } from './features/admin/pages/categories/categories.component';

export const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'categories', component: CategoriesComponent }
    ]
  }
];

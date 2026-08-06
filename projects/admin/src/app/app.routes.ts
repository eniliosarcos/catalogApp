import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './features/admin/components/admin-layout/admin-layout.component';
import { DashboardComponent } from './features/admin/pages/dashboard/dashboard.component';
import { ProductsComponent } from './features/admin/pages/products/products.component';
import { CategoriesComponent } from './features/admin/pages/categories/categories.component';
import { SettingsComponent } from './features/admin/pages/settings/settings.component';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canMatch: [authGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'settings', component: SettingsComponent },
    ]
  },
];

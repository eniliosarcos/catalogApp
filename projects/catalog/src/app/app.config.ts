import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ProductService } from '@shared/services/product.service';
import { CategoryService } from '@shared/services/category.service';
import { CartService } from '@shared/services/cart.service';
import { MockProductService } from './core/services/mock-product.service';
import { MockCategoryService } from './core/services/mock-category.service';
import { MockCartService } from './core/services/mock-cart.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    { provide: ProductService, useClass: MockProductService },
    { provide: CategoryService, useClass: MockCategoryService },
    { provide: CartService, useClass: MockCartService }
  ]
};

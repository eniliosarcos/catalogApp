import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideLucideIcons } from '@lucide/angular';
import {
  LucideLayoutDashboard,
  LucidePackage,
  LucideFolderOpen,
  LucideStore,
  LucideSettings,
  LucideLogOut,
} from '@lucide/angular';

import { routes } from './app.routes';
import { AuthService } from '@shared/services/auth.service';
import { MockAuthService } from './core/services/mock-auth.service';
import { ContactService } from '@shared/services/contact.service';
import { MockContactService } from './core/services/mock-contact.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideLucideIcons(
      LucideLayoutDashboard,
      LucidePackage,
      LucideFolderOpen,
      LucideStore,
      LucideSettings,
      LucideLogOut,
    ),
    { provide: AuthService, useClass: MockAuthService },
    { provide: ContactService, useClass: MockContactService },
  ],
};

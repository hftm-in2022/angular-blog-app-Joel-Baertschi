import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { ErrorHandler } from '@angular/core';
import { APP_ROUTES } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { GlobalErrorHandler } from './core/services/global-error-handler.service';
import { authConfig } from './core/auth/auth.config';
import { provideAuth } from 'angular-auth-oidc-client';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(APP_ROUTES, withComponentInputBinding()),
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
    provideAnimationsAsync(),
    provideHttpClient(),
    provideAuth(authConfig),
  ],
};

import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full',
  },
  {
    path: 'overview',
    loadChildren: () =>
      import('./features/blog-overview-page/blog-overview-page.routes'),
  },

  {
    path: 'detail',
    loadChildren: () =>
      import('./features/blog-detail-page/blog-detail-page.routes'),
  },

  {
    path: 'add-blog',
    loadChildren: () => import('./features/add-blog-page/add-blog-page.routes'),
    canActivate: [authGuard],
  },
];

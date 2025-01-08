import { Routes } from '@angular/router';
import { BlogOverviewPageComponent } from './features/blog-overview-page/blog-overview-page.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full',
  },
  {
    path: 'overview',
    component: BlogOverviewPageComponent,
  },

  // lazy Load für BlogDetail
  {
    path: 'detail',
    loadChildren: () =>
      import('./features/blog-detail-page/blog-detail-page.routes'),
  },
];

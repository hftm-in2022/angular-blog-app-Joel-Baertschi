import { Routes } from '@angular/router';
import { BlogDetailPageComponent } from './blog-detail-page.component';
import { BlogDetailResolver } from '../../core/services/blog-detail-resolver.service';

const BLOG_DETAIL_PAGE_ROUTES: Routes = [
  {
    path: ':id',
    component: BlogDetailPageComponent,
    resolve: { blog: BlogDetailResolver },
  },
];

export default BLOG_DETAIL_PAGE_ROUTES;

// features/add-blog-page/add-blog-page.routes.ts
import { Routes } from '@angular/router';
import { AddBlogPageComponent } from './add-blog-page.component';

const ADD_BLOG_PAGE_ROUTES: Routes = [
  {
    path: '', // Basisroute für Lazy Loaded Module
    component: AddBlogPageComponent,
  },
];

export default ADD_BLOG_PAGE_ROUTES;

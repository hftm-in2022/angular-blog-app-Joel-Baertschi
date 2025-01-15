import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { BlogDetails, BlogBackendService } from './blog-backend.service';

@Injectable({
  providedIn: 'root',
})
export class BlogDetailResolver implements Resolve<BlogDetails> {
  // resolver function anstelle Klasse verwenden
  constructor(private blogService: BlogBackendService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<BlogDetails> {
    const blogId = route.paramMap.get('id');
    return this.blogService.getBlogById(Number(blogId));
  }
}

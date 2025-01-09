import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { BlogBackendService } from '../services/blog-backend.service';

@Injectable({ providedIn: 'root' })
export class BlogTitleValidator {
  constructor(private blogService: BlogBackendService) {}

  validate(
    control: AbstractControl,
  ): Observable<{ titleExists?: boolean } | null> {
    if (!control.value) {
      return of(null);
    }

    return this.blogService.checkTitleExists(control.value).pipe(
      map((exists) => (exists ? { titleExists: true } : null)),
      catchError(() => of(null)),
    );
  }
}

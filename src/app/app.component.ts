import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { z } from 'zod';
import { environment } from '../environments/environment';
import { map, Observable } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

const BlogSchema = z.object({
  id: z.number(),
  title: z.string(),
  contentPreview: z.string(),
  author: z.string(),
  likes: z.number(),
  comments: z.number(),
  likedByMe: z.boolean(),
  createdByMe: z.boolean(),
  headerImageUrl: z.string().optional(),
});

const BlogArraySchema = z.array(BlogSchema);

const EntriesSchema = z.object({
  data: BlogArraySchema,
  pageIndex: z.number(),
  pageSize: z.number(),
  totalCount: z.number(),
  maxPageSize: z.number(),
});

export type Blog = z.infer<typeof BlogSchema>;

export type Entries = z.infer<typeof EntriesSchema>;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NgIf,
    AsyncPipe,
    MatCardModule,
    MatButtonModule,
    MatIcon,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'blog-app';

  httpClient = inject(HttpClient);
  blogs$: Observable<Entries>;

  constructor() {
    this.blogs$ = this.httpClient
      .get<Entries>(`${environment.serviceUrl}/entries`)
      .pipe(map((entries) => EntriesSchema.parse(entries)));
  }
}

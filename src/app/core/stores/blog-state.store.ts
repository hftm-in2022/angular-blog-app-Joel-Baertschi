// blog.store.ts

import { inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';

import {
  BlogBackendService,
  Entries,
  BlogDetails,
} from '../services/blog-backend.service';

// Unser State-Typ
export interface BlogState {
  // LISTE
  entries: Entries | null;
  isLoadingList: boolean;
  errorList: string | null;

  // DETAIL
  selectedBlog: BlogDetails | null;
  isLoadingDetail: boolean;
  errorDetail: string | null;
}

/**
 * Ausgangszustand des BlogState
 */
const initialBlogState: BlogState = {
  // LISTE
  entries: null,
  isLoadingList: false,
  errorList: null,

  // DETAIL
  selectedBlog: null,
  isLoadingDetail: false,
  errorDetail: null,
};

export const BlogStore = signalStore(
  // global oder lokal bereitstellen
  { providedIn: 'root' },

  // 1) State
  withState(initialBlogState),

  // 2) Methoden (Laden der Liste und des Details)
  withMethods((store, blogBackend = inject(BlogBackendService)) => ({
    // --------- LISTE laden ---------
    loadAll() {
      patchState(store, {
        isLoadingList: true,
        errorList: null,
      });

      // Observable-Aufruf via subscribe (du könntest auch rxMethod nutzen)
      blogBackend.getBlogPosts().subscribe({
        next: (entries) => {
          patchState(store, {
            entries,
            isLoadingList: false,
          });
        },
        error: (err) => {
          console.error('Fehler beim Laden der Blog-Liste:', err);
          patchState(store, {
            entries: null,
            isLoadingList: false,
            errorList: 'Fehler beim Laden der Blog-Liste',
          });
        },
      });
    },

    // --------- DETAIL laden ---------
    loadById(blogId: number) {
      patchState(store, {
        isLoadingDetail: true,
        errorDetail: null,
      });

      blogBackend.getBlogById(blogId).subscribe({
        next: (blogDetails) => {
          patchState(store, {
            selectedBlog: blogDetails,
            isLoadingDetail: false,
          });
        },
        error: (err) => {
          console.error('Fehler beim Laden des Blog-Details:', err);
          patchState(store, {
            selectedBlog: null,
            isLoadingDetail: false,
            errorDetail: 'Fehler beim Laden des Blog-Details',
          });
        },
      });
    },

    // Optional zum Zurücksetzen
    clearSelectedBlog() {
      patchState(store, {
        selectedBlog: null,
        isLoadingDetail: false,
        errorDetail: null,
      });
    },
  })),
);

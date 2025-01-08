import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { BlogOverviewCardComponent } from '../../shared/blog-overview-card/blog-overview-card.component';
import { BlogStore } from '../../core/stores/blog-state.store'; // Pfad an dein Projekt anpassen

@Component({
  selector: 'app-blog-overview-page',
  standalone: true,
  imports: [CommonModule, RouterLink, BlogOverviewCardComponent],
  templateUrl: './blog-overview-page.component.html',
  styleUrls: ['./blog-overview-page.component.scss'],
})
export class BlogOverviewPageComponent implements OnInit {
  // Wir injecten den Store statt @Input
  private store = inject(BlogStore);

  // Beim Aufruf der Komponente laden wir einmal alle Blogs
  ngOnInit(): void {
    this.store.loadAll();
  }

  // Für *ngFor trackBy-Funktion (optional)
  trackBlog(index: number, blog: { id: number }) {
    return blog.id;
  }

  // Getter, um im Template an die Daten zu kommen
  get entries() {
    return this.store.entries();
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlogOverviewPageComponent } from './blog-overview-page.component';
import { BlogOverviewCardComponent } from '../../shared/blog-overview-card/blog-overview-card.component';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterTestingModule } from '@angular/router/testing';
import { signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BlogStore } from '../../core/stores/blog-state.store';

// ngx-translate für Mehrsprachigkeit
import {
  TranslateModule,
  TranslateLoader,
  TranslateService,
  TranslateStore,
} from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Mock-Klasse für BlogStore
class MockBlogStore {
  private _entries = signal({
    pageSize: 1,
    data: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      title: `Blog Title ${i + 1}`,
      contentPreview: `Preview for Blog ${i + 1}`,
      author: `Author ${i + 1}`,
      likes: i * 2,
      comments: i + 1,
      likedByMe: i % 2 === 0,
      createdByMe: i % 2 === 0,
    })),
    pageIndex: 1,
    totalCount: 10,
    maxPageSize: 1,
  });

  private _isLoadingList = signal(false);
  private _errorDetail = signal<string | null>(null);

  loadAll() {
    // Diese Methode wird für Tests leer gelassen
  }

  entries() {
    return this._entries();
  }

  isLoadingList() {
    return this._isLoadingList();
  }

  errorDetail() {
    return this._errorDetail();
  }

  setEntries(entries: never) {
    this._entries.set(entries);
  }

  setLoading(isLoading: boolean) {
    this._isLoadingList.set(isLoading);
  }

  setErrorDetail(error: string | null) {
    this._errorDetail.set(error);
  }
}

// Translate Loader für ngx-translate in Tests
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

describe('BlogOverviewPageComponent', () => {
  let component: BlogOverviewPageComponent;
  let fixture: ComponentFixture<BlogOverviewPageComponent>;
  let mockBlogStore: MockBlogStore;

  beforeEach(async () => {
    mockBlogStore = new MockBlogStore();

    await TestBed.configureTestingModule({
      imports: [
        BlogOverviewPageComponent, // Standalone-Komponente
        CommonModule,
        RouterTestingModule,
        MatProgressSpinnerModule,
        BlogOverviewCardComponent, // Import der Blog-Karten-Komponente
        HttpClientTestingModule, // Verhindert echte HTTP-Anfragen in Tests
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
          },
        }),
      ],
      providers: [
        { provide: BlogStore, useValue: mockBlogStore }, // Bereitstellung des Mock-Stores
        TranslateService,
        TranslateStore, // WICHTIG: TranslateStore muss bereitgestellt werden
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogOverviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load all blogs on initialization', () => {
    spyOn(mockBlogStore, 'loadAll');
    component.ngOnInit();
    expect(mockBlogStore.loadAll).toHaveBeenCalled();
  });

  it('should display the correct number of blog cards', () => {
    const blogCards = fixture.debugElement.queryAll(
      By.css('[data-testid="blog-card"]'),
    );
    expect(blogCards.length).toBe(20);
  });

  it('should display the loading spinner when loading', () => {
    mockBlogStore.setLoading(true);
    fixture.detectChanges();

    const spinner = fixture.debugElement.query(
      By.css('[data-testid="loading-spinner"]'),
    );
    expect(spinner).toBeTruthy();
  });

  it('should display an error message if there is an error', () => {
    const errorMessage = 'Failed to load blogs';
    mockBlogStore.setErrorDetail(errorMessage);
    fixture.detectChanges();

    const errorElement = fixture.debugElement.query(
      By.css('[data-testid="error-message"]'),
    );
    expect(errorElement).toBeTruthy();
    expect(errorElement.nativeElement.textContent.trim()).toBe(errorMessage);
  });
});

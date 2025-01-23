import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlogOverviewPageComponent } from './blog-overview-page.component';
import { BlogOverviewCardComponent } from '../../shared/blog-overview-card/blog-overview-card.component';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterTestingModule } from '@angular/router/testing';
import { signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BlogStore } from '../../core/stores/blog-state.store';

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
    // Method intentionally left blank for mocking purposes
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

describe('BlogOverviewPageComponent', () => {
  let component: BlogOverviewPageComponent;
  let fixture: ComponentFixture<BlogOverviewPageComponent>;
  let mockBlogStore: MockBlogStore;

  beforeEach(async () => {
    mockBlogStore = new MockBlogStore();

    await TestBed.configureTestingModule({
      imports: [
        BlogOverviewPageComponent,
        CommonModule,
        RouterTestingModule,
        MatProgressSpinnerModule,
        BlogOverviewCardComponent,
      ],
      providers: [{ provide: BlogStore, useValue: mockBlogStore }],
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

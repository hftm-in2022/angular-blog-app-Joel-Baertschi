import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BlogOverviewCardComponent } from './blog-overview-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('BlogOverviewCardComponent', () => {
  let component: BlogOverviewCardComponent;
  let fixture: ComponentFixture<BlogOverviewCardComponent>;
  let debugElement: DebugElement;

  const mockBlog = {
    author: 'John Doe',
    comments: 5,
    contentPreview: 'This is a preview of the blog content.',
    createdByMe: false,
    id: 1,
    likedByMe: false,
    likes: 10,
    title: 'Sample Blog Title',
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        BlogOverviewCardComponent,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogOverviewCardComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    component.blog = mockBlog;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the blog content preview', () => {
    const contentElement = debugElement.query(
      By.css('mat-card-content p'),
    ).nativeElement;
    expect(contentElement.textContent).toContain(mockBlog.contentPreview);
  });

  it('should display the blog author', () => {
    const authorElement = debugElement.query(
      By.css('.blog-author p'),
    ).nativeElement;
    expect(authorElement.textContent).toContain(
      `Written by: ${mockBlog.author}`,
    );
  });

  it('should have a favorite button with tooltip', () => {
    const favoriteButton = debugElement.queryAll(By.css('button'))[0];
    expect(favoriteButton.attributes['aria-label']).toBe('Like this blog');
  });

  it('should have a share button with tooltip', () => {
    const shareButton = debugElement.queryAll(By.css('button'))[1];
    expect(shareButton.attributes['aria-label']).toBe('Share this blog');
  });
});

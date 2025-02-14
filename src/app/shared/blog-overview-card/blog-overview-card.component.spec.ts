import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BlogOverviewCardComponent } from './blog-overview-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

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

// Translate Loader für Tests
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

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
        HttpClientTestingModule, // Verhindert echte HTTP-Requests in Tests
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
          },
        }),
      ],
      providers: [
        TranslateService,
        TranslateStore, // **WICHTIG: Muss bereitgestellt werden!**
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
    expect(authorElement.textContent).toContain(`${mockBlog.author}`);
  });
});

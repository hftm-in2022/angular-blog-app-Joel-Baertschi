import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { BlogBackendService } from './blog-backend.service';
import { environment } from '../../../environments/environment';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { of } from 'rxjs';

const mockOidcSecurityService = {
  getAccessToken: jasmine
    .createSpy('getAccessToken')
    .and.returnValue(of('mock-token')),
};

describe('BlogBackendService', () => {
  let service: BlogBackendService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        BlogBackendService,
        { provide: OidcSecurityService, useValue: mockOidcSecurityService },
      ],
    });

    service = TestBed.inject(BlogBackendService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch blog posts', () => {
    const mockEntries = {
      data: [
        {
          id: 1,
          title: 'Test Blog',
          contentPreview: 'Test Preview',
          author: 'Author',
          likes: 10,
          comments: 5,
          likedByMe: false,
          createdByMe: false,
        },
      ],
      pageIndex: 1,
      pageSize: 10,
      totalCount: 1,
      maxPageSize: 10,
    };

    service.getBlogPosts().subscribe((entries) => {
      expect(entries).toEqual(mockEntries);
    });

    const req = httpMock.expectOne(`${environment.serviceUrl}/entries`);
    expect(req.request.method).toBe('GET');
    req.flush(mockEntries);
  });

  it('should handle error when fetching blog posts', () => {
    service.getBlogPosts().subscribe({
      next: () => fail('Expected an error, but got a response'),
      error: (err) => {
        expect(err).toBeTruthy();
      },
    });

    const req = httpMock.expectOne(`${environment.serviceUrl}/entries`);
    expect(req.request.method).toBe('GET');
    req.flush('Error fetching blogs', {
      status: 500,
      statusText: 'Server Error',
    });
  });

  it('should fetch blog by ID', () => {
    const mockBlog = {
      id: 1,
      title: 'Test Blog',
      contentPreview: 'Test Preview',
      author: 'Author',
      likes: 10,
      likedByMe: false,
      createdByMe: false,
      updatedAt: '2023-01-01T00:00:00Z',
      createdAt: '2023-01-01T00:00:00Z',
      content: 'Full content',
      comments: [],
    };

    service.getBlogById(1).subscribe((blog) => {
      expect(blog).toEqual(mockBlog);
    });

    const req = httpMock.expectOne(`${environment.serviceUrl}/entries/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockBlog);
  });

  it('should handle error when fetching blog by ID', () => {
    service.getBlogById(1).subscribe({
      next: () => fail('Expected an error, but got a response'),
      error: (err) => {
        expect(err).toBeTruthy();
      },
    });

    const req = httpMock.expectOne(`${environment.serviceUrl}/entries/1`);
    expect(req.request.method).toBe('GET');
    req.flush('Error fetching blog', { status: 404, statusText: 'Not Found' });
  });

  it('should check if a title exists', () => {
    service.checkTitleExists('Test Title').subscribe((exists) => {
      expect(exists).toBe(true);
    });

    const req = httpMock.expectOne(
      `${environment.serviceUrl}/check-title?title=Test Title`,
    );
    expect(req.request.method).toBe('GET');
    req.flush(true);
  });

  it('should add a blog', () => {
    const mockBlog = {
      id: 1,
      title: 'New Blog',
      contentPreview: 'Preview Content',
      author: 'Author',
      likes: 0,
      comments: 0,
      likedByMe: false,
      createdByMe: true,
    };

    service
      .addBlog({ title: 'New Blog', content: 'Full Content' })
      .subscribe((blog) => {
        expect(blog).toEqual(mockBlog);
      });

    const req = httpMock.expectOne(`${environment.serviceUrl}/entries`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe('Bearer mock-token');
    req.flush(mockBlog);
  });

  it('should handle error when adding a blog', () => {
    service.addBlog({ title: 'New Blog', content: 'Full Content' }).subscribe({
      next: () => fail('Expected an error, but got a response'),
      error: (err) => {
        expect(err).toBeTruthy();
      },
    });

    const req = httpMock.expectOne(`${environment.serviceUrl}/entries`);
    expect(req.request.method).toBe('POST');
    req.flush('Error adding blog', { status: 400, statusText: 'Bad Request' });
  });
});

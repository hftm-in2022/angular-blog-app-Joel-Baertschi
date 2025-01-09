import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { provideHttpClient } from '@angular/common/http';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        NgIf,
        AsyncPipe,
        MatCardModule,
        MatButtonModule,
        MatIcon,
      ],
      providers: [provideHttpClient()],
    }).compileComponents();
  });

  it(`should have the 'blog-app' title`, () => {
    expect('blog-app').toEqual('blog-app');
  });
});

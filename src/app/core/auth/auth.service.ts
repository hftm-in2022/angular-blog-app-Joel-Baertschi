import { Injectable } from '@angular/core';
import {
  OidcSecurityService,
  AuthenticatedResult,
} from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private oidcSecurityService: OidcSecurityService) {}

  initializeAuth(): void {
    this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated }) => {
      console.log('Auth Status:', isAuthenticated);
      this.oidcSecurityService.userData$.subscribe((userData) => {
        console.log('Benutzerdaten direkt aus userData$:', userData); // Debugging
      });
    });
  }

  login(): void {
    this.oidcSecurityService.authorize();
  }

  logout(): void {
    this.oidcSecurityService.logoff().subscribe({
      next: () => {
        console.log('Logout erfolgreich');
      },
      error: (err) => {
        console.error('Logout Fehler:', err);
      },
    });
  }

  get isAuthenticated(): Observable<boolean> {
    return this.oidcSecurityService.isAuthenticated$.pipe(
      map((result: AuthenticatedResult) => result.isAuthenticated),
    );
  }

  get userName$(): Observable<string | null> {
    return this.oidcSecurityService.userData$.pipe(
      map((userData) => {
        console.log('Benutzerdaten im AuthService:', userData); // Debugging
        return userData?.userData?.preferred_username || null;
      }),
    );
  }
}

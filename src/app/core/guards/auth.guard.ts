import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';

function hasRole(accessToken: string, role: string): boolean {
  const decodedToken = JSON.parse(atob(accessToken.split('.')[1]));
  const roles: string[] = decodedToken?.realm_access?.roles || [];
  return roles.includes(role);
}

export const authGuard: CanActivateFn = () => {
  const oidcSecurityService = inject(OidcSecurityService);
  const router = inject(Router);

  return new Promise<boolean>((resolve) => {
    oidcSecurityService.checkAuth().subscribe(({ isAuthenticated }) => {
      // besser mit Promise oder Observable Rückgabetyp
      if (!isAuthenticated) {
        router.navigate(['']);
        resolve(false);
      } else {
        oidcSecurityService.getAccessToken().subscribe((accessToken) => {
          // doppelter subscribe
          if (accessToken && hasRole(accessToken, 'user')) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      }
    });
  });
};

import { PassedInitialConfig } from 'angular-auth-oidc-client';
import { environment } from '../../../environments/environment';

export const authConfig: PassedInitialConfig = {
  config: {
    authority: `${environment.authUrl}/realms/blog`,
    redirectUrl: window.location.origin,
    postLogoutRedirectUri: window.location.origin,
    clientId: 'spa-blog',
    scope: 'openid profile email offline_access blogs', // 'openid profile offline_access ' + your scopes
    responseType: 'code',
    silentRenew: true,
    silentRenewUrl: window.location.origin + '/silent-renew.html',
    renewTimeBeforeTokenExpiresInSeconds: 10,
    secureRoutes: [environment.serviceUrl],
  },
};

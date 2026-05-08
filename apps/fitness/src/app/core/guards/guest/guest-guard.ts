import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const guestGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const cookieService = inject(CookieService)

  if (cookieService.get('fitness-access-token')) {
    return router.parseUrl('/home');
  } else {
    return true;
  }
};

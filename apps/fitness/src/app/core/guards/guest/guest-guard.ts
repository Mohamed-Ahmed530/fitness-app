import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const guestGuard: CanActivateFn = (route, state) => {
  const platformId = inject(PLATFORM_ID);
  const router = inject(Router);

  if (isPlatformBrowser(platformId)) {
    if (localStorage.getItem('fitness-access-token')) {
      return router.parseUrl('/home');
    } else {
      return true;
    }
  } else {
    return true;
  }
};

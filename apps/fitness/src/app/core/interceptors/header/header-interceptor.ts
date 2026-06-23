import { HttpInterceptorFn } from '@angular/common/http';
import { inject, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);
  const injector = inject(Injector);

  const token = cookieService.get('fitness-access-token');
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  if (req.url.includes('elevate')) {
    // بنجيب الـ TranslateService يدوياً هنا عند الحاجة فقط لتجنب الـ Circular Dependency
    const translateService = injector.get(TranslateService);
    const lang = translateService.currentLang() || 'en';
    req = req.clone({
      setHeaders: {
        'accept-language': lang,
      },
    });
    
  }
  

  return next(req);
};

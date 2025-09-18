import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { catchError, switchMap, throwError } from 'rxjs';
import { IdentityService } from '../components/admin-layout/identityComponent/identity-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const identityService = inject(IdentityService);

  return next(req).pipe(
    catchError(err => {
      if (err.status === 401) {
        const oldRefreshToken = localStorage.getItem("refreshToken"); 
        if (!oldRefreshToken) {
          return throwError(() => err);
        }

        return identityService.refreshToken(oldRefreshToken).pipe(
          switchMap((res: any) => {
            localStorage.setItem("refreshToken", res.refreshToken);

            const newReq = req.clone({
              setHeaders: { Authorization: `Bearer ${res.accessToken}` }
            });
            return next(newReq);
          })
        );
      }
      return throwError(() => err);
    })
  );
};

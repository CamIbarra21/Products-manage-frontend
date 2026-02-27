import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { catchError, switchMap, throwError } from 'rxjs';
import { isForInStatement } from 'typescript';
import { ToastService } from '../services/toast-service';
import { TokenApi } from '../models/token';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const myToken = authService.getToken();
  const toastMessage = inject(ToastService);

  if(myToken){
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${myToken}`}
    })
  }

  return next(req).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
        toastMessage.showError("Error with Token, please login again.");

        let tokenApi = new TokenApi();
        tokenApi.accesToken = authService.getToken()?? '';
        tokenApi.refreshToken = authService.getRefreshToken()?? '';

        return authService.renewToken(tokenApi).pipe(
          switchMap((res: any) => {
            const newToken = res.data.token;
            authService.storeToken(newToken);
            authService.storeRefreshToken(res.data.refreshToken);

            const clonedReq = req.clone({
              setHeaders: { Authorization: `Bearer ${newToken}` }
            });

            return next(clonedReq);
          }),
          catchError(refreshErr => {
            toastMessage.showError("Error with Token, please login again.");
            authService.signOut();
            return throwError(() => refreshErr);
          })
        );

        }
      }
      return throwError(() => new Error("Some other error occur"));
    })
  );
};


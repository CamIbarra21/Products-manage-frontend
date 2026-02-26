import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { catchError, throwError } from 'rxjs';
import { isForInStatement } from 'typescript';
import { ToastService } from '../services/toast-service';

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
        toastMessage.showError("Error with Token");
      }
      return throwError(() => new Error("Some other error occur"));
    })
  );
};

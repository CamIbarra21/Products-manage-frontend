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
        if (err.status === 401) {
          toastMessage.showError("Error with Token");
        } else if (err.status === 403){
          toastMessage.showWarn("Your role does not have the required access level")
        }
      }
      console.log(err);
      if (err.error != null)
        return throwError(() => new Error(`${err.error.message}`));
      else
        console.log(err.message);
        return throwError(() => new Error("Something else happened"));
    })
  );
};

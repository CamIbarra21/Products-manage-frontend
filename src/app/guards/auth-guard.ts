import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { ToastService } from '../services/toast-service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastMessage = inject(ToastService)

  if (authService.isLoggin()) {
    return true;
  } else {
    toastMessage.showWarn("Please login first");
    router.navigate(['/login']);
    return false;
  }

};

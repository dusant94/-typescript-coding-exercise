import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const loginGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    router.navigate(['/chat']);  // Redirect to the login page
    return false;  // Prevent access to the route
  } else {
    return true;  // Prevent access to the route
  }
};

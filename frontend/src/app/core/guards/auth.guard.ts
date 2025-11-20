import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../services/auth/auth';
import { map, catchError, of } from 'rxjs';

export const authGuard = () => {
  const authService = inject(Auth);
  const router = inject(Router);

  return authService.getCurrentUser().pipe(
    map(() => true),
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};

export const loginGuard = () => {
  const authService = inject(Auth);
  const router = inject(Router);

  return authService.getCurrentUser().pipe(
    map(() => {
      router.navigate(['/']);
      return false;
    }),
    catchError(() => of(true))
  );
};
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthService);
  const authToken = request.url.includes('token/refresh')
    ? authService.loadRT()
    : authService.loadAT();

  const authRequest = request.clone({
    headers: request.headers
      .set('Authorization', `Bearer ${authToken}`)
      .set('ngrok-skip-browser-warning', 'true'),
  });
  return next(authRequest);
};

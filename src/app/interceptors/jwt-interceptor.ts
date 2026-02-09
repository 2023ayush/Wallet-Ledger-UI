// src/app/interceptors/jwt-interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  // Get token from localStorage
  const token = localStorage.getItem('token');

  // If token exists, clone the request and add Authorization header
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // Continue with the request
  return next(req);
};
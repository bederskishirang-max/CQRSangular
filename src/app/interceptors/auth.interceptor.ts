import { JwtHelperService } from '@auth0/angular-jwt';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const jwtHelper = new JwtHelperService();
  const router = inject(Router);

  const token = localStorage.getItem('token');

  if (token) {

    if (jwtHelper.isTokenExpired(token)) {
      localStorage.removeItem('token');
      router.navigate(['/login']);
      return next(req);
    }

    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};
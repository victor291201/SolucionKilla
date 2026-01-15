import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  if (req.url.includes('/login') || req.url.includes('/register')) {
    return next(req);
  }

  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Token ${token}`
      }
    });
    return next(authReq);
  }

  return next(req);
};
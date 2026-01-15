import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const authGuard = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  console.log('--- PASANDO POR EL GUARD ---');
  console.log('Token encontrado:', token);

  if (token) {
    console.log('Acceso permitido');
    return true;
  } else {
    console.log('Acceso denegado, moviendo a login');
    router.navigate(['/iniciar-sesion']);
    return false;
  }
};
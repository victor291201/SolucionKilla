import { Routes } from '@angular/router';
import { Notas } from './vistas/notas/notas';
import { IniciarSesion } from './vistas/iniciar-sesion/iniciar-sesion';
import { authGuard } from './guards/auth.guard';
import { Registrarse } from './vistas/registrarse/registrarse';

export const routes: Routes = [
  { path: 'iniciar-sesion', component: IniciarSesion },
  { path: 'registrarse', component: Registrarse },
  { path: 'notas', component: Notas, canActivate: [authGuard] }, 
  
  { path: '', redirectTo: 'iniciar-sesion', pathMatch: 'full' },
  { path: '**', redirectTo: 'iniciar-sesion' }
];
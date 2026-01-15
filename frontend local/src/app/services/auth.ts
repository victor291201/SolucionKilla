import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api/'; //local
  //private apiUrl = 'https://tasks-notes-g3e4hubxd2fxcaej.canadacentral-01.azurewebsites.net/api/'; //remoto

  constructor(private http: HttpClient, private router: Router) {}

  registrarse(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}register/`, userData);
  }

  iniciarSesion(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}login/`, credentials).pipe(
      tap(res => {
        if (res.token) {
          localStorage.setItem('token', res.token); 
        }
      })
    );
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    this.router.navigate(['/iniciar-sesion']);
  }

  estaLogueado(): boolean {
    return !!localStorage.getItem('token');
  }
}
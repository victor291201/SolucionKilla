import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './iniciar-sesion.html',
})
export class IniciarSesion {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
  this.authService.iniciarSesion(this.loginForm.value).subscribe({
    next: (res) => {
      console.log('Respuesta de Django:', res); 
      if (res.token) {
        console.log('Token recibido y guardado');
        this.router.navigate(['/notas']);
      }
    },
    error: (err) => {
      console.error('Error en el login:', err);
      alert('Error: ' + (err.error?.non_field_errors || 'Credenciales inválidas'));
    }
  });
}
}
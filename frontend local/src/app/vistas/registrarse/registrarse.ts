import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registrarse',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './registrarse.html'
})
export class Registrarse {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
  username: ['', [Validators.required]], 
  password: ['', [Validators.required]]
});
    
  }

  onRegister() {
  console.log("Datos a enviar:", this.registerForm.value);
  if (this.registerForm.valid) {
    this.authService.registrarse(this.registerForm.value).subscribe({
      next: (res) => {
        alert('¡Usuario creado!');
        this.router.navigate(['/iniciar-sesion']);
      },
      error: (err) => {
        console.error('Error del servidor:', err);
        alert('Error: ' + (err.error?.error || 'No se pudo registrar'));
      }
    });
  } else {
    alert('Formulario inválido. Revisa los campos.');
  }
}
}
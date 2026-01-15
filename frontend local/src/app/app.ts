import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IniciarSesion } from './vistas/iniciar-sesion/iniciar-sesion';
import { Registrarse } from "./vistas/registrarse/registrarse";
import { Notas } from "./vistas/notas/notas";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('nota');
}

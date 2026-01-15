import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../services/task';
import { CommonModule } from '@angular/common'; 
import { Observable, take } from 'rxjs';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-notas',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], 
  templateUrl: './notas.html',
  styleUrl: './notas.css',
})
export class Notas implements OnInit {

  taskForm: FormGroup;
  tasks$: Observable<any[]>;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private AuthService: AuthService
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required]],
      description: [''],
      completed: [false]
    });

    this.tasks$ = this.taskService.tasks$;
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.taskForm.valid) {
      this.taskService.createTask(this.taskForm.value).subscribe({
        next: (response) => {
          console.log('Tarea creada con éxito', response);
          this.taskForm.reset({ completed: false });
        },
        error: (err) => console.error('Error al crear tarea', err)
      });
    }
  }

  eliminarTarea(id: number) {
    if (confirm('¿Seguro que quieres eliminar esta nota?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => console.log('Tarea eliminada correctamente'),
        error: (err) => console.error('Error al eliminar', err)
      });
    }
  }
  cerrarSesion() {
    if (confirm('¿Seguro que quieres cerrar sesion?')) {
      this.AuthService.cerrarSesion()
    }
  }
eliminarTodo() {
  this.tasks$.pipe(take(1)).subscribe(tasks => {
    if (tasks.length === 0) {
      alert('No hay notas para eliminar.');
      return;
    }

    if (confirm('¿Estás seguro de que quieres borrar TODAS las notas?')) {
      this.taskService.deleteAllTasks().subscribe({
        next: () => {
          console.log('Borrado masivo completado');
        },
        error: (err) => {
          alert('No se pudieron borrar todas las notas. Revisa tu conexión.');
        }
      });
    }
  });
}
  editar(id: number, nuevoTitulo: string, nuevaDesc: string,nuevoCompleted: boolean) {
  const datosActualizados = {
    title: nuevoTitulo,
    description: nuevaDesc,
    completed: nuevoCompleted 
  };
  this.taskService.updateTask(id, datosActualizados).subscribe({
    next: () => alert('Tarea actualizada correctamente'),
    error: (err) => console.error('Error al editar', err)
  });
  
}
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, forkJoin, throwError, of } from 'rxjs';
import {catchError, switchMap, take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://127.0.0.1:8000/api/tasks/'; //local
  //private apiUrl = 'https://tasks-notes-g3e4hubxd2fxcaej.canadacentral-01.azurewebsites.net/api/tasks/'; //remoto
  
  private tasksSubject = new BehaviorSubject<any[]>([]);
  
  tasks$ = this.tasksSubject.asObservable();

  constructor(private http: HttpClient) {
    this.refreshTasks();
  }

  refreshTasks() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (tasks) => this.tasksSubject.next(tasks),
      error: (err) => console.error('Error al obtener tareas', err)
    });
  }

  createTask(task: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, task).pipe(
      tap(() => this.refreshTasks()) 
    );
  }


  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`).pipe(
      tap(() => this.refreshTasks())
    );
  }
  updateTask(id: number, taskData: any): Observable<any> {
  return this.http.put<any>(`${this.apiUrl}${id}/`, taskData).pipe(
    tap(() => {
      alert('Nota actualizada con éxito');
      this.refreshTasks();
    })
  );
}
deleteAllTasks(): Observable<any> {
  const backupTasks = this.tasksSubject.value;

  if (backupTasks.length === 0) return of(null);

  this.tasksSubject.next([]);

  const deleteRequests = backupTasks.map(t => 
    this.http.delete(`${this.apiUrl}${t.id}/`)
  );

  return forkJoin(deleteRequests).pipe(
    catchError(err => {
      this.tasksSubject.next(backupTasks);
      console.error('Error al eliminar en el servidor, restaurando datos...');
      return throwError(() => err);
    }),
    tap(() => this.refreshTasks())
  );
}
}
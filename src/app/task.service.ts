import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

interface Task {
  id: number;
  name: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [
    { id: 1, name: 'Task 1', completed: false },
    { id: 2, name: 'Task 2', completed: true },
    { id: 3, name: 'Task 3', completed: false },
  ];

  constructor(private http: HttpClient) {}

  // handling errors
  private handleError(error: any) {
    console.error(error);
    return throwError(error);
  }


  // fetching data from a REST API
  fetchTasks(): Observable<Task[]> {
    return this.http
      .get<Task[]>('https://jsonplaceholder.typicode.com/posts')
      .pipe(catchError(this.handleError));
  }

  // fetching data from a local array
  getTasks(): Task[] {
    return this.tasks;
  }

  // adding and removing data from a local array
  addTask(task: string): void {
    let newId = this.tasks[this.tasks.length - 1].id + 1;
    this.tasks.push({ id: newId, name: task, completed: false });
  }

  removeTask(task: Task): void {
    const index = this.tasks.indexOf(task);
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
  }
}

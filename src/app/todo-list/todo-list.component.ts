import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';

interface Task {
  id: number;
  name: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  tasks: Task[] = [];

  newTask: Task = { id: 0, name: '', completed: false };

  constructor(private taskService: TaskService) {}

  addTask(taskName: string) {
    this.taskService.addTask(taskName);
  }

  removeTsk(task: Task) {
    this.taskService.removeTask(task);
  }

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
  }
}

import { Component } from '@angular/core';
import { TaskService, Task } from './task.service';
import { TaskFormComponent } from './task-form/task-form.component'; // Import TaskFormComponent
import { TaskListComponent } from './task-list/task-list.component'; // Import TaskListComponent

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [TaskFormComponent, TaskListComponent], // Import the standalone components here
})
export class AppComponent {
  editingTask: Task | null = null;  // Task being edited

  constructor(private taskService: TaskService) {}

  // Method to handle the task edit event
  onEditTask(task: Task): void {
    this.editingTask = task;  // Set the task to be edited
  }
}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TaskService, Task } from '../task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule], // Required for *ngFor
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  @Output() editTaskEvent: EventEmitter<Task> = new EventEmitter(); // Event to notify parent of editing task

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.tasks = this.taskService.getTasks();
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id);
    this.loadTasks(); // Reload tasks after deleting
  }

  editTask(task: Task): void {
    this.editTaskEvent.emit(task);  // Emit the task to be edited to parent
  }
}

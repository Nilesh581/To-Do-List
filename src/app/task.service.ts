import { Injectable } from '@angular/core';

export interface Task {
  id: number;
  title: string;
  status: string;
  dueDate: string;
  priority: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [];
  private taskId = 1; // To generate unique IDs for tasks

  // Get all tasks
  getTasks(): Task[] {
    return this.tasks;
  }

  // Add a new task
  addTask(task: Task): void {
    task.id = this.taskId++;  // Assign a unique ID to each new task
    this.tasks.push(task);
  }

  // Delete a task
  deleteTask(id: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  // Update an existing task
  updateTask(updatedTask: Task): void {
    const taskIndex = this.tasks.findIndex((task) => task.id === updatedTask.id);
    if (taskIndex !== -1) {
      this.tasks[taskIndex] = updatedTask;
    }
  }
}

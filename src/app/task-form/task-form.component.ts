import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TaskService, Task } from '../task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule], // Required for ngModel
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent implements OnChanges {
  @Input() editingTask: Task | null = null;  // Input to receive task for editing
  taskTitle: string = '';
  taskStatus: string = 'Not Started';  // Default status
  taskDueDate: string = '';
  taskPriority: string = 'Low';  // Default priority
  taskDescription: string = '';

  constructor(private taskService: TaskService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editingTask'] && this.editingTask) {
      // If editingTask is set, populate the form with existing task data
      this.taskTitle = this.editingTask.title;
      this.taskStatus = this.editingTask.status;
      this.taskDueDate = this.editingTask.dueDate;
      this.taskPriority = this.editingTask.priority;
      this.taskDescription = this.editingTask.description;
    }
  }

  // Add or update task
  submitTask(): void {
    if (this.taskTitle.trim()) {
      const newTask: Task = {
        id: this.editingTask ? this.editingTask.id : 0,
        title: this.taskTitle,
        status: this.taskStatus,
        dueDate: this.taskDueDate,
        priority: this.taskPriority,
        description: this.taskDescription,
      };

      if (this.editingTask) {
        this.taskService.updateTask(newTask); // Update the task if editing
      } else {
        this.taskService.addTask(newTask); // Add new task
      }

      this.resetForm();  // Reset the form after submitting
    }
  }

  // Reset the form
  resetForm(): void {
    this.taskTitle = '';
    this.taskStatus = 'Not Started';
    this.taskDueDate = '';
    this.taskPriority = 'Low';
    this.taskDescription = '';
    this.editingTask = null;
  }
}

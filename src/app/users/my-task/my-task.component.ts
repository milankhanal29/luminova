import {Component, OnInit} from '@angular/core';
import {HeaderService} from "../services/header.service";
import {ProductService} from "../services/product.service";
import {UserApiService} from "../../admin/admin-services/user-api.service";
import {TaskService} from "../../admin/task/task.service";
import {ToasterService} from "../services/toaster.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-sent-gift',
  templateUrl: './my-task.component.html',
  styleUrls: ['./my-task.component.css'
  ]
})
export class MyTaskComponent implements OnInit {
  dailyLogs: any[] = [];
  tasks: any[] = [];
  user!: any ;
  taskForm!:FormGroup;
  statusOptions: string[] = ['IN_PROGRESS', 'COMPLETED', 'CANCELLED'];
  constructor(
  private userService:UserApiService,
  private toasterService:ToasterService,
  private headerService: HeaderService,
  private productService: ProductService,
  private fb: FormBuilder,
  private taskService: TaskService
  ) {
    this.taskForm = this.fb.group({
      status: ['', Validators.required],
    });
  }
  userId!: number;
  isEditingStatus: { [key: number]: boolean } = {};
  ngOnInit() {
    this.loadTasks();
    this.loadUserById();

  }
  startEditingStatus(task: any): void {
    this.isEditingStatus[task.id] = true; // Mark the task as being edited
  }

  stopEditingStatus(task: any): void {
    this.isEditingStatus[task.id] = false;
    this.updateTaskStatus(task);
  }

  onStatusChange(task: any): void {
    const updatedStatus = this.taskForm.controls['status'].value;
    task.status = updatedStatus;
  }

  updateTaskStatus(task: any): void {
    this.taskService.updateTaskStatus(task.id, task.status).subscribe(
      (response: any) => {
        this.toasterService.successMessage('Task status updated successfully', 'success');
      },
      (error: any) => {
        this.toasterService.errorMessage('Error updating task status', 'error');
        console.error('Error:', error);
      }
    );
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'IN_PROGRESS': return 'bg-warning text-dark';
      case 'COMPLETED': return 'bg-success text-white';
      case 'CANCELLED': return 'bg-danger text-white';
      default: return '';
    }
  }
  loadUserById(): void {
    const email = this.headerService.getRoleAndEmail().email;
    this.productService.getUserIdByEmail(email).subscribe((userId: any) => {
      this.userService.getUserById(userId)
        .subscribe(
          (value: any | undefined) => {
            if (value) {
              this.user = value;
            } else {
              console.error('User not found');
            }
          },
          (error: any) => {
            console.error('Error fetching User details:', error);
          }
        );
    });
  }

  loadTasks(): void {
    const email = this.headerService.getRoleAndEmail().email;
    this.productService.getUserIdByEmail(email).subscribe((userId: any) => {
      this.taskService.getTasksByUserAndStatus(userId, 'IN_PROGRESS').subscribe(
        (tasks: any) => {
          this.tasks = tasks;
        },
        (error: any) => {
          this.toasterService.errorMessage('Error loading tasks', 'error');
          console.error('Error loading tasks:', error);
        }
      );
    })

  }
}

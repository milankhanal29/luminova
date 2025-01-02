import {Component, OnInit} from '@angular/core';
import {HeaderService} from "../services/header.service";
import {ProductService} from "../services/product.service";
import {UserGiftService} from "../services/user-gift.service";
import {UserApiService} from "../../admin/admin-services/user-api.service";
import {DailylogService} from "../dailylog/dailylog.service";
import {TaskService} from "../../admin/task/task.service";
import {ToasterService} from "../services/toaster.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-sent-gift',
  templateUrl: './my-all-task.component.html',
  styleUrls: ['./my-all-task.component.css'
  ]
})
export class MyAllTaskComponent implements OnInit {
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
      this.taskService.getTasksByUser(userId).subscribe(
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

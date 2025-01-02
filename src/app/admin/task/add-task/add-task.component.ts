import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToasterService } from "../../../users/services/toaster.service";
import { TaskService } from "../task.service";
import {UserApiService} from "../../admin-services/user-api.service";

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  taskForm: FormGroup;
  users: any[] = [];

  constructor(
    private fb: FormBuilder,
    private toasterService: ToasterService,
    private taskService: TaskService,
    private userService: UserApiService
  ) {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      userId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getAllUsers().subscribe(
      (response:any) => {
        this.users = response;
        console.log('Users:', this.users);
      },
      (error:any) => {
        this.toasterService.errorMessage('Error fetching users', 'error');
        console.error('Error fetching users:', error);
      }
    );
  }
  onSubmit(): void {
    if (this.taskForm.valid) {
      const formData = this.taskForm.value;

      this.taskService.createTask(formData).subscribe({
        next: (response) => {
          console.log('Form submitted successfully', response);
          this.toasterService.successMessage('success','Daily log added successfully!');

        },
        error: (err) => {
          console.error('Error submitting form', err);
          this.toasterService.errorMessage('error','error saving task!');
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }
  }

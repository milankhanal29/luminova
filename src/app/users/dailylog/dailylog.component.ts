import { Component, OnInit } from '@angular/core';
import { DailylogService } from "./dailylog.service";
import { HeaderService } from "../services/header.service";
import { ProductService } from "../services/product.service";
import { IProduct } from "../../interface/Product";
import { ImageModalComponent } from "../image-modal/image-modal.component";
import { MatDialog } from "@angular/material/dialog";
import { Clipboard } from '@angular/cdk/clipboard';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-dailylog',
  templateUrl: './dailylog.component.html',
  styleUrls: ['./dailylog.component.css']
})
export class DailylogComponent implements OnInit {
  dailyLogForm: FormGroup;
  dailyLogs: any[] = [];
  currentDate: string = new Date().toISOString().split('T')[0];
  constructor(
    private fb: FormBuilder,
    private dailyLogService: DailylogService,
    private toastr: ToastrService,
    private headerService:HeaderService,
    private productService:ProductService
  ) {
    this.dailyLogForm = this.fb.group({
      date: [this.currentDate],
      taskDone: [''],
      blogger: [''],
      activityType: ['']
    });
  }
  ngOnInit() {
    this.loadDailyLogs();
  }
  loadDailyLogs(): void {
    const email = this.headerService.getRoleAndEmail().email;
    this.productService.getUserIdByEmail(email).subscribe((userId: any) => {
      const selectedDate = this.dailyLogForm.value.date;
      this.dailyLogService.getDailyLogs(userId, selectedDate).subscribe(
        (logs) => {
          console.log('Daily logs:', logs);

          if (Array.isArray(logs)) {
            this.dailyLogs = logs;
          } else {
            this.dailyLogs = [logs];
          }
        },
        (error) => {
          console.error('Error loading daily logs:', error);
        }
      );
    });
  }


  onSubmit(): void {
    if (this.dailyLogForm.valid) {
      // Ensure activityType is uppercase
      const dailyLog = { ...this.dailyLogForm.value, activityType: this.dailyLogForm.value.activityType.toUpperCase() };

      const email = this.headerService.getRoleAndEmail().email;
      this.productService.getUserIdByEmail(email).subscribe((userId: any) => {
        this.dailyLogService.addDailyLog(userId, dailyLog).subscribe(
          () => {
            this.toastr.success('Daily log added successfully!');
            this.loadDailyLogs();
          },
          (error) => {
            this.toastr.error('Error adding daily log.');
            console.error(error);
          }
        );
      });
    }
  }
  onDateChange(): void {
    this.loadDailyLogs();
  }
}

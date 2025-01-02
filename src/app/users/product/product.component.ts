import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ProductService } from "../services/product.service";
import { HeaderService } from "../services/header.service";
import { AttendanceService } from "../attendance/attendance.service";
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  year: number = new Date().getFullYear();
  month: number = new Date().getMonth() + 1; // JavaScript months are 0-based
  page = 0;
  size = 10;
  attendances: any[] = [];
  attendanceForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private attendanceService: AttendanceService,
    private headerService: HeaderService,
    private productService: ProductService,
    private datePipe: DatePipe
  ) {
    this.attendanceForm = this.fb.group({
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
    });
  }

  ngOnInit() {
    this.loadAttendance();
  }

  loadAttendance(): void {
    const email = this.headerService.getRoleAndEmail().email;
    this.productService.getUserIdByEmail(email).subscribe((userId: any) => {
      this.attendanceService.getUserAttendance(userId, this.year, this.month, this.page, this.size).subscribe(
        (data: any) => {
          console.log('Attendance data:', data);
          this.attendances = data.map((attendance: any) => {
            // Check if date is an array or string and handle accordingly
            let formattedDate: string | null = 'N/A';

            if (Array.isArray(attendance.date)) {
              // If it's an array, assume it has year, month, day (e.g., [2025, 1, 1])
              const [year, month, day] = attendance.date;
              const dateObj = new Date(year, month - 1, day);  // Month is 0-indexed
              formattedDate = this.datePipe.transform(dateObj, 'MMM d, yyyy');
            } else if (typeof attendance.date === 'string') {
              // If it's a string, split it (e.g., "2025,1,1")
              const dateParts = attendance.date.split(',');
              if (dateParts.length === 3) {
                const [year, month, day] = dateParts;
                const dateObj = new Date(year, month - 1, day);  // Month is 0-indexed
                formattedDate = this.datePipe.transform(dateObj, 'MMM d, yyyy');
              }
            }

            return {
              ...attendance,
              date: formattedDate,
              entryTime: this.formatTime(attendance.entryTime),
              exitTime: this.formatTime(attendance.exitTime),
            };
          });
        },
        (error) => {
          console.error('Error loading attendance:', error);
        }
      );
    });
  }

  formatTime(time: any): string {
    if (!time || !Array.isArray(time) || time.length !== 3) return 'N/A';

    const [hour, minute, second] = time;

    const date = new Date(2020, 0, 1, hour, minute, second);

    return this.datePipe.transform(date, 'hh:mm a') || 'N/A';
  }


  onFormChange(): void {
    this.page = 0;
    this.loadAttendance();
  }

  nextPage(): void {
    this.page++;
    this.loadAttendance();
  }

  previousPage(): void {
    if (this.page > 0) {
      this.page--;
      this.loadAttendance();
    }
  }

  onMonthChange(newMonth: number): void {
    this.month = newMonth;
    this.page = 0;
    this.loadAttendance();
  }

  onYearChange(newYear: number): void {
    this.year = newYear;
    this.page = 0;
    this.loadAttendance();
  }
}

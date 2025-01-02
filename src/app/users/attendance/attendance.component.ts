import { Component, OnInit } from '@angular/core';
import { AttendanceService } from './attendance.service';
import {HeaderService} from "../services/header.service";
import {AuthService} from "../shared/auth/auth.service";
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../services/product.service";
import {ToasterService} from "../services/toaster.service";

@Component({
  selector: 'app-presentation',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  currentDate: string | undefined;
  currentTime: string | undefined;
  entryTime: string | undefined;
  exitTime: string | undefined;
  attendance = {
    userId: 0,
    date: '', // Set dynamically
    entryTime: '', // Set dynamically
    exitTime: '', // User-provided
    day: '', // Calculate dynamically
  };
  isEntryMarked: boolean = false;
  isExitMarked: boolean = false;
  constructor(
    private attendanceService: AttendanceService,
    private productService: ProductService,
    private headerService: HeaderService, // Inject AuthService
    private route: ActivatedRoute,
    private toasterService: ToasterService
  ) {
  }

  ngOnInit(): void {
    this.initializeAttendance();
    this.updateDateTime();
    setInterval(() => this.updateDateTime(), 1000);
  }

  initializeAttendance(): void {
    const userEmail = this.headerService.getRoleAndEmail().email;

    this.productService.getUserIdByEmail(userEmail).subscribe((userId: any) => {
      this.attendance.userId = userId;
      const now = new Date();
      this.attendance.date = now.toISOString().split('T')[0]; // Format: YYYY-MM-DD
      this.attendance.entryTime = now.toLocaleTimeString(); // Set entry time to current time
      this.entryTime = this.attendance.entryTime;
      this.attendance.day = now.toLocaleDateString('en-US', {weekday: 'long'}); // Calculate the day (e.g., "Monday")

      // Check if entry has already been marked for today
      this.checkIfEntryMarked();
    });
  }

  updateDateTime(): void {
    const now = new Date();
    this.currentDate = now.toLocaleDateString();
    this.currentTime = now.toLocaleTimeString();
  }
  checkIfEntryMarked(): void {
    this.attendanceService.getAttendanceByUserAndDate(this.attendance.userId, this.attendance.date).subscribe((attendance) => {
      if (attendance && attendance.entryTime) {
        this.isEntryMarked = true;  // Entry has been marked for today
        this.isExitMarked = !!attendance.exitTime; // Check if exit time is also marked
      } else {
        this.isEntryMarked = false; // No entry marked yet
        this.isExitMarked = false;
      }
    });
  }
  markEntryAttendance(): void {
    this.attendance.entryTime = this.convertTo24HourFormat(this.attendance.entryTime);

    this.attendanceService.markAttendance(this.attendance).subscribe({
      next: (response) => {
        console.log('Entry attendance recorded:', response);
        this.toasterService.successMessage("Entry attendance recorded","Success")
        this.isEntryMarked = true;
        this.isExitMarked = false;
      },
      error: (error) => {
        console.error('Error marking entry attendance:', error);
        this.toasterService.errorMessage("Exit attendance error","error")
      },
    });
  }
  markExitAttendance(): void {
    const currentTime = new Date().toLocaleTimeString();
    this.attendance.exitTime = this.convertTo24HourFormat(currentTime);

    if (!this.attendance.exitTime) {
      alert('Exit time cannot be empty');
      return;
    }

    const exitRequest = {
      userId: this.attendance.userId,
      date: this.attendance.date,
      exitTime: this.attendance.exitTime
    };

    this.attendanceService.updateExitTime(exitRequest).subscribe({
      next: (response) => {
        console.log('Exit attendance recorded:', response);
        this.toasterService.successMessage("Exit attendance recorded","Success")
        this.isExitMarked = true;
      },
      error: (error) => {
        console.error('Error marking exit attendance:', error);
        this.toasterService.errorMessage("Exit attendance error","error")
      }
    });
  }


  convertTo24HourFormat(time: string): string {
    // Ensure that the input time is in 12-hour format
    const timeParts = time.match(/(\d{1,2}):(\d{2}):(\d{2}) (AM|PM)/);
    if (timeParts) {
      let hours = parseInt(timeParts[1], 10);
      const minutes = timeParts[2];
      const seconds = timeParts[3];
      const period = timeParts[4];

      // Convert hours based on AM/PM
      if (period === 'PM' && hours !== 12) {
        hours += 12; // Convert PM hours (except 12 PM) to 24-hour format
      } else if (period === 'AM' && hours === 12) {
        hours = 0; // Convert 12 AM to 00:00
      }

      // Ensure hours are in two-digit format (e.g., 05 instead of 5)
      const formattedHours = hours < 10 ? '0' + hours : hours.toString();

      return `${formattedHours}:${minutes}:${seconds}`;
    } else {
      console.error('Invalid time format:', time);
      return ''; // Return empty string if invalid format
    }
  }


}


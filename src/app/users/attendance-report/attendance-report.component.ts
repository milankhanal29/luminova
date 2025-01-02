import { Component, OnInit } from '@angular/core';
import { AttendanceReportService } from './attendance-report.service';
import {HeaderService} from "../services/header.service";
import {ProductService} from "../services/product.service";
import {UserApiService} from "../../admin/admin-services/user-api.service";
import {ToasterService} from "../services/toaster.service";

@Component({
  selector: 'app-presentation',
  templateUrl: './attendance-report.component.html',
  styleUrls: ['./attendance-report.component.css']
})
export class AttendanceReportComponent implements OnInit {
  reports: any[] = [];
  user!: any ;
  constructor(
    private attendanceService: AttendanceReportService,
    private productService: ProductService,
    private headerService: HeaderService,
    private toasterService: ToasterService,
    private userService: UserApiService
  ) {
  }
  ngOnInit(): void {
    this.loadAttendance();
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

  loadAttendance(): void {
    const email = this.headerService.getRoleAndEmail().email;
    this.productService.getUserIdByEmail(email).subscribe((userId: any) => {
      this.attendanceService.getAttendanceByUser(userId).subscribe(
        (reports: any) => {
          this.reports = reports;
        },
        (error: any) => {
          this.toasterService.errorMessage('Error loading attendance', 'error');
          console.error('Error loading tasks:', error);
        }
      );
    })

  }

}


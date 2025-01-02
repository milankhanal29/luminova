import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../../payment/service/order.service";
import {ProductService} from "../../../users/services/product.service";
import {Route, Router} from "@angular/router";
import {UserApiService} from "../../admin-services/user-api.service";
import {MatDialog} from "@angular/material/dialog";
import {ProductIdsDialogComponent} from "../../task/product-ids-dialog/product-ids-dialog.component";
import {Status} from "../../../payment/service/status";
import {AttendanceService} from "../../../users/attendance/attendance.service";
import {ToasterService} from "../../../users/services/toaster.service";
@Component({
  selector: 'app-order-list',
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.css']
})
export class AttendanceListComponent implements OnInit {
  reports: any[] = [];
  constructor(
              private toasterService:ToasterService,
              private attendanceService:AttendanceService
  ) {}

  ngOnInit(): void {
    this.getAllAttendance();
  }
  getAllAttendance(): void {
    this.attendanceService.getALlUserAttendance().subscribe(
      (reports: any) => {
        this.reports = reports;
      },
      (error: any) => {
        this.toasterService.errorMessage('Error loading attendance', 'error');
        console.error('Error loading tasks:', error);
      }
    );
  }

}

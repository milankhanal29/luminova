import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import {CartComponent} from "../../users/cart/cart.component";
import {NavbarComponent} from "../../users/home/navbar/navbar.component";
import {CheckoutComponent} from "../../users/checkout/checkout.component";
import {RegisterComponent} from "../../users/auth/register/register.component";
import {MaterialModule} from "../material/material.module";
import {ProductModule} from "../product/product.module";
import {SharedModule} from "../shared/shared.module";
import {AdminModule} from "../admin/admin.module";
import {AllLogComponent} from "../../users/all-log/all-log.component";
import {ReceivedGiftComponent} from "../../users/received-gift/received-gift.component";
import {MatExpansionModule} from "@angular/material/expansion";
import {MyTaskComponent} from "../../users/my-task/my-task.component";
import {MyAllTaskComponent} from "../../users/my-all-task/my-all-task.component";
import {AttendanceReportComponent} from "../../users/attendance-report/attendance-report.component";
import {TimeFormatPipe} from "../../shared/time-format.pipe";
import {DailylogComponent} from "../../users/dailylog/dailylog.component";
import {AttendanceComponent} from "../../users/attendance/attendance.component";


@NgModule({
  declarations: [
    CartComponent,
    NavbarComponent,
    CheckoutComponent,
    RegisterComponent,
    AllLogComponent,
    AttendanceReportComponent,
    MyAllTaskComponent,
    ReceivedGiftComponent,
    MyTaskComponent,
    TimeFormatPipe,
    DailylogComponent,
    AttendanceComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    ProductModule,
    SharedModule,
    MatExpansionModule,


  ],
  exports: [
    CommonModule,
    UserRoutingModule,
    CartComponent,
    NavbarComponent,
    CheckoutComponent,
    RegisterComponent,
    AllLogComponent,
    AttendanceReportComponent,
    ReceivedGiftComponent,
    MyTaskComponent,
    MyAllTaskComponent,
    TimeFormatPipe,
    DailylogComponent,
    AttendanceComponent
  ],
})
export class UserModule { }

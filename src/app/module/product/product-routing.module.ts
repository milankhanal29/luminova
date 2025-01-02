import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "../../users/shared/auth/auth.guard";
import {CartComponent} from "../../users/cart/cart.component";
import {CheckoutComponent} from "../../users/checkout/checkout.component";
import {PaymentComponent} from "../../payment/payment/payment.component";
import {PaymentSuccessComponent} from "../../payment/payment-success/payment-success.component";
import {PaymentFailureComponent} from "../../payment/payment-failure/payment-failure.component";
import {ReceivedGiftComponent} from "../../users/received-gift/received-gift.component";
import {AllLogComponent} from "../../users/all-log/all-log.component";
import {DailylogComponent} from "../../users/dailylog/dailylog.component";
import {AttendanceComponent} from "../../users/attendance/attendance.component";
import {MyTaskComponent} from "../../users/my-task/my-task.component";
import {MyAllTaskComponent} from "../../users/my-all-task/my-all-task.component";
import {AttendanceReportComponent} from "../../users/attendance-report/attendance-report.component";

const routes: Routes = [
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] ,data: { roles: ['USER']}},
  { path: 'received-gift', component: ReceivedGiftComponent, canActivate: [AuthGuard] ,data: { roles: ['USER']}},
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard],data: { roles: ['USER']} },
  { path: 'daily-log', component: DailylogComponent, canActivate: [AuthGuard],data: { roles: ['USER']} },
  { path: 'all-log', component: AllLogComponent, canActivate: [AuthGuard],data: { roles: ['USER']} },
  { path: 'my-tasks', component: MyTaskComponent, canActivate: [AuthGuard],data: { roles: ['USER']} },
  { path: 'my-all-tasks', component: MyAllTaskComponent, canActivate: [AuthGuard],data: { roles: ['USER']} },
  { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard],data: { roles: ['USER']} },
  { path: 'payment/success', component: PaymentSuccessComponent, canActivate: [AuthGuard],data: { roles: ['USER']} },
  { path: 'payment/failure', component: PaymentFailureComponent, canActivate: [AuthGuard],data: { roles: ['USER']} },
  { path: 'attendance', component: AttendanceComponent, canActivate: [AuthGuard],data: { roles: ['USER']} },
  { path: 'attendance-report', component: AttendanceReportComponent, canActivate: [AuthGuard],data: { roles: ['USER']} },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }

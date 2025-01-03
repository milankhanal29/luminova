import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddTaskComponent} from "../../admin/task/add-task/add-task.component";
import {AuthGuard} from "../../users/shared/auth/auth.guard";
import {DashboardComponent} from "../../admin/dashboard/dashboard.component";
import {AllTaskComponent} from "../../admin/task/all-task/all-task.component";
import {UpdateProductComponent} from "../../admin/task/update-product/update-product.component";
import {AttendanceListComponent} from "../../admin/attendances/attendance-list/attendance-list.component";
import {ProductDetailsComponent} from "../../admin/task/product-details/product-details.component";
import {UserDetailsComponent} from "../../admin/user/user-details/user-details.component";
import {NoticeComponent} from "../../admin/notice/notice/notice.component";

const routes: Routes = [
  {
    path: 'admin',
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] },
    children: [
      { path: '', component: AllTaskComponent },
      { path: 'update-product/:id', component: UpdateProductComponent },
      { path: 'attendance', component: AttendanceListComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'add-task', component: AddTaskComponent },
      { path: 'send-notice', component: NoticeComponent },
      { path: 'product/:id', component: ProductDetailsComponent },
      { path: 'user/:id', component: UserDetailsComponent },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

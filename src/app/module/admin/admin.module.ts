import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import {AddTaskComponent} from "../../admin/task/add-task/add-task.component";
import {SharedModule} from "../shared/shared.module";
import {MaterialModule} from "../material/material.module";
import {UpdateProductComponent} from "../../admin/task/update-product/update-product.component";
import {AllTaskComponent} from "../../admin/task/all-task/all-task.component";
import {AttendanceListComponent} from "../../admin/attendances/attendance-list/attendance-list.component";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {ProductDetailsComponent} from "../../admin/task/product-details/product-details.component";
import {UserDetailsComponent} from "../../admin/user/user-details/user-details.component";
import {ProductIdsDialogComponent} from "../../admin/task/product-ids-dialog/product-ids-dialog.component";
import {MatTableModule} from "@angular/material/table";
import {UserModule} from "../user/user.module";
@NgModule({
  declarations: [
    AddTaskComponent,
    UpdateProductComponent,
    AllTaskComponent,
    AttendanceListComponent,
    ProductDetailsComponent,
    UserDetailsComponent,
    ProductIdsDialogComponent,


  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MaterialModule,
    MatButtonToggleModule,
    MatTableModule,
    UserModule
  ],
  exports: [
    AdminRoutingModule,
    AddTaskComponent,
    AllTaskComponent,
    AttendanceListComponent,
    ProductIdsDialogComponent,

  ]

})
export class AdminModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import {ProductComponent} from "../../users/product/product.component";
import {MaterialModule} from "../material/material.module";
import {MatCardModule} from "@angular/material/card";
import {ReactiveFormsModule} from "@angular/forms";
@NgModule({
  declarations: [
    ProductComponent,
  ],

  imports: [
    MaterialModule,
    CommonModule,
    ProductRoutingModule,
    MatCardModule,
    ReactiveFormsModule
  ],
  exports: [
    ProductRoutingModule,
    ProductComponent,
  ]
})
export class ProductModule { }

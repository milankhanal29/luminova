import {Component, OnInit} from '@angular/core';
import {CartService} from "../services/cart.service";
import {HeaderService} from "../services/header.service";
import {ProductService} from "../services/product.service";
import {ICart, IProduct} from "../../interface/Product";
import {ToasterService} from "../services/toaster.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent
{

}

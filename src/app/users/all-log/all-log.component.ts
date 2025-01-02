import {Component, OnInit} from '@angular/core';
import {HeaderService} from "../services/header.service";
import {ProductService} from "../services/product.service";
import {UserGiftService} from "../services/user-gift.service";
import {UserApiService} from "../../admin/admin-services/user-api.service";
import {DailylogService} from "../dailylog/dailylog.service";

@Component({
  selector: 'app-sent-gift',
  templateUrl: './all-log.component.html',
  styleUrls: ['./all-log.component.css'
  ]
})
export class AllLogComponent implements OnInit {
  dailyLogs: any[] = [];

  user!: any ;
  constructor(
  private dailyLogService:DailylogService,
  private headerService: HeaderService,
  private productService: ProductService,
  private userService: UserApiService) {
  }
  userId!: number;
  ngOnInit() {
    this.loadUserById();
    this.loadALlLogs();

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
  loadALlLogs(): void {
    const email = this.headerService.getRoleAndEmail().email;
    this.productService.getUserIdByEmail(email).subscribe((userId: any) => {
      this.dailyLogService.getDailyLogsAll(userId).subscribe(
        (logs) => {
          if (Array.isArray(logs)) {
            this.dailyLogs = logs;
          } else {
            this.dailyLogs = [logs];
          }
        },
        (error) => {
          console.error('Error loading daily logs:', error);
        }
      );
    });
  }
}

import {Component, OnInit} from '@angular/core';
import {IProduct} from "../../../interface/Product";
import {ProductService} from "../../../users/services/product.service";
import {Router} from "@angular/router";
import {ToasterService} from "../../../users/services/toaster.service";
import {TaskService} from "../task.service";

@Component({
  selector: 'app-all-product',
  templateUrl: './all-task.component.html',
  styleUrls: ['./all-task.component.css']
})
export class AllTaskComponent implements OnInit{
  tasks!:any[];
  i!: number;
  constructor(private productService:ProductService,
              private taskService:TaskService,
              private router:Router,private toasterService :ToasterService) {
  }
  ngOnInit() {
    this.loadTask();
  }
  loadTask()
  {
    this.taskService.getAllTasks().subscribe((data: any[]) => {
      this.tasks = data;
    });
  }
  editProduct(productId: number): void {
    this.router.navigate(['/admin/update-product', productId]);
  }

  deleteTask(taskId: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(taskId).subscribe(
        () => {
          this.tasks = this.tasks.filter(task => task.id !== taskId);
          this.toasterService.successMessage("Task Deleted ","success")
        },
        (error) => {
          console.error('Error deleting task', error);
          this.toasterService.errorMessage("Error deleting task ","error")
        }
      );
    }
  }
}


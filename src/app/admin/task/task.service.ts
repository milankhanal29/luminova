import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {ConfigService} from "../../config.service";
export interface TaskDTO {
  id?: number;
  name: string;
  description: string;
  status: 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  userId: number;
}
@Injectable({
  providedIn: 'root'
})

export class TaskService {
  private baseUrl = this.configService.getApiUrl() +'/api/tasks'
  constructor(private http:HttpClient,private configService:ConfigService) { }

  createTask(taskDTO: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, taskDTO, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  getTasksByUser(userId: number): Observable<TaskDTO[]> {
    return this.http.get<TaskDTO[]>(`${this.baseUrl}/user/${userId}`);
  }

  getTasksByStatus(status: string): Observable<TaskDTO[]> {
    return this.http.get<TaskDTO[]>(`${this.baseUrl}/status/${status}`);
  }

  getTasksByUserAndStatus(userId: number, status: string): Observable<TaskDTO[]> {
    return this.http.get<TaskDTO[]>(`${this.baseUrl}/user/${userId}/status/${status}`);
  }

  getAllTasks(): Observable<TaskDTO[]> {
    return this.http.get<TaskDTO[]>(`${this.baseUrl}`);
  }
  updateTaskStatus(taskId: number, status: string): Observable<TaskDTO> {
    const url = `${this.baseUrl}/${taskId}/status?status=${status}`;
    return this.http.put<TaskDTO>(url, {});
  }

  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${taskId}`).pipe(
      catchError(this.handleError)
    );
  }
  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 404) {
      console.error('Task not found', error);
    } else {
      console.error('An error occurred', error);
    }
    return throwError('Something went wrong, please try again later.');
  }
}

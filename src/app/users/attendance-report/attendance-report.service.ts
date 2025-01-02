import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {TaskDTO} from "../../admin/task/task.service";
import {ConfigService} from "../../config.service";

@Injectable({
  providedIn: 'root'
})
export class AttendanceReportService {
  private baseUrl =this.configService.getApiUrl() + '/api/attendance';

  constructor(private http: HttpClient,private configService:ConfigService) {}

  getAttendanceByUser(userId: number): Observable<TaskDTO[]> {
    return this.http.get<TaskDTO[]>(`${this.baseUrl}/user/${userId}`);
  }
}

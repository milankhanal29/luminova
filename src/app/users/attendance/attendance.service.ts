// attendance-report.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ConfigService} from "../../config.service";

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private baseUrl = this.configService.getApiUrl() +'/api/attendance';

  constructor(private http: HttpClient,private configService:ConfigService) {}

  markAttendance(attendance: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/mark`, attendance);
  }

  updateExitTime(exitRequest: { userId: number, date: string, exitTime: string }): Observable<any> {
    return this.http.post('/api/attendance/update-exit-time', exitRequest);
  }
  getUserAttendanceByMonth(userId: number, year: number, month: number, page: number, size: number): Observable<any[]> {
    return this.http.get<any[]>(`/api/user/${userId}/attendance`, {
      params: {
        year: year.toString(),
        month: month.toString(),
        page: page.toString(),
        size: size.toString(),
      },
    });
  }
  getAttendanceByUserAndDate(userId: number, date: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/${userId}/date/${date}`);
  }
  getALlUserAttendance(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all`);
  }
  getUserAttendance(userId: number, year: number, month: number, page: number, size: number) {
    return this.http.get(`${this.baseUrl}/user/${userId}/attendance`, {
      params: { year: year.toString(), month: month.toString(), page: page.toString(), size: size.toString() },
    });
    }
}

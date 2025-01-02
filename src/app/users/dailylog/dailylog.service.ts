import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ConfigService} from "../../config.service";

@Injectable({
  providedIn: 'root'
})
export class DailylogService {
  private baseUrl =this.configService.getApiUrl() + '/api/daily-log'
  constructor(private http: HttpClient,private configService:ConfigService) { }

  getDailyLogs(userId: number, date: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/user/${userId}/date/${date}`);
  }

  addDailyLog(userId: number, dailyLog: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/user/${userId}`, dailyLog);
  }
  getDailyLogsAll(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/user/${userId}/all`);
  }
}

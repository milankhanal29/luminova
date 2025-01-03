import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ConfigService} from "../../../config.service";

@Injectable({
  providedIn: 'root'
})
export class NoticeService {
  private baseUrl = this.configService.getApiUrl() +'/api/notices'
  private userApi = this.configService.getApiUrl() +'/api/user'

  constructor(private http: HttpClient,private configService:ConfigService) { }
  createNotice(notice: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/send`, notice);
  }

  getAllNotices(): Observable<any> {
    return this.http.get(`${this.baseUrl}/get`);
  }
  getAllUsers(): Observable<any> {
    return this.http.get(`${this.userApi}/get-all-user`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private configUrl = 'https://raw.githubusercontent.com/milankhanal29/configr/main/config.json';  // Correct raw URL to the config file
  private configData: any = null;

  constructor(private http: HttpClient) { }

  loadConfig(): Observable<any> {
    return this.http.get(this.configUrl).pipe(
      map(data => {
        this.configData = data;
        return data;
      }),
      catchError(error => {
        console.error('Error loading config file', error);
        return [];
      })
    );
  }

  getApiUrl(): string {
    if (this.configData) {
      return this.configData.apiUrl;
    } else {
      console.error('Config not loaded yet');
      return 'http://localhost:8080';
    }
  }
}

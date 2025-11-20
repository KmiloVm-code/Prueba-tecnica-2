import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  get<T>(endpoint: string, withCredentials = true): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${endpoint}`, { withCredentials });
  }

  post<T>(endpoint: string, body: object, withCredentials = true): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, body, { withCredentials });
  }

  put<T>(endpoint: string, body: object, withCredentials = true): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${endpoint}`, body, { withCredentials });
  }

  delete<T>(endpoint: string, withCredentials = true): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${endpoint}`, { withCredentials });
  }
}
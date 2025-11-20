import { Injectable } from '@angular/core';
import { ApiService } from '../api';
import { Observable } from 'rxjs';
import { User as UserModel } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class User {
  constructor(private apiService: ApiService) {}

  getAllUsers(): Observable<UserModel[]> {
    return this.apiService.get<UserModel[]>('/users');
  }

  getUserById(userId: number): Observable<UserModel> {
    return this.apiService.get<UserModel>(`/users/${userId}`);
  }

  updateUser(userId: number, userData: Partial<UserModel>): Observable<UserModel> {
    return this.apiService.put<UserModel>(`/users/${userId}`, userData);
  }

  deleteUser(userId: number): Observable<void> {
    return this.apiService.delete<void>(`/users/${userId}`);
  }
}
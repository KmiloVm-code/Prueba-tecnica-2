import { Injectable } from '@angular/core';
import { ApiService } from '../api';
import { Observable } from 'rxjs';
import { Employee as EmployeeModel, EmployeeCreate } from '../../models/employee';

@Injectable({
  providedIn: 'root',
})
export class Employee {
  constructor(private apiService: ApiService) {}

  getAllEmployees(): Observable<EmployeeModel[]> {
    return this.apiService.get<EmployeeModel[]>('/employees');
  }
  getEmployeeById(employeeId: string): Observable<EmployeeModel> {
    return this.apiService.get<EmployeeModel>(`/employees/${employeeId}`);
  }
  createEmployee(employeeData: EmployeeCreate): Observable<EmployeeModel> {
    return this.apiService.post<EmployeeModel>('/employees', employeeData);
  }
  updateEmployee(
    employeeId: string,
    employeeData: Partial<EmployeeModel>
  ): Observable<EmployeeModel> {
    return this.apiService.put<EmployeeModel>(`/employees/${employeeId}`, employeeData);
  }
  deleteEmployee(employeeId: string): Observable<void> {
    return this.apiService.delete<void>(`/employees/${employeeId}`);
  }
}

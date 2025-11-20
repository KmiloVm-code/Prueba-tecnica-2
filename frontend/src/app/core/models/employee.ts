export interface Employee {
  id: number;
  code: string;
  firstName: string;
  lastName1: string;
  lastName2?: string;
  departmentCode: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface EmployeeCreate {
  code: string;
  firstName: string;
  lastName1: string;
  lastName2?: string;
  departmentCode: string;
}

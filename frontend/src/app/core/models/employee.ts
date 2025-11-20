export interface Employee {
  _id: string;
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

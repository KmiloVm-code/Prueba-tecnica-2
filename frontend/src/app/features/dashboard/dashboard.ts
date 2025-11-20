import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from '../../core/services/employee/employee';
import { Auth } from '../../core/services/auth/auth';
import { Employee as EmployeeModel, EmployeeCreate } from '../../core/models/employee';
import { User } from '../../core/models/user';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  employees: EmployeeModel[] = [];
  filteredEmployees: EmployeeModel[] = [];
  currentUser: User | null = null;
  loading = false;
  searchTerm = '';

  // Modal Create/Edit
  showModal = false;
  isEditMode = false;
  employeeForm!: FormGroup;
  selectedEmployee: EmployeeModel | null = null;
  modalLoading = false;
  modalErrorMessage = '';

  // Modal Delete
  showDeleteModal = false;
  employeeToDelete: EmployeeModel | null = null;
  deleteLoading = false;
  deleteErrorMessage = '';

  constructor(
    private fb: FormBuilder,
    private employeeService: Employee,
    private authService: Auth,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadCurrentUser();
    this.loadEmployees();
  }

  initForm(): void {
    this.employeeForm = this.fb.group({
      code: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName1: ['', [Validators.required]],
      lastName2: [''],
      departmentCode: ['', [Validators.required]],
    });
  }

  loadCurrentUser(): void {
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        this.currentUser = user;
      },
      error: (error) => {
        console.error('Error al cargar usuario:', error);
      },
    });
  }

  loadEmployees(): void {
    this.loading = true;
    this.cdr.detectChanges();
    this.employeeService.getAllEmployees().subscribe({
      next: (employees) => {
        this.employees = employees;
        this.filteredEmployees = employees;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al cargar empleados:', error);
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  filterEmployees(): void {
    if (!this.searchTerm.trim()) {
      this.filteredEmployees = this.employees;
      this.cdr.detectChanges();
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredEmployees = this.employees.filter(
      (emp) =>
        emp.code.toLowerCase().includes(term) ||
        emp.firstName.toLowerCase().includes(term) ||
        emp.lastName1.toLowerCase().includes(term) ||
        (emp.lastName2 && emp.lastName2.toLowerCase().includes(term)) ||
        emp.departmentCode.toLowerCase().includes(term)
    );
    this.cdr.detectChanges();
  }

  openCreateModal(): void {
    this.isEditMode = false;
    this.selectedEmployee = null;
    this.employeeForm.reset();
    this.modalErrorMessage = '';
    this.showModal = true;
    this.cdr.detectChanges();
  }

  openEditModal(employee: EmployeeModel): void {
    this.isEditMode = true;
    this.selectedEmployee = employee;
    this.employeeForm.patchValue({
      code: employee.code,
      firstName: employee.firstName,
      lastName1: employee.lastName1,
      lastName2: employee.lastName2 || '',
      departmentCode: employee.departmentCode,
    });
    this.modalErrorMessage = '';
    this.showModal = true;
    this.cdr.detectChanges();
  }

  closeModal(): void {
    this.showModal = false;
    this.employeeForm.reset();
    this.selectedEmployee = null;
    this.modalErrorMessage = '';
    this.cdr.detectChanges();
  }

  saveEmployee(): void {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    this.modalLoading = true;
    this.modalErrorMessage = '';

    const employeeData: EmployeeCreate = {
      code: this.employeeForm.value.code,
      firstName: this.employeeForm.value.firstName,
      lastName1: this.employeeForm.value.lastName1,
      lastName2: this.employeeForm.value.lastName2 || undefined,
      departmentCode: this.employeeForm.value.departmentCode,
    };

    if (this.isEditMode && this.selectedEmployee) {
      // Update employee
      this.employeeService
        .updateEmployee(this.selectedEmployee._id, employeeData)
        .subscribe({
          next: (updatedEmployee) => {
            console.log('Empleado actualizado:', updatedEmployee);
            this.modalLoading = false;
            this.closeModal();
            this.loadEmployees();
            this.cdr.detectChanges();
          },
          error: (error) => {
            console.error('Error al actualizar empleado:', error);
            this.modalLoading = false;
            this.modalErrorMessage =
              error.error?.message || 'Error al actualizar el empleado';
            this.cdr.detectChanges();
          },
        });
    } else {
      // Create employee
      this.employeeService.createEmployee(employeeData).subscribe({
        next: (newEmployee) => {
          console.log('Empleado creado:', newEmployee);
          this.modalLoading = false;
          this.closeModal();
          this.loadEmployees();
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error al crear empleado:', error);
          this.modalLoading = false;
          this.modalErrorMessage =
            error.error?.message || 'Error al crear el empleado';
          this.cdr.detectChanges();
        },
      });
    }
  }

  confirmDelete(employee: EmployeeModel): void {
    this.employeeToDelete = employee;
    this.deleteErrorMessage = '';
    this.showDeleteModal = true;
    this.cdr.detectChanges();
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.employeeToDelete = null;
    this.deleteErrorMessage = '';
    this.cdr.detectChanges();
  }

  deleteEmployee(): void {
    if (!this.employeeToDelete) return;

    this.deleteLoading = true;
    this.deleteErrorMessage = '';

    this.employeeService.deleteEmployee(this.employeeToDelete._id).subscribe({
      next: () => {
        console.log('Empleado eliminado');
        this.deleteLoading = false;
        this.closeDeleteModal();
        this.loadEmployees();
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al eliminar empleado:', error);
        this.deleteLoading = false;
        this.deleteErrorMessage =
          error.error?.message || 'Error al eliminar el empleado';
        this.cdr.detectChanges();
      },
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error al cerrar sesión:', error);
        // Aun con error, limpiar token y redirigir
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      },
    });
  }
}

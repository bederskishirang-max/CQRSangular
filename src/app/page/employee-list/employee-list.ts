// import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Component, OnInit, signal } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css'
})
export class EmployeeListComponent implements OnInit {

  // employees: Employee[] = [];
  // loading = false;

  // 2. Change this to a signal
  employees = signal<Employee[]>([]); 
  loading = false;

  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService,
    private router: Router
    // private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.loadEmployees();

  }

  loadEmployees() {

    this.loading = true;

    this.employeeService.getEmployees().subscribe({

      next: (response) => {

                 console.log("Response:", response);

                  // this.employees = response;


                  // 3. Update the signal using .set()
                  this.employees.set(response);
                  console.log("After assignment:", this.employees);
                  console.log("Length:", this.employees.length);

                  this.loading = false;

                  // this.cdr.detectChanges();
                },

      error: (err) => {

        console.log(err);

        this.loading = false;

      }

    });

  }

  deleteEmployee(id: string) {

    if (!confirm("Delete this employee?"))
      return;

    this.employeeService.deleteEmployee(id).subscribe({

      next: () => {

        this.loadEmployees();

      }

    });

  }

  logout() {

    this.authService.logout();

    this.router.navigate(['/login']);

  }

}
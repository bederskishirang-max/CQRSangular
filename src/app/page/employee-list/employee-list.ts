// import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Component, OnInit, signal } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // 1. ADDED: Required for [(ngModel)]


import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule, FormsModule
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

   // 3. ADDED: Initialize a single blank employee object for your modal form
  employee: Employee = {
    name: '',
    email: '',
    phone: ''
  };

  // 1. ADDED: Add this inside your EmployeeListComponent class to track the modal form inputs
selectedEmployee: Employee = {
  id: '',
  name: '',
  email: '',
  phone: ''
};



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

  // deleteEmployee(id: string) {

  //   if (!confirm("Delete this employee?"))
  //     return;

  //   this.employeeService.deleteEmployee(id).subscribe({

  //     next: () => {

  //       this.loadEmployees();

  //     }

  //   });

  // }


  deleteEmployee(id: string) {
  if (!confirm("Delete this employee?"))
    return;

  // 1. Save a quick backup of the current list in case the server fails
  const backupList = this.employees();

  // 2. INSTANT UPDATE: Remove the employee from the UI signal immediately
  this.employees.set(backupList.filter(emp => emp.id !== id));

  // 3. Run the backend deletion in the background
  this.employeeService.deleteEmployee(id).subscribe({
    next: () => {
      // Server confirmed deletion! No need to reload everything.
      console.log("Deleted successfully on server.");
    },
    error: (err) => {
      console.error("Server deletion failed, rolling back:", err);
      alert("Failed to delete employee. Restoring data.");
      
      // 4. ROLLBACK: If the server fails, put the employee back in the list
      this.employees.set(backupList);
    }
  });
}


  logout() {

    this.authService.logout();

    this.router.navigate(['/login']);

  }


   // 4. FIXED: Now passes the single single 'this.employee' instead of the signal array
  save() {
    this.employeeService.addEmployee(this.employee).subscribe({
      next: () => {
        alert("Employee Added");
        this.loadEmployees(); // Refresh table immediately
        this.resetForm();     // Clear form inputs
      },
      error: (err) => {
        console.error("Failed to add employee:", err);
      }
    });
  }

  // Helper method to clear the modal form fields
  resetForm() {
    this.employee = {
      name: '',
      email: '',
      phone: ''
    };
  }


openEditModal(emp: Employee) {
  this.selectedEmployee = {
    id: emp.id,
    name: emp.name,
    email: emp.email,
    phone: emp.phone
  };
}

update() {

  this.employeeService.updateEmployee(this.selectedEmployee)
    .subscribe({

      next: () => {

        alert("Employee Updated");

        // Update the employee inside the signal
        this.employees.update(list =>
          list.map(emp =>
            emp.id === this.selectedEmployee.id
              ? { ...this.selectedEmployee }
              : emp
          )
        );

      },

      error: (err) => {
        console.error(err);
        alert("Update failed");
      }

    });

}


}




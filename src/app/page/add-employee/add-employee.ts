import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [FormsModule,RouterModule],
  templateUrl: './add-employee.html',
  styleUrl: './add-employee.css'
})
export class AddEmployeeComponent {

  employee: Employee = {

    

    name: '',

    email: '',

    phone: ''

  };

  constructor(

    private employeeService: EmployeeService,

    private router: Router

  ) { }

  save() {

    this.employeeService.addEmployee(this.employee)

      .subscribe({

        next: () => {

          alert("Employee Added");

          this.router.navigate(['/employees']);

        }

      });

  }

}
// import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [FormsModule,RouterModule],
  templateUrl: './edit-employee.html',
  styleUrl: './edit-employee.css'
})
export class EditEmployeeComponent implements OnInit {

  // employee: Employee = {
  //   id: '',
  //   name: '',
  //   email: '',
  //   phone: ''
  // };

employee = signal<Employee>({
    id: '',
    name: '',
    email: '',
    phone: ''
  });

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
    // private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {

      this.employeeService.getEmployee(id).subscribe({

        next: (response) => {

          this.employee.set(response);
          // this.employee = response;
          // this.cdr.detectChanges();
        }

      });

    }

  }

  update() {

    this.employeeService.updateEmployee(this.employee())

      .subscribe({

        next: () => {

          alert("Employee Updated");

          this.router.navigate(['/employees']);

        }

      });

  }

}
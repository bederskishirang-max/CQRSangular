import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Employee } from '../models/employee';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private api = environment.apiUrl + '/Employee';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(
      `${this.api}/DisplayAllEmployee`
    );
  }

  getEmployee(id: string): Observable<Employee> {
    return this.http.get<Employee>(
      `${this.api}/${id}`
    );
  }

  // addEmployee(employee: Employee): Observable<any> {
  //   return this.http.post(
  //     `${this.api}/AddEmployee`,
  //     employee
  //   );
  // }

  // updateEmployee(employee: Employee): Observable<any> {
  //   return this.http.put(
  //     `${this.api}`,
  //     employee
  //   );
  // }

addEmployee(employee: Employee): Observable<any> {

  const body = {
    employees: employee
  };

  return this.http.post(
    `${this.api}/AddEmployee`,
    body
  );

}

  updateEmployee(employee: Employee) {

    const body = {

        employeeID: employee.id,

        employees: employee

    };

    return this.http.put(

        `${this.api}`,

        body

    );

}

  deleteEmployee(id: string): Observable<any> {
    return this.http.delete(
      `${this.api}/${id}`
    );
  }

}
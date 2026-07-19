import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from '../../environments/environment';
import { Login } from '../models/login';
import { Register } from '../models/register';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = environment.apiUrl + '/Authentication';
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient,private router: Router) {}

  login(model: Login): Observable<any> {
    return this.http.post(`${this.api}/Login`, model);
  }

  register(model: Register): Observable<any> {
    return this.http.post(`${this.api}/Register`, model);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  // isLoggedIn(): boolean {
  //   return this.getToken() != null;
  // }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;

    const expired = this.jwtHelper.isTokenExpired(token);
    if (expired) {
      this.logout();
      this.router.navigate(['/login']);   // force redirect
      return false;
    }
    return true;
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Login } from '../models/login';
import { Register } from '../models/register';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = environment.apiUrl + '/Authentication';

  constructor(private http: HttpClient) {}

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

  isLoggedIn(): boolean {
    return this.getToken() != null;
  }
}
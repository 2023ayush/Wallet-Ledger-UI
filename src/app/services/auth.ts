import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
// src/app/services/auth.ts
@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post<any>(`${this.baseUrl}/auth/login`, data);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token;
  }

  // ✅ Clear token and mark user as logged out
  forceLogout() {
    this.logout();
  }
}

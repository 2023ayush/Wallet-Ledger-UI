import { Injectable } from '@angular/core';

import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getBalance(): Observable<number> {
    return this.http.get<any>(`${this.baseUrl}/wallet/me`).pipe(
      map(res => res.balance)
    );
  }

  topUp(amount: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/wallet/me/topup`, { amount });
  }

  transfer(receiverId: string, amount: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/transfer`, { receiverId, amount });
  }

  getTransactions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/transfer/history`);
  }
}
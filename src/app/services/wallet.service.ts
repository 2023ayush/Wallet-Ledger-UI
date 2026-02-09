import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class WalletService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  topUp(userId: number, amount: number) {
    return this.http.post(`${this.baseUrl}/wallet/${userId}/topup`, { amount });
  }

  withdraw(userId: number, amount: number) {
    return this.http.post(`${this.baseUrl}/wallet/${userId}/withdraw`, { amount });
  }

  getBalance(userId: number) {
    return this.http.get(`${this.baseUrl}/wallet/${userId}`);
  }
}
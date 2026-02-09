import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class LedgerService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  transfer(senderId: number, receiverId: number, amount: number) {
    return this.http.post(`${this.baseUrl}/ledger/${senderId}/transfer`, {
      receiverId,
      amount
    });
  }

  history(userId: number) {
    return this.http.get(`${this.baseUrl}/ledger/${userId}/transactions`);
  }
}
// src/app/pages/dashboard/dashboard.ts
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
})
export class DashboardComponent implements OnInit {
  balance: number = 0;
  topupAmount: number = 0;
  transferAmount: number = 0;
  receiverId: string = '';
  transactions: any[] = [];
  loading: boolean = false;

  constructor(
    private dashboardService: DashboardService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // ✅ Redirect to login if not logged in
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/']);
      return;
    }

    this.getBalance();      // load balance when component initializes
    this.loadHistory();     // load transaction history automatically
  }

  logout() {
    this.auth.logout();       // clear token
    this.router.navigate(['/']); // redirect to login
  }

  getBalance() {
    this.dashboardService.getBalance().subscribe({
      next: (res: number) => this.balance = res,
      error: (err) => console.error('Error fetching balance', err)
    });
  }

  topUp() {
    if (!this.topupAmount) return alert('Enter top-up amount');

    this.dashboardService.topUp(this.topupAmount).subscribe({
      next: () => {
        this.getBalance();
        this.loadHistory();
        alert(`Top-up successful: +${this.topupAmount}`);
        this.topupAmount = 0;
      },
      error: (err) => {
        console.error('Top-up failed', err);
        alert('Top-up failed!');
      }
    });
  }

  transfer() {
    if (!this.transferAmount || !this.receiverId) return alert('Enter receiver and amount');
    if (this.transferAmount > this.balance) return alert('Insufficient balance');

    this.dashboardService.transfer(this.receiverId, this.transferAmount).subscribe({
      next: () => {
        this.getBalance();
        this.loadHistory();
        alert(`Transfer successful: ${this.transferAmount} to ${this.receiverId}`);
        this.transferAmount = 0;
        this.receiverId = '';
      },
      error: (err) => {
        console.error('Transfer failed', err);
        alert('Transfer failed!');
      }
    });
  }

  loadHistory() {
    this.dashboardService.getTransactions().subscribe({
      next: (res: any[]) => this.transactions = res,
      error: (err) => console.error('Error loading transactions', err)
    });
  }
}

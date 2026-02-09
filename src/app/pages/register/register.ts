import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="d-flex justify-content-center align-items-center vh-100 login-bg">
      <div class="card p-4 shadow-lg" style="max-width: 400px; width: 100%;">
        <h2 class="text-center mb-4">Register</h2>

        <form (ngSubmit)="register()">
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input type="email" class="form-control" [(ngModel)]="email" name="email" required>
          </div>

          <div class="mb-3">
            <label class="form-label">Password</label>
            <input type="text" class="form-control" [(ngModel)]="password" name="password" required>
          </div>

          <div class="d-grid mb-3">
            <button type="submit" class="btn btn-primary">Register</button>
          </div>

          <div class="text-center mt-3">
            <span class="text-muted">Already have an account?</span>
            <a routerLink="/">Login</a>
          </div>
        </form>
      </div>
    </div>
  `
})
export class RegisterComponent {
  email = '';
  password = '';

  constructor(private router: Router) {}

  register() {
    // TODO: call backend register API here
    alert(`Registered ${this.email}`);
    this.router.navigate(['/']); // redirect to login after register
  }
}

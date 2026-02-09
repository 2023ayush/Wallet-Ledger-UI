import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;
  errorMessage = '';
  showPassword = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login(): void {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter email and password';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.auth.login({ email: this.email, password: this.password })
      .pipe(finalize(() => {
        this.loading = false;
        this.cdr.detectChanges(); // ✅ force Angular to refresh UI
      }))
      .subscribe({
        next: (res: any) => {
          // Backend returns plain text error
          if (typeof res === 'string' && res.toLowerCase().includes('invalid')) {
            this.errorMessage = 'Invalid email or password';
            this.cdr.detectChanges(); // ✅ immediately show error
            return;
          }

          if (res.token) {
            this.auth.saveToken(res.token);
            this.router.navigate(['/dashboard']);
          } else {
            this.errorMessage = 'Login failed: no token received';
            this.cdr.detectChanges(); // ✅ immediately show error
          }
        },
        error: (err) => {
          this.errorMessage = 'Server error. Try again later.';
          console.error('Login request failed', err);
          this.cdr.detectChanges(); // ✅ immediately show error
        }
      });
  }
}

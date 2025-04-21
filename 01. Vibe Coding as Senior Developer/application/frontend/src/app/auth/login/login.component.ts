import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class LoginComponent implements OnInit {
  loading = false;
  returnUrl: string = '/dashboard';
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    // If already logged in, redirect to dashboard
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  async ngOnInit(): Promise<void> {
    // Get return URL from route parameters or default to dashboard
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    
    // Check if already authenticated
    const isAuthenticated = await this.authService.checkAuthStatus();
    if (isAuthenticated) {
      console.log('Login component: User already authenticated, redirecting to dashboard');
      this.router.navigate([this.returnUrl]);
    }
  }

  login(): void {
    this.loading = true;
    // Use the auth service to redirect to backend login
    this.authService.login();
  }
}
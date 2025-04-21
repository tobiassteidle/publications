import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthStateService, User } from './auth-state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public get currentUser$() {
    return this.authStateService.currentUser$;
  }

  constructor(
    private router: Router,
    private http: HttpClient,
    private authStateService: AuthStateService
  ) {
    // Check if user is already authenticated by calling the backend
    this.checkAuthStatus();
  }

  public get currentUserValue(): User | null {
    return this.authStateService.currentUserValue;
  }

  checkAuthStatus(): Promise<boolean> {
    console.log('Checking authentication status...');
    
    // Reset auth check state
    this.authStateService.setAuthChecked(false);
    
    this.http.get<User>('/api/auth/user', { withCredentials: true })
      .pipe(
        catchError((error) => {
          console.error('Authentication check failed:', error);
          // If error, user is not authenticated
          this.authStateService.setUser(null);
          return of(null);
        })
      )
      .subscribe(user => {
        if (user) {
          console.log('User authenticated:', user);
          this.authStateService.setUser(user);
          
          // If we're on login page and authenticated, go to dashboard
          if (window.location.pathname === '/login') {
            this.authStateService.navigateToDashboard();
          }
        } else {
          console.log('No user data received, not authenticated');
          this.authStateService.setUser(null);
        }
      });
    
    // Return a promise that resolves when auth check is complete
    return this.authStateService.waitForAuthCheck();
  }

  login(): void {
    // Redirect to the backend login endpoint as per docs/auth-flow.md
    window.location.href = '/api/auth/login';
    console.log('Redirecting to Keycloak login...');
  }

  logout(): Observable<void> {
    return this.http.post<void>('/api/auth/logout', {}, { withCredentials: true })
      .pipe(
        tap(() => {
          this.authStateService.setUser(null);
          this.router.navigate(['/login']);
        })
      );
  }

  isAuthenticated(): boolean {
    return this.authStateService.isAuthenticated();
  }
}

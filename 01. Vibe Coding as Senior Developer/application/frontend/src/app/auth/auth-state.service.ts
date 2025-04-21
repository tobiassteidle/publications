import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Router } from '@angular/router';

export interface User {
  name: string;
  email: string;
  preferred_username: string;
  sub: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  // Observable für den Authentifizierungsstatus
  public isAuthenticated$ = this.currentUser$.pipe(
    map(user => !!user)
  );
  
  // Manuelle Flag um Renn-Situationen zu vermeiden
  private isAuthenticatedChecked = false;
  private authCheckCallback: (() => void) | null = null;

  constructor(private router: Router) {}

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }
  
  setAuthChecked(value: boolean): void {
    this.isAuthenticatedChecked = value;
    if (value && this.authCheckCallback) {
      this.authCheckCallback();
      this.authCheckCallback = null;
    }
  }
  
  waitForAuthCheck(): Promise<boolean> {
    console.log('Waiting for auth check to complete...');
    if (this.isAuthenticatedChecked) {
      console.log('Auth already checked, returning current state:', this.isAuthenticated());
      return Promise.resolve(this.isAuthenticated());
    }
    
    return new Promise<boolean>((resolve) => {
      this.authCheckCallback = () => {
        console.log('Auth check completed, user authenticated:', this.isAuthenticated());
        resolve(this.isAuthenticated());
      };
      
      // Timeout as fallback
      setTimeout(() => {
        if (!this.isAuthenticatedChecked) {
          console.log('Auth check timeout, using current value:', this.isAuthenticated());
          this.isAuthenticatedChecked = true;
          resolve(this.isAuthenticated());
        }
      }, 2000);
    });
  }

  setUser(user: User | null): void {
    console.log('Setting authenticated user:', user);
    this.currentUserSubject.next(user);
    this.setAuthChecked(true);
  }

  isAuthenticated(): boolean {
    return !!this.currentUserValue;
  }
  
  navigateToDashboard(): void {
    console.log('Navigating to dashboard');
    this.router.navigate(['/dashboard']);
  }

  redirectToLogin(returnUrl?: string): void {
    console.log('Redirecting to login page');
    if (returnUrl) {
      this.router.navigate(['/login'], { queryParams: { returnUrl } });
    } else {
      this.router.navigate(['/login']);
    }
  }
}
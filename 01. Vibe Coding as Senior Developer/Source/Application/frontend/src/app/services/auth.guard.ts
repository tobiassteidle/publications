import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { AuthStateService } from '../auth/auth-state.service';

// Verwende async/await mit CanActivateFn
export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const authStateService = inject(AuthStateService);
  
  console.log('AuthGuard checking authentication status');
  
  // Warte auf Abschluss der Authentifizierungsprüfung
  const isAuthenticated = await authService.checkAuthStatus();
  
  if (isAuthenticated) {
    console.log('AuthGuard: User is authenticated, allowing navigation');
    return true;
  }
  
  console.log('AuthGuard: User is NOT authenticated, redirecting to login');
  // Redirect to login with return URL
  authStateService.redirectToLogin(state.url);
  return false;
};
import { HttpRequest, HttpHandlerFn, HttpEvent, HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthStateService } from './auth-state.service';

export const authInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>, 
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const authStateService = inject(AuthStateService);
  
  console.log(`Intercepting request to ${request.url}`);
  
  // Always add withCredentials to ensure cookies are sent with requests
  request = request.clone({
    withCredentials: true
  });
  
  // Forward the modified request
  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error(`Error on request to ${request.url}:`, error);
      
      // Handle 401/403 by redirecting to login
      if (error.status === 401 || error.status === 403) {
        console.log('Authentication error detected');
        
        // Mark user as unauthenticated
        authStateService.setUser(null);
        
        if (!request.url.includes('/api/auth/user')) {
          // Only redirect if this isn't the auth check endpoint itself
          const currentUrl = window.location.pathname;
          authStateService.redirectToLogin(currentUrl);
        }
      }
      return throwError(() => error);
    })
  );
};
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:3000/auth'; // Backend API base URL

  constructor(private http: HttpClient) {}

  // Register new user
  register(username: string, password: string) {
    return this.http.post(`${this.apiUrl}/register`, { username, password })
      .pipe(
        tap(() => console.log('User registered successfully')),
        catchError(this.handleError)
      );
  }

  // Login user and store token
  login(username: string, password: string) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token); // Store the JWT token
          console.log('User logged in successfully');
        }),
        catchError(this.handleError)
      );
  }

  // Logout user and remove token
  logout() {
    localStorage.removeItem('token');
    console.log('User logged out');
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Get JWT token from local storage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Handle errors
  private handleError(error: any) {
    return throwError(error);
  }
}

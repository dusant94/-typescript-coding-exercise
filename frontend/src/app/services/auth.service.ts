import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { TokenService } from './token.service';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { DecodedToken } from '../models/decoded-token.model';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiService: ApiService, private router: Router, private tokenService: TokenService) {}

  login(username: string, password: string) {
    return this.apiService.post<{ token: string }>('auth/login', { username, password })
      .pipe(
        tap(response => {
          this.tokenService.setToken(response.token);
          this.router.navigate(['/chat']);
        }),
        catchError(this.handleError)
      );
  }

  logout() {
    this.tokenService.removeToken();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.tokenService.getToken();
  }

  getCurrentUser(): string {
    const token = this.tokenService.getToken();
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        return decoded.username;
      } catch (e) {
        return '';
      }
    }
    return '';
  }

  private handleError(error: any) {
    let errorMessage = 'An unknown error occurred!';

    if (error.error && error.error.message) {
      errorMessage = error.error.message;
    }

    return throwError(errorMessage);
  }
}

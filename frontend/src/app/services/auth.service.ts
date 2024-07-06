import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { TokenService } from './token.service';  // Import TokenService
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:3000/auth';

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

  private handleError(error: any) {
    return throwError(error);
  }
}

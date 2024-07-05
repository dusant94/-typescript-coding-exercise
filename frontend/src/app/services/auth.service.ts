import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;

  async login(username: string, password: string): Promise<void> {
    // Simulate an API call for login
    if (username === 'user' && password === 'password') {
      this.loggedIn = true;
      localStorage.setItem('loggedIn', 'true');
    } else {
      throw new Error('Invalid credentials');
    }
  }

  logout(): void {
    this.loggedIn = false;
    localStorage.removeItem('loggedIn');
  }

  isLoggedIn(): boolean {
    return this.loggedIn || localStorage.getItem('loggedIn') === 'true';
  }
}

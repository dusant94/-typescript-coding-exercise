import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { AuthService } from '../../services/auth.service'; // Make sure the path is correct

@Component({
  selector: 'app-navigation',
  standalone: true,
  templateUrl: './navigation.component.html',
  imports: [NgClass]
})
export class NavigationComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

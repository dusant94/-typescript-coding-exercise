import { Component, Input } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { Message } from '../../models/message.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-message',
  standalone: true,
  templateUrl: './message.component.html',
  imports: [NgClass, NgIf]
})
export class MessageComponent {
  @Input({ required: true }) message!: Message;
  @Input() no!: number;
  currentUser: string = '';

  constructor(
    private authService: AuthService  // Inject AuthService
  ) {
    // Get the current user from AuthService
    this.currentUser = this.authService.getCurrentUser();
  }
}

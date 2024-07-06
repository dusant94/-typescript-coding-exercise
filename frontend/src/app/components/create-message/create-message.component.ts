
import { MessageService } from '../../services/message.service';
import { Message } from '../../models/message.model';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgIf, NgClass } from '@angular/common';
import { MessageComponent } from '../message/message.component';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { WebSocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-create-message',
  standalone: true,
  providers: [ApiService],
  imports: [ReactiveFormsModule, FormsModule, MessageComponent, NgIf, NgClass],
  templateUrl: './create-message.component.html'
})
export class CreateMessageComponent {
  message: Message = new Message('', 'draft');
  previewNo: number = -1;
  @Input() messageService!: MessageService;
  currentUser: string = '';

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private webSocketService: WebSocketService  // Inject WebSocketService
  ) {
    // Get the current user from AuthService
    this.currentUser = this.authService.getCurrentUser();

    // Subscribe to incoming WebSocket messages
    this.webSocketService.messages$.subscribe((message) => {
      console.log(message)
      this.messageService.add(message);
    });
  }
  async onSubmit() {
    const currentTime = new Date().toISOString();
    this.message.status = 'pending';
    this.message.user = this.currentUser;
    this.message.timestamp = currentTime;
    let botMessage = new Message('', 'delivered', 'chatbot', currentTime );

    try {
      // Make HTTP POST request to send the message
      const response: any = await this.apiService.post('chat/message/send', {
        message: this.message.text,
        user: this.message.user,
      }).toPromise();

      // Check if the response status is 200
      if (response && response.message) {
        // Display the additional message from the response
        botMessage.text = response.message
      }

      // Send the message via WebSocket
      this.webSocketService.sendMessage({
        text: this.message.text,
        user: this.message.user,
        timestamp: this.message.timestamp,
      });
      this.message.status = 'delivered';
    } catch (error) {
      this.message.status = 'failed';
    }

    this.messageService.add(this.message);
    if(botMessage.text){
      this.messageService.add(botMessage);
    }
    this.message = new Message('', 'draft');
  }
}


import { MessageService } from '../../services/message.service';
import { Message } from '../../models/message.model';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgIf, NgClass } from '@angular/common';
import { MessageComponent } from '../message/message.component';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-create-message',
  standalone: true,
  providers: [ApiService], // Remove MessageService provider
  imports: [ReactiveFormsModule, FormsModule, MessageComponent, NgIf, NgClass],
  templateUrl: './create-message.component.html'
})
export class CreateMessageComponent {
  message: Message = new Message('', 'draft');
  previewNo: number = -1;
  @Input() messageService!: MessageService;  // Update to ApiService

  constructor(private apiService: ApiService) {}  // Inject ApiService

  async onSubmit() {
    const currentTime = new Date().toISOString();
    this.message.status = 'pending';
    this.message.user = 'me';
    this.message.timestamp = currentTime;

    try {
      await this.apiService.post('chat/message/send', {
        message: this.message.text,
        user: this.message.user,
      }).toPromise();
      this.message.status = 'sent';
    } catch (error) {
      console.error('Error sending message:', error);
      this.message.status = 'failed';
    }

    this.messageService.add(this.message);
    this.message = new Message('', 'draft');
  }
}

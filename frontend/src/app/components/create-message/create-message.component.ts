import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgIf, NgClass } from '@angular/common';
import { MessageComponent } from '../message/message.component';
import { MessageService } from '../../services/message.service';
import { Message } from '../../models/message.model';

@Component({
  selector: 'app-create-message',
  standalone: true,
  providers: [MessageService],
  imports: [ReactiveFormsModule, FormsModule, MessageComponent, NgIf, NgClass],
  templateUrl: './create-message.component.html'
})
export class CreateMessageComponent {
  message: Message = new Message('', 'draft');
  previewNo: number = -1;
  @Input() messageService!: MessageService;

  async onSubmit() {
    const currentTime = new Date().toISOString();
    this.message.status = 'pending';
    this.message.user = 'me';
    this.message.timestamp = currentTime;
    try {
      const res = await fetch('http://127.0.0.1:3000/message/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: this.message.text,
          user: this.message.user,
        }),
      });
      this.message.status = 204 ? 'sent' : 'failed';
    } catch (error) {
      console.error('Error sending message:', error);
      this.message.status = 'failed';
    }
    this.messageService.add(this.message);
    this.message = new Message('', 'draft');
  }
}

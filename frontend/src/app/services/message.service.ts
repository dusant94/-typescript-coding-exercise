import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messagesSource = new BehaviorSubject<Message[]>([]);
  messages$ = this.messagesSource.asObservable();

  constructor(private apiService: ApiService) {}

  all() {
    this.apiService.get<any[]>('chat/messages')
      .subscribe(data => {
        const messages = data.map((message) => new Message(message.message, 'delivered', message.user, message.timestamp));
        this.messagesSource.next(messages);
      });
  }

  add(message: Message) {
    const currentMessages = this.messagesSource.getValue();
    this.messagesSource.next([...currentMessages, message]);
  }
}

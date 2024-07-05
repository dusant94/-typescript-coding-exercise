import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Message } from  '../models/message.model';

@Injectable({
  providedIn: 'root'  // Ensure MessageService is provided in the root injector
})
export class MessageService {
  private messagesSource = new BehaviorSubject<Message[]>([]);
  messages$ = this.messagesSource.asObservable();

  async all() {
    try {
      const res = await fetch('http://127.0.0.1:3000/messages');
      const data = await res.json();
      const messages = data.map((message: any) => new Message(message.message, 'delivered', message.user, message.timestamp));
      this.messagesSource.next(messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }

  add(message: Message) {
    const currentMessages = this.messagesSource.getValue();
    this.messagesSource.next([...currentMessages, message]);
  }
}

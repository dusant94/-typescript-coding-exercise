import { Component, OnInit, Input } from '@angular/core';
import { NgForOf } from '@angular/common';
import { MessageService } from '../../services/message.service';
import { MessageComponent } from '../message/message.component';
import { Message } from '../../models/message.model';
import { Subscription } from 'rxjs';
import { CreateMessageComponent } from '../create-message/create-message.component';
import { NavigationComponent } from '../navigation/navigation.component';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  providers: [MessageService, ApiService],
  imports: [NgForOf, MessageComponent, CreateMessageComponent, NavigationComponent],
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {
  title = 'Chat';
  messages: Message[] = [];
  private subscription: Subscription = new Subscription();

  constructor(protected messageService: MessageService) {}

  async ngOnInit() {
    this.subscription = this.messageService.messages$.subscribe(messages => {
      this.messages = messages;
    });
    await this.messageService.all();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { NgForOf } from '@angular/common';
import { MessageService } from '../../services/message.service';
import { MessageComponent } from '../message/message.component';
import { Message } from '../../models/message.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  standalone: true,
  providers: [MessageService],
  imports: [NgForOf, MessageComponent],
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {
  messages: Message[] = [];
  private subscription: Subscription = new Subscription();
  @Input() messageService!: MessageService;


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

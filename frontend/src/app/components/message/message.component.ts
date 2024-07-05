import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { Message } from '../../models/message.model';

@Component({
  selector: 'app-message',
  standalone: true,
  templateUrl: './message.component.html',
  imports: [NgClass]
})
export class MessageComponent {
  @Input({ required: true }) message!: Message;
  @Input() no!: number;
}

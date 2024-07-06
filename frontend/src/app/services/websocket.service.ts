import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket: WebSocket;
  private messageSubject = new Subject<any>();

  messages$ = this.messageSubject.asObservable();

  constructor() {
    // Connect to the existing WebSocket server
    this.socket = new WebSocket('ws://localhost:3000/');

    this.socket.onerror = (error) => {
      console.error('WebSocket error', error);
    };

    this.socket.onmessage = (event) => {

      if (event.data instanceof Blob) {
        event.data.text().then(text => {
          try {
            const message = JSON.parse(text);
            this.messageSubject.next(message);
          } catch (error) {

          }
        });
      }
    };

    this.socket.onclose = () => {
      console.log('WebSocket connection closed');
    };
  }

  sendMessage(message: any) {
    this.socket.send(JSON.stringify(message));
  }
}

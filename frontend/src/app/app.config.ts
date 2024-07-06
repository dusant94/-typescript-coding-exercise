import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { AuthService } from './services/auth.service';
import { MessageService } from './services/message.service';
import { ApiService } from './services/api.service';
import { WebSocketService } from './services/websocket.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    AuthService,
    MessageService,
    provideHttpClient(),
    ApiService,
    WebSocketService
  ]
};

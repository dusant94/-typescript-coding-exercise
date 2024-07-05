export class Message {
  text: string;
  status: string;
  user?: string;
  timestamp?: string;

  constructor(text: string, status: string, user?: string, timestamp?: string) {
    this.text = text;
    this.status = status;
    this.user = user;
    this.timestamp = timestamp;
  }

  empty() {
    return this.text === '';
  }
}

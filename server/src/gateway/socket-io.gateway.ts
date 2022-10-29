import { Injectable } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

@WebSocketGateway()
@Injectable()
export class SocketIoGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server;
  users: number = 0;

  async handleConnection() {
    // A client has connected
    this.users++;

    // Notify connected clients of current users
    this.server.emit('users', this.users);
  }

  async handleDisconnect() {
    // A client has disconnected
    this.users--;

    // Notify connected clients of current users
    this.server.emit('users', this.users);
  }
}
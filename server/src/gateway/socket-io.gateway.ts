import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({
    namespace: 'iot'
})
export class SocketIoGateway {
  @SubscribeMessage('message')
  handleMessage(client: Socket, message: string): string {
    return 'Hello world!';
  }
}

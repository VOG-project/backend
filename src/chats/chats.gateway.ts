import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class ChatsGateway {
  @SubscribeMessage('newUser')
  handleNewUser(
    @MessageBody() user: string,
    @ConnectedSocket() socket: Socket,
  ): string {

    
    socket.on()

    return 'Hello world!';
  }
}

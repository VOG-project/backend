import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import {
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets/interfaces';
import { Socket } from 'socket.io';

@WebSocketGateway(80, { namespace: 'chat' })
export class ChatsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  handleConnection(@ConnectedSocket() socket: Socket) {
    console.log(socket.id + '님이 입장하셨습니다.');
    socket.broadcast.emit('welcomeUser', socket.id + '님이 입장하셨습니다.');
  }

  handleDisconnect(@ConnectedSocket() socket: Socket) {
    console.log(socket.id + '님이 퇴장하셨습니다.');
    socket.broadcast.emit('leaveUser', socket.id + '님이 퇴장하셨습니다.');
  }

  @SubscribeMessage('newUser')
  handleNewUser(
    @MessageBody() body: any,
    @ConnectedSocket() socket: Socket,
  ): string {
    return 'Hello world!';
  }
}

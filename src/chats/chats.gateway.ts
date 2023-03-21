import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets/interfaces';
import { Socket } from 'socket.io';
import { SocketRegisterInfoRequestDto } from './dto/socket.request.dto';
import { ChatsRepository } from './chats.repository';
import { ChatsService } from './chats.service';

@WebSocketGateway(80, { namespace: 'chat' })
export class ChatsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly chatService: ChatsService,
    private readonly chatRepository: ChatsRepository,
  ) {}

  async handleConnection(
    @ConnectedSocket() socket: Socket,
    @MessageBody() body: SocketRegisterInfoRequestDto,
  ) {
    const { userId, roomId } = body;

    body.socketId = socket.id;

    const { canParticipant } = await this.chatService.acceptParticipation(
      { userId },
      { roomId },
    );

    if (!canParticipant) {
      socket.emit('acceptParticipant', '이미 가득 찬 방입니다.');
      socket.disconnect();
    }

    this.chatRepository.addMemberCountOne(roomId);

    this.chatRepository.createSocketInfo(body);

    const chatInfo = this.chatRepository.findChatRoomAndParticipantInfo(roomId);

    socket.emit('setChat', chatInfo);
  }

  handleDisconnect(@ConnectedSocket() socket: Socket) {
    
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

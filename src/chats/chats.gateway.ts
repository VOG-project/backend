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
import {
  SocketLeaveChatRequestDto,
  SocketRegisterInfoRequestDto,
} from './dto/socket.request.dto';
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

  async handleDisconnect(@ConnectedSocket() socket: Socket) {
    const { nickname } = await this.chatRepository.findParticipantBySocketId(
      socket.id,
    );

    socket.broadcast.emit('leaveUser', nickname + '님이 퇴장하셨습니다.');
  }

  @SubscribeMessage('leaveChatRoom')
  async handleLeaveChatRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody() body: SocketLeaveChatRequestDto,
  ) {
    const { userId, roomId } = body;

    await this.chatRepository.deleteSocketInfo(userId);
    await this.chatRepository.subtractMemberCountOne(roomId);

    const { currentMember } = await this.chatRepository.findByRoomId(roomId);

    if (!currentMember) {
      await this.chatRepository.deleteChatRoom(roomId);
    }
  }

  @SubscribeMessage('newUser')
  handleNewUser(
    @MessageBody() body: any,
    @ConnectedSocket() socket: Socket,
  ): string {
    return 'Hello world!';
  }
}

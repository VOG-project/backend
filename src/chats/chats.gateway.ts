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
export class ChatsGateway implements OnGatewayConnection {
  constructor(
    private readonly chatService: ChatsService,
    private readonly chatRepository: ChatsRepository,
  ) {}

  @SubscribeMessage('enterChatRoom')
  async handleEnterChatRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody() body: SocketRegisterInfoRequestDto,
  ) {
    try {
      const { userId, roomId } = body;

      body.socketId = socket.id;

      const { canParticipant } = await this.chatService.acceptParticipation(
        roomId,
        { userId },
      );

      if (!canParticipant) {
        socket.emit('acceptParticipant', '이미 가득 찬 방입니다.');
        socket.disconnect();
      }

      await this.chatRepository.addMemberCountOne(roomId);
      await this.chatRepository.createSocketInfo(body);

      socket.join(roomId);

      const chatInfo = await this.chatRepository.findChatRoomAndParticipantInfo(
        roomId,
      );

      socket.in(roomId).emit('setChat', chatInfo);
    } catch (err) {
      console.log(err.message);
    }
  }

  @SubscribeMessage('leaveChatRoom')
  async handleLeaveChatRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody() body: SocketLeaveChatRequestDto,
  ) {
    try {
      const { userId, roomId } = body;

      await this.chatRepository.deleteSocketInfo(userId);
      await this.chatRepository.subtractMemberCountOne(roomId);

      const { currentMember } = await this.chatRepository.findByRoomId(roomId);

      if (!currentMember) {
        await this.chatRepository.deleteChatRoom(roomId);
      }

      socket.emit('leaveChat', { exit: true });
    } catch (err) {
      console.log(err);
    }
  }

  @SubscribeMessage('inputChat')
  handleInputChat(@ConnectedSocket() socket: Socket, @MessageBody() body: any) {
    try {
      const { content, nickname, roomId } = body;

      socket.in(roomId).emit('inputChat', { content, nickname, roomId });
    } catch (err) {
      console.log(err);
    }
  }

  async handleConnection(@ConnectedSocket() socket: Socket) {
    console.log(socket.id + '가 접속됨');
  }

  // async handleDisconnect(@ConnectedSocket() socket: Socket) {
  //   try {
  //     socket.emit('leaveUser', '님이 퇴장하셨습니다.');
  //     socket.disconnect();
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // }
}

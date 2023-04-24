import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Namespace } from 'socket.io';
import {
  SocketLeaveChatRequestDto,
  SocketRegisterInfoRequestDto,
} from './dto/socket.request.dto';
import { ChatsRepository } from './chats.repository';
import { ChatsService } from './chats.service';

@WebSocketGateway({
  namespace: 'chat',
  cors: {
    origin: 'http://localhost:3002',
    methods: ['HEAD', 'OPTIONS', 'GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    credentials: true,
  },
})
export class ChatsGateway {
  constructor(
    private readonly chatService: ChatsService,
    private readonly chatRepository: ChatsRepository,
  ) {}

  @WebSocketServer() webSocket: Namespace;

  // 채팅방에 입장했을 경우 발생하는 이벤트
  @SubscribeMessage('enterChatRoom')
  async handleEnterChatRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody() body: SocketRegisterInfoRequestDto,
  ) {
    try {
      const { userId, roomId } = body;
      body.socketId = socket.id;

      // 유저가 채팅방에 참여 가능한 지 확인
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

      const chatInfo = await this.chatRepository.findRoomAndParticipantInfo(
        roomId,
      );

      socket.in(roomId).emit('welcome', socket.id);

      // 채팅방에 접속한 모든 멤버(본인 포함)에게 참여자와 채팅방 정보를 전달
      this.webSocket.to(roomId).emit('setChat', chatInfo);
    } catch (err) {
      console.log(err.message);
    }
  }

  // 채팅방에서 나갈 경우 발생하는 이벤트
  @SubscribeMessage('leaveChatRoom')
  async handleLeaveChatRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody() body: SocketLeaveChatRequestDto,
  ) {
    try {
      const { userId, roomId } = body;

      await this.chatRepository.deleteSocketInfo(userId);
      await this.chatRepository.subtractMemberCountOne(roomId);

      // 채팅방에 속한 인원이 0명일 경우 채팅방 데이터를 삭제
      const { currentMember } = await this.chatRepository.findByRoomId(roomId);
      if (!currentMember) {
        await this.chatRepository.deleteRoom(roomId);
      }

      const chatInfo = await this.chatRepository.findRoomAndParticipantInfo(
        roomId,
      );

      socket.in(roomId).emit('setChat', chatInfo);
      this.webSocket.to(roomId).emit('leaveMember', { socketId: socket.id });
      socket.disconnect();
    } catch (err) {
      console.log(err);
    }
  }

  // 채팅을 입력할 경우 발생하는 이벤트
  @SubscribeMessage('inputChat')
  handleInputChat(@ConnectedSocket() socket: Socket, @MessageBody() body: any) {
    try {
      const { content, nickname, roomId } = body;
      socket.in(roomId).emit('inputChat', { content, nickname, roomId });
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * ---------------------------------WebRTC 시그널링----------------------------
   */
  // 참여자들 간의 offer 교환
  @SubscribeMessage('offer')
  handleOffer(@ConnectedSocket() socket: Socket, @MessageBody() body: any) {
    const { offer, targetId } = body;
    socket.to(targetId).emit('offer', { socketId: socket.id, offer });
  }

  // 참여자들 간의 answer 교환
  @SubscribeMessage('answer')
  handleAnswer(@ConnectedSocket() socket: Socket, @MessageBody() body: any) {
    const { answer, targetId } = body;
    socket.to(targetId).emit('answer', { socketId: socket.id, answer });
  }

  // 참여자들 간의 candidate 교환
  @SubscribeMessage('iceCandidate')
  handleIceCandidate(
    @ConnectedSocket() socket: Socket,
    @MessageBody() body: any,
  ) {
    const { iceCandidate, targetId } = body;
    socket
      .to(targetId)
      .emit('iceCandidate', { socketId: socket.id, iceCandidate });
  }
}

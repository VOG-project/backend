import { Injectable, HttpException } from '@nestjs/common';
import { ChatRegisterRoomRequestDto } from './dto/chat.request.dto';
import { ChatsRepository } from './chats.repository';
import { v4 } from 'uuid';
import { ChatRegisterRoomResponseDto } from './dto/chat.response.dto';

@Injectable()
export class ChatsService {
  constructor(private readonly chatRepository: ChatsRepository) {}

  async registerChatRoom(
    data: ChatRegisterRoomRequestDto,
  ): Promise<ChatRegisterRoomResponseDto> {
    const { userId } = data;
    const existedUser = await this.chatRepository.existsByUserId(userId);

    if (existedUser) {
      throw new HttpException('이미 참여 중인 채팅방이 존재합니다.', 401);
    }

    const roomId = v4();

    await this.chatRepository.create(data, roomId);
    return await this.chatRepository.findByRoomId(roomId);
  }
}

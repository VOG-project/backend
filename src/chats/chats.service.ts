import { Injectable } from '@nestjs/common';
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
    const roomId = v4();
    await this.chatRepository.create(data, roomId);
    return await this.chatRepository.findByRoomId(roomId);
  }
}

import { Injectable } from '@nestjs/common';
import { ChatRegisterRoomRequestDto } from './dto/chat.request.dto';
import { ChatRepository } from './chats.repository';
import { v4 } from 'uuid';
import { ChatRegisterRoomResponseDto } from './dto/chat.response.dto';

@Injectable()
export class ChatsService {
  constructor(private readonly chatRepository: ChatRepository) {}

  async registerChatRoom(
    data: ChatRegisterRoomRequestDto,
  ): Promise<ChatRegisterRoomResponseDto> {
    const roomId = v4();

    return await this.chatRepository.create(data, roomId);
  }
}

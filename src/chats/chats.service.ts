import { Injectable } from '@nestjs/common';
import { ChatRegisterRoomRequestDto } from './dto/chat.request.dto';
import { ChatRepository } from './chats.repository';
import { v4 } from 'uuid';

@Injectable()
export class ChatsService {
  constructor(private readonly chatRepository: ChatRepository) {}

  async registerChatRoom(data: ChatRegisterRoomRequestDto): Promise<any> {
    const roomId = v4();

    return await this.chatRepository.create(data, roomId);
  }
}

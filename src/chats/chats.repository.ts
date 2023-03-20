import { InjectRepository } from '@nestjs/typeorm';
import { ChatEntity } from './chats.entity';
import { Repository } from 'typeorm';
import { ChatRegisterRoomRequestDto } from './dto/chat.request.dto';
import { HttpException } from '@nestjs/common';

export class ChatRepository {
  constructor(
    @InjectRepository(ChatEntity)
    private readonly chatModel: Repository<ChatEntity>,
  ) {}

  async create(data: ChatRegisterRoomRequestDto, roomId: string): Promise<any> {
    try {
      const { title, maximumMember } = data;

      await this.chatModel
        .createQueryBuilder()
        .insert()
        .values({
          roomId,
          title,
          maximumMember,
        })
        .execute();
    } catch (err) {
      throw new HttpException(`[MYSQL ERROR] create: ${err.message}`, 500);
    }
  }
}

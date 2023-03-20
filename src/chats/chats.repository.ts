import { InjectRepository } from '@nestjs/typeorm';
import { ChatRoom } from './chats.entity';
import { Repository } from 'typeorm';
import { ChatRegisterRoomRequestDto } from './dto/chat.request.dto';
import { HttpException } from '@nestjs/common';
import { ChatRegisterRoomResponseDto } from './dto/chat.response.dto';

export class ChatsRepository {
  constructor(
    @InjectRepository(ChatRoom)
    private readonly chatRoomModel: Repository<ChatRoom>,
  ) {}

  async create(
    data: ChatRegisterRoomRequestDto,
    roomId: string,
  ): Promise<void> {
    try {
      const { title, maximumMember } = data;

      await this.chatRoomModel
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

  async findByRoomId(roomId: string): Promise<ChatRegisterRoomResponseDto> {
    try {
      return await this.chatRoomModel
        .createQueryBuilder('c')
        .select(['c.roomId', 'c.title', 'c.currentMember', 'c.maximumMember'])
        .where('roomId = :roomId', { roomId })
        .getOne();
    } catch (err) {
      throw new HttpException(
        `[MYSQL ERROR] findByRoomId: ${err.message}`,
        500,
      );
    }
  }
}

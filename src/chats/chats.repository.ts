import { InjectRepository } from '@nestjs/typeorm';
import { ChatParticipantEntity, ChatRoomEntity } from './chats.entity';
import { Repository } from 'typeorm';
import { HttpException } from '@nestjs/common';
import {
  ChatEntireDataReturn,
  ChatRoomTotalCountReturn,
  ChatSearchReturn,
} from './dto/return.chat.dto';
import { ChatCreateRequest, SocketCreateRequest } from './dto/create.chat.dto';

export class ChatsRepository {
  constructor(
    @InjectRepository(ChatRoomEntity)
    private readonly chatRoomModel: Repository<ChatRoomEntity>,
    @InjectRepository(ChatParticipantEntity)
    private readonly chatParticipantModel: Repository<ChatParticipantEntity>,
  ) {}

  async createRoom(data: ChatCreateRequest, roomId: string): Promise<void> {
    try {
      const { title, maximumMember, description } = data;

      await this.chatRoomModel
        .createQueryBuilder()
        .insert()
        .values({
          roomId,
          title,
          description,
          maximumMember,
        })
        .execute();
    } catch (err) {
      throw new HttpException(`[MYSQL ERROR] create: ${err.message}`, 500);
    }
  }

  async findByRoomId(roomId: string): Promise<ChatEntireDataReturn> {
    try {
      return await this.chatRoomModel
        .createQueryBuilder('c')
        .select()
        .where('roomId = :roomId', { roomId })
        .getOne();
    } catch (err) {
      throw new HttpException(
        `[MYSQL ERROR] findByRoomId: ${err.message}`,
        500,
      );
    }
  }

  async findRoomListByTitle(
    title: string,
    page: number,
  ): Promise<ChatSearchReturn> {
    try {
      const query = this.chatRoomModel
        .createQueryBuilder()
        .select()
        .where('title LIKE :title', { title: `%${title}%` });

      const searchedResult = await query
        .offset(10 * (page - 1))
        .limit(10)
        .orderBy('no', 'DESC')
        .getMany();

      const totalCount = await query.getCount();

      return { totalCount, searchedResult };
    } catch (err) {
      throw new HttpException(
        `[MYSQL ERROR] findRoomListByTitle: ${err.message}`,
        500,
      );
    }
  }

  async existsByUserId(userId: number): Promise<boolean> {
    try {
      return await this.chatParticipantModel
        .createQueryBuilder()
        .select()
        .where('userId = :userId', { userId })
        .getExists();
    } catch (err) {
      throw new HttpException(
        `[MYSQL ERROR] existsByUserId: ${err.messsage}`,
        500,
      );
    }
  }

  async addMemberCountOne(roomId: string): Promise<void> {
    try {
      await this.chatRoomModel
        .createQueryBuilder()
        .update()
        .set({
          currentMember: () => 'currentMember + 1',
        })
        .where('roomId = :roomId', { roomId })
        .execute();
    } catch (err) {
      throw new HttpException(
        `[MYSQL ERROR] addMemberCountOne: ${err.message}`,
        500,
      );
    }
  }

  async subtractMemberCountOne(roomId: string): Promise<void> {
    try {
      await this.chatRoomModel
        .createQueryBuilder()
        .update()
        .set({
          currentMember: () => 'currentMember - 1',
        })
        .where('roomId = :roomId', { roomId })
        .execute();
    } catch (err) {
      throw new HttpException(
        `[MYSQL ERROR] addMemberCountOne: ${err.message}`,
        500,
      );
    }
  }

  async findRoomAndParticipantInfo(roomId: string) {
    try {
      return await this.chatRoomModel
        .createQueryBuilder('c')
        .innerJoin('c.chatParticipant', 'p')
        .innerJoin('p.user', 'u')
        .select([
          'c.no',
          'c.roomId',
          'c.title',
          'c.description',
          'c.currentMember',
          'c.maximumMember',
          'c.createdAt',
          'p.userId',
          'p.socketId',
          'u.profileUrl',
          'u.nickname',
          'u.sex',
        ])
        .where('c.roomId = :roomId', { roomId })
        .getOne();
    } catch (err) {
      throw new HttpException(
        `[MYSQL ERROR] findChatRoomAndParticipantInfo: ${err.message}`,
        500,
      );
    }
  }

  async createSocketInfo(
    socketCreateRequest: SocketCreateRequest,
  ): Promise<void> {
    const { userId, roomId, socketId, nickname } = socketCreateRequest;

    try {
      await this.chatParticipantModel
        .createQueryBuilder()
        .insert()
        .values({
          userId,
          socketId,
          nickname,
          roomId,
        })
        .execute();
    } catch (err) {
      throw new HttpException(
        `[MYSQL ERROR] createSocketInfo: ${err.message}`,
        500,
      );
    }
  }

  async deleteSocketInfo(userId: number): Promise<void> {
    try {
      await this.chatParticipantModel
        .createQueryBuilder()
        .delete()
        .where('userId = :userId', { userId })
        .execute();
    } catch (err) {
      throw new HttpException(
        `[MYSQL ERROR] deleteSocketInfo: ${err.message}`,
        500,
      );
    }
  }

  async deleteRoom(roomId: string): Promise<void> {
    try {
      await this.chatRoomModel
        .createQueryBuilder()
        .delete()
        .where('roomId = :roomId', { roomId })
        .execute();
    } catch (err) {
      throw new HttpException(
        `[MYSQL ERROR] deleteChatRoom: ${err.message}`,
        500,
      );
    }
  }

  async findParticipantBySocketId(socketId: string) {
    try {
      return await this.chatParticipantModel
        .createQueryBuilder('p')
        .select()
        .where('socketId = :socketId', { socketId })
        .getOne();
    } catch (err) {
      throw new HttpException(
        `[MYSQL ERROR] findParticipantBySocketId: ${err.message}`,
        500,
      );
    }
  }

  async findRoomList(
    page: number,
    resultRowCount: number,
  ): Promise<ChatEntireDataReturn[]> {
    try {
      return await this.chatRoomModel
        .createQueryBuilder('p')
        .select()
        .offset(resultRowCount * (page - 1))
        .limit(resultRowCount)
        .orderBy('p.no', 'DESC')
        .getMany();
    } catch (err) {
      throw new HttpException(
        `[MYSQL ERROR] findChatRoomList: ${err.message}`,
        500,
      );
    }
  }

  async findRoomTotalCount(): Promise<ChatRoomTotalCountReturn> {
    try {
      const chatRoomCount = await this.chatRoomModel
        .createQueryBuilder()
        .select()
        .getCount();

      return { chatRoomCount };
    } catch (err) {
      throw new HttpException(
        `[MYSQL ERROR] findChatRoomTotalCount: ${err.message}`,
        500,
      );
    }
  }
}

import { InjectRepository } from '@nestjs/typeorm';
import { ChatParticipantEntity, ChatRoomEntity } from './chats.entity';
import { Repository } from 'typeorm';
import { HttpException } from '@nestjs/common';
import { ChatEntireDataReturn, ChatSearchReturn } from './dto/return.chat.dto';
import { ChatCreateRequest, SocketCreateRequest } from './dto/create.chat.dto';
import { ChatChatRoomListCondition } from './dto/get.chat.dto';

export class ChatsRepository {
  constructor(
    @InjectRepository(ChatRoomEntity)
    private readonly chatRoomModel: Repository<ChatRoomEntity>,
    @InjectRepository(ChatParticipantEntity)
    private readonly chatParticipantModel: Repository<ChatParticipantEntity>,
  ) {}

  /**
   * 채팅방 데이터를 생성합니다.
   */
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

  /**
   * 채팅방 아이디에 해당하는 데이터를 반환합니다.
   */
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

  /**
   * 방제목에 해당하는 채팅방 데이터를 반환합니다.
   */
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

  /**
   * 유저 아이디에 해당하는 유저의 채팅 참여 유무를 반환합니다.
   */
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

  /**
   * 채팅방 아이디에 해당하는 현재 인원의 수를 1 증가시킵니다.
   */
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

  /**
   * 채팅방 아이디에 해당하는 현재 인원의 수를 1 감소시킵니다.
   */
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

  /**
   * 채팅방 아이디에 해당하는 채팅방 정보와 참여 중인 모든 유저의 데이터를 반환합니다.
   */
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

  /**
   * 채팅방에 참여한 유저의 소켓 정보를 생성합니다.
   */
  async createSocketInfo(
    socketCreateRequest: SocketCreateRequest,
  ): Promise<void> {
    const { userId, roomId, socketId } = socketCreateRequest;

    try {
      await this.chatParticipantModel
        .createQueryBuilder()
        .insert()
        .values({
          userId,
          socketId,
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

  /**
   * 채팅방에서 나간 유저의 소켓 정보를 삭제합니다.
   */
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

  /**
   * 채팅방 아이디에 해당하는 채팅방 데이터를 삭제합니다.
   */
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

  /**
   * 소켓 아이디에 해당하는 유저 소켓 정보를 반환합니다.
   */
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

  /**
   * 조건에 해당하는 채팅방 정보를 페이지네이션하여 채팅방 총 개수와 함께 반환합니다.
   */
  async findRoomList(chatRoomListCondition: ChatChatRoomListCondition) {
    try {
      const { page } = chatRoomListCondition;
      const query = this.chatRoomModel.createQueryBuilder('p').select();

      const result = await query
        .offset(10 * (page - 1))
        .limit(10)
        .orderBy('p.no', 'DESC')
        .getMany();
      const totalCount = await query.getCount();

      return { totalCount, result };
    } catch (err) {
      throw new HttpException(
        `[MYSQL ERROR] findChatRoomList: ${err.message}`,
        500,
      );
    }
  }
}

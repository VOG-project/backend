import { Injectable, HttpException } from '@nestjs/common';
import { ChatsRepository } from './chats.repository';
import { v4 } from 'uuid';
import { ChatCreateRequest } from './dto/create.chat.dto';
import {
  ChatEntireDataReturn,
  ChatIsAcceptableReturn,
  ChatRoomTotalCountReturn,
} from './dto/return.chat.dto';
import {
  ChatChatRoomListCondition,
  ChatIsAcceptableCondition,
} from './dto/get.chat.dto';

@Injectable()
export class ChatsService {
  constructor(private readonly chatRepository: ChatsRepository) {}

  async registerChatRoom(
    chatCreateRequest: ChatCreateRequest,
  ): Promise<ChatEntireDataReturn> {
    const { userId } = chatCreateRequest;

    const existedUser = await this.chatRepository.existsByUserId(userId);
    if (existedUser) {
      throw new HttpException('이미 참여 중인 채팅방이 존재합니다.', 401);
    }

    const roomId = v4();
    await this.chatRepository.createChatRoom(chatCreateRequest, roomId);

    return await this.chatRepository.findByRoomId(roomId);
  }

  async acceptParticipation(
    roomId: string,
    condition: ChatIsAcceptableCondition,
  ): Promise<ChatIsAcceptableReturn> {
    const { userId } = condition;

    const isParticipating = await this.chatRepository.existsByUserId(userId);

    if (isParticipating) {
      throw new HttpException('이미 참여 중인 채팅방이 존재합니다.', 401);
    }

    const room = await this.chatRepository.findByRoomId(roomId);

    if (!room) {
      throw new HttpException('해당 채팅방은 존재하지 않습니다.', 400);
    }

    const { currentMember, maximumMember } = room;

    if (currentMember >= maximumMember) {
      throw new HttpException('인원이 초과되어 입장할 수 없습니다.', 400);
    }

    return {
      canParticipant: true,
    };
  }

  async getChatRoomList(
    condition: ChatChatRoomListCondition,
  ): Promise<ChatEntireDataReturn[]> {
    const { page } = condition;
    const RESULT_ROW_COUNT = 10;
    return await this.chatRepository.findChatRoomList(page, RESULT_ROW_COUNT);
  }

  async getChatRoomTotalCount(): Promise<ChatRoomTotalCountReturn> {
    return await this.chatRepository.findChatRoomTotalCount();
  }
}

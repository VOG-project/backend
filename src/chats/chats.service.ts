import { Injectable, HttpException } from '@nestjs/common';
import { ChatsRepository } from './chats.repository';
import { v4 } from 'uuid';
import { ChatCreateRequest } from './dto/create.chat.dto';
import {
  ChatEntireDataReturn,
  ChatIsAcceptableReturn,
  ChatSearchReturn,
} from './dto/return.chat.dto';
import {
  ChatChatRoomListCondition,
  ChatIsAcceptableCondition,
  ChatRoomSearchCondition,
} from './dto/get.chat.dto';

@Injectable()
export class ChatsService {
  constructor(private readonly chatRepository: ChatsRepository) {}

  /**
   * 채팅방 데이터를 생성하고 생성한 데이터를 반환합니다.
   */
  async registerRoom(
    chatCreateRequest: ChatCreateRequest,
  ): Promise<ChatEntireDataReturn> {
    const { userId } = chatCreateRequest;

    // 채팅방에 참여 중인 유저는 채팅방을 만들 수 없도록 예외처리
    const existedUser = await this.chatRepository.existsByUserId(userId);
    if (existedUser) {
      throw new HttpException('이미 참여 중인 채팅방이 존재합니다.', 400);
    }

    // 채팅방을 식별하기 위해 고유한 roomId를 생성
    const roomId = v4();
    await this.chatRepository.createRoom(chatCreateRequest, roomId);
    return await this.chatRepository.findByRoomId(roomId);
  }

  /**
   * 특정 채팅방에 접속을 원하는 유저가 접속 가능한 상태인지 확인합니다.
   */
  async acceptParticipation(
    roomId: string,
    chatIsAcceptableCondition: ChatIsAcceptableCondition,
  ): Promise<ChatIsAcceptableReturn> {
    const { userId } = chatIsAcceptableCondition;

    // 이미 채팅방에 참여 중이라면 다른 방에 참여할 수 없도록 예외 처리
    const isParticipating = await this.chatRepository.existsByUserId(userId);
    if (isParticipating) {
      throw new HttpException('이미 참여 중인 채팅방이 존재합니다.', 400);
    }

    // 존재하지 않는 채팅방에 접근할 경우 예외 처리
    const room = await this.chatRepository.findByRoomId(roomId);
    if (!room) {
      throw new HttpException('해당 채팅방은 존재하지 않습니다.', 404);
    }

    // 인원이 꽉 찼을 경우 접근할 수 없도록 예외 처리
    const { currentMember, maximumMember } = room;
    if (currentMember >= maximumMember) {
      throw new HttpException('인원이 초과되어 입장할 수 없습니다.', 400);
    }

    return {
      canParticipant: true,
    };
  }

  /**
   * 현재 만들어진 채팅방 목록을 반환합니다.
   */
  async getRoomList(chatRoomListCondition: ChatChatRoomListCondition) {
    return await this.chatRepository.findRoomList(chatRoomListCondition);
  }

  /**
   * 조건에 해당하는 채팅방 목록을 반환합니다.
   */
  async searchRoom(
    chatRoomSearchCondition: ChatRoomSearchCondition,
  ): Promise<ChatSearchReturn> {
    const { title, page } = chatRoomSearchCondition;
    return await this.chatRepository.findRoomListByTitle(title, page);
  }
}

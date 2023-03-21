import { Injectable, HttpException } from '@nestjs/common';
import {
  ChatAcceptParticipationRequestDto,
  ChatRegisterRoomRequestDto,
} from './dto/chat.request.dto';
import { ChatsRepository } from './chats.repository';
import { v4 } from 'uuid';
import {
  ChatAcceptParticipationResponseDto,
  ChatRegisterRoomResponseDto,
} from './dto/chat.response.dto';
import { ChatAcceptParticipationParamDto } from './dto/chat.param.dto';

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

  async acceptParticipation(
    data: ChatAcceptParticipationRequestDto,
    identifier: ChatAcceptParticipationParamDto,
  ): Promise<ChatAcceptParticipationResponseDto> {
    const { userId } = data;
    const { roomId } = identifier;

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
}

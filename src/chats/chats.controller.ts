import {
  Controller,
  UseFilters,
  UseInterceptors,
  Get,
  Body,
  Param,
  Post,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';
import { SuccessInterceptor } from '../common/interceptors/success.interceptor';
import { ChatsService } from './chats.service';
import { ChatCreateRequest } from './dto/create.chat.dto';
import {
  ChatEntireDataReturn,
  ChatIsAcceptableReturn,
  ChatRoomTotalCountReturn,
  ChatSearchReturn,
} from './dto/return.chat.dto';
import {
  ChatChatRoomListCondition,
  ChatIsAcceptableCondition,
  ChatRoomSearchCondition,
} from './dto/get.chat.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('chats')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
@UseGuards(AuthGuard)
export class ChatsController {
  constructor(private readonly chatService: ChatsService) {}

  @Get('rooms')
  @ApiOperation({
    summary: '채팅방 검색 API',
    tags: ['chats'],
  })
  @ApiResponse({
    description: '채팅방 제목으로 채팅방 데이터를 검색합니다.',
    type: ChatSearchReturn,
  })
  async searchRoom(
    @Query() chatRoomSearchCondition: ChatRoomSearchCondition,
  ): Promise<ChatSearchReturn> {
    return await this.chatService.searchRoom(chatRoomSearchCondition);
  }

  @Post('rooms')
  @ApiOperation({
    summary: '채팅방 생성 API',
    tags: ['chats'],
  })
  @ApiResponse({
    description: '채팅방을 생성하고 해당 채팅방의 정보를 반환합니다.',
    type: ChatEntireDataReturn,
  })
  async registerRoom(
    @Body() chatCreateRequest: ChatCreateRequest,
  ): Promise<ChatEntireDataReturn> {
    return await this.chatService.registerRoom(chatCreateRequest);
  }

  @Get('rooms/list')
  @ApiOperation({
    summary: '채팅방 목록 조회 API',
    tags: ['chats'],
  })
  @ApiResponse({
    description: '입력 페이지에 해당하는 채팅방 목록을 반환합니다. (기본 10개)',
    type: ChatEntireDataReturn,
  })
  async getRoomList(
    @Query() condition: ChatChatRoomListCondition,
  ): Promise<ChatEntireDataReturn[]> {
    return await this.chatService.getRoomList(condition);
  }

  @Get('rooms/count')
  @ApiOperation({
    summary: '채팅방 총 개수 조회 API',
    tags: ['chats'],
  })
  @ApiResponse({
    description: '현재 생성된 채팅방의 총 개수를 반환합니다.',
    type: ChatRoomTotalCountReturn,
  })
  async getTotalRoomCount(): Promise<ChatRoomTotalCountReturn> {
    return await this.chatService.getRoomTotalCount();
  }

  @Get('rooms/:roomId')
  @ApiOperation({
    summary: '채팅방 입장 가능 확인 API',
    tags: ['chats'],
  })
  @ApiResponse({
    description: '채팅방 입장이 가능한 지 확인하고 boolean 값을 리턴합니다.',
    type: ChatIsAcceptableReturn,
  })
  async acceptParticipation(
    @Param('roomId') roomId: string,
    @Query() condition: ChatIsAcceptableCondition,
  ): Promise<ChatIsAcceptableReturn> {
    return this.chatService.acceptParticipation(roomId, condition);
  }
}

import { Controller, UseFilters, UseInterceptors, Get } from '@nestjs/common';
import { Body, Param, Post, Query } from '@nestjs/common/decorators';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HttpExceptionFilter } from './../filters/http-exception.filter';
import { SuccessInterceptor } from './../interceptors/success.interceptor';
import { ChatAcceptParticipationRequestDto } from './dto/chat.request.dto';
import { ChatsService } from './chats.service';
import {
  ChatAcceptParticipationResponseDto,
  ChatGetRoomListResponseDto,
  ChatGetRoomTotalCountResponseDto,
} from './dto/chat.response.dto';
import { ChatAcceptParticipationParamDto } from './dto/chat.param.dto';
import { ChatGetChatRoomListQueryDto } from './dto/chat.query.dto';
import { ChatCreateRequest } from './dto/create.chat.dto';
import { ChatEntireDataReturn } from './dto/return.chat.dto';

@Controller('chats')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
export class ChatsController {
  constructor(private readonly chatService: ChatsService) {}

  @Post('rooms')
  @ApiOperation({
    summary: '채팅방 생성 API',
    tags: ['chats'],
  })
  @ApiResponse({
    description: '채팅방을 생성하고 해당 채팅방의 정보를 반환합니다.',
    type: ChatEntireDataReturn,
  })
  async registerChatRoom(
    @Body() chatCreateRequest: ChatCreateRequest,
  ): Promise<ChatEntireDataReturn> {
    return await this.chatService.registerChatRoom(chatCreateRequest);
  }

  @Post('rooms/:roomId')
  @ApiOperation({
    summary: '채팅방 입장 API',
    tags: ['chats'],
  })
  @ApiResponse({
    description: '채팅방 입장 가능 여부 반환',
    type: ChatAcceptParticipationResponseDto,
  })
  async acceptParticipation(
    @Param() param: ChatAcceptParticipationParamDto,
    @Body() body: ChatAcceptParticipationRequestDto,
  ): Promise<ChatAcceptParticipationResponseDto> {
    return this.chatService.acceptParticipation(body, param);
  }

  @Get('rooms')
  @ApiOperation({
    summary: '채팅방 목록 반환 API',
    tags: ['chats'],
  })
  @ApiResponse({
    description: '채팅방 목록 반환',
    type: ChatGetRoomListResponseDto,
  })
  async getChatRoomList(
    @Query() query: ChatGetChatRoomListQueryDto,
  ): Promise<ChatGetRoomListResponseDto[]> {
    return await this.chatService.getChatRoomList(query);
  }

  @Get('rooms/count')
  @ApiOperation({
    summary: '채팅방 총 개수 반환 API',
    tags: ['chats'],
  })
  @ApiResponse({
    description: '채팅방 총 개수 반환',
    type: ChatGetRoomTotalCountResponseDto,
  })
  async getChatRoomTotalCount(): Promise<ChatGetRoomTotalCountResponseDto> {
    return await this.chatService.getChatRoomTotalCount();
  }
}

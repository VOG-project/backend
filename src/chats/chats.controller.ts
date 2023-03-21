import { Controller, UseFilters, UseInterceptors, Get } from '@nestjs/common';
import { Body, Param, Post, Query } from '@nestjs/common/decorators';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HttpExceptionFilter } from './../filters/http-exception.filter';
import { SuccessInterceptor } from './../interceptors/success.interceptor';
import {
  ChatAcceptParticipationRequestDto,
  ChatRegisterRoomRequestDto,
} from './dto/chat.request.dto';
import { ChatsService } from './chats.service';
import {
  ChatAcceptParticipationResponseDto,
  ChatGetRoomListResponseDto,
  ChatGetRoomTotalCountResponseDto,
  ChatRegisterRoomResponseDto,
} from './dto/chat.response.dto';
import { ChatAcceptParticipationParamDto } from './dto/chat.param.dto';
import { ChatGetChatRoomListQueryDto } from './dto/chat.query.dto';

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
    description: '생성한 채팅방의 정보 반환',
    type: ChatRegisterRoomResponseDto,
  })
  async registerChatRoom(
    @Body() body: ChatRegisterRoomRequestDto,
  ): Promise<ChatRegisterRoomResponseDto> {
    console.log(body);
    return await this.chatService.registerChatRoom(body);
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

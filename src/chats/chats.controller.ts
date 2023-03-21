import { Controller, UseFilters, UseInterceptors, Get } from '@nestjs/common';
import { Body, Param, Post } from '@nestjs/common/decorators';
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
  ChatRegisterRoomResponseDto,
} from './dto/chat.response.dto';
import { ChatAcceptParticipationParamDto } from './dto/chat.param.dto';

@Controller('chats')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
export class ChatsController {
  constructor(private readonly chatService: ChatsService) {}

  @Post('room')
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

  @Get('room/:roomId')
  @ApiOperation({
    summary: '채팅방 입장 API',
    tags: ['chats'],
  })
  async acceptParticipation(
    @Param() param: ChatAcceptParticipationParamDto,
    @Body() body: ChatAcceptParticipationRequestDto,
  ): Promise<ChatAcceptParticipationResponseDto> {
    return this.chatService.acceptParticipation(body, param);
  }
}

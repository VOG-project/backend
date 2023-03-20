import { Controller, UseFilters, UseInterceptors } from '@nestjs/common';
import { Post } from '@nestjs/common/decorators';
import { ApiOperation } from '@nestjs/swagger';
import { HttpExceptionFilter } from './../filters/http-exception.filter';
import { SuccessInterceptor } from './../interceptors/success.interceptor';
import { ChatRegisterRoomRequestDto } from './dto/chat.request.dto';
import { ChatsService } from './chats.service';
import { ChatRegisterRoomResponseDto } from './dto/chat.response.dto';

@Controller('chats')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
export class ChatsController {
  constructor(private readonly chatService: ChatsService) {}

  @Post()
  @ApiOperation({
    summary: '채팅방 생성 API',
    tags: ['chats'],
  })
  async registerChatRoom(
    body: ChatRegisterRoomRequestDto,
  ): Promise<ChatRegisterRoomResponseDto> {
    return await this.chatService.registerChatRoom(body);
  }
}

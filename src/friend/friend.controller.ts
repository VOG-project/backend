import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { FriendService } from './friend.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserEntireDataReturn } from 'src/users/dto/return.user.dto';

@Controller('friend')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Post(':userId')
  @ApiOperation({
    summary: '친구 등록 API',
    tags: ['Friend'],
  })
  @ApiResponse({
    description: '친구를 추가하고 추가한 유저의 데이터를 반환합니다.',
    type: UserEntireDataReturn,
  })
  registerFriend(
    @Body('targetId', ParseIntPipe) targetId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<UserEntireDataReturn> {
    return this.friendService.registerFriend(userId, targetId);
  }
}

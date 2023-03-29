import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Get,
  Delete,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { FriendService } from './friend.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserEntireDataReturn } from 'src/users/dto/return.user.dto';
import {
  FriendDeletedCountReturn,
  FriendFollowingReturn,
} from './dto/return.friend.dto';

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

  @Get(':userId')
  @ApiOperation({
    summary: '친구 정보 조회 API',
    tags: ['Friend'],
  })
  @ApiResponse({
    description: '친구로 등록된 유저들의 데이터를 반환합니다.',
    type: FriendFollowingReturn,
  })
  getFriends(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<FriendFollowingReturn[]> {
    return this.friendService.getFriends(userId);
  }

  @Delete(':userId')
  @ApiOperation({
    summary: '친구 삭제 API',
    tags: ['Friend'],
  })
  @ApiResponse({
    description: '친구 관계를 삭제합니다.',
  })
  removeFriend(
    @Body('targetId', ParseIntPipe) targetId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<FriendDeletedCountReturn> {
    return this.friendService.removeFriend(userId, targetId);
  }
}

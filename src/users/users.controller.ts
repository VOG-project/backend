import {
  Controller,
  Post,
  Body,
  UseFilters,
  UseInterceptors,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import {
  UserDeletedInfoRequestDto,
  UserRegisteredRequestDto,
} from './dto/user.request.dto';
import { UserService } from './users.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { SuccessInterceptor } from '../interceptors/success.interceptor';
import { UserDeletedInfoResponseDto } from './dto/user.response.dto';
import {
  UserModificationNicknameRequest,
  UserModificationPasswordRequest,
} from './dto/modify.user.dto';
import { UserEntireDataReturn } from './dto/return.user.dto';

@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  // 비밀번호 변경 API
  @Patch(':userId/password')
  @ApiOperation({
    summary: '비밀번호 수정 API',
    tags: ['Users'],
  })
  @ApiResponse({
    status: 201,
    description:
      '유저 pk와 새로운 비밀번호를 입력받아 기존의 비밀번호를 수정합니다.',
    type: UserEntireDataReturn,
  })
  modifyPassword(
    @Body() userModificationPasswordRequest: UserModificationPasswordRequest,
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<UserEntireDataReturn> {
    return this.userService.modifyPassword(
      userModificationPasswordRequest,
      userId,
    );
  }

  // 닉네임 변경 API
  @Patch(':userId/nickname')
  @ApiOperation({
    summary: '닉네임 변경',
    tags: ['Users'],
  })
  @ApiResponse({
    status: 201,
    description: '닉네임 변경 성공',
    type: UserEntireDataReturn,
  })
  async modifyNickname(
    @Body() userModificationNicknameRequest: UserModificationNicknameRequest,
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<UserEntireDataReturn> {
    return await this.userService.modifyNickname(
      userModificationNicknameRequest,
      userId,
    );
  }

  // 회원가입 API
  @Post('register')
  @ApiOperation({ summary: '회원가입', tags: ['Users'] })
  @ApiResponse({
    status: 201,
    description: '회원가입 성공',
  })
  async register(@Body() body: UserRegisteredRequestDto): Promise<string> {
    return this.userService.register(body);
  }

  // 회원 탈퇴 API
  @Delete(':userId/withdrawal')
  @ApiOperation({
    summary: '회원탈퇴',
    tags: ['Users'],
  })
  @ApiResponse({
    status: 200,
    description: '회원탈퇴 성공',
    type: UserDeletedInfoResponseDto,
  })
  async withdrawal(
    @Body() body: UserDeletedInfoRequestDto,
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<UserDeletedInfoResponseDto> {
    return this.userService.delete(body, userId);
  }
}

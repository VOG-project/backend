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
import { UserService } from './users.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { SuccessInterceptor } from '../interceptors/success.interceptor';
import {
  UserModificationNicknameRequest,
  UserModificationPasswordRequest,
} from './dto/modify.user.dto';
import { UserEntireDataReturn } from './dto/return.user.dto';
import { UserCreateRequest } from './dto/create.user.dto';
import { PostDeletedCountReturn } from 'src/posts/dto/return.post.dto';
import { UserDeleteRequest } from './dto/delete.user.dto';

@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Patch(':userId/password')
  @ApiOperation({
    summary: '비밀번호 수정 API',
    tags: ['Users'],
  })
  @ApiResponse({
    status: 201,
    description:
      '유저 pk와 새로운 비밀번호를 입력받아 기존의 비밀번호를 수정하고 해당 유저의 데이터를 반환합니다.',
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

  @Patch(':userId/nickname')
  @ApiOperation({
    summary: '닉네임 수정 API',
    tags: ['Users'],
  })
  @ApiResponse({
    status: 201,
    description:
      '유저 pk와 새로운 닉네임을 입력받아 기존의 닉네임을 수정하고 해당 유저의 데이터를 반환합니다.',
    type: UserEntireDataReturn,
  })
  modifyNickname(
    @Body() userModificationNicknameRequest: UserModificationNicknameRequest,
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<UserEntireDataReturn> {
    return this.userService.modifyNickname(
      userModificationNicknameRequest,
      userId,
    );
  }

  @Post('register')
  @ApiOperation({
    summary: '회원가입 API',
    tags: ['Users'],
  })
  @ApiResponse({
    status: 201,
    description:
      '유저의 이메일, 비밀번호, 닉네임, 성별을 입력받아 DB에 등록하고 해당 유저의 데이터를 반환합니다.',
    type: UserEntireDataReturn,
  })
  registerUser(
    @Body() userCreateRequest: UserCreateRequest,
  ): Promise<UserEntireDataReturn> {
    return this.userService.registerUser(userCreateRequest);
  }

  @Delete(':userId/withdrawal')
  @ApiOperation({
    summary: '회원 탈퇴 API',
    tags: ['Users'],
  })
  @ApiResponse({
    status: 200,
    description:
      '유저pk와 현재비밀번호를 입력받고 옳은 비밀번호면 유저의 데이터가 삭제됩니다.',
    type: PostDeletedCountReturn,
  })
  withdrawal(
    @Body() userDeleteRequest: UserDeleteRequest,
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<PostDeletedCountReturn> {
    return this.userService.delete(userDeleteRequest, userId);
  }
}

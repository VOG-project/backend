import {
  Controller,
  Post,
  Get,
  Body,
  UseFilters,
  UseInterceptors,
  Patch,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './users.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';
import { SuccessInterceptor } from '../common/interceptors/success.interceptor';
import { UserModificationNicknameRequest } from './dto/modify.user.dto';
import { UserEntireDataReturn } from './dto/return.user.dto';
import { UserCreateRequest } from './dto/create.user.dto';
import { AuthUserEntireDataReturn } from 'src/auth/dto/return.auth.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get(':userId')
  @ApiOperation({
    summary: '유저 정보 조회 API',
    tags: ['Users'],
  })
  @ApiResponse({
    status: 200,
    description: 'userId에 해당하는 유저 데이터를 반환합니다.',
    type: UserEntireDataReturn,
  })
  getUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.getUser(userId);
  }

  @Patch(':userId/nickname')
  @UseGuards(AuthGuard)
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
  ): Promise<AuthUserEntireDataReturn> {
    return this.userService.registerUser(userCreateRequest);
  }
}

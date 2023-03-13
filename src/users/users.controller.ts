import {
  Controller,
  Post,
  Body,
  UseFilters,
  UseInterceptors,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  UserDeletedInfoRequestDto,
  UserRegisteredRequestDto,
  UserUpdatedPasswordRequestDto,
} from './dto/user.request.dto';
import { UserService } from './users.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { SuccessInterceptor } from '../interceptors/success.interceptor';
import { UserUpdatedNicknameRequestDto } from './dto/user.request.dto';
import {
  UserDeletedInfoResponseDto,
  UserUpdatedInfoResponseDto,
} from './dto/user.response.dto';
import { UserDeletedInfoParamDto } from './dto/user.param.dto';

@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Patch(':userId/password')
  @ApiOperation({
    summary: '비밀번호 변경',
    tags: ['Users'],
  })
  @ApiResponse({
    status: 201,
    description: '비밀번호 변경 성공',
    type: UserUpdatedInfoResponseDto,
  })
  async updatePassword(
    @Param('userId') userId: number,
    @Body() body: UserUpdatedPasswordRequestDto,
  ): Promise<UserUpdatedInfoResponseDto> {
    return this.userService.updatePassword(userId, body);
  }

  @Patch(':userId/nickname')
  @ApiOperation({
    summary: '닉네임 변경',
    tags: ['Users'],
  })
  @ApiResponse({
    status: 201,
    description: '닉네임 변경 성공',
    type: UserUpdatedInfoResponseDto,
  })
  async updateNickname(
    @Param('userId') userId: number,
    @Body() body: UserUpdatedNicknameRequestDto,
  ): Promise<UserUpdatedInfoResponseDto> {
    return await this.userService.updateNickname(body, userId);
  }

  @Post('register')
  @ApiOperation({ summary: '회원가입', tags: ['Users'] })
  @ApiResponse({
    status: 201,
    description: '회원가입 성공',
  })
  async register(@Body() body: UserRegisteredRequestDto): Promise<string> {
    return this.userService.register(body);
  }

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
    @Param() param: UserDeletedInfoParamDto,
  ): Promise<UserDeletedInfoResponseDto> {
    return this.userService.delete(body, param);
  }
}

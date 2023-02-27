import {
  Controller,
  Post,
  Body,
  UseFilters,
  UseInterceptors,
  Patch,
  Param,
} from '@nestjs/common';
import {
  UserRegisterRequestDto,
  UserUpdatePasswordRequestDto,
} from './dto/users.request.dto';
import { UserService } from './users.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { SuccessInterceptor } from '../interceptors/success.interceptor';
import { UserUpdateNicknameRequestDto } from './dto/users.request.dto';
import { UserUpdatedCountResponseDto } from './dto/users.response.dto';

@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Patch(':userId/password')
  @ApiOperation({
    summary: '비밀번호 변경',
  })
  @ApiResponse({
    status: 201,
    description: '비밀번호 변경 성공',
    type: UserUpdatedCountResponseDto,
  })
  async updatePassword(
    @Param('userId') userId: number,
    @Body() body: UserUpdatePasswordRequestDto,
  ): Promise<UserUpdatedCountResponseDto> {
    return this.userService.updatePassword(userId, body);
  }

  @Patch(':userId/nickname')
  @ApiOperation({
    summary: '닉네임 변경',
  })
  @ApiResponse({
    status: 201,
    description: '닉네임 변경 성공',
    type: UserUpdatedCountResponseDto,
  })
  async updateNickname(
    @Param('userId') userId: number,
    @Body() body: UserUpdateNicknameRequestDto,
  ): Promise<UserUpdatedCountResponseDto> {
    return await this.userService.updateNickname(body, userId);
  }

  @Post('register')
  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({
    status: 201,
    description: '회원가입 성공',
  })
  @ApiResponse({
    status: 400,
  })
  async register(@Body() body: UserRegisterRequestDto): Promise<string> {
    return this.userService.register(body);
  }
}

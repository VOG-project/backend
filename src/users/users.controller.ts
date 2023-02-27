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
} from './dto/users.register.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { SuccessInterceptor } from '../interceptors/success.interceptor';
import { UserUpdateNicknameRequestDto } from './dto/users.register.dto';
import { UserUpdatedCountResponseDto } from './dto/users.response.dto';

@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
    return this.usersService.updatePassword(userId, body);
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
    return await this.usersService.updateNickname(body, userId);
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
    return this.usersService.register(body);
  }
}

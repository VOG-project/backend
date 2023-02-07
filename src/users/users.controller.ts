import { Controller, Post, Body } from '@nestjs/common';
import {
  UserRegisterRequestDto,
  UserRegisterResponseDto,
} from './dto/users.register.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({
    status: 201,
    description: '회원가입 성공',
    type: UserRegisterResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Error',
  })
  @Post('register')
  async register(@Body() body: UserRegisterRequestDto): Promise<any> {
    return this.usersService.register(body);
  }
}

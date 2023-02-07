import {
  Controller,
  Post,
  Body,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import {
  UserRegisterRequestDto,
  UserRegisterResponseDto,
} from './dto/users.register.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { SuccessInterceptor } from '../interceptors/success.interceptor';

@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
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
  async register(@Body() body: UserRegisterRequestDto): Promise<string> {
    return this.usersService.register(body);
  }
}

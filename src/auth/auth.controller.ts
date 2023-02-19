import {
  Controller,
  Body,
  UseFilters,
  UseInterceptors,
  Post,
  Res,
} from '@nestjs/common';
import { UserLoginRequestDto } from './dto/users.auth.dto';
import { AuthService } from './auth.service';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { SuccessInterceptor } from '../interceptors/success.interceptor';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('auth')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '로그인' })
  @ApiResponse({
    status: 201,
    description: '로그인 성공',
  })
  @ApiResponse({
    status: 400,
    description: 'Error',
    type: String,
  })
  @Post('login')
  async login(
    @Body() body: UserLoginRequestDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<string> {
    const sessionId = await this.authService.sessionLogin(body);

    // 이거 스트링인데 인터셉터로 넘버로 가공해서 넘겨주기
    const userId = await this.authService.setSessionInformationInRedis(
      sessionId,
      body,
    );

    res.cookie('sessionId', sessionId, {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60 * 24 * 7,
    });

    return userId;
  }
}

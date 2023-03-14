import {
  Controller,
  Body,
  UseFilters,
  UseInterceptors,
  Post,
  Res,
  Req,
  Delete,
} from '@nestjs/common';
import { AuthSessionLoginRequestDto } from './dto/auth.request.dto';
import { AuthService } from './auth.service';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { SuccessInterceptor } from '../interceptors/success.interceptor';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { AuthSessionLoginResponseDto } from './dto/auth.response.dto';

@Controller('auth')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '로그인', tags: ['Auth'] })
  @ApiResponse({
    status: 201,
    description: '로그인 성공',
  })
  @Post('login')
  async login(
    @Body() body: AuthSessionLoginRequestDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthSessionLoginResponseDto> {
    const sessionId = await this.authService.issueSessionId(body);

    const loginResult = await this.authService.setSessionInformation(
      sessionId,
      body,
    );

    res.cookie('sessionId', sessionId, {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60 * 24 * 7,
    });

    return loginResult;
  }

  @ApiOperation({ summary: '로그아웃', tags: ['Auth'] })
  @ApiResponse({
    status: 200,
    description: '로그아웃 성공',
  })
  @Delete('logout')
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<number> {
    const sessionId = req.cookies.sessionId;

    res.clearCookie('sessionId');

    return await this.authService.deleteSessionInformation(sessionId);
  }
}

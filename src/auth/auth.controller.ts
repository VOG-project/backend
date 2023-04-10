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
import { AuthService } from './auth.service';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';
import { SuccessInterceptor } from '../common/interceptors/success.interceptor';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { UserEntireDataReturn } from 'src/users/dto/return.user.dto';
import { AuthLoginRequest } from './dto/create.auth.dto';
import { AuthDeletedSessionCountReturn } from './dto/return.auth.dto';

@Controller('auth')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: '로그인 API', tags: ['Auth'] })
  @ApiResponse({
    status: 201,
    description: '로그인을 진행하고 해당 유저에 대한 데이터를 반환합니다.',
    type: UserEntireDataReturn,
  })
  async login(
    @Body() autuLoginRequest: AuthLoginRequest,
    @Res({ passthrough: true }) res: Response,
  ): Promise<UserEntireDataReturn> {
    const sessionId = await this.authService.issueSessionId(autuLoginRequest);

    res.cookie('sessionId', sessionId, {
      httpOnly: true,
      secure: true,
      domain: 'talkgg.online',
      maxAge: 60 * 60 * 24 * 7,
      sameSite: 'none',
    });

    return await this.authService.setSessionInformation(
      sessionId,
      autuLoginRequest,
    );
  }

  @Delete('logout')
  @ApiOperation({ summary: '로그아웃 API', tags: ['Auth'] })
  @ApiResponse({
    status: 200,
    description: '로그아웃을 진행하고 삭제된 세션 개수를 반환합니다.',
  })
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthDeletedSessionCountReturn> {
    const sessionId = req.cookies.sessionId;
    res.clearCookie('sessionId');
    return await this.authService.deleteSessionInformation(sessionId);
  }
}

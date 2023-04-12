import {
  Controller,
  Post,
  UseFilters,
  UseInterceptors,
  Res,
  Req,
  Delete,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';
import { SuccessInterceptor } from '../common/interceptors/success.interceptor';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { AuthAuthorizedCode } from './dto/login.auth.dto';
import {
  AuthDeletedSessionCountReturn,
  AuthRedirectReturn,
  AuthUserEntireDataReturn,
} from './dto/return.auth.dto';

@Controller('auth')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login/naver')
  @ApiOperation({
    summary: '네이버 로그인 인증 API',
    tags: ['Auth'],
  })
  @ApiResponse({
    status: 200,
    description:
      'code와 state를 전달받고 결과에 따라 리다이렉션 또는 jwtAccessToken과 회원정보를 반환합니다.',
    type: [AuthUserEntireDataReturn],
  })
  async loginByNaver(
    @Body() authAuthorizedCode: AuthAuthorizedCode,
  ): Promise<AuthUserEntireDataReturn | AuthRedirectReturn> {
    return await this.authService.requestNaverAccessToken(authAuthorizedCode);
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

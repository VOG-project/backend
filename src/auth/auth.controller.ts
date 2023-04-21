import {
  Controller,
  Post,
  UseFilters,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';
import { SuccessInterceptor } from '../common/interceptors/success.interceptor';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthAuthorizedCode } from './dto/login.auth.dto';
import {
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
    type: AuthUserEntireDataReturn,
  })
  @ApiResponse({
    status: 300,
    description:
      'code와 state를 전달받고 결과에 따라 리다이렉션 또는 jwtAccessToken과 회원정보를 반환합니다.',
    type: AuthRedirectReturn,
  })
  async loginByNaver(
    @Body() authAuthorizedCode: AuthAuthorizedCode,
  ): Promise<AuthUserEntireDataReturn | AuthRedirectReturn> {
    return await this.authService.loginByNaver(authAuthorizedCode);
  }

  @Post('login/kakao')
  @ApiOperation({
    summary: '카카오 로그인 인증 API',
    tags: ['Auth'],
  })
  @ApiResponse({
    status: 200,
    description:
      'code와 state를 전달받고 결과에 따라 리다이렉션 또는 jwtAccessToken과 회원정보를 반환합니다.',
    type: AuthUserEntireDataReturn,
  })
  @ApiResponse({
    status: 300,
    description:
      'code와 state를 전달받고 결과에 따라 리다이렉션 또는 jwtAccessToken과 회원정보를 반환합니다.',
    type: AuthRedirectReturn,
  })
  async loginByKakao(@Body() authAuthorizedCode: AuthAuthorizedCode) {
    return await this.authService.loginByKakao(authAuthorizedCode);
  }
}

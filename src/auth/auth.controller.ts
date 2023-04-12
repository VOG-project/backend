import {
  Controller,
  Get,
  UseFilters,
  UseInterceptors,
  Res,
  Req,
  Delete,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';
import { SuccessInterceptor } from '../common/interceptors/success.interceptor';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { AuthAuthorizedCode } from './dto/login.auth.dto';
import { AuthDeletedSessionCountReturn } from './dto/return.auth.dto';

@Controller('auth')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login/naver')
  async loginByNaver(@Query() authAuthorizedCode: AuthAuthorizedCode) {
    return await this.authService.requestNaverAccessToken(authAuthorizedCode);
  }
  //@Get('test')
  // async test() {
  //   return await this.authService.requestNaverAccessToken({
  //     code: 'V2pRnlKkmPugTiPzmO',
  //     state: 'orgj8aseuio3',
  //   });
  // }

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

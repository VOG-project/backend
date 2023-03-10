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
import { UserLoginRequestDto } from './dto/users.auth.dto';
import { AuthService } from './auth.service';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { SuccessInterceptor } from '../interceptors/success.interceptor';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response, Request } from 'express';

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
  @ApiResponse({
    status: 400,
    description: 'Error',
  })
  @Post('login')
  async login(
    @Body() body: UserLoginRequestDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<number> {
    const sessionId = await this.authService.sessionLogin(body);

    const userId = await this.authService.setSessionInformation(
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

  @ApiOperation({ summary: '로그아웃', tags: ['Auth'] })
  @ApiResponse({
    status: 200,
    description: '로그아웃 성공',
  })
  @ApiResponse({
    status: 400,
    description: 'Error',
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

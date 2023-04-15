import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  UseFilters,
  Inject,
} from '@nestjs/common';
//import { Observable } from 'rxjs';
import { RedisService } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from '../auth.repository';

@Injectable()
@UseFilters(HttpExceptionFilter)
export class AuthGuard implements CanActivate {
  private readonly redis: Redis;

  constructor(
    private readonly redisService: RedisService,
    private readonly jwtService: JwtService,
    //private readonly authRepository: AuthRepository,
    @Inject(AuthRepository) private readonly authRepository: AuthRepository,
  ) {
    this.redis = this.redisService.getClient('login');
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    if (!authorization)
      throw new HttpException(
        '로그인 하지 않아 토큰이 존재하지 않습니다.',
        401,
      );

    let userId: number;

    const accessToken = authorization.split(' ')[1];
    try {
      const verifiedAccessToken = this.jwtService.verify(accessToken, {
        secret: process.env.JWT_SECRET,
      });
      userId = verifiedAccessToken.sub;
    } catch (err) {
      throw new HttpException('변조되었거나 만료기간이 지난 토큰입니다.', 400);
    }

    const storedAccessToken = await this.authRepository.findAuthInfo(userId);
    if (!storedAccessToken)
      throw new HttpException(
        'DB에 유저에 대한 로그인 정보가 존재하지 않습니다. 다시 로그인하세요.',
        401,
      );
    if (accessToken !== storedAccessToken)
      throw new HttpException(
        '다른 컴퓨터에서 로그인하였습니다. 로그아웃 처리해주세요.',
        401,
      );

    return true;
  }
}

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  UseFilters,
} from '@nestjs/common';
//import { Observable } from 'rxjs';
import { RedisService } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { JwtService } from '@nestjs/jwt';

@Injectable()
@UseFilters(HttpExceptionFilter)
export class AuthGuard implements CanActivate {
  private readonly redis: Redis;

  constructor(
    private readonly redisService: RedisService,
    private readonly jwtService: JwtService,
  ) {
    this.redis = this.redisService.getClient('session');
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    if (!authorization)
      throw new HttpException(
        '로그인 하지 않아 토큰이 존재하지 않습니다.',
        401,
      );

    const accessToken = authorization.split(' ')[1];
    try {
      const isRightToken = this.jwtService.verify(accessToken, {
        secret: process.env.JWT_SECRET,
      });
      console.log(isRightToken);
    } catch (err) {
      throw new HttpException('변조되었거나 만료기간이 지난 토큰입니다.', 400);
    }

    return true;
  }
}

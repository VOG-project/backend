import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  UseFilters,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { RedisService } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';

@Injectable()
@UseFilters(HttpExceptionFilter)
export class AuthGuard implements CanActivate {
  private readonly redis: Redis;

  constructor(private readonly redisService: RedisService) {
    this.redis = this.redisService.getClient();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const cookie = request.headers.cookie;

    // 쿠키에 세션 아이디가 없을 때
    if (!cookie) throw new HttpException('로그인이 필요한 서비스입니다.', 401);

    const sessionId = cookie.split('=')[1];
    const isExistedSession = await this.redis.hget(sessionId, 'id');

    // 쿠키에 세션 아이디는 있으나, DB에 존재하지 않을 때
    if (!isExistedSession)
      throw new HttpException(
        '유효하지 않는 세션 아이디입니다. 다시 로그인하세요.',
        401,
      );

    return true;
  }
}

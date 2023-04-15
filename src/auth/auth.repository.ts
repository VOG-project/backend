import { Injectable, HttpException } from '@nestjs/common';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';
import { AuthDeletedSessionCountReturn } from './dto/return.auth.dto';

@Injectable()
export class AuthRepository {
  private readonly redis: Redis;

  constructor(private readonly redisService: RedisService) {
    this.redis = this.redisService.getClient('session');
  }

  async findAuthInfo(userId: number): Promise<string> {
    try {
      return await this.redis.get(userId.toString());
    } catch (err) {
      throw new HttpException(`[REDIS ERROR] findSession: ${err.message}`, 500);
    }
  }

  async createAuthInfo(jwtAccessToken: string, userId: number): Promise<void> {
    try {
      await this.redis.set(userId.toString(), jwtAccessToken);
      // 숫자 순서대로 초, 분, 시, 일 (7일간 DB에 보관 이후 자동 삭제)
      await this.redis.expire(jwtAccessToken, 60 * 60 * 24 * 7);
    } catch (err) {
      throw new HttpException(
        `[REDIS ERROR] createAuthInfo: ${err.message}`,
        500,
      );
    }
  }

  async deleteSession(
    sessionId: string,
  ): Promise<AuthDeletedSessionCountReturn> {
    try {
      return { deletedCount: await this.redis.del(sessionId) };
    } catch (err) {
      throw new HttpException(
        `[REDIS ERROR] deleteSession: ${err.message}`,
        500,
      );
    }
  }
}

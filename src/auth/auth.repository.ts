import { Injectable, HttpException } from '@nestjs/common';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';
import { AuthDeletedSessionCountReturn } from './dto/return.auth.dto';

@Injectable()
export class AuthRepository {
  private readonly redis: Redis;

  constructor(private readonly redisService: RedisService) {
    this.redis = this.redisService.getClient();
  }

  async findSession(sessionId: string): Promise<string> {
    try {
      return await this.redis.hget(sessionId, 'id');
    } catch (err) {
      throw new HttpException(`[REDIS ERROR] findSession: ${err.message}`, 500);
    }
  }

  async createSession(
    sessionId: string,
    userId: number,
    nickname: string,
  ): Promise<void> {
    try {
      await this.redis.hset(sessionId, { userId, nickname });
      // 숫자 순서대로 초, 분, 시, 일 (7일간 DB에 보관 이후 자동 삭제)
      await this.redis.expire(sessionId, 60 * 60 * 24 * 7);
    } catch (err) {
      throw new HttpException(
        `[REDIS ERROR] createSession: ${err.message}`,
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

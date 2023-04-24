import { Injectable, HttpException } from '@nestjs/common';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';

@Injectable()
export class AuthRepository {
  private readonly redis: Redis;

  constructor(private readonly redisService: RedisService) {
    this.redis = this.redisService.getClient('login');
  }

  /**
   * 유저 아이디에 해당하는 토큰 데이터를 반환합니다.
   */
  async findAuthInfo(userId: number): Promise<string> {
    try {
      return await this.redis.get(userId.toString());
    } catch (err) {
      throw new HttpException(`[REDIS ERROR] findSession: ${err.message}`, 500);
    }
  }

  /**
   * 유저 아이디와 토큰 데이터를 생성합니다.
   */
  async createAuthInfo(jwtAccessToken: string, userId: number): Promise<void> {
    try {
      await this.redis.set(userId.toString(), jwtAccessToken);
      // 숫자 순서대로 초, 분, 시, 일 (7일간 DB에 보관 이후 자동 삭제)
      await this.redis.expire(userId.toString(), 60 * 60 * 24 * 7);
    } catch (err) {
      throw new HttpException(
        `[REDIS ERROR] createAuthInfo: ${err.message}`,
        500,
      );
    }
  }
}

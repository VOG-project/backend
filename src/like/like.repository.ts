import { RedisService } from '@liaoliaots/nestjs-redis';
import { Injectable, HttpException } from '@nestjs/common';
import { Redis } from 'ioredis';
import { LikeUserReturn } from './dto/result.like.dto';

@Injectable()
export class LikeRepository {
  private readonly redis: Redis;

  constructor(private readonly redisService: RedisService) {
    this.redis = this.redisService.getClient();
  }

  async createLike(postId: number, userId: number): Promise<void> {
    try {
      await this.redis.sadd(postId.toString(), userId);
    } catch (err) {
      throw new HttpException(`[REDIS ERROR] createLike: ${err.message}`, 500);
    }
  }

  async findLikeUserByPostId(postId: number) {
    try {
      return {
        userIds: await this.redis.smembers(postId.toString()),
      };
    } catch (err) {
      throw new HttpException(
        `[REDIS ERROR] findLikeCountByPostId: ${err.message}`,
        500,
      );
    }
  }
}

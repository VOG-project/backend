import { RedisService } from '@liaoliaots/nestjs-redis';
import { Injectable, HttpException } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class LikeRepository {
  private readonly redis: Redis;

  constructor(private readonly redisService: RedisService) {
    this.redis = this.redisService.getClient('like');
  }

  /**
   * 게시물 아이디와 유저 아이디에 해당하는 좋아요 데이터를 생성합니다.
   */
  async createLike(postId: number, userId: number): Promise<void> {
    try {
      await this.redis.sadd(postId.toString(), userId);
    } catch (err) {
      throw new HttpException(`[REDIS ERROR] createLike: ${err.message}`, 500);
    }
  }

  /**
   * 게시물 아이디에 포함된 좋아요 데이터를 반환합니다.
   */
  async findLikeUsersByPostId(postId: number): Promise<any> {
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

  /**
   * 게시물 아이디에 포함된 좋아요 중 유저 아이디에 해당하는 유저의 좋아요 데이터를 삭제합니다.
   */
  async deleteLike(postId: number, userId: number) {
    try {
      return await this.redis.srem(postId.toString(), userId);
    } catch (err) {
      throw new HttpException(
        `[REDIS ERROR] findLikeCountByPostId: ${err.message}`,
        500,
      );
    }
  }

  /**
   * 게시물에 포함된 모든 좋아요 데이터를 삭제합니다.
   */
  async deleteLikeOfPost(postId: number) {
    try {
      await this.redis.del(postId.toString());
    } catch (err) {
      throw new HttpException(
        `[REDIS ERROR] deleteLikeOfPost: ${err.message}`,
        500,
      );
    }
  }
}

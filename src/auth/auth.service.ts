import { Injectable, HttpException } from '@nestjs/common';
import { UserRepository } from './../users/users.repository';
import { UserLoginRequestDto } from './dto/users.auth.dto';
import { v4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { RedisService } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';

@Injectable()
export class AuthService {
  private readonly redis: Redis;

  constructor(
    private readonly userRepository: UserRepository,
    private readonly redisService: RedisService,
  ) {
    this.redis = this.redisService.getClient();
  }

  async sessionLogin(data: UserLoginRequestDto): Promise<string> {
    const { email, password } = data;

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new HttpException(
        '이메일 또는 비밀번호를 잘못 입력하셨습니다.',
        401,
      );
    }

    const isRightPassword = await bcrypt.compare(password, user.password);

    if (!isRightPassword) {
      throw new HttpException(
        '이메일 또는 비밀번호를 잘못 입력하셨습니다.',
        401,
      );
    }

    const sessionId = v4();

    return sessionId;
  }

  async setSessionInformation(
    sessionId: string,
    body: UserLoginRequestDto,
  ): Promise<number> {
    const { email } = body;
    const isExistedSessionId = await this.redis.hget(sessionId, 'id');

    if (isExistedSessionId) {
      throw new HttpException('이미 세션이 존재합니다. 로그아웃 하세요.', 401);
    }

    const user = await this.userRepository.findByEmail(email);

    await this.redis.hset(sessionId, {
      id: user.id,
      nickname: user.nickname,
    });

    // 숫자 순서대로 초, 분, 시, 일 (7일간 DB에 보관 이후 자동 삭제)
    await this.redis.expire(sessionId, 60 * 60 * 24 * 7);

    const userId = await this.redis.hget(sessionId, 'id');

    return parseInt(userId, 10);
  }

  async deleteSessionInformation(sessionId: string): Promise<number> {
    return await this.redis.del(sessionId);
  }
}

import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendEntity } from './friend.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FriendRepository {
  constructor(
    @InjectRepository(FriendEntity)
    private readonly friendModel: Repository<FriendEntity>,
  ) {}

  async create(userId: number, targetId: number): Promise<void> {
    try {
      await this.friendModel
        .createQueryBuilder()
        .insert()
        .values({
          userId,
          targetId,
        })
        .execute();
    } catch (err) {
      throw new HttpException(`[MYSQL ERROR] create: ${err.message}`, 500);
    }
  }
}

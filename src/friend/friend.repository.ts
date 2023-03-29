import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendEntity } from './friend.entity';
import { Repository } from 'typeorm';
import { FriendFollowingReturn } from './dto/return.friend.dto';

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

  async findFreindsByUserId(userId: number): Promise<FriendFollowingReturn[]> {
    try {
      return await this.friendModel
        .createQueryBuilder('f')
        .innerJoin('f.following', 'u')
        .select([
          'f.userId',
          'u.id',
          'u.email',
          'u.nickname',
          'u.sex',
          'u.profileUrl',
          'u.createdAt',
          'u.updatedAt',
        ])
        .where('f.userId = :userId', { userId })
        .getMany();
    } catch (err) {
      throw new HttpException(`[MYSQL ERROR] findMany: ${err.message}`, 500);
    }
  }
}

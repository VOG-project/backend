import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReplyEntity } from './replies.entity';
import { Repository } from 'typeorm';
import { ReplyRegisterRequest } from './dto/register.reply.dto';
import { ReplyEntireDataReturn, ReplyPkIdReturn } from './dto/return.reply.dto';

@Injectable()
export class RepliesRepository {
  constructor(
    @InjectRepository(ReplyEntity)
    private readonly replyModel: Repository<ReplyEntity>,
  ) {}

  async create(
    replyRegisterRequest: ReplyRegisterRequest,
  ): Promise<ReplyPkIdReturn> {
    try {
      const insertedReply = await this.replyModel
        .createQueryBuilder()
        .insert()
        .values(replyRegisterRequest)
        .execute();

      return { replyId: insertedReply.identifiers[0].id };
    } catch (err) {
      throw new HttpException(`[MYSQL ERROR] create: ${err.message}`, 500);
    }
  }

  async findByReplyId(replyId: number): Promise<ReplyEntireDataReturn> {
    try {
      return await this.replyModel
        .createQueryBuilder()
        .select()
        .where('id = :commentId', { replyId })
        .getOne();
    } catch (err) {
      throw new HttpException(
        `[MYSQL ERROR] findByReplyId: ${err.message}`,
        500,
      );
    }
  }
}

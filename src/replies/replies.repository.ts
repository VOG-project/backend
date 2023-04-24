import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReplyEntity } from './replies.entity';
import { Repository } from 'typeorm';
import { ReplyRegisterRequest } from './dto/register.reply.dto';
import {
  ReplyDeletedCountReturn,
  ReplyEntireDataReturn,
  ReplyPkIdReturn,
} from './dto/return.reply.dto';
import { ReplyModifyRequest } from './dto/modify.reply.dto';

@Injectable()
export class RepliesRepository {
  constructor(
    @InjectRepository(ReplyEntity)
    private readonly replyModel: Repository<ReplyEntity>,
  ) {}

  /**
   * 답글 데이터를 생성합니다.
   */
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

  /**
   * 답글 아이디에 해당하는 row 값을 반환합니다.
   */
  async findByReplyId(replyId: number): Promise<ReplyEntireDataReturn> {
    try {
      return await this.replyModel
        .createQueryBuilder()
        .select()
        .where('id = :replyId', { replyId })
        .getOne();
    } catch (err) {
      throw new HttpException(
        `[MYSQL ERROR] findByReplyId: ${err.message}`,
        500,
      );
    }
  }

  /**
   * Dto에 담긴 데이터로 row를 갱신합니다.
   */
  async update(
    replyModifyRequest: ReplyModifyRequest,
    replyId: number,
  ): Promise<void> {
    try {
      await this.replyModel
        .createQueryBuilder()
        .update()
        .set(replyModifyRequest)
        .where('id = :replyId', { replyId })
        .execute();
    } catch (err) {
      throw new HttpException(`[MYSQL ERROR] update: ${err.message}`, 500);
    }
  }

  /**
   * 답글 아이디에 해당하는 데이터가 존재하는 지 확인합니다.
   */
  async checkExist(replyId: number): Promise<boolean> {
    try {
      return await this.replyModel
        .createQueryBuilder()
        .select()
        .where('id = :replyId', { replyId })
        .getExists();
    } catch (err) {
      throw new HttpException(`[MYSQL ERROR] checkExist: ${err.message}`, 500);
    }
  }

  /**
   * 답글 아이디에 해당하는 데이터 row를 삭제합니다.
   */
  async delete(replyId: number): Promise<ReplyDeletedCountReturn> {
    try {
      const deletedComment = await this.replyModel
        .createQueryBuilder()
        .delete()
        .where('id = :replyId', { replyId })
        .execute();

      return { deletedCount: deletedComment.affected };
    } catch (err) {
      throw new HttpException(`[MYSQL ERROR] delete: ${err.message}`, 500);
    }
  }
}

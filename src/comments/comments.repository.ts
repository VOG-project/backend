import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './comments.entity';
import { Repository } from 'typeorm';
import { CommentRegisterRequest } from './dto/register.comment.dto';
import { HttpException } from '@nestjs/common';
import {
  CommentEntireDataReturn,
  CommentPkIdReturn,
  CommentDeletedCountReturn,
} from './dto/return.comment.dto';
import { CommentModifyRequest } from './dto/modify.comment.dto';

export class CommentsRepository {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentModel: Repository<CommentEntity>,
  ) {}

  async create(
    commentRegisterRequest: CommentRegisterRequest,
  ): Promise<CommentPkIdReturn> {
    try {
      const insertedComment = await this.commentModel
        .createQueryBuilder()
        .insert()
        .values(commentRegisterRequest)
        .execute();

      return { commentId: insertedComment.identifiers[0].id };
    } catch (err) {
      throw new HttpException(`[MYSQL ERROR] create: ${err.message}`, 500);
    }
  }

  async findByCommentId(commentId: number): Promise<CommentEntireDataReturn> {
    try {
      return await this.commentModel
        .createQueryBuilder()
        .select()
        .where('id = :commentId', { commentId })
        .getOne();
    } catch (err) {
      throw new HttpException(
        `[MYSQL ERROR] findByCommentId: ${err.message}`,
        500,
      );
    }
  }

  async update(
    commentModifyRequest: CommentModifyRequest,
    commentId: number,
  ): Promise<void> {
    try {
      await this.commentModel
        .createQueryBuilder()
        .update()
        .set(commentModifyRequest)
        .where('id = :commentId', { commentId })
        .execute();
    } catch (err) {
      throw new HttpException(`[MYSQL ERROR] update: ${err.message}`, 500);
    }
  }

  async checkExist(commentId: number): Promise<boolean> {
    try {
      return await this.commentModel
        .createQueryBuilder()
        .select()
        .where('id = :commentId', { commentId })
        .getExists();
    } catch (err) {
      throw new HttpException(`[MYSQL ERROR] checkExist: ${err.message}`, 500);
    }
  }

  async delete(commentId: number): Promise<CommentDeletedCountReturn> {
    try {
      const deletedComment = await this.commentModel
        .createQueryBuilder()
        .delete()
        .where('id = :commentId', { commentId })
        .execute();

      return { deletedCount: deletedComment.affected };
    } catch (err) {
      throw new HttpException(`[MYSQL ERROR] checkExist: ${err.message}`, 500);
    }
  }
}

import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './comments.entity';
import { Repository } from 'typeorm';
import { CommentRegisterRequest } from './dto/register.comment.dto';
import { HttpException } from '@nestjs/common';
import {
  CommentEntireDataReturn,
  CommentPkIdReturn,
} from './dto/return.comment.dto';

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
}

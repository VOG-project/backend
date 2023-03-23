import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './comments.entity';
import { Repository } from 'typeorm';
import { CommentCreateRequest } from './dto/create.comment.dto';
import { HttpException } from '@nestjs/common';
import {
  CommentPkIdReturn,
  CommetEntireDataReturn,
} from './dto/return.comment.dto';

export class CommentsRepository {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentModel: Repository<CommentEntity>,
  ) {}

  async createComment(
    commentCreateRequest: CommentCreateRequest,
  ): Promise<CommentPkIdReturn> {
    try {
      const insertedComment = await this.commentModel
        .createQueryBuilder()
        .insert()
        .values(commentCreateRequest)
        .execute();

      return { commentId: insertedComment.identifiers[0].id };
    } catch (err) {
      throw new HttpException(
        `[MYSQL ERROR] createComment: ${err.message}`,
        500,
      );
    }
  }

  async findOneById(commentId: number): Promise<CommetEntireDataReturn> {
    try {
      return await this.commentModel
        .createQueryBuilder()
        .select()
        .where('id = :commentId', { commentId })
        .getOne();
    } catch (err) {
      throw new HttpException(`[MYSQL ERROR] findOneById: ${err.message}`, 500);
    }
  }
}
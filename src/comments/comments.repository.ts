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

  async findCommentAndReplyByPostId(postId: number, page: number) {
    try {
      return await this.commentModel
        .createQueryBuilder('c')
        .innerJoin('c.user', 'cu')
        .leftJoin('c.replies', 'r')
        .leftJoin('r.user', 'ru')
        .select([
          'c.id',
          'c.content',
          'c.createdAt',
          'c.updatedAt',
          'cu.id',
          'cu.nickname',
          'cu.sex',
          'cu.profileUrl',
          'cu.createdAt',
          'cu.updatedAt',
          'r.id',
          'r.content',
          'r.createdAt',
          'r.updatedAt',
          'ru.id',
          'ru.nickname',
          'ru.sex',
          'ru.profileUrl',
          'ru.createdAt',
          'ru.updatedAt',
        ])
        .where('c.postId = :postId', { postId })
        .skip((page - 1) * 10)
        .take(10)
        .getMany();
    } catch (err) {
      throw new HttpException(
        `[MYSQL ERROR] findCommentAndReplyByCommentId: ${err.message}`,
        500,
      );
    }
    // try {
    //   return await this.commentModel
    //     .createQueryBuilder('c')
    //     .innerJoin('c.user', 'cu')
    //     .innerJoin('c.replies', 'r')
    //     .innerJoin('r.user', 'ru')
    //     .select([
    //       'c.id',
    //       'c.content',
    //       'c.createdAt',
    //       'c.updatedAt',
    //       'cu.id',
    //       'cu.nickname',
    //       'cu.sex',
    //       'cu.profileUrl',
    //       'cu.createdAt',
    //       'cu.updatedAt',
    //       'r.id',
    //       'r.content',
    //       'r.createdAt',
    //       'r.updatedAt',
    //       'ru.id',
    //       'ru.nickname',
    //       'ru.profileUrl',
    //       'ru.createdAt',
    //       'ru.updatedAt',
    //     ])
    //     .where('c.postId = :postId', { postId })
    //     .skip(10 * (page - 1))
    //     .take(10)
    //     .getMany();
    // } catch (err) {
    //   throw new HttpException(
    //     `[MYSQL ERROR] findCommentAndReplyByCommentId: ${err.message}`,
    //     500,
    //   );
    // }
  }

  async findCountByPostId(postId: number) {
    try {
      await this.commentModel
        .createQueryBuilder()
        .select()
        .where('postId = :postId', { postId })
        .getCount();
    } catch (err) {
      throw new HttpException(
        `[MYSQL ERROR] findCountByPostId: ${err.message}`,
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
      throw new HttpException(`[MYSQL ERROR] delete: ${err.message}`, 500);
    }
  }
}

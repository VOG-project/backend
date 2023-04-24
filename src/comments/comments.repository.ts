import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './comments.entity';
import { Repository } from 'typeorm';
import { CommentRegisterRequest } from './dto/register.comment.dto';
import { HttpException, Injectable } from '@nestjs/common';
import {
  CommentEntireDataReturn,
  CommentPkIdReturn,
  CommentDeletedCountReturn,
} from './dto/return.comment.dto';
import { CommentModifyRequest } from './dto/modify.comment.dto';
import { CommentGetCommentAndReplyCondition } from './dto/get.comment.dto';

@Injectable()
export class CommentsRepository {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentModel: Repository<CommentEntity>,
  ) {}

  /**
   * 댓글 데이터를 생성합니다.
   */
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

  /**
   * 댓글 아이디에 해당하는 데이터를 반환합니다.
   */
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

  /**
   * 댓글 아이디와 페이지에 해당하는 데이터(댓글 + 답글)를 페이지네이션 하여 반환합니다.
   */
  async findCommentAndReplyByPostId(
    commentGetCommentAndReplyCondition: CommentGetCommentAndReplyCondition,
  ) {
    try {
      const { postId, page } = commentGetCommentAndReplyCondition;
      // comment, user, repliy 엔티티 조인
      // null인 경우도 반환할 수 있도록 leftjoin
      const query = this.commentModel
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
        .where('c.postId = :postId', { postId });

      const result = await query
        .skip((page - 1) * 10)
        .take(10)
        .getMany();

      const totalCount = await query.getCount();

      return { totalCount, result };
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

  async findCommentAndReplyCountByPostId(postId: number) {
    try {
      const result = await this.commentModel.query(
        `SELECT COUNT(1) + (SELECT COUNT(1) FROM reply WHERE postId = ?) AS commentCount FROM comment WHERE postId = ?`,
        [postId, postId],
      );
      return result[0];
    } catch (err) {
      throw new HttpException(
        `[MYSQL ERROR] findCommentAndReplyCountByPostId: ${err.message}`,
        500,
      );
    }
  }

  /**
   * 댓글 아이디에 해당하는 데이터를 업데이트합니다.
   */
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

  /**
   * 댓글 아이디에 해당하는 데이터의 존재 유무를 반환합니다.
   */
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

  /**
   * 댓글 아이디에 해당하는 데이터를 삭제합니다.
   */
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

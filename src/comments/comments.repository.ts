import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './comments.entity';
import { Repository } from 'typeorm';
import { CommentCreateRequest } from './dto/create.comment.dto';
import { HttpException } from '@nestjs/common';
import {
  CommentDeletedCountReturn,
  CommentPkIdReturn,
  CommentEntireDataReturn,
} from './dto/return.comment.dto';
import { CommentUpdateRequest } from './dto/update.comment.dto';

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

  async findOneById(commentId: number): Promise<CommentEntireDataReturn> {
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

  async findCommentOneByPostId(postId: number): Promise<any> {
    try {
      return await this.commentModel
        .createQueryBuilder('c')
        .innerJoin('c.user', 'cu')
        .select([
          'c.id',
          'c.postId',
          'c.content',
          'c.group',
          'c.sequence',
          'c.createdAt',
          'c.updatedAt',
          'cu.id',
          'cu.nickname',
        ])
        .where('postId = :postId', { postId });
    } catch (err) {
      throw new HttpException(
        `[MYSQL ERRO] findCommentOneByPostId: ${err.message}`,
        500,
      );
    }
  }

  async findOneWithUserByPostId(postId: number, cursor: number): Promise<any> {
    try {
      return await this.commentModel
        .createQueryBuilder('c')
        .innerJoin('c.user', 'cu')
        .innerJoin('c.reply', 'r')
        .innerJoin('r.user', 'ru')
        .select([
          'c.id',
          'c.postId',
          'c.content',
          'c.group',
          'c.sequence',
          'c.createdAt',
          'c.updatedAt',
          'cu.id',
          'cu.nickname',
          'r.id',
          'r.content',
          'r.group',
          'r.sequence',
          'r.createdAt',
          'r.updatedAt',
          'ru.id',
          'ru.nickname',
        ])
        .where('c.postId = :postId', { postId })
        .andWhere('c.id = r.group')
        .andWhere('c.id >= :cursor', { cursor })
        .orderBy('c.id', 'ASC')
        .addOrderBy('c.sequence', 'ASC')
        .limit(10)
        .getMany();
    } catch (err) {
      throw new HttpException(
        `[MYSQL ERROR] findOneWithUserByPostId: ${err.message}`,
        500,
      );
    }
  }

  // async findManyByPostId(postId: number): Promise<any> {
  //   try {
  //     return await this.commentModel.createQueryBuilder()
  //     .select()
  //     .where('')
  //   } catch (err) {
  //     throw new HttpException(
  //       `[MYSQL ERROR] findManyByPostId: ${err.message}`,
  //       500,
  //     );
  //   }
  // }

  async updateComment(
    commentUpdateRequest: CommentUpdateRequest,
    commentId: number,
  ): Promise<void> {
    try {
      await this.commentModel
        .createQueryBuilder()
        .update()
        .set(commentUpdateRequest)
        .where('id = :commentId', { commentId })
        .execute();
    } catch (err) {
      throw new HttpException(
        `[MYSQL ERROR] updateComment: ${err.message}`,
        500,
      );
    }
  }
  async deleteCommentById(
    commentId: number,
  ): Promise<CommentDeletedCountReturn> {
    try {
      const deletedResult = await this.commentModel
        .createQueryBuilder()
        .delete()
        .where('id = :commentId', { commentId })
        .execute();

      return { deletedCount: deletedResult.affected };
    } catch (err) {
      throw new HttpException(
        `[MYSQL ERROR] deleteComment: ${err.message}`,
        500,
      );
    }
  }

  async deleteCommentGroup(
    postId: number,
    group: number,
  ): Promise<CommentDeletedCountReturn> {
    try {
      const deletedResult = await this.commentModel
        .createQueryBuilder()
        .delete()
        .where('postId = :postId', { postId })
        .andWhere('group = :group', { group })
        .execute();

      return { deletedCount: deletedResult.affected };
    } catch (err) {
      throw new HttpException(
        `[MYSQL ERROR] deleteCommentGroup: ${err.message}`,
        500,
      );
    }
  }
}

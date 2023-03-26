import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './posts.entity';
import { Repository } from 'typeorm';
import { PostCreateRequest } from './dto/create.post.dto';
import { HttpException } from '@nestjs/common';
import {
  PostAndCommentsReturn,
  PostDeletedCountReturn,
  PostEntireDataReturn,
  PostListReturn,
  PostPkIdReturn,
} from './dto/return.post.dto';
import { PostModificationRequest } from './dto/modify.post.dto';

export class PostsRepository {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postModel: Repository<PostEntity>,
  ) {}

  async create(postRequestDto: PostCreateRequest): Promise<PostPkIdReturn> {
    try {
      const insertedPost = await this.postModel
        .createQueryBuilder()
        .insert()
        .values(postRequestDto)
        .execute();

      return { postId: insertedPost.identifiers[0].id };
    } catch (err) {
      throw new HttpException(`[MYSQL ERROR] create: ${err.message}`, 500);
    }
  }

  async findOneById(id: number): Promise<PostEntireDataReturn> {
    try {
      return await this.postModel
        .createQueryBuilder('p')
        .select()
        .where('id = :id', { id })
        .getOne();
    } catch (err) {
      throw new HttpException(`[MYSQL ERROR] findOneById: ${err.message}`, 500);
    }
  }

  async findPostListByBoardType(
    board: string,
    page: number,
    resultRowCount: number,
  ): Promise<PostListReturn[]> {
    try {
      return await this.postModel
        .createQueryBuilder('p')
        .select([
          'p.id',
          'p.title',
          'p.likeCount',
          'p.postCategory',
          'p.createdAt',
        ])
        .where('postCategory = :postCategory', { postCategory: board })
        .offset(resultRowCount * (page - 1))
        .limit(resultRowCount)
        .orderBy('id', 'DESC')
        .getMany();
    } catch (err) {
      throw new HttpException(
        `[MYSQL ERROR] findPostListByBoardType: ${err.message}`,
        500,
      );
    }
  }

  async findPostAndComments(postId: number): Promise<PostAndCommentsReturn> {
    try {
      return await this.postModel
        .createQueryBuilder('p')
        .innerJoin('p.comments', 'c')
        .innerJoin('c.childComments', 'r')
        .select([
          'p.id',
          'p.title',
          'p.content',
          'p.likeCount',
          'p.postCategory',
          'p.createdAt',
          'p.updatedAt',
          'c.id',
          'c.userId',
          'c.content',
          'c.group',
          'c.sequence',
          'c.createdAt',
          'c.updatedAt',
          'r.id',
          'r.userId',
          'r.content',
          'r.group',
          'r.sequence',
          'r.createdAt',
          'r.updatedAt',
        ])
        .where('p.id = :postId', { postId })
        .andWhere('c.id = r.group')
        .andWhere('r.sequence != 0')
        .orderBy('c.id', 'ASC')
        .addOrderBy('c.sequence', 'ASC')
        .getOne();
    } catch (err) {
      throw new HttpException(
        `[MYSQL ERROR] findPostAndComments: ${err.message}`,
        500,
      );
    }
  }

  async updatePost(
    data: PostModificationRequest,
    postId: number,
  ): Promise<void> {
    try {
      await this.postModel
        .createQueryBuilder()
        .update()
        .set(data)
        .where('id = :postId', { postId })
        .execute();
    } catch (err) {
      throw new HttpException(`[MYSQL ERROR] updatePost: ${err.message}`, 500);
    }
  }

  async deletePost(postId: number): Promise<PostDeletedCountReturn> {
    try {
      const deletedPost = await this.postModel
        .createQueryBuilder()
        .delete()
        .where('id = :postId', { postId })
        .execute();

      return { deletedCount: deletedPost.affected };
    } catch (err) {
      throw new HttpException(`[MYSQL ERROR] deletePost: ${err.message}`, 500);
    }
  }
}

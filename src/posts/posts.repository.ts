import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './posts.entity';
import { Repository } from 'typeorm';
import { PostCreateRequest } from './dto/create.post.dto';
import { HttpException } from '@nestjs/common';
import {
  PostEntireResponseDto,
  PostListReturn,
  PostPkIdResponseDto,
} from './dto/return.post.dto';

export class PostsRepository {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postModel: Repository<PostEntity>,
  ) {}

  async create(
    postRequestDto: PostCreateRequest,
  ): Promise<PostPkIdResponseDto> {
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

  async findOneById(id: number): Promise<PostEntireResponseDto> {
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
}

import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './posts.entity';
import { Repository } from 'typeorm';
import { PostCreateRequest } from './dto/create.post.dto';
import { HttpException } from '@nestjs/common';
import {
  PostDeletedCountReturn,
  PostEntireDataReturn,
  PostPkIdReturn,
  PostPagenationReturn,
} from './dto/return.post.dto';
import { PostModificationRequest } from './dto/modify.post.dto';
import { Redis } from 'ioredis';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { PostGetListCondition, PostSearchCondition } from './dto/get.post.dto';

export class PostsRepository {
  private readonly redis: Redis;

  constructor(
    @InjectRepository(PostEntity)
    private readonly postModel: Repository<PostEntity>,
    private readonly redisService: RedisService,
  ) {
    this.redis = this.redisService.getClient('cache');
  }

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
        .createQueryBuilder()
        .select()
        .where('id = :id', { id })
        .getOne();
    } catch (err) {
      throw new HttpException(`[MYSQL ERROR] findOneById: ${err.message}`, 500);
    }
  }

  async findPostListByBoardType(
    postGetListCondition: PostGetListCondition,
  ): Promise<PostPagenationReturn> {
    const { board, page } = postGetListCondition;
    try {
      const query = this.postModel
        .createQueryBuilder('p')
        .innerJoin('p.user', 'u')
        .select([
          'p.id',
          'p.title',
          'p.likeCount',
          'p.view',
          'p.postCategory',
          'p.createdAt',
          'u.id',
          'u.nickname',
          'u.profileUrl',
        ])
        .where('p.postCategory = :postCategory', { postCategory: board });

      const result = await query
        .offset(10 * (page - 1))
        .limit(10)
        .orderBy('p.id', 'DESC')
        .getMany();

      const totalCount = await query.getCount();

      return { totalCount, result };
    } catch (err) {
      throw new HttpException(
        `[MYSQL ERROR] findPostListByBoardType: ${err.message}`,
        500,
      );
    }
  }

  async findPostListByNickname(postSearchCondition: PostSearchCondition) {
    const { page, board, keyword } = postSearchCondition;
    try {
      const query = this.postModel
        .createQueryBuilder('p')
        .innerJoin('p.user', 'u')
        .select([
          'p.id',
          'p.title',
          'p.likeCount',
          'p.view',
          'p.postCategory',
          'p.createdAt',
          'u.id',
          'u.nickname',
          'u.profileUrl',
        ])
        .where('u.nickname LIKE :keyword', { keyword: `%${keyword}%` })
        .andWhere('p.postCategory = :postCategory', { postCategory: board });

      const result = await query
        .offset(10 * (page - 1))
        .limit(10)
        .orderBy('p.id', 'DESC')
        .getMany();

      const totalCount = await query.getCount();

      return { totalCount, result };
    } catch (err) {
      throw new HttpException(
        `[MYSQL ERROR] findPostListByNickname: ${err.message}`,
        500,
      );
    }
  }

  async findPostListByTitle(
    postSearchCondition: PostSearchCondition,
  ): Promise<PostPagenationReturn> {
    const { page, board, keyword } = postSearchCondition;
    try {
      const query = this.postModel
        .createQueryBuilder('p')
        .innerJoin('p.user', 'u')
        .select([
          'p.id',
          'p.title',
          'p.likeCount',
          'p.view',
          'p.postCategory',
          'p.createdAt',
          'u.id',
          'u.nickname',
          'u.profileUrl',
        ])
        .where('p.title LIKE :keyword', { keyword: `%${keyword}%` })
        .andWhere('p.postCategory = :postCategory', { postCategory: board });

      const result = await query
        .offset(10 * (page - 1))
        .limit(10)
        .orderBy('p.id', 'DESC')
        .getMany();

      const totalCount = await query.getCount();

      return { totalCount, result };
    } catch (err) {
      throw new HttpException(
        `[MYSQL ERROR] findPostListByTitle: ${err.message}`,
        500,
      );
    }
  }

  async addView(postId: number) {
    try {
      return await this.postModel
        .createQueryBuilder()
        .update()
        .set({ view: () => 'view + 1' })
        .where('id = :postId', { postId })
        .execute();
    } catch (err) {
      throw new HttpException(`[MYSQL ERROR] addView: ${err.message}`, 500);
    }
  }

  async checkExist(postId: number) {
    try {
      return await this.postModel
        .createQueryBuilder()
        .select()
        .where('id = :postId', { postId })
        .getExists();
    } catch (err) {
      throw new HttpException(`[MYSQL ERROR] checkExist: ${err.message}`, 500);
    }
  }

  async findPostAndUserById(id: number): Promise<PostEntireDataReturn> {
    try {
      console.log(id);
      return await this.postModel
        .createQueryBuilder('p')
        .innerJoin('p.user', 'u')
        .select([
          'p.id',
          'p.title',
          'p.content',
          'p.postCategory',
          'p.view',
          'p.createdAt',
          'p.updatedAt',
          'u.id',
          'u.nickname',
          'u.profileUrl',
          'u.updatedAt',
        ])
        .where('p.id = :id', { id })
        .getOne();
    } catch (err) {
      throw new HttpException(`[MYSQL ERROR] findOneById: ${err.message}`, 500);
    }
  }

  async findCachingPost(postId: number): Promise<string> {
    return await this.redis.get(postId.toString());
  }

  async writeCachingPost(
    postId: number,
    post: PostEntireDataReturn,
  ): Promise<void> {
    await this.redis.set(postId.toString(), JSON.stringify(post));
    await this.redis.expire(postId.toString(), 60 * 60 * 12 * 1);
  }

  // async findPostAndComments(postId: number): Promise<PostAndCommentsReturn> {
  //   try {
  //     return await this.postModel
  //       .createQueryBuilder('p')
  //       .innerJoin('p.user', 'pu')
  //       .innerJoin('p.comments', 'c')
  //       .innerJoin('c.reply', 'r')
  //       .innerJoin('c.user', 'cu')
  //       .innerJoin('r.user', 'ru')
  //       .select([
  //         'p.id',
  //         'p.title',
  //         'p.content',
  //         'p.likeCount',
  //         'p.postCategory',
  //         'p.createdAt',
  //         'p.updatedAt',
  //         'pu.id',
  //         'pu.nickname',
  //         'c.id',
  //         'c.content',
  //         'c.group',
  //         'c.sequence',
  //         'c.createdAt',
  //         'c.updatedAt',
  //         'cu.id',
  //         'cu.nickname',
  //         'r.id',
  //         'r.content',
  //         'r.group',
  //         'r.sequence',
  //         'r.createdAt',
  //         'r.updatedAt',
  //         'ru.id',
  //         'ru.nickname',
  //       ])
  //       .where('p.id = :postId', { postId })
  //       .andWhere('c.id = r.group')
  //       .andWhere('r.sequence != 0')
  //       .orderBy('c.id', 'ASC')
  //       .addOrderBy('c.sequence', 'ASC')
  //       .getOne();
  //   } catch (err) {
  //     throw new HttpException(
  //       `[MYSQL ERROR] findPostAndComments: ${err.message}`,
  //       500,
  //     );
  //   }
  // }

  async findCountByCategory(category: string): Promise<number> {
    try {
      return await this.postModel
        .createQueryBuilder()
        .select()
        .where('postCategory = :category', { category })
        .getCount();
    } catch (err) {
      throw new HttpException(
        `[MYSQL ERROR] findCountByCategory: ${err.message}`,
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

  async deleteCachingPost(postId: number): Promise<void> {
    try {
      await this.redis.del(postId.toString());
    } catch (err) {
      throw new HttpException(
        `[REDIS ERROR] deleteCachingPost: ${err.message}`,
        500,
      );
    }
  }
}

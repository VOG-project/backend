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
  private readonly redisForCache: Redis;
  private readonly redisForViews: Redis;

  constructor(
    @InjectRepository(PostEntity)
    private readonly postModel: Repository<PostEntity>,
    private readonly redisService: RedisService,
  ) {
    this.redisForCache = this.redisService.getClient('cache');
    this.redisForViews = this.redisService.getClient('views');
  }

  /**
   * 게시물 데이터를 생성합니다.
   */
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

  /**
   * 게시물 아이디에 해당하는 데이터를 반환합니다.
   */
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

  /**
   * 게시물 카테고리와 페이지에 해당하는 게시물 리스트를 반환합니다.
   */
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
          'p.postCategory',
          'p.createdAt',
          'u.id',
          'u.nickname',
          'u.profileUrl',
        ])
        .where('p.postCategory = :postCategory', { postCategory: board });

      // 10개씩 페이지네이션
      const result = await query
        .offset(10 * (page - 1))
        .limit(10)
        .orderBy('p.id', 'DESC')
        .getMany();

      // 게시물 총 개수
      const totalCount = await query.getCount();

      return { totalCount, result };
    } catch (err) {
      throw new HttpException(
        `[MYSQL ERROR] findPostListByBoardType: ${err.message}`,
        500,
      );
    }
  }

  /**
   * 게시물 카테고리와 페이지, 닉네임에 해당하는 게시물 리스트를 반환합니다.
   */
  async findPostListByNickname(postSearchCondition: PostSearchCondition) {
    const { page, board, keyword } = postSearchCondition;
    try {
      const query = this.postModel
        .createQueryBuilder('p')
        .innerJoin('p.user', 'u')
        .select([
          'p.id',
          'p.title',
          'p.postCategory',
          'p.createdAt',
          'u.id',
          'u.nickname',
          'u.profileUrl',
        ])
        .where('u.nickname LIKE :keyword', { keyword: `%${keyword}%` })
        .andWhere('p.postCategory = :postCategory', { postCategory: board });

      // 10개씩 페이지네이션
      const result = await query
        .offset(10 * (page - 1))
        .limit(10)
        .orderBy('p.id', 'DESC')
        .getMany();

      // 게시물 총 개수
      const totalCount = await query.getCount();

      return { totalCount, result };
    } catch (err) {
      throw new HttpException(
        `[MYSQL ERROR] findPostListByNickname: ${err.message}`,
        500,
      );
    }
  }

  /**
   * 게시물 카테고리와 페이지, 닉네임에 해당하는 게시물 리스트를 반환합니다.
   */
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
          'p.postCategory',
          'p.createdAt',
          'u.id',
          'u.nickname',
          'u.profileUrl',
        ])
        .where('p.title LIKE :keyword', { keyword: `%${keyword}%` })
        .andWhere('p.postCategory = :postCategory', { postCategory: board });

      // 10개씩 페이지네이션
      const result = await query
        .offset(10 * (page - 1))
        .limit(10)
        .orderBy('p.id', 'DESC')
        .getMany();

      // 게시물 총 개수
      const totalCount = await query.getCount();

      return { totalCount, result };
    } catch (err) {
      throw new HttpException(
        `[MYSQL ERROR] findPostListByTitle: ${err.message}`,
        500,
      );
    }
  }

  /**
   * 게시물의 view(조회수) 컬럼을 1 증가시킵니다.
   */
  async addView(postId: number) {
    try {
      return await this.redisForViews.incr(postId.toString());
    } catch (err) {
      throw new HttpException(`[REDIS ERROR] addView: ${err.message}`, 500);
    }
  }

  /**
   * postId에 해당하는 게시물의 view(조회수)를 반환합니다.
   */
  async findViewByPostId(postId: number) {
    try {
      const view = await this.redisForViews.get(postId.toString());
      return parseInt(view, 10);
    } catch (err) {
      throw new HttpException(`[REDIS ERROR] addView: ${err.message}`, 500);
    }
  }

  /**
   * postId에 해당하는 조회수를 0으로 초기화 합니다.
   */
  async createView(postId: number) {
    try {
      return await this.redisForViews.set(postId.toString(), 0);
    } catch (err) {
      throw new HttpException(`[REDIS ERROR] addView: ${err.message}`, 500);
    }
  }

  /**
   * postId에 해당하는 조회수 데이터를 삭제합니다
   */
  async deleteView(postId: number) {
    try {
      await this.redisForViews.del(postId.toString());
    } catch (err) {
      throw new HttpException(`[REDIS ERROR] addView: ${err.message}`, 500);
    }
  }

  /**
   * 게시물 아이디에 해당하는 데이터가 존재하는 지 확인합니다.
   */
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
      return await this.postModel
        .createQueryBuilder('p')
        .innerJoin('p.user', 'u')
        .select([
          'p.id',
          'p.title',
          'p.content',
          'p.postCategory',
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

  /**
   * 게시물 아이디에 해당하는 데이터를 캐싱합니다.
   */
  async findCachingPost(postId: number): Promise<string> {
    return await this.redisForCache.get(postId.toString());
  }

  /**
   * mysql에서 가져온 게시물 데이터를 캐시 데이터로 저장합니다.
   */
  async writeCachingPost(
    postId: number,
    post: PostEntireDataReturn,
  ): Promise<void> {
    await this.redisForCache.set(postId.toString(), JSON.stringify(post));
    await this.redisForCache.expire(postId.toString(), 60 * 60 * 12 * 1);
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

  /**
   * Dto에 담긴 데이터로 row를 갱신합니다.
   */
  async update(
    postModificationRequest: PostModificationRequest,
    postId: number,
  ): Promise<void> {
    try {
      await this.postModel
        .createQueryBuilder()
        .update()
        .set(postModificationRequest)
        .where('id = :postId', { postId })
        .execute();
    } catch (err) {
      throw new HttpException(`[MYSQL ERROR] updatePost: ${err.message}`, 500);
    }
  }

  /**
   * 게시물 아이디에 해당하는 게시물 데이터를 삭제합니다.
   */
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

  /**
   * 게시물 아이디에 해당하는 게시물 캐시 데이터를 삭제합니다.
   */
  async deleteCachingPost(postId: number): Promise<void> {
    try {
      await this.redisForCache.del(postId.toString());
    } catch (err) {
      throw new HttpException(
        `[REDIS ERROR] deleteCachingPost: ${err.message}`,
        500,
      );
    }
  }
}

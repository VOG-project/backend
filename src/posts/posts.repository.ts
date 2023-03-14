import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { PostUpdateRequestDto } from './dto/post.request.dto';
import { PostRegisterRequestDto } from './dto/post.request.dto';
import { FreePost, HumorPost } from 'src/posts/posts.entity';
import { ChampionshipPost } from './posts.entity';
import {
  PostRegisterResponseDto,
  PostDeleteResponseDto,
  PostUpdateResponseDto,
  PostGetListResponseDto,
  PostGetResponseDto,
  PostGetTotalCountResponseDto,
} from './dto/post.response.dto';

@Injectable()
export class PostsRepository {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(FreePost) private freePostModel: Repository<FreePost>,
    @InjectRepository(HumorPost) private humorPostModel: Repository<HumorPost>,
    @InjectRepository(ChampionshipPost)
    private championshipPostModel: Repository<ChampionshipPost>,
  ) {}

  async getFreePostTotalCount(): Promise<PostGetTotalCountResponseDto> {
    const postCount = await this.freePostModel
      .createQueryBuilder()
      .select()
      .getCount();

    return { postCount };
  }

  async getHumorPostTotalCount(): Promise<PostGetTotalCountResponseDto> {
    const postCount = await this.humorPostModel
      .createQueryBuilder()
      .select()
      .getCount();

    return { postCount };
  }

  async getChampionshipPostTotalCount(): Promise<PostGetTotalCountResponseDto> {
    const postCount = await this.championshipPostModel
      .createQueryBuilder()
      .select()
      .getCount();

    return { postCount };
  }

  async findFreePostById(id: number): Promise<PostGetResponseDto> {
    const post = await this.freePostModel
      .createQueryBuilder('p')
      .innerJoin('p.user', 'u')
      .select([
        'p.id',
        'p.writerId',
        'p.title',
        'p.content',
        'p.likeCount',
        'p.gameCategory',
        'p.updatedAt',
        'u.id',
        'u.email',
        'u.nickname',
        'u.sex',
        'u.profileUrl',
        'u.updatedAt',
      ])
      .where('p.id = :id', { id })
      .getOne();

    return post;
  }

  async findHumorPostById(id: number): Promise<PostGetResponseDto> {
    const post = await this.humorPostModel
      .createQueryBuilder('p')
      .innerJoin('p.user', 'u')
      .select([
        'p.id',
        'p.writerId',
        'p.title',
        'p.content',
        'p.likeCount',
        'p.gameCategory',
        'p.updatedAt',
        'u.id',
        'u.email',
        'u.nickname',
        'u.sex',
        'u.profileUrl',
        'u.updatedAt',
      ])
      .where('p.id = :id', { id })
      .getOne();

    return post;
  }

  async findChampionshipPostById(id: number): Promise<PostGetResponseDto> {
    const post = await this.championshipPostModel
      .createQueryBuilder('p')
      .innerJoin('p.user', 'u')
      .select([
        'p.id',
        'p.writerId',
        'p.title',
        'p.content',
        'p.likeCount',
        'p.gameCategory',
        'p.updatedAt',
        'u.id',
        'u.email',
        'u.nickname',
        'u.sex',
        'u.profileUrl',
        'u.updatedAt',
      ])
      .where('p.id = :id', { id })
      .getOne();

    return post;
  }

  async find10EachListFromChampionshipPost(
    page: number,
  ): Promise<PostGetListResponseDto[]> {
    const count = 10;

    const posts = await this.championshipPostModel
      .createQueryBuilder('p')
      .innerJoinAndSelect('p.user', 'u')
      .select([
        'p.id',
        'p.writerId',
        'p.title',
        'p.likeCount',
        'p.gameCategory',
        'p.createdAt',
        'u.id',
        'u.nickname',
      ])
      .offset(count * (page - 1))
      .limit(count)
      .orderBy('p.id', 'DESC')
      .getMany();

    return posts;
  }

  async find10EachListFromHumorPost(
    page: number,
  ): Promise<PostGetListResponseDto[]> {
    const count = 10;

    const posts = await this.humorPostModel
      .createQueryBuilder('p')
      .innerJoinAndSelect('p.user', 'u')
      .select([
        'p.id',
        'p.writerId',
        'p.title',
        'p.likeCount',
        'p.gameCategory',
        'p.createdAt',
        'u.id',
        'u.nickname',
      ])
      .offset(count * (page - 1))
      .limit(count)
      .orderBy('p.id', 'DESC')
      .getMany();

    return posts;
  }

  async find10EachListFromFreePost(
    page: number,
  ): Promise<PostGetListResponseDto[]> {
    const count = 10;

    const posts = await this.freePostModel
      .createQueryBuilder('p')
      .innerJoinAndSelect('p.user', 'u')
      .select([
        'p.id',
        'p.writerId',
        'p.title',
        'p.likeCount',
        'p.gameCategory',
        'p.createdAt',
        'u.id',
        'u.nickname',
      ])
      .offset(count * (page - 1))
      .limit(count)
      .orderBy('p.id', 'DESC')
      .getMany();

    return posts;
  }

  async delete(
    postId: number,
    targetEntity: string,
  ): Promise<PostDeleteResponseDto> {
    const deletedResult = await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(targetEntity)
      .where('id = :id', { id: postId })
      .execute();

    return { deletedCount: deletedResult.affected };
  }

  async create(
    data: PostRegisterRequestDto,
    targetEntity: string,
  ): Promise<PostRegisterResponseDto> {
    const { title, content, gameCategory, writerId } = data;

    const insertedResult = await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(targetEntity)
      .values([
        {
          title,
          content,
          gameCategory,
          writerId,
        },
      ])
      .execute();

    return { postId: insertedResult.identifiers[0].id };
  }

  async update(
    data: PostUpdateRequestDto,
    postId: number,
    targetEntity: string,
  ): Promise<PostUpdateResponseDto> {
    const { title, content } = data;

    const updatedResult = await this.dataSource
      .createQueryBuilder()
      .update(targetEntity)
      .set({
        title,
        content,
      })
      .where('id = :id', { id: postId })
      .execute();

    return { updatedCount: updatedResult.affected };
  }
}

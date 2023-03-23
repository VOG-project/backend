import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './posts.entity';
import { Repository } from 'typeorm';
import { PostRequestDto } from './dto/create.post.dto';
import { HttpException } from '@nestjs/common';
import {
  PostEntireResponseDto,
  PostPkIdResponseDto,
} from './dto/response.post.dto';

export class PostsRepository {
  constructor(
    @InjectRepository(PostEntity) private readonly post: Repository<PostEntity>,
  ) {}

  async create(postRequestDto: PostRequestDto): Promise<PostPkIdResponseDto> {
    try {
      const insertedPost = await this.post
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
      return await this.post
        .createQueryBuilder('p')
        .select()
        .where('id = :id', { id })
        .getOne();
    } catch (err) {
      throw new HttpException(`[MYSQL ERROR] findOneById: ${err.message}`, 500);
    }
  }
}

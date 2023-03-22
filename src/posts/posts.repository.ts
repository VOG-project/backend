import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './posts.entity';
import { Repository } from 'typeorm';
import { PostRequestDto } from './dto/create.post.dto';
import { HttpException } from '@nestjs/common';

export class PostsRepository {
  constructor(
    @InjectRepository(PostEntity) private readonly post: Repository<PostEntity>,
  ) {}

  async create(postRequestDto: PostRequestDto): Promise<void> {
    try {
      await this.post
        .createQueryBuilder()
        .insert()
        .values(postRequestDto)
        .execute();
    } catch (err) {
      throw new HttpException(`[MYSQL ERROR] create: ${err.message}`, 500);
    }
  }

  async findOneById(id: number): Promise<any> {
    return await this.post
      .createQueryBuilder('p')
      .select()
      .where('id = :id', { id })
      .getOne();
  }
}

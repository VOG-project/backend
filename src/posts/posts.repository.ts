import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FreePost } from 'src/posts/posts.entity';
import { Repository } from 'typeorm';
import { PostRegisterResponseDto } from './dto/post.response.dto';
import { PostRegisterRequestDto } from './dto/post.request.dto';

@Injectable()
export class PostsRepository {
  constructor(
    @InjectRepository(FreePost)
    private readonly freePostRepository: Repository<FreePost>,
  ) {}

  async create(data: PostRegisterRequestDto): Promise<PostRegisterResponseDto> {
    const { title, content, game_category, writer_id } = data;

    const insertResult = await this.freePostRepository
      .createQueryBuilder()
      .insert()
      .into(FreePost)
      .values([
        {
          title,
          content,
          game_category,
          writer_id,
        },
      ])
      .execute();

    return { postId: insertResult.identifiers[0].id };
  }
}

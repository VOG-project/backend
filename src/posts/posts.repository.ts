import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FreePost } from 'src/posts/posts.entity';
import { Repository } from 'typeorm';
import { PostUpdateRequestDto } from './dto/post.request.dto';
import { PostRegisterRequestDto } from './dto/post.request.dto';
import {
  PostRegisterResponseDto,
  PostDeleteResponseDto,
  PostUpdateResponseDto,
} from './dto/post.response.dto';

@Injectable()
export class PostsRepository {
  constructor(
    @InjectRepository(FreePost)
    private readonly postRepository: Repository<FreePost>,
  ) {}

  async delete(postId: number): Promise<PostDeleteResponseDto> {
    const deletedResult = await this.postRepository
      .createQueryBuilder()
      .delete()
      .from(FreePost)
      .where('id = :id', { id: postId })
      .execute();

    return { deletedCount: deletedResult.affected };
  }

  async create(data: PostRegisterRequestDto): Promise<PostRegisterResponseDto> {
    const { title, content, gameCategory, writerId } = data;

    const insertedResult = await this.postRepository
      .createQueryBuilder()
      .insert()
      .into(FreePost)
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
  ): Promise<PostUpdateResponseDto> {
    const { title, content } = data;

    const updatedResult = await this.postRepository
      .createQueryBuilder()
      .update(FreePost)
      .set({
        title,
        content,
      })
      .where('id = :id', { id: postId })
      .execute();

    console.log(updatedResult);

    return { updatedCount: updatedResult.affected };
  }
}

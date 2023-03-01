import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { PostUpdateRequestDto } from './dto/post.request.dto';
import { PostRegisterRequestDto } from './dto/post.request.dto';
import {
  PostRegisterResponseDto,
  PostDeleteResponseDto,
  PostUpdateResponseDto,
} from './dto/post.response.dto';

@Injectable()
export class PostsRepository {
  constructor(private readonly dataSource: DataSource) {}

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

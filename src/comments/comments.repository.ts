import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FreePostComment } from './comments.entity';
import { Repository, DataSource } from 'typeorm';
import { CommentRegisterRequestDto } from './dto/comment.request.dto';
import {
  CommentDeleteResponseDto,
  CommentRegisterResponseDto,
} from './dto/comment.response.dto';
import { CommentDeleteParamDto } from './dto/comment.param.dto';

@Injectable()
export class CommentsRepository {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(FreePostComment)
    private freePostCommentModel: Repository<FreePostComment>,
  ) {}

  async create(
    data: CommentRegisterRequestDto,
    targetEntity: string,
    postId: number,
  ): Promise<CommentRegisterResponseDto> {
    const { writerId, content } = data;

    const insertedResult = await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(targetEntity)
      .values([
        {
          writerId,
          postId,
          content,
        },
      ])
      .execute();

    return { commentId: insertedResult.identifiers[0].id };
  }

  async delete(
    data: CommentDeleteParamDto,
    targetEntity: string,
  ): Promise<CommentDeleteResponseDto> {
    const { commentId } = data;

    const deletedResult = await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(targetEntity)
      .where('id = :commentId', { commentId })
      .execute();

    return { deletedCount: deletedResult.affected };
  }
}

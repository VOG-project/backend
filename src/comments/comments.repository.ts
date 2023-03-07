import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FreePostComment } from './comments.entity';
import { Repository, DataSource } from 'typeorm';
import { CommentRegisterRequestDto } from './dto/comment.request.dto';
import { CommentRegisterResponseDto } from './dto/comment.response.dto';

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
}

import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './comments.entity';
import { Repository } from 'typeorm';
import { CommentRegisterRequest } from './dto/register.comment.dto';
import { HttpException } from '@nestjs/common';

export class CommentsRepository {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentModel: Repository<CommentEntity>,
  ) {}

  async create(commentRegisterRequest: CommentRegisterRequest): Promise<void> {
    try {
      await this.commentModel
        .createQueryBuilder()
        .insert()
        .values(commentRegisterRequest)
        .execute();
    } catch (err) {
      throw new HttpException(`[MYSQL ERROR] create: ${err.message}`, 500);
    }
  }
}

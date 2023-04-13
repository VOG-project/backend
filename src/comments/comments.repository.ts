import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './comments.entity';
import { Repository } from 'typeorm';
import { CommentCreateRequest } from './dto/create.comment.dto';
import { HttpException } from '@nestjs/common';
import {
  CommentDeletedCountReturn,
  CommentPkIdReturn,
  CommentEntireDataReturn,
} from './dto/return.comment.dto';
import { CommentUpdateRequest } from './dto/update.comment.dto';

export class CommentsRepository {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentModel: Repository<CommentEntity>,
  ) {}
}

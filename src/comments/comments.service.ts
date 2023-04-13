import { Injectable, HttpException } from '@nestjs/common';
import { CommentsRepository } from './comments.repository';
import { CommentCreateRequest } from './dto/create.comment.dto';
import {
  CommentDeletedCountReturn,
  CommentEntireDataReturn,
} from './dto/return.comment.dto';
import { CommentDeleteCondition } from './dto/delete.comment.dto';
import { PostsRepository } from 'src/posts/posts.repository';
import { CommentUpdateRequest } from './dto/update.comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentRepository: CommentsRepository,
    private readonly postRepository: PostsRepository,
  ) {}
}

import { Injectable } from '@nestjs/common';
import { CommentsRepository } from './comments.repository';
import { PostsRepository } from 'src/posts/posts.repository';
import { CommentRegisterRequest } from './dto/register.comment.dto';
import { CommentEntireDataReturn } from './dto/return.comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentRepository: CommentsRepository,
    private readonly postRepository: PostsRepository,
  ) {}

  async registerPost(
    commentRegisterRequest: CommentRegisterRequest,
  ): Promise<CommentEntireDataReturn> {
    const { commentId } = await this.commentRepository.create(
      commentRegisterRequest,
    );
    return await this.commentRepository.findByCommentId(commentId);
  }
}

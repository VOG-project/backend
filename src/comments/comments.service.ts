import { Injectable } from '@nestjs/common';
import { CommentsRepository } from './comments.repository';
import { CommentCreateRequest } from './dto/create.comment.dto';
import { CommetEntireDataReturn } from './dto/return.comment.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly commentRepository: CommentsRepository) {}

  async registerComment(
    commentCreateRequest: CommentCreateRequest,
  ): Promise<CommetEntireDataReturn> {
    const { commentId } = await this.commentRepository.createComment(
      commentCreateRequest,
    );
    return await this.commentRepository.findOneById(commentId);
  }
}

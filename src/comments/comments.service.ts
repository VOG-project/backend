import { Injectable, HttpException } from '@nestjs/common';
import { CommentsRepository } from './comments.repository';
import { PostsRepository } from 'src/posts/posts.repository';
import { CommentRegisterRequest } from './dto/register.comment.dto';
import {
  CommentEntireDataReturn,
  CommentDeletedCountReturn,
} from './dto/return.comment.dto';
import { CommentModifyRequest } from './dto/modify.comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentRepository: CommentsRepository,
    private readonly postRepository: PostsRepository,
  ) {}

  async registerComment(
    commentRegisterRequest: CommentRegisterRequest,
  ): Promise<CommentEntireDataReturn> {
    const { commentId } = await this.commentRepository.create(
      commentRegisterRequest,
    );
    return await this.commentRepository.findByCommentId(commentId);
  }

  async modifyComment(
    commentModifyRequest: CommentModifyRequest,
    commentId: number,
  ) {
    const isExistedComment = await this.commentRepository.checkExist(commentId);
    if (!isExistedComment)
      throw new HttpException('존재하지 않는 댓글입니다.', 400);

    await this.commentRepository.update(commentModifyRequest, commentId);
    return await this.commentRepository.findByCommentId(commentId);
  }
  async removeComment(commentId: number): Promise<CommentDeletedCountReturn> {
    const isExistedComment = await this.commentRepository.checkExist(commentId);
    if (!isExistedComment)
      throw new HttpException('존재하지 않는 댓글입니다.', 400);

    return await this.commentRepository.delete(commentId);
  }
}

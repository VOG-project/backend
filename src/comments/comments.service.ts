import { Injectable, HttpException } from '@nestjs/common';
import { CommentsRepository } from './comments.repository';
import { PostsRepository } from 'src/posts/posts.repository';
import { CommentRegisterRequest } from './dto/register.comment.dto';
import {
  CommentEntireDataReturn,
  CommentDeletedCountReturn,
} from './dto/return.comment.dto';
import { CommentModifyRequest } from './dto/modify.comment.dto';
import { CommentGetCommentAndReplyCondition } from './dto/get.comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentRepository: CommentsRepository,
    private readonly postRepository: PostsRepository,
  ) {}

  async getComment(
    commentGetCommentAndReplyCondition: CommentGetCommentAndReplyCondition,
  ) {
    const { postId } = commentGetCommentAndReplyCondition;
    const isExistedPost = await this.postRepository.checkExist(postId);
    if (!isExistedPost)
      throw new HttpException('존재하지 않는 게시물에 대한 접근입니다.', 400);

    return await this.commentRepository.findCommentAndReplyByPostId(
      commentGetCommentAndReplyCondition,
    );
  }

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

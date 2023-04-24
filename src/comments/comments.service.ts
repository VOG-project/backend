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

  /**
   * 댓글과 답글 데이터를 페이지네이션 하여 반환합니다.
   */
  async getComment(
    commentGetCommentAndReplyCondition: CommentGetCommentAndReplyCondition,
  ) {
    const { postId } = commentGetCommentAndReplyCondition;
    const isExistedPost = await this.postRepository.checkExist(postId);
    // 존재하지 않는 댓글에 접근하면 예외처리
    if (!isExistedPost)
      throw new HttpException('존재하지 않는 게시물에 대한 접근입니다.', 400);

    return await this.commentRepository.findCommentAndReplyByPostId(
      commentGetCommentAndReplyCondition,
    );
  }

  /**
   * 댓글 데이터를 생성하고 생성된 데이터를 반환합니다.
   */
  async registerComment(
    commentRegisterRequest: CommentRegisterRequest,
  ): Promise<CommentEntireDataReturn> {
    const { commentId } = await this.commentRepository.create(
      commentRegisterRequest,
    );
    return await this.commentRepository.findByCommentId(commentId);
  }

  /**
   * 댓글 데이터를 업데이트하고 업데이트된 데이터를 반환합니다.
   */
  async modifyComment(
    commentModifyRequest: CommentModifyRequest,
    commentId: number,
  ) {
    const isExistedComment = await this.commentRepository.checkExist(commentId);
    // 존재하지 않는 댓글에 접근하면 예외처리
    if (!isExistedComment)
      throw new HttpException('존재하지 않는 댓글입니다.', 400);

    await this.commentRepository.update(commentModifyRequest, commentId);
    return await this.commentRepository.findByCommentId(commentId);
  }

  /**
   * 댓글 아이디에 해당하는 데이터를 삭제합니다.
   */
  async removeComment(commentId: number): Promise<CommentDeletedCountReturn> {
    const isExistedComment = await this.commentRepository.checkExist(commentId);
    // 존재하지 않는 댓글에 접근하면 예외처리
    if (!isExistedComment)
      throw new HttpException('존재하지 않는 댓글입니다.', 400);

    return await this.commentRepository.delete(commentId);
  }
}

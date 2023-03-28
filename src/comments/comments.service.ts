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

  async registerComment(
    commentCreateRequest: CommentCreateRequest,
  ): Promise<CommentEntireDataReturn> {
    const { group, sequence } = commentCreateRequest;

    if (sequence >= 1) {
      const isExistedComment = await this.commentRepository.findOneById(group);
      if (!isExistedComment)
        throw new HttpException('존재하지 않는 댓글에 대한 요청입니다.', 400);
    }

    const { commentId } = await this.commentRepository.createComment(
      commentCreateRequest,
    );
    return await this.commentRepository.findOneById(commentId);
  }

  async getComments(postId: number): Promise<CommentEntireDataReturn> {
    const isExitedPost = await this.postRepository.findOneById(postId);
    if (!isExitedPost)
      throw new HttpException('존재하지 않는 게시물에 대한 접근입니다.', 400);

    return await this.commentRepository.findOneWithUserByPostId(postId);
  }

  async modifyComment(
    commentUpdateRequest: CommentUpdateRequest,
    commentId: number,
  ): Promise<CommentEntireDataReturn> {
    const isExistedComment = await this.commentRepository.findOneById(
      commentId,
    );
    if (!isExistedComment)
      throw new HttpException('존재하지 않는 댓글입니다.', 400);

    await this.commentRepository.updateComment(commentUpdateRequest, commentId);

    return await this.commentRepository.findOneById(commentId);
  }

  async removeComment(
    commentId: number,
    condition: CommentDeleteCondition,
  ): Promise<CommentDeletedCountReturn> {
    const { group, sequence, postId } = condition;

    const isExistedPost = await this.postRepository.findOneById(postId);
    if (!isExistedPost)
      throw new HttpException('존재하지 않는 게시물입니다.', 400);

    const isExistedComment = await this.commentRepository.findOneById(
      commentId,
    );
    if (!isExistedComment)
      throw new HttpException('존재하지 않는 댓글입니다.', 400);

    const isExistedGroup = await this.commentRepository.findOneById(group);
    if (!isExistedGroup)
      throw new HttpException('존재하지 않는 댓글 그룹입니다.', 400);

    if (sequence === 0) {
      return await this.commentRepository.deleteCommentGroup(postId, group);
    } else if (sequence > 0) {
      return await this.commentRepository.deleteCommentById(commentId);
    }
  }
}

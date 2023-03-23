import { Injectable, HttpException } from '@nestjs/common';
import { CommentsRepository } from './comments.repository';
import { CommentCreateRequest } from './dto/create.comment.dto';
import {
  CommentDeletedCountReturn,
  CommetEntireDataReturn,
} from './dto/return.comment.dto';
import { CommentDeleteCondition } from './dto/delete.comment.dto';
import { PostsRepository } from 'src/posts/posts.repository';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentRepository: CommentsRepository,
    private readonly postRepository: PostsRepository,
  ) {}

  async registerComment(
    commentCreateRequest: CommentCreateRequest,
  ): Promise<CommetEntireDataReturn> {
    const { commentId } = await this.commentRepository.createComment(
      commentCreateRequest,
    );
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

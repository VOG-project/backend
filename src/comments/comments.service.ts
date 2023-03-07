import { Injectable } from '@nestjs/common';
import { CommentsRepository } from './comments.repository';
import { CommentRegisterRequestDto } from './dto/comment.request.dto';
import { CommentRegisterResponseDto } from './dto/comment.response.dto';
import { CommentRegisterQueryValidation } from './validations/comment.query.validation';

@Injectable()
export class CommentsService {
  private BOARD_TYPE;

  constructor(private readonly commentRepository: CommentsRepository) {}

  async registerComment(
    body: CommentRegisterRequestDto,
    query: CommentRegisterQueryValidation,
  ): Promise<CommentRegisterResponseDto> {
    const { board, postId } = query;

    if (board === 'free') {
      this.BOARD_TYPE = 'freePostComment';
    } else if (board === 'humor') {
      this.BOARD_TYPE = 'humorPostCommet';
    } else if (board === 'championship') {
      this.BOARD_TYPE = 'championshipPostComment';
    }

    return await this.commentRepository.create(body, this.BOARD_TYPE, postId);
  }
}

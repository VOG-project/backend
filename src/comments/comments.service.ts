import { Injectable } from '@nestjs/common';
import { CommentsRepository } from './comments.repository';
import { CommentRegisterRequestDto } from './dto/comment.request.dto';
import {
  CommentDeleteResponseDto,
  CommentRegisterResponseDto,
} from './dto/comment.response.dto';
import {
  CommentDeleteQueryDto,
  CommentRegisterQueryDto,
} from './dto/comment.query.dto';
import { CommentDeleteParamDto } from './dto/comment.param.dto';

@Injectable()
export class CommentsService {
  private BOARD_TYPE: string;

  constructor(private readonly commentRepository: CommentsRepository) {}

  async registerComment(
    body: CommentRegisterRequestDto,
    query: CommentRegisterQueryDto,
  ): Promise<CommentRegisterResponseDto> {
    const { board, postId } = query;

    if (board === 'free') {
      this.BOARD_TYPE = 'freePostComment';
    } else if (board === 'humor') {
      this.BOARD_TYPE = 'humorPostComment';
    } else if (board === 'championship') {
      this.BOARD_TYPE = 'championshipPostComment';
    }

    return await this.commentRepository.create(body, this.BOARD_TYPE, postId);
  }

  async deleteComment(
    data: CommentDeleteParamDto,
    filter: CommentDeleteQueryDto,
  ): Promise<CommentDeleteResponseDto> {
    const { board } = filter;

    if (board === 'free') {
      this.BOARD_TYPE = 'freePostComment';
    } else if (board === 'humor') {
      this.BOARD_TYPE = 'humorPostComment';
    } else if (board === 'championship') {
      this.BOARD_TYPE = 'championshipPostComment';
    }

    return await this.commentRepository.delete(data, this.BOARD_TYPE);
  }
}

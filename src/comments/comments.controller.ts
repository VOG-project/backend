import {
  Controller,
  UseFilters,
  UseInterceptors,
  Body,
  Get,
  Post,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';
import { CommentsService } from './comments.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CommentRegisterRequest } from './dto/register.comment.dto';
import {
  CommentEntireDataReturn,
  CommentDeletedCountReturn,
} from './dto/return.comment.dto';
import { CommentModifyRequest } from './dto/modify.comment.dto';

@Controller('comments')
@UseGuards(AuthGuard)
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @Post()
  @ApiOperation({
    summary: '댓글 생성 API',
    tags: ['Comments'],
  })
  @ApiResponse({
    description: '등록한 댓글에 대한 모든 데이터를 반환합니다.',
    type: CommentEntireDataReturn,
  })
  async registerPost(
    @Body() commentRegisterRequest: CommentRegisterRequest,
  ): Promise<CommentEntireDataReturn> {
    return await this.commentService.registerComment(commentRegisterRequest);
  }

  @Patch(':commentId')
  @ApiOperation({
    summary: '댓글 수정 API',
    tags: ['Comments'],
  })
  @ApiResponse({
    description: '수정한 댓글에 대한 모든 데이터를 반환합니다.',
    type: CommentEntireDataReturn,
  })
  async modifyComment(
    @Body() commentModifyRequest: CommentModifyRequest,
    @Param('commentId', ParseIntPipe) commentId: number,
  ): Promise<CommentEntireDataReturn> {
    return await this.commentService.modifyComment(
      commentModifyRequest,
      commentId,
    );
  }

  @Delete(':commentId')
  @ApiOperation({
    summary: '댓글 삭제 API',
    tags: ['Comments'],
  })
  @ApiResponse({
    description:
      '삭제된 데이터 row 개수를 반환합니다. (1이면 삭제, 0이면 삭제되지 않거나 없는 데이터에 접근)',
    type: CommentDeletedCountReturn,
  })
  async removeComment(
    @Param('commentId', ParseIntPipe) commentId: number,
  ): Promise<CommentDeletedCountReturn> {
    return await this.commentService.removeComment(commentId);
  }
}

import {
  Controller,
  UseFilters,
  UseInterceptors,
  Body,
  Post,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SuccessInterceptor } from 'src/interceptors/success.interceptor';
import { HttpExceptionFilter } from './../filters/http-exception.filter';
import { CommentsService } from './comments.service';
import { CommentCreateRequest } from './dto/create.comment.dto';
import { CommentDeleteCondition } from './dto/delete.comment.dto';
import {
  CommentDeletedCountReturn,
  CommetEntireDataReturn,
} from './dto/return.comment.dto';
import { CommentUpdateRequest } from './dto/update.comment.dto';

@Controller('comments')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @Post()
  @ApiOperation({
    summary: '댓글 생성 API',
    tags: ['comments'],
  })
  @ApiResponse({
    description: '댓글 정보를 등록하면 등록된 댓글 데이터를 반환합니다.',
    type: CommetEntireDataReturn,
  })
  registerComment(
    @Body() commentCreateRequest: CommentCreateRequest,
  ): Promise<CommetEntireDataReturn> {
    return this.commentService.registerComment(commentCreateRequest);
  }

  @Patch(':commentId')
  @ApiOperation({
    summary: '댓글 수정 API',
    tags: ['comments'],
  })
  @ApiResponse({
    description: '댓글 내용과 댓글 pk를 입력받아 해당 댓글을 수정합니다.',
    type: CommetEntireDataReturn,
  })
  modifyComment(
    @Body() commentUpdateRequest: CommentUpdateRequest,
    @Param('commentId', ParseIntPipe) commentId,
  ): Promise<CommetEntireDataReturn> {
    return this.commentService.modifyComment(commentUpdateRequest, commentId);
  }

  @Delete()
  @ApiOperation({
    summary: '댓글 삭제 API',
    tags: ['comments'],
  })
  @ApiResponse({
    description: '조건(쿼리)에 해당하는 댓글을 삭제합니다.',
    type: CommentDeletedCountReturn,
  })
  removeComment(
    @Param('commentId', ParseIntPipe) commentId,
    @Query() condition: CommentDeleteCondition,
  ): Promise<CommentDeletedCountReturn> {
    return this.commentService.removeComment(commentId, condition);
  }
}

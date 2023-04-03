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
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';
import { CommentsService } from './comments.service';
import { CommentCreateRequest } from './dto/create.comment.dto';
import { CommentDeleteCondition } from './dto/delete.comment.dto';
import {
  CommentDeletedCountReturn,
  CommentEntireDataReturn,
} from './dto/return.comment.dto';
import { CommentUpdateRequest } from './dto/update.comment.dto';

@Controller('comments')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @Get(':postId')
  @ApiOperation({
    summary: '댓글 반환 API',
    tags: ['comments'],
  })
  @ApiResponse({
    description: `해당 게시물에 대한 댓글과 대댓글을 반환합니다. cursor 값은 postId 값이며, 
    cursor 값이 0일 시 1~10번까지의 댓글이 반환되고 해당 댓글에 달린 대댓글도 반환됩니다.
    cursor 값이 10일 시 11~20번까지의 댓글이 반환되고 해당 댓글에 달린 대댓글도 반환됩니다. 
      
    `,
    type: CommentEntireDataReturn,
  })
  getComments(
    @Param('postId', ParseIntPipe) postId: number,
    @Query('cursor', ParseIntPipe) cursor: number,
  ): Promise<CommentEntireDataReturn> {
    return this.commentService.getComments(postId, cursor);
  }

  @Post()
  @ApiOperation({
    summary: '댓글 생성 API',
    tags: ['comments'],
  })
  @ApiResponse({
    description: '댓글 정보를 등록하면 등록된 댓글 데이터를 반환합니다.',
    type: CommentEntireDataReturn,
  })
  registerComment(
    @Body() commentCreateRequest: CommentCreateRequest,
  ): Promise<CommentEntireDataReturn> {
    return this.commentService.registerComment(commentCreateRequest);
  }

  @Patch(':commentId')
  @ApiOperation({
    summary: '댓글 수정 API',
    tags: ['comments'],
  })
  @ApiResponse({
    description: '댓글 내용과 댓글 pk를 입력받아 해당 댓글을 수정합니다.',
    type: CommentEntireDataReturn,
  })
  modifyComment(
    @Body() commentUpdateRequest: CommentUpdateRequest,
    @Param('commentId', ParseIntPipe) commentId,
  ): Promise<CommentEntireDataReturn> {
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

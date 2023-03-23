import { Controller, UseFilters, UseInterceptors, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SuccessInterceptor } from 'src/interceptors/success.interceptor';
import { HttpExceptionFilter } from './../filters/http-exception.filter';
import { CommentsService } from './comments.service';
import { CommentCreateRequest } from './dto/create.comment.dto';
import { CommetEntireDataReturn } from './dto/return.comment.dto';

@Controller('comments')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @Body()
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
}

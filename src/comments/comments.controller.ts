import {
  Controller,
  UseFilters,
  UseInterceptors,
  Post,
  Body,
  Query,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { SuccessInterceptor } from './../interceptors/success.interceptor';
import { CommentRegisterRequestDto } from './dto/comment.request.dto';
import { CommentRegisterQueryValidation } from './validations/comment.query.validation';
import { CommentsService } from './comments.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommentRegisterResponseDto } from './dto/comment.response.dto';

@Controller('comments')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @Post()
  @ApiOperation({
    summary: '댓글 생성',
    tags: ['Comments'],
  })
  @ApiResponse({
    status: 201,
    description: '댓글 생성 성공',
    type: CommentRegisterResponseDto,
  })
  async registerFreePostComment(
    @Body() body: CommentRegisterRequestDto,
    @Query() query: CommentRegisterQueryValidation,
  ): Promise<CommentRegisterResponseDto> {
    return await this.commentService.registerComment(body, query);
  }
}

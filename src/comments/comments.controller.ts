import {
  Controller,
  UseFilters,
  UseInterceptors,
  Post,
  Body,
  Query,
  Delete,
  Param,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { SuccessInterceptor } from './../interceptors/success.interceptor';
import { CommentRegisterRequestDto } from './dto/comment.request.dto';
import {
  CommentDeleteQueryDto,
  CommentRegisterQueryDto,
} from './dto/comment.query.dto';
import { CommentsService } from './comments.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  CommentDeleteResponseDto,
  CommentRegisterResponseDto,
} from './dto/comment.response.dto';
import { CommentDeleteParamDto } from './dto/comment.param.dto';

@Controller('comments')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @Post()
  @ApiOperation({
    summary: '게시판 댓글 생성',
    tags: ['Comments'],
  })
  @ApiResponse({
    status: 201,
    description: '댓글 생성 성공',
    type: CommentRegisterResponseDto,
  })
  async registerFreePostComment(
    @Body() body: CommentRegisterRequestDto,
    @Query() query: CommentRegisterQueryDto,
  ): Promise<CommentRegisterResponseDto> {
    return await this.commentService.registerComment(body, query);
  }

  @Delete(':commentId')
  @ApiOperation({
    summary: '게시판 댓글 삭제',
    tags: ['Comments'],
  })
  @ApiResponse({
    status: 201,
    description: '댓글 삭제 성공',
    type: CommentDeleteResponseDto,
  })
  async deleteFreePostComment(
    @Param() param: CommentDeleteParamDto,
    @Query() query: CommentDeleteQueryDto,
  ): Promise<CommentDeleteResponseDto> {
    return await this.commentService.deleteComment(param, query);
  }
}

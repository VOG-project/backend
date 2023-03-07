import {
  Controller,
  UseFilters,
  UseInterceptors,
  Post,
  Body,
  Query,
  Delete,
  Param
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { SuccessInterceptor } from './../interceptors/success.interceptor';
import { CommentRegisterRequestDto } from './dto/comment.request.dto';
import { CommentRegisterQueryDto } from './dto/comment.query.dto';
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
    summary: '자유게시판 댓글 생성',
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

  @Delete()
  @ApiOperation({
    summary: '자유게시판 댓글 삭제',
    tags: ['Comments'],
  })
  @ApiResponse({
    status: 201,
    description: '댓글 삭제 성공',
  })
  async deleteFreePostComment(@Param() param) {}

  @Post()
  @ApiOperation({
    summary: '유머게시판 댓글 생성',
    tags: ['Comments'],
  })
  @ApiResponse({
    status: 201,
    description: '댓글 생성 성공',
    type: CommentRegisterResponseDto,
  })
  async registerHumorPostComment(
    @Body() body: CommentRegisterRequestDto,
    @Query() query: CommentRegisterQueryDto,
  ): Promise<CommentRegisterResponseDto> {
    return await this.commentService.registerComment(body, query);
  }

  @Post()
  @ApiOperation({
    summary: '대회소식게시판 댓글 생성',
    tags: ['Comments'],
  })
  @ApiResponse({
    status: 201,
    description: '댓글 생성 성공',
    type: CommentRegisterResponseDto,
  })
  async registerChampionshipPostComment(
    @Body() body: CommentRegisterRequestDto,
    @Query() query: CommentRegisterQueryDto,
  ): Promise<CommentRegisterResponseDto> {
    return await this.commentService.registerComment(body, query);
  }
}

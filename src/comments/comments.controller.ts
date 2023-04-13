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
import { CommentEntireDataReturn } from './dto/return.comment.dto';

@Controller('comments')
@UseGuards(AuthGuard)
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @Post()
  @ApiOperation({
    summary: '댓글 생성 API',
    tags: ['Comment'],
  })
  @ApiResponse({
    description: '등록한 댓글에 대한 모든 데이터를 반환합니다.',
    type: CommentEntireDataReturn,
  })
  async registerPost(
    @Body() commentRegisterRequest: CommentRegisterRequest,
  ): Promise<CommentEntireDataReturn> {
    return await this.commentService.registerPost(commentRegisterRequest);
  }
}

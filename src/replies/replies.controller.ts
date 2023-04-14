import { RepliesService } from './replies.service';
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
import { ReplyRegisterRequest } from './dto/register.reply.dto';
import {
  ReplyDeletedCountReturn,
  ReplyEntireDataReturn,
} from './dto/return.reply.dto';
import { ReplyModifyRequest } from './dto/modify.reply.dto';

@Controller('replies')
export class RepliesController {
  constructor(private readonly replyService: RepliesService) {}

  @Post()
  @ApiOperation({
    summary: '답글 생성 API',
    tags: ['Replies'],
  })
  @ApiResponse({
    description: '생성된 답글의 전체 데이터를 반환합니다.',
    type: ReplyEntireDataReturn,
  })
  async registerReply(
    @Body() replyRegisterRequest: ReplyRegisterRequest,
  ): Promise<ReplyEntireDataReturn> {
    return await this.replyService.registerReply(replyRegisterRequest);
  }

  @Patch(':replyId')
  @ApiOperation({
    summary: '댓글 수정 API',
    tags: ['Replies'],
  })
  @ApiResponse({
    description: '수정한 댓글에 대한 모든 데이터를 반환합니다.',
  })
  async modifyReply(
    @Body() replyModifyRequest: ReplyModifyRequest,
    @Param('replyId', ParseIntPipe) replyId: number,
  ): Promise<ReplyEntireDataReturn> {
    return await this.replyService.modifyReply(replyModifyRequest, replyId);
  }

  @Delete(':replyId')
  @ApiOperation({
    summary: '답글 삭제 API',
    tags: ['Replies'],
  })
  @ApiResponse({
    description:
      '삭제된 데이터 row 개수를 반환합니다. (1이면 삭제, 0이면 삭제되지 않거나 없는 데이터에 접근)',
    type: ReplyDeletedCountReturn,
  })
  async removeReply(
    @Param('replyId', ParseIntPipe) replyId: number,
  ): Promise<ReplyDeletedCountReturn> {
    return await this.replyService.removeReply(replyId);
  }
}

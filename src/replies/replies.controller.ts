import { Controller } from '@nestjs/common';
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
import { ReplyEntireDataReturn } from './dto/return.reply.dto';

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
}

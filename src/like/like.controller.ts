import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { SuccessInterceptor } from 'src/interceptors/success.interceptor';
import { LikeService } from './like.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LikeUserReturn } from './dto/result.like.dto';

@Controller('like')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post(':postId')
  @ApiOperation({
    summary: '좋아요 등록 API',
    tags: ['like'],
  })
  @ApiResponse({
    description:
      '유저 pk와 게시물 pk를 입력받아 좋아요를 추가하고 좋아요를 누른 유저 pk 배열을 반환합니다.',
    type: LikeUserReturn,
  })
  registerLike(
    @Body('userId', ParseIntPipe) userId: number,
    @Param('postId', ParseIntPipe) postId: number,
  ): Promise<LikeUserReturn> {
    return this.likeService.registerLike(postId, userId);
  }
}
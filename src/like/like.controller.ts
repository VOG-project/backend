import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
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
  ) {
    return this.likeService.registerLike(postId, userId);
  }

  @Patch(':postId')
  @ApiOperation({
    summary: '좋아요 취소 API',
    tags: ['like'],
  })
  @ApiResponse({
    description:
      '유저 pk와 게시물 pk를 입력 받아 좋아요 데이터를 수정하고 현재 좋아요를 누른 유저 pk 배열을 반환합니다.',
  })
  cancelLike(
    @Body('userId', ParseIntPipe) userId: number,
    @Param('postId', ParseIntPipe) postId: number,
  ) {
    return this.likeService.cancelLike(postId, userId);
  }

  @Get(':postId')
  @ApiOperation({
    summary: '좋아요 총 개수 반환 API',
    tags: ['like'],
  })
  @ApiResponse({
    description: '해당 게시물에 좋아요를 누른 유저pk 배열을 반환합니다.',
  })
  getLikeUser(@Param('postId', ParseIntPipe) postId: number) {
    return this.likeService.getLikeUser(postId);
  }
}

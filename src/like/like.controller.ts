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
  UseGuards,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { LikeService } from './like.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LikeUserReturn } from './dto/result.like.dto';
import { LikeCreatRequest } from './dto/create.like.dto';
import { LikeDeleteRequest } from './dto/delete.like.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('like')
@UseGuards(AuthGuard)
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
    status: 201,
  })
  async registerLike(
    @Body() likeCreateRequest: LikeCreatRequest,
    @Param('postId', ParseIntPipe) postId: number,
  ): Promise<LikeUserReturn> {
    return await this.likeService.registerLike(postId, likeCreateRequest);
  }

  @Patch(':postId')
  @ApiOperation({
    summary: '좋아요 취소 API',
    tags: ['like'],
  })
  @ApiResponse({
    description:
      '유저 pk와 게시물 pk를 입력 받아 좋아요 데이터를 수정하고 현재 좋아요를 누른 유저 pk 배열을 반환합니다.',
    type: LikeUserReturn,
    status: 200,
  })
  async cancelLike(
    @Body() likeDeleteRequest: LikeDeleteRequest,
    @Param('postId', ParseIntPipe) postId: number,
  ): Promise<LikeUserReturn> {
    return await this.likeService.cancelLike(postId, likeDeleteRequest);
  }

  @Get(':postId')
  @ApiOperation({
    summary: '좋아요 총 개수 반환 API',
    tags: ['like'],
  })
  @ApiResponse({
    description: '해당 게시물에 좋아요를 누른 유저pk 배열을 반환합니다.',
    type: LikeUserReturn,
    status: 200,
  })
  async getLikeUser(
    @Param('postId', ParseIntPipe) postId: number,
  ): Promise<LikeUserReturn> {
    return await this.likeService.getLikeUser(postId);
  }
}

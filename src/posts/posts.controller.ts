import {
  Controller,
  UseFilters,
  UseInterceptors,
  Post,
  Get,
  Body,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { SuccessInterceptor } from './../interceptors/success.interceptor';
import { PostRequestDto } from './dto/create.post.dto';
import { PostGetCondition } from './dto/get.post.dto';
import { PostEntireResponseDto, PostListReturn } from './dto/return.post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Post()
  @ApiOperation({
    summary: '게시물 등록 API',
    tags: ['posts'],
  })
  @ApiResponse({
    description: '게시물을 등록하면 등록된 게시물 데이터를 반환합니다.',
    type: PostEntireResponseDto,
  })
  registerPost(
    @Body() postRequestDto: PostRequestDto,
  ): Promise<PostEntireResponseDto> {
    return this.postService.registerPost(postRequestDto);
  }

  @Get()
  @ApiOperation({
    summary: '게시물 목록 조회 API',
    tags: ['posts'],
  })
  @ApiResponse({
    description:
      '쿼리 스트링으로 게시판 이름을 전달하면 최신 순으로 10개씩 게시물 목록을 반환합니다.',
  })
  getPostList(@Query() condition: PostGetCondition): Promise<PostListReturn[]> {
    return this.postService.getPostList(condition);
  }
}

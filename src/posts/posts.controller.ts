import {
  Controller,
  UseFilters,
  UseInterceptors,
  Post,
  Get,
  Delete,
  Body,
  Patch,
  Query,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { SuccessInterceptor } from './../interceptors/success.interceptor';
import { PostCreateRequest } from './dto/create.post.dto';
import { PostGetCondition } from './dto/get.post.dto';
import { PostModificationRequest } from './dto/modify.post.dto';
import {
  PostAndCommentsReturn,
  PostDeletedCountReturn,
  PostEntireDataReturn,
  PostListReturn,
} from './dto/return.post.dto';
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
    type: PostEntireDataReturn,
  })
  registerPost(
    @Body() postRequestDto: PostCreateRequest,
  ): Promise<PostEntireDataReturn> {
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
    type: PostListReturn,
  })
  getPostList(@Query() condition: PostGetCondition): Promise<PostListReturn[]> {
    return this.postService.getPostList(condition);
  }

  @Get(':postId')
  @ApiOperation({
    summary: '게시물 조회 API',
    tags: ['posts'],
  })
  @ApiResponse({
    description: `게시물 pk를 입력받아 게시물 데이터와 게시물에 쓰인 댓글 데이터를 반환합니다. 
      댓글 데이터에서 group은 댓글(대댓글)이 속한 댓글의 PK이고 sequence는 대댓글이 달린 순서를 말합니다. 
      sequence가 0일 경우 댓글, 1 이상일 경우 대댓글입니다.`,
    type: PostAndCommentsReturn,
  })
  getPost(
    @Param('postId', ParseIntPipe) postId: number,
  ): Promise<PostAndCommentsReturn> {
    return this.postService.getPost(postId);
  }

  @Patch(':postId')
  @ApiOperation({
    summary: '게시물 수정 API',
    tags: ['posts'],
  })
  @ApiResponse({
    description:
      '타이틀과 내용과 게시물 pk를 입력받아 데이터 수정 후 변경 내용을 반환합니다. 타이틀과 내용 중 수정이 없는 경우 원본 데이터를 담아 보내주시면 됩니다.',
    type: PostEntireDataReturn,
  })
  modifyPost(
    @Body() postModificationRequest: PostModificationRequest,
    @Param('postId', ParseIntPipe) postId: number,
  ): Promise<PostEntireDataReturn> {
    return this.postService.modifyPost(postModificationRequest, postId);
  }

  @Delete(':postId')
  @ApiOperation({
    summary: '게시물 삭제 API',
    tags: ['posts'],
  })
  @ApiResponse({
    description:
      '게시물 PK에 해당하는 데이터를 삭제하고 삭제된 row 개수를 반환합니다.',
    type: PostDeletedCountReturn,
  })
  removePost(
    @Param('postId', ParseIntPipe) postId: number,
  ): Promise<PostDeletedCountReturn> {
    return this.postService.removePost(postId);
  }
}

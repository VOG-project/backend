import {
  Controller,
  UseInterceptors,
  UseFilters,
  Post,
  Body,
  Query,
  UseGuards,
  Param,
  Put,
  Delete,
  Get,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { SuccessInterceptor } from './../interceptors/success.interceptor';
import {
  PostRegisterRequestDto,
  PostUpdateRequestDto,
} from './dto/post.request.dto';
import {
  PostDeleteResponseDto,
  PostGetListResponseDto,
  PostGetResponseDto,
  PostRegisterResponseDto,
  PostUpdateResponseDto,
} from './dto/post.response.dto';
import { AuthGuard } from './../auth/guards/auth.guard';
import { PostsService } from './posts.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('posts')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class PostsController {
  private FREE_POST_TABLE_NAME = 'freePost';
  private HUMOR_POST_TABLE_NAME = 'humorPost';
  private CHAMPION_POST_TABLE_NAME = 'championshipPost';

  constructor(private readonly postService: PostsService) {}

  @Get('championship')
  @ApiOperation({
    summary: '대회소식게시판 게시물 10개씩 목록 불러오기',
    tags: ['Posts'],
  })
  @ApiResponse({
    status: 200,
    description: '게시물 목록 10개 불러오기 완료',
    type: PostGetListResponseDto,
  })
  async getChampionshipPostList(
    @Query('page') page: number,
  ): Promise<PostGetListResponseDto[]> {
    return this.postService.getPostList(page, this.CHAMPION_POST_TABLE_NAME);
  }

  @Get('championship/:postId')
  @ApiOperation({
    summary: '대회소식게시판 특정 id 게시물 불러오기',
    tags: ['Posts'],
  })
  @ApiResponse({
    status: 200,
    description: '게시물 불러오기 완료',
  })
  async getChampionshipPost(
    @Param('postId') id: number,
  ): Promise<PostGetResponseDto> {
    return this.postService.getPost(id, this.CHAMPION_POST_TABLE_NAME);
  }

  @Post('championship')
  @ApiOperation({
    summary: '대회소식게시판 게시물 등록',
    tags: ['Posts'],
  })
  @ApiResponse({
    status: 201,
    description: '대회소식게시판 게시물 등록 완료',
    type: PostRegisterResponseDto,
  })
  async registerChampionshipPost(
    @Body() body: PostRegisterRequestDto,
  ): Promise<PostRegisterResponseDto> {
    return await this.postService.registerPost(
      body,
      this.CHAMPION_POST_TABLE_NAME,
    );
  }

  @Put('championship/:postId')
  @ApiOperation({
    summary: '대회소식게시판 게시물 수정',
    tags: ['Posts'],
  })
  @ApiResponse({
    status: 201,
    description: '게시물 수정 완료',
    type: PostUpdateResponseDto,
  })
  async updateChampionshipPost(
    @Body() body: PostUpdateRequestDto,
    @Param('postId') id: number,
  ): Promise<PostUpdateResponseDto> {
    return await this.postService.updatePost(
      body,
      id,
      this.CHAMPION_POST_TABLE_NAME,
    );
  }

  @Delete('championship/:postId')
  @ApiOperation({
    summary: '대회소식게시판 게시물 삭제',
    tags: ['Posts'],
  })
  @ApiResponse({
    status: 200,
    description: '게시물 삭제 완료',
    type: PostDeleteResponseDto,
  })
  async deleteChampionshipPost(
    @Param('postId') id: number,
  ): Promise<PostDeleteResponseDto> {
    return this.postService.deletePost(id, this.CHAMPION_POST_TABLE_NAME);
  }

  @Get('humor')
  @ApiOperation({
    summary: '유머게시판 게시물 10개씩 목록 불러오기',
    tags: ['Posts'],
  })
  @ApiResponse({
    status: 200,
    description: '게시물 목록 10개 불러오기 완료',
    type: PostGetListResponseDto,
  })
  async getHumorPostList(
    @Query('page') page: number,
  ): Promise<PostGetListResponseDto[]> {
    return this.postService.getPostList(page, this.HUMOR_POST_TABLE_NAME);
  }

  @Get('humor/:postId')
  @ApiOperation({
    summary: '유머게시판 특정 id 게시물 불러오기',
    tags: ['Posts'],
  })
  @ApiResponse({
    status: 200,
    description: '게시물 불러오기 완료',
  })
  async getHumorPost(@Param('postId') id: number): Promise<PostGetResponseDto> {
    return this.postService.getPost(id, this.HUMOR_POST_TABLE_NAME);
  }

  @Post('humor')
  @ApiOperation({
    summary: '유머게시판 게시물 등록',
    tags: ['Posts'],
  })
  @ApiResponse({
    status: 201,
    description: '유머게시판 게시물 등록 완료',
    type: PostRegisterResponseDto,
  })
  async registerHumorPost(
    @Body() body: PostRegisterRequestDto,
  ): Promise<PostRegisterResponseDto> {
    return await this.postService.registerPost(
      body,
      this.HUMOR_POST_TABLE_NAME,
    );
  }

  @Put('humor/:postId')
  @ApiOperation({
    summary: '유머게시판 게시물 수정',
    tags: ['Posts'],
  })
  @ApiResponse({
    status: 201,
    description: '게시물 수정 완료',
    type: PostUpdateResponseDto,
  })
  async updateHumorPost(
    @Body() body: PostUpdateRequestDto,
    @Param('postId') id: number,
  ): Promise<PostUpdateResponseDto> {
    return await this.postService.updatePost(
      body,
      id,
      this.HUMOR_POST_TABLE_NAME,
    );
  }

  @Delete('humor/:postId')
  @ApiOperation({
    summary: '유머게시판 게시물 삭제',
    tags: ['Posts'],
  })
  @ApiResponse({
    status: 200,
    description: '게시물 삭제 완료',
    type: PostDeleteResponseDto,
  })
  async deleteHumorPost(
    @Param('postId') id: number,
  ): Promise<PostDeleteResponseDto> {
    return this.postService.deletePost(id, this.HUMOR_POST_TABLE_NAME);
  }

  @Get('free')
  @ApiOperation({
    summary: '자유게시판 게시물 10개씩 목록 불러오기',
    tags: ['Posts'],
  })
  @ApiResponse({
    status: 200,
    description: '게시물 목록 10개 불러오기 완료',
    type: PostGetListResponseDto,
  })
  async getFreePostList(
    @Query('page') page: number,
  ): Promise<PostGetListResponseDto[]> {
    return this.postService.getPostList(page, this.FREE_POST_TABLE_NAME);
  }

  @Get('free/:postId')
  @ApiOperation({
    summary: '자유게시판 특정 id 게시물 불러오기',
    tags: ['Posts'],
  })
  @ApiResponse({
    status: 200,
    description: '게시물 불러오기 완료',
  })
  async getFreePost(@Param('postId') id: number): Promise<PostGetResponseDto> {
    return this.postService.getPost(id, this.FREE_POST_TABLE_NAME);
  }

  @Post('free')
  @ApiOperation({
    summary: '자유게시판 게시물 등록',
    tags: ['Posts'],
  })
  @ApiResponse({
    status: 201,
    description: '게시물 등록 완료',
    type: PostRegisterResponseDto,
  })
  async registerFreePost(
    @Body() body: PostRegisterRequestDto,
  ): Promise<PostRegisterResponseDto> {
    return await this.postService.registerPost(body, this.FREE_POST_TABLE_NAME);
  }

  @Put('free/:postId')
  @ApiOperation({
    summary: '자유게시판 게시물 수정',
    tags: ['Posts'],
  })
  @ApiResponse({
    status: 201,
    description: '게시물 수정 완료',
  })
  async updateFreePost(
    @Body() body: PostUpdateRequestDto,
    @Param('postId') id: number,
  ): Promise<PostUpdateResponseDto> {
    return await this.postService.updatePost(
      body,
      id,
      this.FREE_POST_TABLE_NAME,
    );
  }

  @Delete('free/:postId')
  @ApiOperation({
    summary: '자유게시판 게시물 삭제',
    tags: ['Posts'],
  })
  @ApiResponse({
    status: 200,
    description: '게시물 삭제 완료',
    type: PostDeleteResponseDto,
  })
  async deleteFreePost(
    @Param('postId') id: number,
  ): Promise<PostDeleteResponseDto> {
    return this.postService.deletePost(id, this.FREE_POST_TABLE_NAME);
  }
}

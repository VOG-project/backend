import {
  Controller,
  UseInterceptors,
  UseFilters,
  Post,
  Body,
  UseGuards,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { SuccessInterceptor } from './../interceptors/success.interceptor';
import {
  PostRegisterRequestDto,
  PostUpdateRequestDto,
} from './dto/post.request.dto';
import {
  PostDeleteResponseDto,
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
  constructor(private readonly postService: PostsService) {}

  @Post('free')
  @ApiOperation({
    summary: '자유게시판 게시물 등록',
  })
  @ApiResponse({
    status: 201,
    description: '게시물 등록 완료',
    type: PostRegisterResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'ERROR_MESSAGE',
  })
  //@UseGuards(AuthGuard)
  async registerFreePost(
    @Body() body: PostRegisterRequestDto,
  ): Promise<PostRegisterResponseDto> {
    return await this.postService.registerFreePost(body);
  }

  @Put('free/:id')
  @ApiOperation({
    summary: '자유게시판 게시물 수정',
  })
  @ApiResponse({
    status: 201,
    description: '게시물 수정 완료',
  })
  async updateFreePost(
    @Body() body: PostUpdateRequestDto,
    @Param('id') id: number,
  ): Promise<PostUpdateResponseDto> {
    return await this.postService.updateFreePost(body, id);
  }

  @Delete('free/:id')
  @ApiOperation({
    summary: '자유게시판 게시물 삭제',
  })
  @ApiResponse({
    status: 200,
    description: '게시물 삭제 완료',
    type: PostDeleteResponseDto,
  })
  async deleteFreePost(
    @Param('id') id: number,
  ): Promise<PostDeleteResponseDto> {
    return this.postService.deleteFreePost(id);
  }
}

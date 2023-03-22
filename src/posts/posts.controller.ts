import {
  Controller,
  UseFilters,
  UseInterceptors,
  Post,
  Body,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { SuccessInterceptor } from './../interceptors/success.interceptor';
import { PostRequestDto } from './dto/create.post.dto';
import { PostEntireResponseDto } from './dto/response.post.dto';
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
  registerPost(
    @Body() postRequestDto: PostRequestDto,
  ): Promise<PostEntireResponseDto> {
    return this.postService.registerPost(postRequestDto);
  }
}

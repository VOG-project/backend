import {
  Controller,
  UseInterceptors,
  UseFilters,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { SuccessInterceptor } from './../interceptors/success.interceptor';
import { PostRegisterRequestDto } from './dto/post.request.dto';
import { PostRegisterResponseDto } from './dto/post.response.dto';
import { AuthGuard } from './../auth/guards/auth.guard';
import { PostsService } from './posts.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('posts')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

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
  async createPost(
    @Body() body: PostRegisterRequestDto,
  ): Promise<PostRegisterResponseDto> {
    return await this.postsService.registerPost(body);
  }
}

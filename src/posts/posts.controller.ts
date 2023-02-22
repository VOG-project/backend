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

@Controller('posts')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('free')
  //@UseGuards(AuthGuard)
  async createPost(
    @Body() body: PostRegisterRequestDto,
  ): Promise<PostRegisterResponseDto> {
    return await this.postsService.registerPost(body);
  }
}

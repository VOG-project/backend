import { Controller, Post, UseFilters, UseInterceptors } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { SuccessInterceptor } from 'src/interceptors/success.interceptor';
import { LikeService } from './like.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('like')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  
}

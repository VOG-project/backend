import { Controller, UseFilters, UseInterceptors } from '@nestjs/common';
import { SuccessInterceptor } from 'src/interceptors/success.interceptor';
import { HttpExceptionFilter } from './../filters/http-exception.filter';
import { CommentsService } from './comments.service';

@Controller('comments')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}
}

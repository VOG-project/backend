import { Controller, UseFilters, UseInterceptors, Body } from '@nestjs/common';
import { SuccessInterceptor } from 'src/interceptors/success.interceptor';
import { HttpExceptionFilter } from './../filters/http-exception.filter';
import { CommentsService } from './comments.service';
import { CommentCreateRequest } from './dto/create.comment.dto';
import { CommetEntireDataReturn } from './dto/return.comment.dto';

@Controller('comments')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  registerComment(
    @Body() commentCreateRequest: CommentCreateRequest,
  ): Promise<CommetEntireDataReturn> {
    return this.commentService.registerComment(commentCreateRequest);
  }
}

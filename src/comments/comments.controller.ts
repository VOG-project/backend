import {
  Controller,
  UseFilters,
  UseInterceptors,
  Post,
  Body,
  Query,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { SuccessInterceptor } from './../interceptors/success.interceptor';
import { CommentRegisterRequestDto } from './dto/comment.request.dto';
import { CommentRegisterQueryValidation } from './validations/comment.query.validation';
import { CommentsService } from './comments.service';

@Controller('comments')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @Post()
  async registerFreePostComment(
    @Body() body: CommentRegisterRequestDto,
    @Query() query: CommentRegisterQueryValidation,
  ) {
    return await this.commentService.registerComment(body, query);
  }
}

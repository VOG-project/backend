import {
  Controller,
  UseFilters,
  UseInterceptors,
  Body,
  Get,
  Post,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';
import { CommentsService } from './comments.service';
import { CommentCreateRequest } from './dto/create.comment.dto';
import { CommentDeleteCondition } from './dto/delete.comment.dto';
import {
  CommentDeletedCountReturn,
  CommentEntireDataReturn,
} from './dto/return.comment.dto';
import { CommentUpdateRequest } from './dto/update.comment.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('comments')
@UseGuards(AuthGuard)
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}
}

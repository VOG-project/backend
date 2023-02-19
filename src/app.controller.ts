import {
  Controller,
  UseFilters,
  UseInterceptors,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { SuccessInterceptor } from './interceptors/success.interceptor';
import { AuthGuard } from './auth/guards/auth.guard';

@Controller()
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
@UseGuards(AuthGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('test')
  abc() {
    return 'abc';
  }
}

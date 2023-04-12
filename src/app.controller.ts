import {
  Controller,
  UseGuards,
  UseFilters,
  UseInterceptors,
  Get,
} from '@nestjs/common';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { SuccessInterceptor } from './common/interceptors/success.interceptor';
import { AuthGuard } from './auth/guards/auth.guard';

@Controller()
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('test')
  @UseGuards(AuthGuard)
  abc() {
    return 'abcdefg';
  }
}

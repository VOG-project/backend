import { Controller, UseFilters, UseInterceptors, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { SuccessInterceptor } from './interceptors/success.interceptor';

@Controller()
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('test')
  abc() {
    return 'abc';
  }
}

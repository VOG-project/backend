import { Controller, Get, HttpException, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './filters/http-exception.filter';

@Controller()
@UseFilters(HttpExceptionFilter)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    throw new HttpException('api is broken', 401);
    return this.appService.getHello();
  }

  @Get('bye')
  getBye(): string {
    return this.appService.getBye();
  }
}

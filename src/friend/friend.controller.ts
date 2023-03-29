import { Controller, UseFilters, UseInterceptors } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { FriendService } from './friend.service';

@Controller('friend')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
export class FriendController {
  constructor(private readonly friendService: FriendService) {}
}

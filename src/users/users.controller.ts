import { Controller, Post, Body } from '@nestjs/common';
import { UserRequestDto } from './dto/users.register.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() body: UserRequestDto): Promise<any> {
    return this.usersService.register(body);
  }
}

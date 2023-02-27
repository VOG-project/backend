import { User } from 'src/users/users.entity';
import { PickType } from '@nestjs/swagger';

export class UserLoginRequestDto extends PickType(User, [
  'email',
  'password',
] as const) {}

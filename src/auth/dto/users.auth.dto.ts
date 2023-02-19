import { Users } from 'src/users/users.entity';
import { PickType } from '@nestjs/swagger';

export class UserLoginRequestDto extends PickType(Users, [
  'email',
  'password',
] as const) {}

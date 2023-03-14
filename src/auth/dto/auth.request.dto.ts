import { User } from 'src/users/users.entity';
import { PickType } from '@nestjs/swagger';

export class AuthSessionLoginRequestDto extends PickType(User, [
  'email',
  'password',
] as const) {}

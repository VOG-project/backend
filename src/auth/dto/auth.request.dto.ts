import { UserEntity } from 'src/users/users.entity';
import { PickType } from '@nestjs/swagger';

export class AuthSessionLoginRequestDto extends PickType(UserEntity, [
  'email',
  'password',
] as const) {}

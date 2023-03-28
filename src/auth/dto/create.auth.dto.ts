import { UserEntity } from 'src/users/users.entity';
import { PickType } from '@nestjs/swagger';

export class AuthLoginRequest extends PickType(UserEntity, [
  'email',
  'password',
] as const) {}

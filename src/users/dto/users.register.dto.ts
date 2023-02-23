import { User } from './../users.entity';
import { PickType } from '@nestjs/swagger';

export class UserRegisterRequestDto extends PickType(User, [
  'email',
  'password',
  'nickname',
  'sex',
] as const) {}

export class UserRegisterResponseDto extends PickType(User, [
  'id',
  'email',
  'nickname',
  'sex',
  'updated_at',
]) {}

import { Users } from './../users.entity';
import { PickType } from '@nestjs/swagger';

export class UserRegisterRequestDto extends PickType(Users, [
  'email',
  'password',
  'nickname',
  'sex',
] as const) {}

export class UserRegisterResponseDto extends PickType(Users, [
  'id',
  'email',
  'nickname',
  'sex',
  'updated_at',
]) {}

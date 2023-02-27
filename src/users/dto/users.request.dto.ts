import { User } from '../users.entity';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserRegisterRequestDto extends PickType(User, [
  'email',
  'password',
  'nickname',
  'sex',
] as const) {}

export class UserUpdateNicknameRequestDto {
  @ApiProperty({
    example: '뚜루뚜뚜',
    description: '변경할 닉네임',
  })
  @IsNotEmpty()
  @IsString()
  newNickname: string;
}

export class UserUpdatePasswordRequestDto {
  @ApiProperty({
    example: 'wiq25123',
    description: '현재 비밀번호',
  })
  @IsNotEmpty()
  @IsString()
  currentPassword: string;

  @ApiProperty({
    example: '2tk3j52l',
    description: '새로운 비밀번호',
  })
  @IsNotEmpty()
  @IsString()
  newPassword: string;
}

import { User } from './../users.entity';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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

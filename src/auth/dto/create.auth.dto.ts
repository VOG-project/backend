import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthLoginRequest {
  @ApiProperty({
    example: 'test10@naver.com',
    description: '이메일',
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'efo234a08sef',
    description: '비밀번호',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}

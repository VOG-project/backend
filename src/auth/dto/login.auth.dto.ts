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

export class AuthAuthorizedCode {
  @ApiProperty({
    example: 'asleifj3ij2la',
    description: '인증 코드',
  })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({
    example: '23fjs83f',
    description: 'CRSF 방지 코드',
  })
  @IsNotEmpty()
  @IsString()
  state?: string;
}

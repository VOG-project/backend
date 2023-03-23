import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserDeleteRequest {
  @ApiProperty({
    example: 'ekw2a1la',
    description: '현재 비밀번호',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}

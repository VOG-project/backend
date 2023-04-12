import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class UserCreateRequest {
  @ApiProperty({
    example: 'Sb35YY9N_bZgbfSW1jDYkjCcgKrEEHUQ8CLTn',
    description: 'OAuth Provider로부터 받은 유저의 고유 oauthId',
  })
  @IsNotEmpty()
  @IsString()
  oauthId: string;

  @ApiProperty({
    example: 'naver',
    description: 'Oauth 공급자',
  })
  @IsNotEmpty()
  @IsString()
  provider: string;

  @ApiProperty({
    example: '네스트좋아',
    description: '닉네임',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  nickname: string;

  @ApiProperty({
    example: '남',
    description: '성별',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  sex: string;
}

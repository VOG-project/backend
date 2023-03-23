import { ApiProperty } from '@nestjs/swagger';

export class UserCreateRequest {
  @ApiProperty({
    example: 'test10@naver.com',
    description: '이메일',
    required: true,
  })
  email: string;

  @ApiProperty({
    example: 'efo234a08sef',
    description: '비밀번호',
    required: true,
  })
  password?: string;

  @ApiProperty({
    example: '네스트좋아',
    description: '닉네임',
    required: true,
  })
  nickname: string;

  @ApiProperty({
    example: '남',
    description: '성별',
    required: true,
  })
  sex: string;
}

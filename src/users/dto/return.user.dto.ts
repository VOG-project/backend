import { ApiProperty } from '@nestjs/swagger';
export class UserEntireDataReturn {
  @ApiProperty({
    example: '35',
    description: '식별아이디',
  })
  id: number;

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

  @ApiProperty({
    example: 'https://www.vog-storage/user/efsef.jpg',
    description: '유저 프로필 사진 URL',
  })
  profileUrl: string;

  @ApiProperty({
    example: '2023-03-05 16:25:04.871850',
    description: '게시물 생성 일자',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2023-03-05 16:25:04.871850',
    description: '게시물 수정 일자',
  })
  updatedAt: Date;
}

export class UserPkIdResponseDto {
  userId: number;
}

export class UserDeletedCountReturn {
  @ApiProperty({
    example: 2,
    description: '삭제된 게시물 row 개수',
  })
  deletedCount: number;
}

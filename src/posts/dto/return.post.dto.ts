import { ApiProperty } from '@nestjs/swagger';

export class PostEntireResponseDto {
  @ApiProperty({
    example: 6,
    description: '게시물 PK',
  })
  id: number;

  @ApiProperty({
    example: '챌리저 찍음 ㅎㅎ',
    description: '게시물 제목',
  })
  title: string;

  @ApiProperty({
    example: '진짜 찍은 건 아님 ㅋㅋ 껄껄껄',
    description: '게시물 내용',
  })
  content: string;

  @ApiProperty({
    example: 712,
    description: '좋아요 개수',
  })
  likeCount: number;

  @ApiProperty({
    example: 'free',
    description: '게시판 카테고리(free | humor | championship)',
  })
  postCategory: string;

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

export class PostPkIdResponseDto {
  postId: number;
}

export class PostListReturn {
  @ApiProperty({
    example: 6,
    description: '게시물 PK',
  })
  id: number;

  @ApiProperty({
    example: '챌리저 찍음 ㅎㅎ',
    description: '게시물 제목',
  })
  title: string;

  @ApiProperty({
    example: 712,
    description: '좋아요 개수',
  })
  likeCount: number;

  @ApiProperty({
    example: 'free',
    description: '게시판 카테고리(free | humor | championship)',
  })
  postCategory: string;

  @ApiProperty({
    example: '2023-03-05 16:25:04.871850',
    description: '게시물 생성 일자',
  })
  createdAt: Date;
}

import { ApiProperty } from '@nestjs/swagger';

export class PostRegisterResponseDto {
  @ApiProperty({
    example: 372,
    description: '게시물 식별 아이디',
  })
  postId: number;
}

export class PostUpdateResponseDto {
  @ApiProperty({
    example: 1,
    description: '업데이트된 게시물 개수',
  })
  updatedCount: number;
}

export class PostDeleteResponseDto {
  @ApiProperty({
    example: 1,
    description: '삭제된 게시물 개수',
  })
  deletedCount: number;
}

export class PostGetListResponseDto {
  id: number;
  writerId: number;
  title: string;
  likeCount: number;
  gameCategory: string;
  createdAt: Date;
  user: {
    id: number;
    nickname: string;
  };
}

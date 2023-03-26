import { ApiProperty } from '@nestjs/swagger';

export class CommentEntireDataReturn {
  @ApiProperty({
    example: 36,
    description: '댓글을 작성한 유저 pk',
  })
  userId: number;

  @ApiProperty({
    example: 26,
    description: '댓글 작성 중인 게시물 pk',
  })
  postId: number;

  @ApiProperty({
    example: '댓글은 이렇게 쓰는 거라구요',
    description: '댓글 내용',
  })
  content: string;

  @ApiProperty({
    example: 6,
    description: '댓글 그룹(답글이 소속된 댓글 pk)',
  })
  group: number;

  @ApiProperty({
    example: 2,
    description: '댓글의 순서(0은 댓글, 1 이상은 답글)',
  })
  sequence: number;

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

  @ApiProperty({
    example: {
      id: 6,
      userId: 7,
      content: '댓글썼어용',
      group: 6,
      sequence: 0,
    },
  })
  reply?: CommentEntireDataReturn[];
}

export class CommentPkIdReturn {
  commentId: number;
}

export class CommentDeletedCountReturn {
  @ApiProperty({
    example: 2,
    description: '삭제된 게시물 row 개수',
  })
  deletedCount: number;
}

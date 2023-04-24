import { ApiProperty } from '@nestjs/swagger';

export class ReplyEntireDataReturn {
  @ApiProperty({
    example: 6,
    description: '답글 Id',
  })
  id: number;

  @ApiProperty({
    example: 36,
    description: '답글 작성자 Id',
  })
  writerId: number;

  @ApiProperty({
    example: 312,
    description: '답글이 작성된 댓글 Id',
  })
  commentId: number;

  @ApiProperty({
    example: 123,
    description: '답글이 작성된 게시물 Id',
  })
  postId: number;

  @ApiProperty({
    example: '댓글 달아봅니다~',
    description: '댓글 내용',
  })
  content: string;

  @ApiProperty({
    example: '2023-03-05 16:25:04.871850',
    description: '답글 생성 일자',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2023-03-05 16:25:04.871850',
    description: '답글 수정 일자',
  })
  updatedAt: Date;
}

export class ReplyPkIdReturn {
  replyId: number;
}

export class ReplyDeletedCountReturn {
  @ApiProperty({
    example: 2,
    description:
      '삭제된 답글 row 개수 (1이면 삭제, 0이면 삭제되지 않거나 없는 데이터에 접근)',
  })
  deletedCount: number;
}

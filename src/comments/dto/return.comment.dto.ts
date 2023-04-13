import { ApiProperty } from '@nestjs/swagger';

export class CommentEntireDataReturn {
  @ApiProperty({
    example: 6,
    description: '댓글 Id',
  })
  id: number;

  @ApiProperty({
    example: 36,
    description: '댓글 작성자 Id',
  })
  writerId: number;

  @ApiProperty({
    example: 312,
    description: '댓글 작성된 게시물 Id',
  })
  postId: number;

  @ApiProperty({
    example: '댓글 달아봅니다~',
    description: '댓글 내용',
  })
  content: string;

  @ApiProperty({
    example: '2023-03-05 16:25:04.871850',
    description: '댓글 생성 일자',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2023-03-05 16:25:04.871850',
    description: '댓글 수정 일자',
  })
  updatedAt: Date;
}

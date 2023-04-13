import { ApiProperty } from '@nestjs/swagger';

export class CommentRegisterRequest {
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
}

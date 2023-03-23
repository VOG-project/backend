import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt } from 'class-validator';

export class CommentDeleteCondition {
  @ApiProperty({
    example: 32,
    description: '댓글 그룹(답글이 소속된 댓글 pk)',
  })
  @IsNotEmpty()
  @IsInt()
  group: number;

  @ApiProperty({
    example: 1,
    description: '댓글의 순서(0은 댓글, 1 이상은 답글)',
  })
  sequence: number;

  @ApiProperty({
    example: 31,
    description: '댓글이 작성된 게시물 PK'
  })
  postId: number;
}

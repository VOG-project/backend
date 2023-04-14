import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CommentGetCommentAndReplyCondition {
  @ApiProperty({
    example: 327,
    description: '댓글을 가진 게시물 아이디',
  })
  @IsNotEmpty()
  @IsInt()
  postId: number;

  @ApiProperty({
    example: 2,
    description: '조회할 페이지 번호',
  })
  @IsNotEmpty()
  @IsInt()
  page: number;
}

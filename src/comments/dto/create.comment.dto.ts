import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CommentCreateRequest {
  @ApiProperty({
    example: 36,
    description: '댓글을 작성한 유저 pk',
  })
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @ApiProperty({
    example: 26,
    description: '댓글 작성 중인 게시물 pk',
  })
  @IsNotEmpty()
  @IsInt()
  postId: number;

  @ApiProperty({
    example: '댓글은 이렇게 쓰는 거라구요',
    description: '댓글 내용',
  })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({
    example: 6,
    description: '댓글 그룹(답글이 소속된 댓글 pk)',
  })
  @IsNotEmpty()
  @IsInt()
  group: number;

  @ApiProperty({
    example: 2,
    description: '댓글의 순서(0은 댓글, 1 이상은 답글)',
  })
  @IsNotEmpty()
  @IsInt()
  sequence: number;
}

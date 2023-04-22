import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class ReplyRegisterRequest {
  @ApiProperty({
    example: 36,
    description: '답글 작성자 Id',
  })
  @IsNotEmpty()
  @IsInt()
  writerId: number;

  @ApiProperty({
    example: 312,
    description: '답글이 작성된 댓글 Id',
  })
  @IsNotEmpty()
  @IsInt()
  commentId: number;

  @ApiProperty({
    example: 1632,
    description: '답글이 작성된 게시물 Id',
  })
  @IsNotEmpty()
  @IsInt()
  postId: number;

  @ApiProperty({
    example: '답글 달아봅니다~',
    description: '답글 내용',
  })
  @IsNotEmpty()
  @IsString()
  content: string;
}

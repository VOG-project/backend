import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CommentModifyRequest {
  @ApiProperty({
    example: '댓글 달아봅니다~',
    description: '댓글 내용',
  })
  @IsNotEmpty()
  @IsString()
  content: string;
}

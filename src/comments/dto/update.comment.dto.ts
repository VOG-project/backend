import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CommentUpdateRequest {
  @ApiProperty({
    example: '댓글은 이렇게 수정합니다.',
    description: '수정하고자 하는 댓글 내용',
  })
  @IsNotEmpty()
  @IsString()
  content: string;
}

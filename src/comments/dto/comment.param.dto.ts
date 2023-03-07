import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CommentDeleteParamDto {
  @ApiProperty({
    example: 32,
    description: '댓글 아이디',
  })
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  commentId: number;
}

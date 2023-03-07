import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class CommentRegisterQueryValidation {
  @ApiProperty({
    example: 'free',
    description: '게시판 카테고리',
  })
  @IsString()
  board: string;

  @ApiProperty({
    example: 362,
    description: '게시물 아이디',
  })
  @IsInt()
  @Type(() => Number)
  postId: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CommentRegisterRequestDto {
  @ApiProperty({
    example: 316,
    description: '작성자 아이디',
  })
  @IsNotEmpty()
  @IsInt()
  writerId: number;

  @ApiProperty({
    example: '댓글 달았습니다~',
    description: '댓글 내용',
  })
  @IsNotEmpty()
  @IsString()
  content: string;
}

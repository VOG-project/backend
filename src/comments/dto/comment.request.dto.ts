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

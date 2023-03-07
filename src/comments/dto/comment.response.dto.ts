import { ApiProperty } from '@nestjs/swagger';

export class CommentRegisterResponseDto {
  @ApiProperty({
    example: 31,
    description: '생성된 댓글 아이디',
  })
  commentId: number;
}

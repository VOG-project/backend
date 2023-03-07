import { ApiProperty } from '@nestjs/swagger';

export class CommentRegisterResponseDto {
  @ApiProperty({
    example: 31,
    description: '생성된 댓글 아이디',
  })
  commentId: number;
}

export class CommentDeleteResponseDto {
  @ApiProperty({
    example: 1,
    description: '삭제된 댓글 개수',
  })
  deletedCount: number;
}

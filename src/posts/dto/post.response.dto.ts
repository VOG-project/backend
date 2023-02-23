import { ApiProperty } from '@nestjs/swagger';

export class PostRegisterResponseDto {
  @ApiProperty({
    example: 372,
    description: '게시물 식별 아이디',
  })
  postId: number;
}

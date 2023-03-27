import { ApiProperty } from '@nestjs/swagger';

export class LikeUserReturn {
  @ApiProperty({
    example: [1, 6, 8, 9, 22, 34],
    description: '좋아요를 한 유저들의 pk 배열을 반환합니다.',
  })
  userIds: string[];
}

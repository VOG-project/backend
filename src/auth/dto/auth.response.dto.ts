import { ApiProperty } from '@nestjs/swagger';

export class AuthSessionLoginResponseDto {
  @ApiProperty({
    example: 361,
    description: '로그인한 유저 ID',
  })
  userId: number;
}

export class AuthSessionLogoutResponseDto {
  @ApiProperty({
    example: 1,
    description: '세션 DB에서 삭제된 세션데이터 개수',
  })
  deletedCount: number;
}

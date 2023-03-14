import { ApiProperty } from '@nestjs/swagger';

export class AuthSessionLoginResponseDto {
  @ApiProperty({
    example: 361,
    description: '로그인한 유저 ID',
  })
  userId: number;
}

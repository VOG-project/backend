import { ApiProperty } from '@nestjs/swagger';

export class UserUpdateNicknameResponseDto {
  @ApiProperty({
    example: 362,
    description: '유저아이디',
  })
  updatedCount: number;
}

import { ApiProperty } from '@nestjs/swagger';

export class UserUpdatedCountResponseDto {
  @ApiProperty({
    example: 1,
    description: '수정된 컬럼 개수',
  })
  updatedCount: number;
}

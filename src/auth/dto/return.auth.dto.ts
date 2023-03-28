import { ApiProperty } from '@nestjs/swagger';

export class AuthDeletedSessionCountReturn {
  @ApiProperty({
    example: 1,
    description: '세션 DB에서 삭제된 세션데이터 개수',
  })
  deletedCount: number;
}

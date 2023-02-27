import { ApiProperty, PickType } from '@nestjs/swagger';
import { User } from './../users.entity';

export class UserEntirePropertyResponseDto extends PickType(User, [
  'id',
  'email',
  'password',
  'sex',
  'created_at',
  'updated_at',
] as const) {}

export class UserUpdatedCountResponseDto {
  @ApiProperty({
    example: 1,
    description: '수정된 컬럼 개수',
  })
  updatedCount: number;
}

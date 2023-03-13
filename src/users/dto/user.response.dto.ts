import { ApiProperty, PickType } from '@nestjs/swagger';
import { User } from '../users.entity';

export class UserEntirePropertyResponseDto extends PickType(User, [
  'id',
  'email',
  'password',
  'sex',
  'createdAt',
  'updatedAt',
] as const) {}

export class UserUpdatedInfoResponseDto {
  @ApiProperty({
    example: 1,
    description: '수정된 컬럼 개수',
  })
  updatedCount: number;
}

export class UserDeletedInfoResponseDto {
  @ApiProperty({
    example: 1,
    description: '삭제된 컬럼 개수',
  })
  deletedCount: number;
}

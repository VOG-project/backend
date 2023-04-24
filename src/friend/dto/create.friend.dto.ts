import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class FriendCreateRequest {
  @ApiProperty({
    example: 32,
    description: '친구 추가 대상이 되는 유저 pk',
  })
  @IsNotEmpty()
  @IsInt()
  targetId: number;
}

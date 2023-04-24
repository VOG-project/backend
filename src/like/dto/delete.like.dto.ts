import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class LikeDeleteRequest {
  @ApiProperty({
    example: 21,
    description: '좋아요를 누른 userId(pk)',
  })
  @IsNotEmpty()
  @IsInt()
  userId: number;
}

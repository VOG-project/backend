import { ApiProperty, PickType } from '@nestjs/swagger';
import { FreePost } from '../posts.entity';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class PostCreateRequestDto extends PickType(FreePost, [
  'title',
  'content',
  'game_category',
] as const) {
  @ApiProperty({
    example: '62',
    description: '게시물 작성자 ID(외래키)',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  writer_id: number;
}

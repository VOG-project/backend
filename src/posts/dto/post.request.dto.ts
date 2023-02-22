import { PickType } from '@nestjs/swagger';
import { FreePost } from '../posts.entity';

export class PostRegisterRequestDto extends PickType(FreePost, [
  'writer_id',
  'title',
  'content',
  'game_category',
] as const) {}

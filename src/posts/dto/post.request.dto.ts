import { PickType } from '@nestjs/swagger';
import { FreePost } from '../posts.entity';

export class PostRegisterRequestDto extends PickType(FreePost, [
  'writerId',
  'title',
  'content',
  'gameCategory',
] as const) {}

export class PostUpdateRequestDto extends PickType(FreePost, [
  'title',
  'content',
] as const) {}

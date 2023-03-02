import { PickType } from '@nestjs/swagger';
import { Post } from 'src/commonEntities/post.common.entity';

export class PostRegisterRequestDto extends PickType(Post, [
  'writerId',
  'title',
  'content',
  'gameCategory',
] as const) {}

export class PostUpdateRequestDto extends PickType(Post, [
  'title',
  'content',
] as const) {}

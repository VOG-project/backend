import { PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CommonPostEntity } from 'src/commonEntities/post.common.entity';

export class PostRegisterRequestDto extends PickType(CommonPostEntity, [
  'writerId',
  'title',
  'content',
  'gameCategory',
] as const) {}

export class PostUpdateRequestDto extends PickType(CommonPostEntity, [
  'title',
  'content',
] as const) {}

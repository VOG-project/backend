import { Module } from '@nestjs/common';
import { FreePost, HumorPost } from './posts.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsRepository } from './posts.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FreePost, HumorPost])],
  controllers: [PostsController],
  providers: [PostsService, PostsRepository],
})
export class PostsModule {}

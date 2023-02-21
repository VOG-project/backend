import { Module } from '@nestjs/common';
import { FreePost } from './posts.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([FreePost])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}

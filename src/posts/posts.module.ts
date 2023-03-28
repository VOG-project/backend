import { Module, forwardRef } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostsRepository } from './posts.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './posts.entity';
import { LikeModule } from 'src/like/like.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity]),
    forwardRef(() => LikeModule),
  ],
  providers: [PostsService, PostsRepository],
  controllers: [PostsController],
  exports: [PostsRepository],
})
export class PostsModule {}

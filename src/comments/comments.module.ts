import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsController } from './comments.controller';
import { FreePostComment, HumorPostComment } from './comments.entity';
import { CommentsRepository } from './comments.repository';
import { CommentsService } from './comments.service';

@Module({
  imports: [TypeOrmModule.forFeature([FreePostComment, HumorPostComment])],
  controllers: [CommentsController],
  providers: [CommentsService, CommentsRepository],
})
export class CommentsModule {}

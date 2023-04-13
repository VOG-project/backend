import { Module } from '@nestjs/common';
import { RepliesController } from './replies.controller';
import { RepliesService } from './replies.service';
import { RepliesRepository } from './replies.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReplyEntity } from './replies.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReplyEntity])],
  controllers: [RepliesController],
  providers: [RepliesService, RepliesRepository],
})
export class RepliesModule {}

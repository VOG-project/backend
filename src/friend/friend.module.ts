import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendController } from './friend.controller';
import { FriendEntity } from './friend.entity';
import { FriendRepository } from './friend.repository';
import { FriendService } from './friend.service';

@Module({
  imports: [TypeOrmModule.forFeature([FriendEntity])],
  controllers: [FriendController],
  providers: [FriendService, FriendRepository],
})
export class FriendModule {}

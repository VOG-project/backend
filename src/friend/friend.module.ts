import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { FriendController } from './friend.controller';
import { FriendEntity } from './friend.entity';
import { FriendRepository } from './friend.repository';
import { FriendService } from './friend.service';

@Module({
  imports: [TypeOrmModule.forFeature([FriendEntity]), UsersModule],
  controllers: [FriendController],
  providers: [FriendService, FriendRepository],
})
export class FriendModule {}

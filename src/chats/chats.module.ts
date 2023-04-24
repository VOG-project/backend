import { Module } from '@nestjs/common';
import { ChatsGateway } from './chats.gateway';
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';
import { ChatsRepository } from './chats.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatParticipantEntity, ChatRoomEntity } from './chats.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChatRoomEntity, ChatParticipantEntity])],
  providers: [ChatsGateway, ChatsService, ChatsRepository],
  controllers: [ChatsController],
})
export class ChatsModule {}

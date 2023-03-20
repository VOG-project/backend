import { Module } from '@nestjs/common';
import { ChatsGateway } from './chats.gateway';
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';
import { ChatsRepository } from './chats.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatEntity } from './chats.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChatEntity])]
  providers: [ChatsGateway, ChatsService, ChatsRepository],
  controllers: [ChatsController],
})
export class ChatsModule {}

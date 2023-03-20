import { Module } from '@nestjs/common';
import { ChatsGateway } from './chats.gateway';
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';

@Module({
  providers: [ChatsGateway, ChatsService],
  controllers: [ChatsController]
})
export class ChatsModule {}

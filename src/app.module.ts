import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestModule } from '@nestjs/common/interfaces/modules';
import { MiddlewareConsumer } from '@nestjs/common/interfaces/middleware';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { UsersModule } from './users/users.module';
import { User } from './users/users.entity';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { PostsModule } from './posts/posts.module';
import { FreePost, HumorPost, ChampionshipPost } from './posts/posts.entity';
import { UploadsModule } from './uploads/uploads.module';
import { CommentsModule } from './comments/comments.module';
import {
  ChampionshipPostComment,
  FreePostComment,
  HumorPostComment,
} from './comments/comments.entity';
import { ChatsModule } from './chats/chats.module';
import { ChatEntity } from './chats/chats.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT, 10),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      entities: [
        User,
        FreePost,
        HumorPost,
        ChampionshipPost,
        FreePostComment,
        HumorPostComment,
        ChampionshipPostComment,
        ChatEntity,
      ],
      synchronize: true,
      database: 'vog',
      logging: true,
    }),
    RedisModule.forRoot({
      config: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT, 10),
        password: process.env.REDIS_PASSWORD,
      },
    }),
    UsersModule,
    AuthModule,
    PostsModule,
    UploadsModule,
    CommentsModule,
    ChatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

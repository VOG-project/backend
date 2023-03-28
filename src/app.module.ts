import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestModule } from '@nestjs/common/interfaces/modules';
import { MiddlewareConsumer } from '@nestjs/common/interfaces/middleware';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { UsersModule } from './users/users.module';
import { UserEntity } from './users/users.entity';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { UploadsModule } from './uploads/uploads.module';
import { ChatsModule } from './chats/chats.module';
import { ChatParticipant, ChatRoom } from './chats/chats.entity';
import { PostsModule } from './posts/posts.module';
import { PostEntity } from 'src/posts/posts.entity';
import { CommentsModule } from './comments/comments.module';
import { CommentEntity } from './comments/comments.entity';
import { LikeModule } from './like/like.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    RedisModule.forRoot({
      config: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT, 10),
        password: process.env.REDIS_PASSWORD,
        connectTimeout: 1000000,
      },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT, 10),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      entities: [
        UserEntity,
        ChatRoom,
        ChatParticipant,
        PostEntity,
        CommentEntity,
      ],
      synchronize: true,
      database: 'vog',
      logging: true,
    }),
    UsersModule,
    AuthModule,
    UploadsModule,
    ChatsModule,
    PostsModule,
    CommentsModule,
    LikeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

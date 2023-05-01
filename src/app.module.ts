import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestModule } from '@nestjs/common/interfaces/modules';
import { MiddlewareConsumer } from '@nestjs/common/interfaces/middleware';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { UsersModule } from './users/users.module';
import { UserEntity } from './users/users.entity';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { UploadsModule } from './uploads/uploads.module';
import { ChatsModule } from './chats/chats.module';
import { ChatParticipantEntity, ChatRoomEntity } from './chats/chats.entity';
import { PostsModule } from './posts/posts.module';
import { PostEntity } from 'src/posts/posts.entity';
import { CommentsModule } from './comments/comments.module';
import { CommentEntity } from './comments/comments.entity';
import { LikeModule } from './like/like.module';
import { FriendModule } from './friend/friend.module';
import { FriendEntity } from './friend/friend.entity';
import { JwtModule } from '@nestjs/jwt';
import { RepliesModule } from './replies/replies.module';
import { ReplyEntity } from './replies/replies.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    RedisModule.forRoot({
      config: [
        {
          namespace: 'login',
          host: process.env.REDIS_SESSION_HOST,
          port: parseInt(process.env.REDIS_SESSION_PORT, 10),
          password: process.env.REDIS_SESSION_PASSWORD,
        },
        {
          namespace: 'like',
          host: process.env.REDIS_LIKE_HOST,
          port: parseInt(process.env.REDIS_LIKE_PORT, 10),
          password: process.env.REDIS_LIKE_PASSWORD,
        },
        {
          namespace: 'cache',
          host: process.env.REDIS_CACHE_HOST,
          port: parseInt(process.env.REDIS_CACHE_PORT, 10),
          password: process.env.REDIS_CACHE_PASSWORD,
        },
        {
          namespace: 'views',
          host: process.env.REDIS_VIEWS_HOST,
          port: parseInt(process.env.REDIS_VIEWS_PORT, 10),
          password: process.env.REDIS_VIEWS_PASSWORD,
        },
      ],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT, 10),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      entities: [
        UserEntity,
        ChatRoomEntity,
        ChatParticipantEntity,
        PostEntity,
        CommentEntity,
        FriendEntity,
        ReplyEntity,
      ],
      synchronize: true,
      database: 'vog',
      logging: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '7d',
      },
    }),
    UsersModule,
    AuthModule,
    UploadsModule,
    ChatsModule,
    PostsModule,
    CommentsModule,
    LikeModule,
    FriendModule,
    RepliesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

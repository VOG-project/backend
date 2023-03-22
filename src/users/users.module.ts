import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { UserRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { PostEntity } from 'src/posts/posts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, PostEntity])],
  controllers: [UsersController],
  providers: [UserService, UserRepository],
  exports: [UserRepository],
})
export class UsersModule {}

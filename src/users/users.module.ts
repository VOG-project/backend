import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { UserRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UserService, UserRepository],
  exports: [UserRepository],
})
export class UsersModule {}

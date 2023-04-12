import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from './../users/users.module';
import { AuthRepository } from './auth.repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [forwardRef(() => UsersModule)],
  providers: [AuthService, AuthRepository],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}

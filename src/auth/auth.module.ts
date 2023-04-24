import { Module, forwardRef, Global } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from './../users/users.module';
import { AuthRepository } from './auth.repository';

@Global()
@Module({
  imports: [forwardRef(() => UsersModule)],
  providers: [AuthService, AuthRepository],
  controllers: [AuthController],
  exports: [AuthService, AuthRepository],
})
export class AuthModule {}

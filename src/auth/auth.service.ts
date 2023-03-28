import { Injectable, HttpException } from '@nestjs/common';
import { UserRepository } from './../users/users.repository';
import { v4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { UserEntireDataReturn } from 'src/users/dto/return.user.dto';
import { AuthRepository } from './auth.repository';
import { AuthLoginRequest } from './dto/create.auth.dto';
import { AuthDeletedSessionCountReturn } from './dto/return.auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authRepository: AuthRepository,
  ) {}

  async issueSessionId(autuLoginRequest: AuthLoginRequest): Promise<string> {
    const { email, password } = autuLoginRequest;

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new HttpException(
        '이메일 또는 비밀번호를 잘못 입력하셨습니다.',
        401,
      );
    }

    const isRightPassword = await bcrypt.compare(password, user.password);
    if (!isRightPassword) {
      throw new HttpException(
        '이메일 또는 비밀번호를 잘못 입력하셨습니다.',
        401,
      );
    }

    const sessionId = v4();

    return sessionId;
  }

  async setSessionInformation(
    sessionId: string,
    autuLoginRequest: AuthLoginRequest,
  ): Promise<UserEntireDataReturn> {
    const { email } = autuLoginRequest;

    const isExistedSessionId = await this.authRepository.findSession(sessionId);
    if (isExistedSessionId) {
      throw new HttpException('이미 세션이 존재합니다. 로그아웃 하세요.', 401);
    }

    const user = await this.userRepository.findByEmail(email);
    await this.authRepository.createSession(sessionId, user.id, user.nickname);

    return await this.userRepository.findOneByIdWithoutPassword(user.id);
  }

  async deleteSessionInformation(
    sessionId: string,
  ): Promise<AuthDeletedSessionCountReturn> {
    return await this.authRepository.deleteSession(sessionId);
  }
}

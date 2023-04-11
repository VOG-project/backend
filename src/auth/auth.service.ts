import { Injectable, HttpException } from '@nestjs/common';
import { UserRepository } from './../users/users.repository';
import { v4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { UserEntireDataReturn } from 'src/users/dto/return.user.dto';
import { AuthRepository } from './auth.repository';
import {
  AuthLoginRequest,
  AuthAuthorizedCallbackCondition,
} from './dto/login.auth.dto';
import { AuthDeletedSessionCountReturn } from './dto/return.auth.dto';
import axios from 'axios';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authRepository: AuthRepository,
  ) {}

  async requestNaverAccessToken(callbackData: AuthAuthorizedCallbackCondition) {
    const { code, state } = callbackData;
    const responseData = await axios({
      method: 'get',
      url: `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=CVOrbtbzfrKewqSVyirz&client_secret=UOKpr_rHVs&code=${code}&state=${state}`,
    });

    return await this.requestNaverUserData(responseData.data);
  }

  async requestNaverUserData({ access_token }) {
    const responseData = await axios({
      method: 'get',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      url: `https://openapi.naver.com/v1/nid/me`,
    });

    return responseData.data;
  }

  async deleteSessionInformation(
    sessionId: string,
  ): Promise<AuthDeletedSessionCountReturn> {
    return await this.authRepository.deleteSession(sessionId);
  }
}

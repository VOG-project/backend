import { Injectable, HttpException } from '@nestjs/common';
import { UserRepository } from './../users/users.repository';
import { AuthRepository } from './auth.repository';
import { AuthAuthorizedCode } from './dto/login.auth.dto';
import {
  AuthDeletedSessionCountReturn,
  AuthRedirectReturn,
  AuthUserEntireDataReturn,
} from './dto/return.auth.dto';
import axios from 'axios';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async requestNaverAccessToken(
    authAuthorizedCode: AuthAuthorizedCode,
  ): Promise<AuthUserEntireDataReturn | AuthRedirectReturn> {
    const { code, state } = authAuthorizedCode;
    if (state !== process.env.OAUTH_NAVER_STATE)
      throw new HttpException(
        'state 값이 일치하지 않습니다. CSRF 공격 위험이 있습니다.',
        400,
      );

    const responseData = await axios({
      method: 'get',
      url: `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${process.env.OAUTH_NAVER_CLIENT_ID}&client_secret=${process.env.OAUTH_NAVER_CLIENT_SECRET}&code=${code}&state=${state}`,
    });

    const oauthId = await this.requestNaverUserData(responseData.data);
    console.log(oauthId);
    const user = await this.userRepository.findOneByOAuthId(oauthId);

    if (!user) {
      return {
        oauthId,
        message:
          'oauthId는 발급되었지만 해당하는 유저 데이터가 없습니다. 유저 데이터 입력 창으로 리다이렉트 해주세요',
        redirectUrl: 'https://talkgg.online/sign-up',
      };
    } else {
      const jwtAccessToken = await this.generateJwtAcessToken(user);
      return { jwtAccessToken, ...user };
    }
  }

  async requestNaverUserData({ access_token }): Promise<string> {
    const responseData = await axios({
      method: 'get',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      url: `https://openapi.naver.com/v1/nid/me`,
    });

    const oauthId = responseData.data.response.id;
    if (!oauthId)
      throw new HttpException('Naver oauthId를 받지 못했습니다.', 400);

    return oauthId;
  }

  async requestKakaoAccessToken(authAuthorizedCode: AuthAuthorizedCode) {
    const { code } = authAuthorizedCode;

    try {
      const responseData = await axios({
        method: 'post',
        url: `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.OAUTH_KAKAO_CLIENT_ID}&redirect_uri=https://talkgg.online/auth/login/kakao&code=${code}&client_secret=${process.env.OAUTH_KAKAO_CLIENT_SECRET}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const { id_token } = responseData.data;
      const { sub } = await this.decodeKakaoIdToken(id_token);

      const user = await this.userRepository.findOneByOAuthId(sub);

      if (!user) {
        return {
          oauthId: sub,
          message:
            'oauthId는 발급되었지만 해당하는 유저 데이터가 없습니다. 유저 데이터 입력 창으로 리다이렉트 해주세요',
          redirectUrl: 'https://talkgg.online/sign-up',
        };
      } else {
        const jwtAccessToken = await this.generateJwtAcessToken(user);
        return { jwtAccessToken, ...user };
      }
    } catch (err) {
      throw new HttpException(
        `[AXIOS ERROR] requestKakaoAccessToken: ${err.message}`,
        500,
      );
    }
  }

  async decodeKakaoIdToken(idToken: string) {
    const decodedIdToken = this.jwtService.decode(idToken);
    return decodedIdToken;
  }

  async generateJwtAcessToken(user): Promise<string> {
    const payload = { sub: user.id, nickname: user.nickname };
    return await this.jwtService.signAsync(payload);
  }
}

import { Injectable, HttpException } from '@nestjs/common';
import { UserRepository } from './../users/users.repository';
import { AuthRepository } from './auth.repository';
import { AuthAuthorizedCode } from './dto/login.auth.dto';
import {
  AuthRedirectReturn,
  AuthUserEntireDataReturn,
} from './dto/return.auth.dto';
import axios from 'axios';
import { JwtService } from '@nestjs/jwt';
import { UserEntireDataReturn } from 'src/users/dto/return.user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async loginByNaver(
    authAuthorizedCode: AuthAuthorizedCode,
  ): Promise<AuthUserEntireDataReturn | AuthRedirectReturn> {
    const { code, state } = authAuthorizedCode;
    // if (state !== process.env.OAUTH_NAVER_STATE)
    //   throw new HttpException(
    //     'state 값이 일치하지 않습니다. CSRF 공격 위험이 있습니다.',
    //     400,
    //   );

    // 네이버에 accessToken을 요청
    const responseData = await axios({
      method: 'get',
      url: `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${process.env.OAUTH_NAVER_CLIENT_ID}&client_secret=${process.env.OAUTH_NAVER_CLIENT_SECRET}&code=${code}&state=${state}`,
    });

    const oauthId = await this.requestNaverUserOAuthId(responseData.data);
    const user = await this.userRepository.findOneByOAuthId(oauthId);

    // oauthId에 해당하는 정보가 없을 경우 회원가입 처리
    if (!user) {
      return {
        oauthId,
        message:
          'oauthId는 발급되었지만 해당하는 유저 데이터가 없습니다. 유저 데이터 입력 창으로 리다이렉트 해주세요',
        redirectUrl: 'https://talkgg.online/sign-up',
      };
    }

    const jwtAccessToken = await this.generateJwtAcessToken(user);
    await this.registerAuthInfo(jwtAccessToken, user.id);
    return { jwtAccessToken, ...user };
  }

  /**
   * 네이버 계정에 대한 프로필 데이터를 요청하고 계정의 고유 아이디를 반환합니다.
   */
  async requestNaverUserOAuthId({ access_token }): Promise<string> {
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

  async loginByKakao(authAuthorizedCode: AuthAuthorizedCode) {
    const { code } = authAuthorizedCode;

    try {
      // 카카오에 토큰 요청
      const responseData = await axios({
        method: 'post',
        url: `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.OAUTH_KAKAO_CLIENT_ID}&redirect_uri=https://talkgg.online/auth/login/kakao&code=${code}&client_secret=${process.env.OAUTH_KAKAO_CLIENT_SECRET}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const { id_token } = responseData.data;
      const { sub } = await this.decodeKakaoIdToken(id_token);

      // oauthId에 해당하는 정보가 없을 경우 회원가입 처리
      const user = await this.userRepository.findOneByOAuthId(sub);
      if (!user) {
        return {
          oauthId: sub,
          message:
            'oauthId는 발급되었지만 해당하는 유저 데이터가 없습니다. 유저 데이터 입력 창으로 리다이렉트 해주세요',
          redirectUrl: 'https://talkgg.online/sign-up',
        };
      }

      const jwtAccessToken = await this.generateJwtAcessToken(user);

      // 중복 로그인 방지를 위해 Redis DB에 토큰과 아이디 저장
      await this.registerAuthInfo(jwtAccessToken, user.id);

      return { jwtAccessToken, ...user };
    } catch (err) {
      throw new HttpException(
        `[AXIOS ERROR] requestKakaoAccessToken: ${err.message}`,
        500,
      );
    }
  }

  /**
   * 카카오에서 받은 토큰을 decode 합니다.
   */
  async decodeKakaoIdToken(idToken: string) {
    const decodedIdToken = this.jwtService.decode(idToken);
    return decodedIdToken;
  }

  /**
   * 인증에 사용될 JWT Access Token을 생성합니다.
   */
  async generateJwtAcessToken(user: UserEntireDataReturn): Promise<string> {
    const payload = { sub: user.id, nickname: user.nickname };
    return await this.jwtService.signAsync(payload);
  }

  /**
   * 중복 로그인 방지를 위해 유저에게 발급된 JWT 토큰과 id를 redis db에 저장합니다.
   */
  async registerAuthInfo(jwtAccessToken: string, userId: number) {
    return await this.authRepository.createAuthInfo(jwtAccessToken, userId);
  }
}

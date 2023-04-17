import { Injectable, HttpException } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { UserModificationNicknameRequest } from './dto/modify.user.dto';
import { UserEntireDataReturn } from './dto/return.user.dto';
import { UserCreateRequest } from './dto/create.user.dto';
import { AuthService } from 'src/auth/auth.service';
import { AuthUserEntireDataReturn } from 'src/auth/dto/return.auth.dto';
import { PostDeletedCountReturn } from 'src/posts/dto/return.post.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {}

  /**
   * 유저의 닉네임을 갱신하는 메소드입니다.
   * 유저 아이디(PK)로 유저 데이터의 존재 유무를 확인하고, 사용자가 입력한 새로운 닉네임이 DB 데이터에서 중복되는 지 확인합니다.
   * 유저 레파지토리의 닉네임 업데이트 메소드에 유저 아이디(PK)와 새로운 닉네임 인수로 전달하여 호출합니다.
   * @param data Object { 새로운 닉네임 }
   * @param userId 유저 아이디(PK)
   * @returns Object { 업데이트된 row 개수 }
   */
  async modifyNickname(
    userModificationNicknameRequest: UserModificationNicknameRequest,
    userId: number,
  ): Promise<UserEntireDataReturn> {
    const { newNickname } = userModificationNicknameRequest;

    const user = await this.userRepository.findOneById(userId);

    if (!user) throw new HttpException('존재하지 않는 유저입니다.', 400);

    const isExistedUser = await this.userRepository.findByNickname(newNickname);

    if (isExistedUser)
      throw new HttpException('이미 존재하는 닉네임입니다.', 400);

    await this.userRepository.updateNickname(newNickname, userId);

    return await this.userRepository.findOneById(userId);
  }

  /**
   * 유저의 정보를 등록하는 메소드입니다.
   * 이메일과 닉네임이 중복되는 지 확인하고 비밀번호 해시화 작업을 거칩니다.
   * 유저 레파지토리의 유저 데이터 생성 메소드에 이메일, 해시 비밀번호, 닉네임, 성별을 인수로 전달하며 호출합니다.
   * @param data Object { 이메일, 패스워드, 닉네임, 성별 }
   * @returns 회원가입 성공 문자열
   */
  async registerUser(
    userCreateRequest: UserCreateRequest,
  ): Promise<AuthUserEntireDataReturn> {
    const { nickname, oauthId } = userCreateRequest;

    const isExistedNickname = await this.userRepository.findByNickname(
      nickname,
    );
    if (isExistedNickname) {
      throw new HttpException('이미 존재하는 닉네임입니다.', 400);
    }

    const isExistedOAuthId = await this.userRepository.findOneByOAuthId(
      oauthId,
    );
    if (isExistedOAuthId) {
      throw new HttpException('이미 존재하는 OAuthId입니다.', 400);
    }

    await this.userRepository.create(userCreateRequest);

    const user = await this.userRepository.findByNickname(nickname);
    const jwtAccessToken = await this.authService.generateJwtAcessToken(user);
    await this.authService.registerAuthInfo(jwtAccessToken, user.id);

    return { jwtAccessToken, ...user };
  }

  async getUser(userId: number) {
    return await this.userRepository.findOneById(userId);
  }

  async removeUser(userId: number): Promise<PostDeletedCountReturn> {
    const isExistedUser = await this.userRepository.findOneById(userId);
    if (!isExistedUser)
      throw new HttpException('존재하지 않는 유저입니다.', 400);

    return await this.userRepository.deleteById(userId);
  }
}

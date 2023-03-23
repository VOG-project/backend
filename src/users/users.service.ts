import { Injectable, HttpException } from '@nestjs/common';
import { UserRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import {
  UserModificationNicknameRequest,
  UserModificationPasswordRequest,
} from './dto/modify.user.dto';
import { UserEntireDataReturn } from './dto/return.user.dto';
import { UserCreateRequest } from './dto/create.user.dto';
import { PostDeletedCountReturn } from 'src/posts/dto/return.post.dto';
import { UserDeleteRequest } from './dto/delete.user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * 유저의 비밀번호를 갱신하는 메소드입니다.
   * 유저의 존재 유무를 확인하고 유저가 입력한 현재 비밀번호가 옳은 지 확인합니다.
   * 이후 새로운 비밀번호를 해시 문자열로 변환하고
   * 유저 레파지토리의 비밀번호 업데이트 메소드에 유저 아이디(PK)와 해시화된 비밀번호를 인수로 전달하여 호출합니다.
   * @param userId 유저 아이디(PK)
   * @param data Object { 현재 비밀번호, 새로운 비밀번호 }
   * @returns Object { 업데이트된 row 개수, 프로필 이미지 URL }
   */
  async modifyPassword(
    userModificationPasswordRequest: UserModificationPasswordRequest,
    userId: number,
  ): Promise<UserEntireDataReturn> {
    const { currentPassword, newPassword } = userModificationPasswordRequest;

    const user = await this.userRepository.findOneById(userId);

    if (!user) throw new HttpException('존재하지 않는 유저입니다.', 400);

    // 사용자가 입력한 현재 비밀번호를 검사하기 위해 DB에 저장된 비밀번호와 일치하는 지 비교합니다.
    const isRightPassword = await bcrypt.compare(
      currentPassword,
      user.password,
    );

    if (!isRightPassword)
      throw new HttpException('현재 비밀번호가 일치하지 않습니다.', 400);

    // 새로운 비밀번호를 DB에 삽입하기 위해 해시 작업을 진행합니다.
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    this.userRepository.updatePassword(userId, hashedPassword);

    return this.userRepository.findOneByIdWithoutPassword(userId);
  }

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

    return await this.userRepository.findOneByIdWithoutPassword(userId);
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
  ): Promise<UserEntireDataReturn> {
    const { email, password, nickname, sex } = userCreateRequest;

    const isExistedEmail = await this.userRepository.findByEmail(email);

    if (isExistedEmail) {
      throw new HttpException('이미 존재하는 이메일입니다.', 400);
    }

    const isExistedNickname = await this.userRepository.findByNickname(
      nickname,
    );

    if (isExistedNickname) {
      throw new HttpException('이미 존재하는 닉네임입니다.', 400);
    }

    // 보안을 위해 비밀번호를 해시화 작업을 거쳐 랜덤한 문자열로 변환합니다.
    const hashedPassword = await bcrypt.hash(password, 12);

    const { userId } = await this.userRepository.create(
      email,
      hashedPassword,
      nickname,
      sex,
    );

    return this.userRepository.findOneByIdWithoutPassword(userId);
  }

  /**
   * 유저의 데이터를 삭제하는 메소드입니다.
   * 유저가 입력한 비밀번호가 옳은 지 확인합니다.
   * 유저 레파지토리의 유저 데이터 삭제 메소드에 유저 아이디(PK)를 인수로 전달하며 호출합니다.
   * @param data Object{ 패스워드 }
   * @param userId
   * @returns
   */
  async withdrawal(
    userDeleteRequest: UserDeleteRequest,
    userId: number,
  ): Promise<PostDeletedCountReturn> {
    const { password } = userDeleteRequest;

    const user = await this.userRepository.findOneById(userId);

    if (!user) throw new HttpException('존재하지 않는 유저입니다.', 400);

    // 사용자가 입력한 현재 비밀번호를 검사하기 위해 DB에 저장된 비밀번호와 일치하는 지 비교합니다.
    const isRightPassword = await bcrypt.compare(password, user.password);

    if (!isRightPassword) {
      throw new HttpException('비밀번호가 일치하지 않습니다.', 403);
    }

    return this.userRepository.deleteById(userId);
  }
}

import { Injectable, HttpException } from '@nestjs/common';
import {
  UserDeletedInfoRequestDto,
  UserRegisteredRequestDto,
  UserUpdatedNicknameRequestDto,
  UserUpdatedPasswordRequestDto,
} from './dto/user.request.dto';
import { UserRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import {
  UserDeletedInfoResponseDto,
  UserUpdatedInfoResponseDto,
} from './dto/user.response.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async updatePassword(
    userId: number,
    data: UserUpdatedPasswordRequestDto,
  ): Promise<UserUpdatedInfoResponseDto> {
    const { currentPassword, newPassword } = data;

    const user = await this.userRepository.findById(userId);

    if (!user) throw new HttpException('존재하지 않는 유저입니다.', 400);

    const isRightPassword = await bcrypt.compare(
      currentPassword,
      user.password,
    );

    if (!isRightPassword)
      throw new HttpException('현재 비밀번호가 일치하지 않습니다.', 400);

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    return await this.userRepository.updatePassword(userId, hashedPassword);
  }

  async updateNickname(
    data: UserUpdatedNicknameRequestDto,
    userId: number,
  ): Promise<UserUpdatedInfoResponseDto> {
    const { newNickname } = data;

    const isExistedUser = await this.userRepository.findByNickname(newNickname);

    if (isExistedUser)
      throw new HttpException('이미 존재하는 닉네임입니다.', 400);

    const updatedCount = await this.userRepository.updateNickname(
      userId,
      newNickname,
    );

    return updatedCount;
  }

  async register(data: UserRegisteredRequestDto): Promise<string> {
    const { email, password, nickname, sex } = data;

    const isExistedUser = await this.userRepository.findByEmail(email);

    if (isExistedUser) {
      throw new HttpException('이미 존재하는 이메일입니다.', 400);
    }

    const isExistedNickname = await this.userRepository.findByNickname(
      nickname,
    );

    if (isExistedNickname) {
      throw new HttpException('이미 존재하는 닉네임입니다.', 400);
    }

    const saltOrRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    await this.userRepository.create(email, hashedPassword, nickname, sex);

    return '회원가입 성공';
  }

  async delete(
    data: UserDeletedInfoRequestDto,
    userId: number,
  ): Promise<UserDeletedInfoResponseDto> {
    const { password } = data;

    const user = await this.userRepository.findById(userId);

    const isRightPassword = await bcrypt.compare(password, user.password);

    if (!isRightPassword) {
      throw new HttpException('비밀번호가 일치하지 않습니다.', 403);
    }

    return this.userRepository.deleteById(userId);
  }
}

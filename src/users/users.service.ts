import { Injectable, HttpException } from '@nestjs/common';
import {
  UserRegisterRequestDto,
  UserUpdateNicknameRequestDto,
  UserUpdatePasswordRequestDto,
} from './dto/users.register.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { UserUpdatedCountResponseDto } from './dto/users.response.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async updatePassword(
    userId: number,
    body: UserUpdatePasswordRequestDto,
  ): Promise<UserUpdatedCountResponseDto> {
    const { currentPassword, newPassword } = body;

    const user = await this.usersRepository.findById(userId);

    if (!user) throw new HttpException('존재하지 않는 유저입니다.', 400);

    const isRightPassword = await bcrypt.compare(
      currentPassword,
      user.password,
    );

    if (!isRightPassword)
      throw new HttpException('현재 비밀번호가 일치하지 않습니다.', 400);

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    return await this.usersRepository.updatePassword(userId, hashedPassword);
  }

  async updateNickname(
    body: UserUpdateNicknameRequestDto,
    userId: number,
  ): Promise<UserUpdatedCountResponseDto> {
    const { newNickname } = body;

    const isExistedUser = await this.usersRepository.findByNickname(
      newNickname,
    );

    if (isExistedUser)
      throw new HttpException('이미 존재하는 닉네임입니다.', 400);

    const updatedCount = await this.usersRepository.updateNickname(
      userId,
      newNickname,
    );

    return updatedCount;
  }

  async register(body: UserRegisterRequestDto): Promise<string> {
    const { email, password, nickname, sex } = body;

    const isExistedUser = await this.usersRepository.findByEmail(email);

    if (isExistedUser) {
      throw new HttpException('이미 존재하는 이메일입니다.', 400);
    }

    const isExistedNickname = await this.usersRepository.findByNickname(
      nickname,
    );

    if (isExistedNickname) {
      throw new HttpException('이미 존재하는 닉네임입니다.', 400);
    }

    const saltOrRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    await this.usersRepository.create(email, hashedPassword, nickname, sex);

    return '회원가입 성공';
  }
}

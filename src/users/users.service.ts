import { Injectable, HttpException } from '@nestjs/common';
import {
  UserRegisterRequestDto,
  UserUpdateNicknameRequestDto,
} from './dto/users.register.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { UserUpdateNicknameResponseDto } from './dto/users.response.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async updateNickname(
    body: UserUpdateNicknameRequestDto,
    userId: number,
  ): Promise<UserUpdateNicknameResponseDto> {
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

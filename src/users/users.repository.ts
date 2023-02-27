import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserUpdatedCountResponseDto } from './dto/users.response.dto';
import { User } from './users.entity';

@Injectable()
export class UsersRepository {
  constructor(@InjectRepository(User) private userModel: Repository<User>) {}

  async updatePassword(
    userId: number,
    hashedPassword: string,
  ): Promise<UserUpdatedCountResponseDto> {
    const updatedResult = await this.userModel
      .createQueryBuilder()
      .update(User)
      .set({
        password: hashedPassword,
      })
      .where('id = :id', { id: userId })
      .execute();

    return { updatedCount: updatedResult.affected };
  }

  async updateNickname(
    userId: number,
    newNickname: string,
  ): Promise<UserUpdatedCountResponseDto> {
    const updatedResult = await this.userModel
      .createQueryBuilder()
      .update(User)
      .set({
        nickname: newNickname,
      })
      .where('id = :id', { id: userId })
      .execute();

    return {
      updatedCount: updatedResult.affected,
    };
  }

  async findById(userId: number) {
    try {
      const user = this.userModel
        .createQueryBuilder()
        .select()
        .where('id = :id', { id: userId })
        .getOne();

      return user;
    } catch (err) {
      throw new HttpException(`[MYSQL Error] findById: ${err.message}`, 501);
    }
  }

  async create(
    email: string,
    password: string,
    nickname: string,
    sex: string,
  ): Promise<void> {
    try {
      await this.userModel
        .createQueryBuilder()
        .insert()
        .into('user')
        .values({
          email,
          password,
          nickname,
          sex,
        })
        .execute();
    } catch (err) {
      throw new HttpException(
        `[MYSQL Error] create method: ${err.message}`,
        400,
      );
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const exUser = await this.userModel
        .createQueryBuilder('user')
        .where('email = :email', { email })
        .getOne();

      return exUser;
    } catch (err) {
      throw new HttpException(
        `[MYSQL Error] existByEmail method: ${err.message}`,
        400,
      );
    }
  }

  async findByNickname(nickname: string): Promise<User | null> {
    try {
      const exUser = await this.userModel
        .createQueryBuilder('user')
        .where('nickname = :nickname', { nickname })
        .getOne();
      return exUser;
    } catch (err) {
      throw new HttpException(
        `[MYSQL Error] existByNickname method: ${err.message}`,
        400,
      );
    }
  }
}

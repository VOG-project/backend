import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  async create(
    email: string,
    password: string,
    nickname: string,
    sex: string,
  ): Promise<void> {
    try {
      await this.usersRepository
        .createQueryBuilder()
        .insert()
        .into('users')
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

  async findByEmail(email: string): Promise<Users> {
    try {
      const exUser = await this.usersRepository
        .createQueryBuilder('users')
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

  async findByNickname(nickname: string): Promise<Users> {
    try {
      const exUser = await this.usersRepository
        .createQueryBuilder('users')
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

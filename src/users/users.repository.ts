import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { UserRequestDto } from './dto/users.register.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  async create(email, password, nickname, sex): Promise<any> {
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

  async existByEmail(email: string): Promise<any> {
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

  async existByNickname(nickname: string): Promise<any> {
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

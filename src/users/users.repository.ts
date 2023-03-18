import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  UserDeletedInfoResponseDto,
  UserUpdatedInfoResponseDto,
} from './dto/user.response.dto';
import { User } from './users.entity';
import { UploadUserProfileImageResponseDto } from './../uploads/dto/uploads.response.dto';

@Injectable()
export class UserRepository {
  constructor(@InjectRepository(User) private userModel: Repository<User>) {}

  /**
   * User 테이블의 profileUrl 필드를 새로운 이미지 URL로 업데이트하고 업데이트된 row 개수와 이미지 URl을 반환합니다.
   * @param userId 유저 아이디(PK)
   * @param fileUrl 유저 프로필 이미지가 저장된 S3 URL
   * @returns Object {업데이트된 row 개수, 프로필 이미지 URL}
   */
  async updateProfileUrl(
    userId: number,
    fileUrl: string,
  ): Promise<UploadUserProfileImageResponseDto> {
    try {
      const updateResult = await this.userModel
        .createQueryBuilder()
        .update(User)
        .set({
          profileUrl: fileUrl,
        })
        .where('id = :userId', { userId })
        .execute();

      return {
        updatedCount: updateResult.affected,
        profileUrl: fileUrl,
      };
    } catch (err) {
      throw new HttpException(
        `[MYSQL ERROR] updateProfileUrl ${err.message}`,
        500,
      );
    }
  }

  /**
   * User 테이블의 password 필드를 새로운 비밀번호로 업데이트하고 업데이트된 row 개수를 반환합니다.
   * @param userId 유저 아이디(PK)
   * @param hashedPassword 해시화된 비밀번호
   * @returns Object {업데이트된 row 개수}
   */
  async updatePassword(
    userId: number,
    hashedPassword: string,
  ): Promise<UserUpdatedInfoResponseDto> {
    try {
      const updatedResult = await this.userModel
        .createQueryBuilder()
        .update(User)
        .set({
          password: hashedPassword,
        })
        .where('id = :userId', { userId })
        .execute();

      return { updatedCount: updatedResult.affected };
    } catch (err) {
      throw new HttpException(
        `[MYSQL ERROR] updatePassword ${err.message}`,
        400,
      );
    }
  }

  /**
   * User 테이블의 nickname 필드를 새로운 닉네임으로 업데이트하고 업데이트된 row 개수를 반환합니다.
   * @param userId 유저 아이디(PK)
   * @param newNickname 닉네임
   * @returns Object {업데이트된 row 개수}
   */
  async updateNickname(
    userId: number,
    newNickname: string,
  ): Promise<UserUpdatedInfoResponseDto> {
    try {
      const updatedResult = await this.userModel
        .createQueryBuilder()
        .update(User)
        .set({
          nickname: newNickname,
        })
        .where('id = :userId', { userId })
        .execute();

      return {
        updatedCount: updatedResult.affected,
      };
    } catch (err) {
      throw new HttpException(
        `[MYSQL Error] updateNickname ${err.message}`,
        400,
      );
    }
  }

  /**
   * User 테이블에서 userId에 해당하는 데이터를 반환합니다.
   * @param userId 유저 아이디(PK)
   */
  async findById(userId: number) {
    try {
      const user = await this.userModel
        .createQueryBuilder()
        .select()
        .where('id = :userId', { userId })
        .getOne();

      return user;
    } catch (err) {
      throw new HttpException(`[MYSQL Error] findById: ${err.message}`, 400);
    }
  }

  /**
   * User 테이블에 새로운 유저의 정보를 등록합니다.
   * @param email 유저 이메일
   * @param password 유저 패스워드
   * @param nickname 유저 닉네임
   * @param sex 유저 성별
   */
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

  /**
   * User 테이블에서 email로 유저의 데이터를 검색하고 해당 유저 데이터의 모든 컬럼을 반환합니다.
   * @param email 유저 이메일
   * @returns 검색된 유저 데이터의 모든 컬럼
   */
  async findByEmail(email: string) {
    try {
      const user = await this.userModel
        .createQueryBuilder('user')
        .where('email = :email', { email })
        .getOne();

      return user;
    } catch (err) {
      throw new HttpException(
        `[MYSQL Error] existByEmail method: ${err.message}`,
        400,
      );
    }
  }

  /**
   * User 테이블에서 nickname으로 유저의 데이터를 검색하고 해당 유저 데이터의 모든 컬럼을 반환합니다.
   * @param nickname 유저 닉네임
   * @returns 검색된 유저 데이터의 모든 컬럼
   */
  async findByNickname(nickname: string) {
    try {
      const user = await this.userModel
        .createQueryBuilder('user')
        .where('nickname = :nickname', { nickname })
        .getOne();

      return user;
    } catch (err) {
      throw new HttpException(
        `[MYSQL Error] existByNickname method: ${err.message}`,
        400,
      );
    }
  }

  /**
   * User 테이블에서 userId와 일치하는 유저의 데이터(row)를 삭제하고 삭제된 row 개수를 반환합니다.
   * @param userId 유저 아이디(PK)
   * @returns 삭제된 row 개수
   */
  async deleteById(userId: number): Promise<UserDeletedInfoResponseDto> {
    try {
      const deletedResult = await this.userModel
        .createQueryBuilder()
        .delete()
        .from('user')
        .where('id = :userId', { userId })
        .execute();

      return { deletedCount: deletedResult.affected };
    } catch (err) {
      throw new HttpException(
        `[MySQL ERROR] deleteById method: ${err.message}`,
        500,
      );
    }
  }
}

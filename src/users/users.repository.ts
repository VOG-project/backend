import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './users.entity';
import { UserEntireDataReturn, UserPkIdReturn } from './dto/return.user.dto';
import { PostDeletedCountReturn } from 'src/posts/dto/return.post.dto';
import { UserCreateRequest } from './dto/create.user.dto';
import { UserModificationNicknameRequest } from './dto/modify.user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity) private userModel: Repository<UserEntity>,
  ) {}

  /**
   * User 테이블의 profileUrl 필드를 새로운 이미지 URL로 업데이트하고 업데이트된 row 개수와 이미지 URl을 반환합니다.
   * @param userId 유저 아이디(PK)
   * @param fileUrl 유저 프로필 이미지가 저장된 S3 URL
   * @returns Object { 업데이트된 row 개수, 프로필 이미지 URL }
   */
  async updateProfileUrl(userId: number, fileUrl: string): Promise<void> {
    try {
      await this.userModel
        .createQueryBuilder()
        .update()
        .set({
          profileUrl: fileUrl,
        })
        .where('id = :userId', { userId })
        .execute();
    } catch (err) {
      throw new HttpException(
        `[MYSQL ERROR] updateProfileUrl ${err.message}`,
        500,
      );
    }
  }

  /**
   * User 테이블의 컬럼을 갱신합니다.
   * @param userId 유저 아이디(PK)
   * @param nickname 닉네임
   * @returns Object { 업데이트된 row 개수 }
   */
  async update(
    userModificationNicknameRequest: UserModificationNicknameRequest,
    userId: number,
  ): Promise<void> {
    try {
      await this.userModel
        .createQueryBuilder()
        .update()
        .set(userModificationNicknameRequest)
        .where('id = :userId', { userId })
        .execute();
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
  async findOneById(userId: number): Promise<UserEntireDataReturn> {
    try {
      return await this.userModel
        .createQueryBuilder()
        .select()
        .where('id = :userId', { userId })
        .getOne();
    } catch (err) {
      throw new HttpException(`[MYSQL Error] findById: ${err.message}`, 400);
    }
  }

  async findOneByOAuthId(oauthId: string): Promise<UserEntireDataReturn> {
    try {
      return await this.userModel
        .createQueryBuilder()
        .select()
        .where('oauthId = :oauthId', { oauthId })
        .getOne();
    } catch (err) {
      throw new HttpException(
        `[MYSQL ERROR] findOneByAuthId: ${err.message}`,
        500,
      );
    }
  }

  /**
   * User 테이블에 새로운 유저의 정보를 등록합니다.
   * @param email 유저 이메일
   * @param password 유저 패스워드
   * @param nickname 유저 닉네임
   * @param sex 유저 성별
   */
  async create(userCreateRequest: UserCreateRequest): Promise<UserPkIdReturn> {
    try {
      const insertedUser = await this.userModel
        .createQueryBuilder()
        .insert()
        .values(userCreateRequest)
        .execute();

      return { userId: insertedUser.identifiers[0].id };
    } catch (err) {
      throw new HttpException(
        `[MYSQL Error] create method: ${err.message}`,
        400,
      );
    }
  }

  /**
   * User 테이블에서 nickname으로 유저의 데이터를 검색하고 해당 유저 데이터의 모든 컬럼을 반환합니다.
   * @param nickname 유저 닉네임
   * @returns 검색된 유저 데이터의 모든 컬럼
   */
  async findByNickname(nickname: string): Promise<UserEntireDataReturn> {
    try {
      return await this.userModel
        .createQueryBuilder()
        .select()
        .where('nickname = :nickname', { nickname })
        .getOne();
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
  async deleteById(userId: number): Promise<PostDeletedCountReturn> {
    try {
      const deletedResult = await this.userModel
        .createQueryBuilder()
        .delete()
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

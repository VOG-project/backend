import { Injectable, HttpException } from '@nestjs/common';
import { UserEntireDataReturn } from 'src/users/dto/return.user.dto';
import { UserRepository } from 'src/users/users.repository';
import { FriendCreateRequest } from './dto/create.friend.dto';
import { FriendDeleteRequest } from './dto/delete.friend.dto';
import {
  FriendDeletedCountReturn,
  FriendFollowingReturn,
} from './dto/return.friend.dto';
import { FriendRepository } from './friend.repository';

@Injectable()
export class FriendService {
  constructor(
    private readonly friendRepository: FriendRepository,
    private readonly userRepository: UserRepository,
  ) {}

  /**
   * 친구를 추가할 경우 데이터를 생성합니다.
   */
  async registerFriend(
    userId: number,
    friendCreateRequest: FriendCreateRequest,
  ): Promise<UserEntireDataReturn> {
    const { targetId } = friendCreateRequest;
    // userId와 targetId가 같으면 자기 자신에 대한 접근이므로 예외처리
    if (userId === targetId)
      throw new HttpException('자기 자신은 친구로 추가할 수 없습니다.', 400);

    const isExistedUser = await this.userRepository.findOneById(userId);
    // 존재하지 않는 유저가 친구 추가를 시도할 경우 예외처리
    if (!isExistedUser)
      throw new HttpException(
        '친구 등록을 시도하는 유저는 존재하지 않는 유저입니다.',
        404,
      );

    const isExistedTarget = await this.userRepository.findOneById(targetId);
    // 존재하지 않는 유저를 친구 추가할 경우 예외처리
    if (!isExistedTarget)
      throw new HttpException(
        '친구 추가하려는 대상은 존재하지 않는 유저입니다.',
        404,
      );

    await this.friendRepository.create(userId, targetId);

    return isExistedTarget;
  }

  /**
   * 유저가 현재 친구 추가하고 있는 유저 데이터들을 반환합니다.
   */
  async getFriends(userId: number): Promise<FriendFollowingReturn[]> {
    const isExistedUser = await this.userRepository.findOneById(userId);
    // 존재하지 않는 유저에 접근할 경우 예외처리
    if (!isExistedUser)
      throw new HttpException('존재하지 않는 유저입니다.', 404);

    return await this.friendRepository.findFreindsByUserId(userId);
  }

  /**
   * 친구 데이터를 삭제합니다.
   */
  async removeFriend(
    userId: number,
    friendDeleteRequest: FriendDeleteRequest,
  ): Promise<FriendDeletedCountReturn> {
    const { targetId } = friendDeleteRequest;
    // userId와 targetId가 같으면 자기 자신에 대한 접근이므로 예외처리
    if (userId === targetId)
      throw new HttpException('자기 자신은 친구 삭제할 수 없습니다.', 400);

    return await this.friendRepository.deleteFriend(userId, targetId);
  }

  /**
   * 친구 목록 중 특정 닉네임을 가진 유저 데이터를 반환합니다.
   */
  async searchFriend(nickname: string): Promise<UserEntireDataReturn> {
    try {
      const user = await this.userRepository.findByNickname(nickname);
      return user;
    } catch (err) {
      throw new HttpException('존재하지 않는 유저입니다.', 404);
    }
  }
}

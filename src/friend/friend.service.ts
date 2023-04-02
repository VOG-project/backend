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

  async registerFriend(
    userId: number,
    friendCreateRequest: FriendCreateRequest,
  ): Promise<UserEntireDataReturn> {
    const { targetId } = friendCreateRequest;
    if (userId === targetId)
      throw new HttpException('자기 자신은 친구로 추가할 수 없습니다.', 400);

    const isExistedUser = await this.userRepository.findOneById(userId);
    if (!isExistedUser)
      throw new HttpException(
        '친구 등록을 시도하는 유저는 존재하지 않는 유저입니다.',
        400,
      );

    const isExistedTarget = await this.userRepository.findOneById(targetId);
    if (!isExistedTarget)
      throw new HttpException(
        '친구 추가하려는 대상은 존재하지 않는 유저입니다.',
        400,
      );

    await this.friendRepository.create(userId, targetId);

    return isExistedTarget;
  }

  async getFriends(userId: number): Promise<FriendFollowingReturn[]> {
    const isExistedUser = await this.userRepository.findOneById(userId);
    if (!isExistedUser)
      throw new HttpException('존재하지 않는 유저입니다.', 400);

    return await this.friendRepository.findFreindsByUserId(userId);
  }

  async removeFriend(
    userId: number,
    friendDeleteRequest: FriendDeleteRequest,
  ): Promise<FriendDeletedCountReturn> {
    const { targetId } = friendDeleteRequest;
    if (userId === targetId)
      throw new HttpException('자기 자신은 친구 삭제할 수 없습니다.', 400);

    return await this.friendRepository.deleteFriend(userId, targetId);
  }

  async searchFriend(nickname: string): Promise<UserEntireDataReturn> {
    try {
      const { password, ...user } = await this.userRepository.findByNickname(
        nickname,
      );
      return user;
    } catch (err) {
      throw new HttpException('존재하지 않는 유저입니다.', 404);
    }
  }
}

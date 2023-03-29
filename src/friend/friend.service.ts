import { Injectable, HttpException } from '@nestjs/common';
import { UserEntireDataReturn } from 'src/users/dto/return.user.dto';
import { UserRepository } from 'src/users/users.repository';
import { FriendRepository } from './friend.repository';

@Injectable()
export class FriendService {
  constructor(
    private readonly friendRepository: FriendRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async registerFriend(
    userId: number,
    targetId: number,
  ): Promise<UserEntireDataReturn> {
    if (userId === targetId)
      throw new HttpException('자기 자신은 친구로 추가할 수 없습니다.', 400);

    const isExistedUser = await this.userRepository.findOneById(userId);
    if (!isExistedUser)
      throw new HttpException('존재하지 않는 유저입니다.', 400);

    const isExistedTarget = await this.userRepository.findOneById(targetId);
    if (!isExistedTarget)
      throw new HttpException(
        '친구 추가하려는 대상은 존재하지 않는 유저입니다.',
        400,
      );

    await this.friendRepository.create(userId, targetId);

    return isExistedTarget;
  }
}

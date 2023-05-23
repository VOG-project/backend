import { FriendFollowingReturn } from 'src/friend/dto/return.friend.dto';
import { UserEntireDataReturn } from 'src/users/dto/return.user.dto';

interface IFriendFollowing {
  userId: number;
  following: Omit<
    UserEntireDataReturn,
    'oauthId' | 'provider' | 'createdAt' | 'updatedAt'
  >;
}

export const FriendReturn: IFriendFollowing = {
  userId: 1,

  following: {
    id: 1,
    nickname: '친구',
    sex: '남',
    profileUrl:
      'https://vog-image-storage.s3.ap-northeast-2.amazonaws.com/user/4-p.jpg',
  },
};

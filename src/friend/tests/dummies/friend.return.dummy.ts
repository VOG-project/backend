import { FriendDeletedCountReturn } from 'src/friend/dto/return.friend.dto';
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

export const UserReturn: UserEntireDataReturn = {
  id: 1,
  oauthId: 'Sb35YY9N_bZgbfSW1jDYkjCcgKrEEHUQ8CLTn',
  provider: 'naver',
  nickname: '테스트',
  sex: '남',
  profileUrl: 'https://www.vog-storage/user/efsef.jpg',
  createdAt: new Date('2023-03-05 16:25:04.871850'),
  updatedAt: new Date('2023-03-05 16:25:04.871850'),
};

export const FriendDeletedRowCountReturn: FriendDeletedCountReturn = {
  deletedCount: 1,
};

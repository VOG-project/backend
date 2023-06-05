import { LikeUserReturn } from 'src/like/dto/result.like.dto';
import { PostEntireDataReturn } from 'src/posts/dto/return.post.dto';
import { UserEntireDataReturn } from 'src/users/dto/return.user.dto';

export const LikeUsers: LikeUserReturn = {
  userIds: [5, 10, 15, 20],
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

export const PostReturn: PostEntireDataReturn = {
  id: 1,
  title: '게시물 타이틀',
  content: '게시물 내용',
  likeCount: 1,
  view: 1,
  postCategory: 'free',
  updatedAt: new Date('2023-03-05 16:25:04.871850'),
  createdAt: new Date('2023-03-05 16:25:04.871850'),
  user: {
    id: 10,
    nickname: '닉네임',
  },
};

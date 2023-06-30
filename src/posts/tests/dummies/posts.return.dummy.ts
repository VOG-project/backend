import { PostEntireDataReturn } from 'src/posts/dto/return.post.dto';

export const PostEntireReturn: PostEntireDataReturn = {
  id: 1,
  title: '테스트 타이틀',
  content: '테스트',
  likeCount: 10,
  view: 10,
  postCategory: 'free',
  createdAt: new Date('2023-03-05 16:25:04.871850'),
  updatedAt: new Date('2023-03-05 16:25:04.871850'),
  user: {
    id: 1,
    nickname: '꾸꾸까까',
  },
};

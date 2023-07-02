import {
  PostDeletedCountReturn,
  PostEntireDataReturn,
  PostListReturn,
} from 'src/posts/dto/return.post.dto';

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

export const PostSearchReturn: PostListReturn = {
  createdAt: new Date('2023-04-14T04:38:48.250Z'),
  id: 3,
  title: '하하하하',
  view: 0,
  postCategory: 'free',
  user: {
    id: 1,
    nickname: '꾸꾸까까',
    profileUrl: 'https://vog-image-s2.amazonaws.com/user/default.jpg',
  },
};

export const PostRemovedCountReturn: PostDeletedCountReturn = {
  deletedCount: 1,
};

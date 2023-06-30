import { PostCreateRequest } from 'src/posts/dto/create.post.dto';

export const PostRegisterDummyDto: PostCreateRequest = {
  writerId: 1,
  title: '테스트 타이틀',
  content: '테스트',
  postCategory: 'free',
};

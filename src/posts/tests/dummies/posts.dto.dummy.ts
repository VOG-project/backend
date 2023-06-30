import { PostCreateRequest } from 'src/posts/dto/create.post.dto';
import { PostSearchCondition } from 'src/posts/dto/get.post.dto';

export const PostRegisterDummyDto: PostCreateRequest = {
  writerId: 1,
  title: '테스트 타이틀',
  content: '테스트',
  postCategory: 'free',
};

export const PostSearchDummyCondition: PostSearchCondition = {
  searchType: 'title',
  page: 1,
  board: 'free',
  keyword: '꾸꾸까까',
};

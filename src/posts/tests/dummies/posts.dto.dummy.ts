import { PostCreateRequest } from 'src/posts/dto/create.post.dto';
import {
  PostGetListCondition,
  PostSearchCondition,
} from 'src/posts/dto/get.post.dto';
import { PostModificationRequest } from 'src/posts/dto/modify.post.dto';

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

export const PostGetDummyCondition: PostGetListCondition = {
  board: 'free',
  page: 1,
};

export const PostModificationDummyRequest: PostModificationRequest = {
  title: '수정된 타이틀',
  content: '타이틀타이틀',
};

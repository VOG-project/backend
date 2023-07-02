import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from '../posts.controller';
import { PostsService } from '../posts.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { mockAuthGuard } from 'src/auth/tests/mocks/auth.guard.mock';
import {
  PostGetDummyCondition,
  PostRegisterDummyDto,
  PostSearchDummyCondition,
} from './dummies/posts.dto.dummy';
import {
  PostEntireReturn,
  PostSearchReturn,
} from './dummies/posts.return.dummy';

describe('PostsController', () => {
  let postsController: PostsController;
  let postsService: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        {
          provide: PostsService,
          useValue: {
            registerPost: jest.fn(() => PostEntireReturn),
            searchPost: jest.fn(() => PostSearchReturn),
            getPostList: jest.fn(() => PostSearchReturn),
            getPost: jest.fn(() => PostEntireReturn),
          },
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard())
      .compile();

    postsController = module.get<PostsController>(PostsController);
    postsService = module.get<PostsService>(PostsService);
  });

  describe('RegisterPost', () => {
    const postDummyDto = PostRegisterDummyDto;
    const postReturn = PostEntireReturn;

    it('SUCCESS: 댓글 데이터 생성 및 생성된 데이터 반환', async () => {
      const result = await postsController.registerPost(postDummyDto);

      expect(result).toStrictEqual(postReturn);
      expect(postsService.registerPost).toBeCalledTimes(1);
      expect(postsService.registerPost).toBeCalledWith(postDummyDto);
    });
  });

  describe('SearchPost', () => {
    const postSearchConditionDummy = PostSearchDummyCondition;
    const postSearchReturnDummy = PostSearchReturn;

    it('SUCCESS: 댓글 검색 및 검색된 데이터 반환', async () => {
      const result = await postsController.searchPost(postSearchConditionDummy);

      expect(result).toStrictEqual(postSearchReturnDummy);
      expect(postsService.searchPost).toBeCalledTimes(1);
      expect(postsService.searchPost).toBeCalledWith(postSearchConditionDummy);
    });
  });

  describe('GetPostList', () => {
    const postGetConditionDummy = PostGetDummyCondition;
    const postGetReturnDummy = PostSearchReturn;

    it('SUCCESS: 게시판 category와 page를 전달하면 최신 순으로 10개씩 게시물 리스트 반환', async () => {
      const result = await postsController.getPostList(postGetConditionDummy);

      expect(result).toStrictEqual(postGetReturnDummy);
      expect(postsService.getPostList).toBeCalledTimes(1);
      expect(postsService.getPostList).toBeCalledWith(postGetConditionDummy);
    });
  });

  describe('GetPost', () => {
    const postId = 1;
    const postReturn = PostEntireReturn;

    it('SUCCESS: postId에 해당하는 게시물 데이터를 반환', async () => {
      const result = await postsController.getPost(postId);

      expect(result).toStrictEqual(postReturn);
      expect(postsService.getPost).toBeCalledTimes(1);
      expect(postsService.getPost).toBeCalledWith(postId);
    });
  });
});

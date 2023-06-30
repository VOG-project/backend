import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from '../posts.controller';
import { PostsService } from '../posts.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { mockAuthGuard } from 'src/auth/tests/mocks/auth.guard.mock';
import {
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

  describe('searchPost', () => {
    const postSearchConditionDummy = PostSearchDummyCondition;
    const postSearchReturnDummy = PostSearchReturn;

    it('SUCCESS: 댓글 검색 및 검색된 데이터 반환', async () => {
      const result = await postsController.searchPost(postSearchConditionDummy);

      expect(result).toStrictEqual(postSearchReturnDummy);
      expect(postsService.searchPost).toBeCalledTimes(1);
      expect(postsService.searchPost).toBeCalledWith(postSearchConditionDummy);
    });
  });
});

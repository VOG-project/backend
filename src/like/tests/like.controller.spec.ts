import { Test, TestingModule } from '@nestjs/testing';
import { LikeController } from '../like.controller';
import { LikeService } from '../like.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { mockAuthGuard } from 'src/auth/tests/mocks/auth.guard.mock';
import { LikeRegisterDto } from './dummies/like.dto.dummy';
import { LikeUsers } from './dummies/like.return.dummy';

describe('LikeController', () => {
  let likeController: LikeController;
  let likeService: LikeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LikeController],
      providers: [
        {
          provide: LikeService,
          useValue: {
            registerLike: jest.fn(() => LikeUsers),
          },
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard())
      .compile();

    likeController = module.get<LikeController>(LikeController);
    likeService = module.get<LikeService>(LikeService);
  });

  describe('RegisterLike', () => {
    it('SUCCESS: Dto에 포함된 userId와 postId를 입력 받아 좋아요 추가 및 postId에 해당하는 게시물에 좋아요를 누른 userId 반환', async () => {
      const likeDummyDto = LikeRegisterDto;
      const postId = 1;
      const likeUsersReturn = LikeUsers;

      const result = await likeController.registerLike(likeDummyDto, postId);

      expect(result).toStrictEqual(likeUsersReturn);
      expect(likeService.registerLike).toBeCalledTimes(1);
      expect(likeService.registerLike).toBeCalledWith(postId, likeDummyDto);
    });
  });
});

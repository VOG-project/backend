import { Test, TestingModule } from '@nestjs/testing';
import { LikeController } from '../like.controller';
import { LikeService } from '../like.service';
import { mockLikeService } from './mocks/like.service.mock';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { mockAuthGuard } from 'src/auth/tests/mocks/auth.guard.mock';
import { setLikeRegisterDtoDummy } from './dummies/like.dto.dummy';
import { setLikeListReturnDummy } from './dummies/like.return.dummy';

describe('LikeController', () => {
  let likeController: LikeController;
  let likeService: LikeService;
  const registerDto = setLikeRegisterDtoDummy();
  const registerReturn = setLikeListReturnDummy();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LikeController],
      providers: [
        {
          provide: LikeService,
          useValue: mockLikeService(),
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard())
      .compile();

    likeController = module.get<LikeController>(LikeController);
    likeService = module.get<LikeService>(LikeService);
  });

  describe('Register Like Data', () => {
    it('SUCCESS: 좋아요 버튼을 클릭할 시 좋아요 데이터 등록', async () => {
      expect(await likeController.registerLike(registerDto, 1)).toEqual(
        registerReturn,
      );
      expect(likeService.registerLike).toHaveBeenCalledTimes(1);
    });
  });
});

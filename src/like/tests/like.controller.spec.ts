import { Test, TestingModule } from '@nestjs/testing';
import { LikeController } from '../like.controller';
import { LikeService } from '../like.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { mockAuthGuard } from 'src/auth/tests/mocks/auth.guard.mock';

describe('LikeController', () => {
  let likeController: LikeController;
  let likeService: LikeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LikeController],
      providers: [
        {
          provide: LikeService,
          useValue: {},
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard())
      .compile();

    likeController = module.get<LikeController>(LikeController);
    likeService = module.get<LikeService>(LikeService);
  });

  describe('')
});

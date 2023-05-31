import { LikeRepository } from '../like.repository';
import { LikeService } from './../like.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('LikeService', () => {
  let likeService: LikeService;
  let likeRepository: LikeRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LikeService,
        {
          provide: LikeRepository,
          useValue: {},
        },
      ],
    }).compile();

    likeService = module.get<LikeService>(LikeService);
    likeRepository = module.get<LikeRepository>(LikeRepository);
  });
});

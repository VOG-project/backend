import { Test, TestingModule } from '@nestjs/testing';
import { RepliesService } from '../replies.service';

describe('RepliesService', () => {
  let repliesService: RepliesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RepliesService],
    }).compile();

    repliesService = module.get<RepliesService>(RepliesService);
  });
});

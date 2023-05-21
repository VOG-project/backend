import { Test, TestingModule } from '@nestjs/testing';
import { RepliesController } from '../replies.controller';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { mockAuthGuard } from 'src/auth/tests/mocks/auth.guard.mock';
import { ReplyRegisterDto } from './dummies/replies.dto.dummy';

describe('RepliesController', () => {
  let repliesController: RepliesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RepliesController],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard())
      .compile();

    repliesController = module.get<RepliesController>(RepliesController);
  });

  
});

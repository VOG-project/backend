import { Test, TestingModule } from '@nestjs/testing';
import { RepliesController } from '../replies.controller';
import { RepliesService } from '../replies.service';
import { mockReplyService } from './mocks/replies.service.mock';
import { setReplyRegisterDto } from './dummies/replies.dto.dummy';
import { setReplyRegisterReturn } from './dummies/replies.return.dummy';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { mockAuthGuard } from 'src/auth/tests/mocks/auth.guard.mock';

describe('RepliesController', () => {
  let replyController: RepliesController;
  let replyService: RepliesService;
  const replyDto = setReplyRegisterDto();
  const replyReturn = setReplyRegisterReturn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RepliesController],
      providers: [
        {
          provide: RepliesService,
          useValue: mockReplyService(),
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard())
      .compile();

    replyController = module.get<RepliesController>(RepliesController);
    replyService = module.get<RepliesService>(RepliesService);
  });

  describe('Register Reply Data', () => {
    it('SUCCESS: 답글 데이터를 생성하고 생성된 데이터 반환', async () => {
      expect(await replyController.registerReply(replyDto)).toEqual(
        replyReturn,
      );
      expect(replyService.registerReply).toHaveBeenCalledTimes(1);
    });
  });

  
});

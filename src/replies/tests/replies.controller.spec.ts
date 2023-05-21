import { Test, TestingModule } from '@nestjs/testing';
import { RepliesController } from '../replies.controller';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { mockAuthGuard } from 'src/auth/tests/mocks/auth.guard.mock';
import { ReplyRegisterDto } from './dummies/replies.dto.dummy';
import { RepliesService } from '../replies.service';
import { ReplyReturn } from './dummies/replies.return.dummy';

describe('RepliesController', () => {
  let repliesController: RepliesController;
  let repliesService: RepliesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RepliesController],
      providers: [
        {
          provide: RepliesService,
          useValue: {
            registerReply: jest.fn(() => ReplyReturn),
          },
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard())
      .compile();

    repliesController = module.get<RepliesController>(RepliesController);
    repliesService = module.get<RepliesService>(RepliesService);
  });

  describe('RegisterReply', () => {
    it('SUCCESS: 정상적인 Dto 값을 받으면 데이터 반환 ', async () => {
      const replyDummyDto = ReplyRegisterDto;
      const res = await repliesController.registerReply(replyDummyDto);
      expect(res).toStrictEqual(ReplyReturn);
      expect(repliesService.registerReply).toBeCalledTimes(1);
      expect(repliesService.registerReply).toBeCalledWith(replyDummyDto);
    });
  });
});

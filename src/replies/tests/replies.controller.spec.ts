import { Test, TestingModule } from '@nestjs/testing';
import { RepliesController } from '../replies.controller';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { mockAuthGuard } from 'src/auth/tests/mocks/auth.guard.mock';
import { ReplyModifyDto, ReplyRegisterDto } from './dummies/replies.dto.dummy';
import { RepliesService } from '../replies.service';
import {
  ReplyDeletedRowCountReturn,
  ReplyReturn,
} from './dummies/replies.return.dummy';
import { HttpException } from '@nestjs/common';

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
            modifyReply: jest.fn(() => ReplyReturn),
            removeReply: jest.fn(() => ReplyDeletedRowCountReturn),
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
    it('SUCCESS: 정상적인 Dto 값을 받으면 등록된 데이터 반환 ', async () => {
      const replyDummyDto = ReplyRegisterDto;
      const replyReturn = ReplyReturn;
      const res = await repliesController.registerReply(replyDummyDto);

      expect(res).toStrictEqual(replyReturn);
      expect(repliesService.registerReply).toBeCalledTimes(1);
      expect(repliesService.registerReply).toBeCalledWith(replyDummyDto);
    });
  });

  describe('ModifyReply', () => {
    const replyDummyDto = ReplyModifyDto;
    const replyId = 1;
    const replyReturn = ReplyReturn;

    it('SUCCESS: 답글 Id에 해당하는 답글 내용 수정 후, 수정된 데이터 반환', async () => {
      const res = await repliesController.modifyReply(replyDummyDto, replyId);

      expect(res).toStrictEqual(replyReturn);
      expect(repliesService.modifyReply).toBeCalledTimes(1);
      expect(repliesService.modifyReply).toBeCalledWith(replyDummyDto, replyId);
    });

    it('ERROR: 답글 Id에 해당하는 데이터가 없을 경우 에러 메세지와 404 상태코드 발생', async () => {
      jest.spyOn(repliesService, 'modifyReply').mockImplementationOnce(() => {
        throw new HttpException('존재하지 않는 답글입니다.', 404);
      });

      expect(
        async () => await repliesController.modifyReply(replyDummyDto, replyId),
      ).rejects.toThrow('존재하지 않는 답글입니다.');
      expect(repliesService.modifyReply).toBeCalledTimes(1);
      expect(repliesService.modifyReply).toBeCalledWith(replyDummyDto, replyId);
    });
  });

  describe('RemoveReply', () => {
    const DeletedCountReturn = ReplyDeletedRowCountReturn;
    const replyId = 1;

    it('SUCCESS: 답글 Id에 해당하는 답글 데이터 삭제 후, Reply 엔터티에서 삭제된 row 개수 반환', async () => {
      const res = await repliesController.removeReply(replyId);

      expect(res).toStrictEqual(DeletedCountReturn);
      expect(repliesService.removeReply).toBeCalledTimes(1);
      expect(repliesService.removeReply).toBeCalledWith(replyId);
    });

    it('ERROR: 답글 Id에 해당하는 답글 데이터가 없을 경우 에러 메세지와 404 상태코드 발생', async () => {
      jest.spyOn(repliesService, 'removeReply').mockImplementationOnce(() => {
        throw new HttpException('존재하지 않는 답글입니다.', 404);
      });

      expect(
        async () => await repliesController.removeReply(replyId),
      ).rejects.toThrow('존재하지 않는 답글입니다.');
      expect(repliesService.removeReply).toBeCalledTimes(1);
      expect(repliesService.removeReply).toBeCalledWith(replyId);
    });
  });
});

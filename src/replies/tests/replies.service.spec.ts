import { Test, TestingModule } from '@nestjs/testing';
import { RepliesService } from '../replies.service';
import { RepliesRepository } from '../replies.repository';
import { ReplyModifyDto, ReplyRegisterDto } from './dummies/replies.dto.dummy';
import {
  ReplyDeletedRowCountReturn,
  ReplyReturn,
} from './dummies/replies.return.dummy';

describe('RepliesService', () => {
  let repliesService: RepliesService;
  let repliesRepository: RepliesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RepliesService,
        {
          provide: RepliesRepository,
          useValue: {
            create: jest.fn(() => {
              return { replyId: 1 };
            }),
            findByReplyId: jest.fn(() => ReplyReturn),
            checkExist: jest.fn(() => true),
            update: jest.fn(),
            delete: jest.fn(() => {
              return { deletedCount: 1 };
            }),
          },
        },
      ],
    }).compile();

    repliesService = module.get<RepliesService>(RepliesService);
    repliesRepository = module.get<RepliesRepository>(RepliesRepository);
  });

  describe('RegisterReply', () => {
    it('SUCCESS: 정상적인 Dto 값을 받으면 등록된 데이터 반환', async () => {
      const replyDummyDto = ReplyRegisterDto;
      const replyReturn = ReplyReturn;
      const result = await repliesService.registerReply(replyDummyDto);

      // jest
      //   .spyOn(repliesRepository, 'create')
      //   .mockImplementationOnce((): any => {
      //     return { replyId: 1 };
      //   });

      expect(result).toStrictEqual(replyReturn);
      expect(repliesRepository.create).toBeCalledTimes(1);
      expect(repliesRepository.create).toBeCalledWith(replyDummyDto);
      expect(repliesRepository.findByReplyId).toBeCalledTimes(1);
      expect(repliesRepository.findByReplyId).toBeCalledWith(1);
    });
  });

  describe('ModifyReply', () => {
    const replyDummyDto = ReplyModifyDto;
    const replyId = 1;
    const replyReturn = ReplyReturn;

    it('SUCCESS: 답글 Id에 해당하는 데이터 갱신', async () => {
      const result = await repliesService.modifyReply(replyDummyDto, replyId);

      expect(result).toStrictEqual(replyReturn);
      expect(repliesRepository.checkExist).toBeCalledTimes(1);
      expect(repliesRepository.checkExist).toBeCalledWith(replyId);
      expect(repliesRepository.update).toBeCalledTimes(1);
      expect(repliesRepository.update).toBeCalledWith(replyDummyDto, replyId);
      expect(repliesRepository.findByReplyId).toBeCalledTimes(1);
      expect(repliesRepository.findByReplyId).toBeCalledWith(1);
    });

    it('EXCEPTION: 답글 Id에 해당하는 데이터가 없는 경우 에러 메세지와 404 상태코드 발생', async () => {
      jest
        .spyOn(repliesRepository, 'checkExist')
        .mockImplementationOnce(async () => false);

      expect(
        async () => await repliesService.modifyReply(replyDummyDto, replyId),
      ).rejects.toThrow('존재하지 않는 답글입니다.');
      expect(repliesRepository.checkExist).toBeCalledTimes(1);
      expect(repliesRepository.checkExist).toBeCalledWith(replyId);

      // 예외 발생 후 메소드 호출 되는 지도 확인
      expect(repliesRepository.update).toBeCalledTimes(0);
      expect(repliesRepository.findByReplyId).toBeCalledTimes(0);
    });
  });

  describe('RemoveReply', () => {
    const deletedCountReturn = ReplyDeletedRowCountReturn;
    const replyId = 1;

    it('SUCCESS: 답글 Id에 해당하는 답글 데이터 삭제 후, Reply 엔터티에서 삭제된 row 개수 반환', async () => {
      const result = await repliesService.removeReply(replyId);

      expect(result).toStrictEqual(deletedCountReturn);
      expect(repliesRepository.checkExist).toBeCalledTimes(1);
      expect(repliesRepository.checkExist).toBeCalledWith(replyId);
      expect(repliesRepository.delete).toBeCalledTimes(1);
      expect(repliesRepository.delete).toBeCalledWith(replyId);
    });

    it('EXCEPTION: 답글 Id에 해당하는 답글 데이터가 없을 경우 에러 메세지와 404 상태코드 발생', async () => {
      jest
        .spyOn(repliesRepository, 'checkExist')
        .mockImplementationOnce(async () => false);

      expect(
        async () => await repliesService.removeReply(replyId),
      ).rejects.toThrow('존재하지 않는 답글입니다.');
      expect(repliesRepository.checkExist).toBeCalledTimes(1);
      expect(repliesRepository.checkExist).toBeCalledWith(replyId);

      // 예외 발생 후 메소드 호출 되는 지도 확인
      expect(repliesRepository.delete).toBeCalledTimes(0);
    });
  });
});

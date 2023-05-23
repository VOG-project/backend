import { Test, TestingModule } from '@nestjs/testing';
import { FriendController } from '../friend.controller';
import { FriendService } from '../friend.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { mockAuthGuard } from 'src/auth/tests/mocks/auth.guard.mock';
import { FriendRegisterDto } from './dummies/friend.dto.dummy';
import { FriendReturn } from './dummies/friend.return.dummy';
import { HttpException } from '@nestjs/common';

describe('FriendController', () => {
  let friendController: FriendController;
  let friendService: FriendService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FriendController],
      providers: [
        {
          provide: FriendService,
          useValue: { registerFriend: jest.fn(() => FriendReturn) },
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard())
      .compile();

    friendController = module.get<FriendController>(FriendController);
    friendService = module.get<FriendService>(FriendService);
  });

  describe('RegisterFriend', () => {
    const friendDummyDto = FriendRegisterDto;
    const userId = 1;
    const friendReturn = FriendReturn;
    it('SUCCESS: 정상적인 입력 값을 받아 친구 등록, 등록 타겟 유저의 데이터 반환', async () => {
      const result = await friendController.registerFriend(
        friendDummyDto,
        userId,
      );

      expect(result).toStrictEqual(friendReturn);
      expect(friendService.registerFriend).toBeCalledTimes(1);
      expect(friendService.registerFriend).toBeCalledWith(
        userId,
        friendDummyDto,
      );
    });

    it('EXCEPTION: 자기 자신을 친구로 추가할 경우 에러 메세지 및 400 상태 코드 발생', async () => {
      jest
        .spyOn(friendController, 'registerFriend')
        .mockImplementationOnce(async () => {
          throw new HttpException(
            '자기 자신은 친구로 추가할 수 없습니다.',
            400,
          );
        });

      expect(
        async () =>
          await friendController.registerFriend(friendDummyDto, userId),
      ).rejects.toThrow('자기 자신은 친구로 추가할 수 없습니다');
    });
  });
});

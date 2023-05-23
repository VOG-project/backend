import { Test, TestingModule } from '@nestjs/testing';
import { FriendController } from '../friend.controller';
import { FriendService } from '../friend.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { mockAuthGuard } from 'src/auth/tests/mocks/auth.guard.mock';
import { FriendDeleteDto, FriendRegisterDto } from './dummies/friend.dto.dummy';
import {
  FriendDeletedRowCountReturn,
  FriendReturn,
  UserReturn,
} from './dummies/friend.return.dummy';
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
          useValue: {
            registerFriend: jest.fn(() => UserReturn),
            getFriends: jest.fn(() => FriendReturn),
            removeFriend: jest.fn(() => FriendDeletedRowCountReturn),
          },
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
    const userReturn = UserReturn;
    it('SUCCESS: 정상적인 입력 값을 받아 친구 등록, 등록 타겟 유저의 데이터 반환', async () => {
      const result = await friendController.registerFriend(
        friendDummyDto,
        userId,
      );

      expect(result).toStrictEqual(userReturn);
      expect(friendService.registerFriend).toBeCalledTimes(1);
      expect(friendService.registerFriend).toBeCalledWith(
        userId,
        friendDummyDto,
      );
    });

    // it('EXCEPTION: 자기 자신을 친구로 추가할 경우 에러 메세지 및 400 상태 코드 발생', async () => {
    //   jest
    //     .spyOn(friendController, 'registerFriend')
    //     .mockImplementationOnce(async () => {
    //       throw new HttpException(
    //         '자기 자신은 친구로 추가할 수 없습니다.',
    //         400,
    //       );
    //     });

    //   expect(
    //     async () =>
    //       await friendController.registerFriend(friendDummyDto, userId),
    //   ).rejects.toThrow('자기 자신은 친구로 추가할 수 없습니다');
    // });

    // it('EXCEPTION: 존재하지 않는 유저가 친구 추가할 경우 에러 메세지 및 404 상태 코드 발생', async () => {
    //   jest
    //     .spyOn(friendController, 'registerFriend')
    //     .mockImplementationOnce(async () => {
    //       throw new HttpException(
    //         '친구 등록을 시도하는 유저는 존재하지 않는 유저입니다.',
    //         404,
    //       );
    //     });

    //   expect(
    //     async () =>
    //       await friendController.registerFriend(friendDummyDto, userId),
    //   ).rejects.toThrow(
    //     '친구 등록을 시도하는 유저는 존재하지 않는 유저입니다.',
    //   );
    // });

    // it('EXCEPTION: 친구 추가하려는 대상이 존재하지 않을 경우 에러 메세지 및 404 상태 코드 발생', async () => {
    //   jest
    //     .spyOn(friendController, 'registerFriend')
    //     .mockImplementationOnce(async () => {
    //       throw new HttpException(
    //         '친구 추가하려는 대상은 존재하지 않는 유저입니다.',
    //         404,
    //       );
    //     });
    //   expect(
    //     async () =>
    //       await friendController.registerFriend(friendDummyDto, userId),
    //   ).rejects.toThrow('친구 추가하려는 대상은 존재하지 않는 유저입니다.');
    // });
  });

  describe('GetFriends', () => {
    const userId = 1;
    const friendsReturn = FriendReturn;

    it('SUCCESS: userId에 해당하는 유저가 등록한 친구들의 데이터 반환', async () => {
      const result = await friendController.getFriends(userId);

      expect(result).toStrictEqual(friendsReturn);
      expect(friendService.getFriends).toBeCalledTimes(1);
      expect(friendService.getFriends).toBeCalledWith(userId);
    });
  });

  describe('RemoveFriend', () => {
    const friendDummyDto = FriendDeleteDto;
    const userId = 1;
    const friendDeletedCount = FriendDeletedRowCountReturn;

    it('SUCCESS: Dto의 targetId와 userId에 해당하는 친구 데이터 삭제 후 삭제된 데이터 개수 반환', async () => {
      const result = await friendController.removeFriend(
        friendDummyDto,
        userId,
      );

      expect(result).toStrictEqual(friendDeletedCount);
      expect(friendService.removeFriend).toBeCalledTimes(1);
      expect(friendService.removeFriend).toBeCalledWith(userId, friendDummyDto);
    });
  });

  
});

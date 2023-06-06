import { Test, TestingModule } from '@nestjs/testing';
import { FriendService } from '../friend.service';
import { FriendRepository } from './../friend.repository';
import { FriendDeleteDto, FriendRegisterDto } from './dummies/friend.dto.dummy';
import {
  FriendDeletedRowCountReturn,
  FriendReturn,
  UserReturn,
} from './dummies/friend.return.dummy';
import { UserRepository } from 'src/users/users.repository';

describe('FriendService', () => {
  let friendService: FriendService;
  let friendRepository: FriendRepository;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FriendService,
        {
          provide: FriendRepository,
          useValue: {
            create: jest.fn(),
            findFreindsByUserId: jest.fn(() => FriendReturn),
            deleteFriend: jest.fn(() => FriendDeletedRowCountReturn),
          },
        },
        {
          provide: UserRepository,
          useValue: {
            findOneById: jest.fn(() => UserReturn),
            findByNickname: jest.fn(() => UserReturn),
          },
        },
      ],
    }).compile();

    friendService = module.get<FriendService>(FriendService);
    friendRepository = module.get<FriendRepository>(FriendRepository);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  describe('RegisterFriend', () => {
    const friendDummyDto = FriendRegisterDto;
    const userId = 2;
    const userReturn = UserReturn;
    it('SUCCESS: 친구 데이터로 targetId를 추가 및 추가된 친구 유저 데이터 반환', async () => {
      const result = await friendService.registerFriend(userId, friendDummyDto);

      expect(result).toStrictEqual(userReturn);
      expect(userRepository.findOneById).toBeCalledTimes(2);
      expect(userRepository.findOneById).toBeCalledWith(userId);
      expect(userRepository.findOneById).toBeCalledWith(
        friendDummyDto.targetId,
      );
      expect(friendRepository.create).toBeCalledTimes(1);
      expect(friendRepository.create).toBeCalledWith(
        userId,
        friendDummyDto.targetId,
      );
    });

    it('EXCEPTION: userId와 targetId가 같은 경우 에러 메세지 및 400 상태 코드 발생', async () => {
      expect(
        async () => await friendService.registerFriend(10, friendDummyDto),
      ).rejects.toThrow('자기 자신은 친구로 추가할 수 없습니다.');
    });

    it('EXCEPTION: userId에 해당하는 유저 데이터가 없을 경우 에러 메세지 및 404 상태 코드 발생', async () => {
      jest
        .spyOn(userRepository, 'findOneById')
        .mockImplementationOnce(() => undefined);

      expect(
        async () => await friendService.registerFriend(userId, friendDummyDto),
      ).rejects.toThrow(
        '친구 등록을 시도하는 유저는 존재하지 않는 유저입니다.',
      );
      expect(userRepository.findOneById).toBeCalledTimes(1);
      expect(userRepository.findOneById).toBeCalledWith(userId);
    });

    // it('EXCEPTION: targetId에 해당하는 유저 데이터가 없을 경우 에러 메세지 및 404 상태 코드 발생', async () => {
    //   const tempUserId = 1;
    //   jest
    //     .spyOn(userRepository, 'findOneById')
    //     .mockImplementationOnce((userId: number): any => {
    //       return userId === 1 ? true : undefined;
    //     });

    //   expect(
    //     async () =>
    //       await friendService.registerFriend(tempUserId, friendDummyDto),
    //   ).rejects.toThrow('친구 추가하려는 대상은 존재하지 않는 유저입니다.');
    //   expect(userRepository.findOneById).toBeCalledTimes(2);
    //   expect(userRepository.findOneById).toBeCalledWith(1);
    //   expect(userRepository.findOneById).toBeCalledWith(
    //     friendDummyDto.targetId,
    //   );
    // });
  });

  describe('GetFriends', () => {
    const userId = 1;
    const friendReturn = FriendReturn;
    it('SUCCESS: userId에 해당하는 유저가 추가한 친구 데이터를 반환', async () => {
      const result = await friendService.getFriends(userId);

      expect(result).toStrictEqual(friendReturn);
      expect(userRepository.findOneById).toBeCalledTimes(1);
      expect(userRepository.findOneById).toBeCalledWith(userId);
      expect(friendRepository.findFreindsByUserId).toBeCalledTimes(1);
      expect(friendRepository.findFreindsByUserId).toBeCalledWith(userId);
    });

    it('EXCEPTION: userId에 해당하는 유저 데이터가 없을 경우 에러 메세지 및 404 상태 코드 발생 ', async () => {
      jest
        .spyOn(userRepository, 'findOneById')
        .mockImplementationOnce(() => undefined);

      expect(
        async () => await friendService.getFriends(userId),
      ).rejects.toThrow('존재하지 않는 유저입니다.');
      expect(userRepository.findOneById).toBeCalledTimes(1);
      expect(userRepository.findOneById).toBeCalledWith(userId);
    });
  });

  describe('RemoveFriend', () => {
    const friendDummyDto = FriendDeleteDto;
    const userId = 1;
    const friendDeletedCount = FriendDeletedRowCountReturn;

    it('SUCCESS: targetId에 해당하는 친구 데이터를 삭제하고 삭제된 row 개수 반환', async () => {
      const result = await friendService.removeFriend(userId, friendDummyDto);

      expect(result).toStrictEqual(friendDeletedCount);
      expect(friendRepository.deleteFriend).toBeCalledTimes(1);
      expect(friendRepository.deleteFriend).toBeCalledWith(
        userId,
        friendDummyDto.targetId,
      );
    });

    it('EXCEPTION: userId와 targetId가 일치할 경우 에러 메세지 및 400 상태 코드 발생', async () => {
      const tempUserId = 10;

      expect(
        async () =>
          await friendService.removeFriend(tempUserId, friendDummyDto),
      ).rejects.toThrow('자기 자신은 친구 삭제할 수 없습니다.');
    });
  });

  describe('SearchFriend', () => {
    it('SUCCESS: nickname에 해당하는 유저 데이터 반환', async () => {
      const nickname = '테스트';
      const userReturn = UserReturn;

      const result = await friendService.searchFriend(nickname);

      expect(result).toStrictEqual(userReturn);
      expect(userRepository.findByNickname).toBeCalledTimes(1);
      expect(userRepository.findByNickname).toBeCalledWith(nickname);
    });
  });
});

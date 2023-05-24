import { Test, TestingModule } from '@nestjs/testing';
import { FriendService } from '../friend.service';
import { FriendRepository } from './../friend.repository';
import { FriendRegisterDto } from './dummies/friend.dto.dummy';
import { UserReturn } from './dummies/friend.return.dummy';
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
          useValue: { create: jest.fn() },
        },
        {
          provide: UserRepository,
          useValue: { findOneById: jest.fn(() => UserReturn) },
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
  });
});

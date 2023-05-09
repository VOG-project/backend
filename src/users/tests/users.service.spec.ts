import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../users.repository';
import { UserService } from '../users.service';
import { AuthService } from 'src/auth/auth.service';
import { mockAuthService } from 'src/auth/tests/mocks/auth.service.mock';
import { mockUserRepository } from './mocks/users.repository.mock';
import {
  setUserDeletedRowReturn,
  setUserReturn,
} from './dummies/users.return.dummy';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;
  const userReturn = setUserReturn();
  const deletedUserReturn = setUserDeletedRowReturn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: AuthService,
          useValue: mockAuthService(),
        },
        {
          provide: UserRepository,
          useValue: mockUserRepository(),
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  describe('Get User Data', () => {
    it('SUCCESS: 유저 ID에 해당하는 유저 데이터를 반환', async () => {
      expect(await userService.getUser(35)).toEqual(userReturn);
      expect(userRepository.findOneById).toHaveBeenCalledTimes(1);
    });
  });

  describe('Remove User Data', () => {
    it('SUCCESS: 유저 ID에 해당하는 유저 데이터를 삭제하고 유저 엔티티에서 삭제된 row 개수 반환', async () => {
      expect(await userService.removeUser(35)).toEqual(deletedUserReturn);
      expect(userRepository.findOneById).toHaveBeenCalledTimes(1);
      expect(userRepository.deleteById).toHaveBeenCalledTimes(1);
    });

    it('EXCEPTION: 유저 ID에 해당하는 데이터가 존재하지 않아 예외 발생', async () => {
      expect(async () => await userService.removeUser(40)).rejects.toThrow(
        '존재하지 않는 유저입니다.',
      );
    });
  });
});

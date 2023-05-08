import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../users.repository';
import { UserService } from '../users.service';
import { AuthService } from 'src/auth/auth.service';
import { mockAuthService } from 'src/auth/tests/mocks/auth.service.mock';
import { mockUserRepository } from './mocks/users.repository.mock';
import { setUserReturnDummy } from './dummies/users.return.dummy';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;
  const userReturn = setUserReturnDummy();

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
});

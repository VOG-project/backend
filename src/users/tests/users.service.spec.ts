import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../users.repository';
import { UserService } from '../users.service';
import { AuthService } from 'src/auth/auth.service';
import { mockAuthService } from 'src/auth/tests/mocks/auth.service.mock';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: AuthService,
          useValue: mockAuthService(),
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });
});

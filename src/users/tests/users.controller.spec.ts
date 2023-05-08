import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UserService } from '../users.service';
import { mockUserService } from './mocks/users.service.mock';
import {
  setRegisterDtoDummy,
  setUpdateDtoDummy,
} from './dummies/users.dto.dummy';
import {
  setDeletedRowReturnDummy,
  setUserReturnDummy,
} from './dummies/users.return.dummy';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { mockAuthGuard } from 'src/auth/tests/mocks/auth.guard.mock';

describe('UsersController', () => {
  let userController: UsersController;
  let userService: UserService;
  const updateDto = setUpdateDtoDummy();
  const registerDto = setRegisterDtoDummy();
  const userReturn = setUserReturnDummy();
  const deletedUserReturn = setDeletedRowReturnDummy();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService(),
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard())
      .compile();

    userController = module.get<UsersController>(UsersController);
    userService = module.get<UserService>(UserService);
  });

  describe('Update User Nickname', () => {
    it('SUCCESS: 유저 닉네임을 수정하고 해당 업데이트된 유저 데이터를 반환', async () => {
      expect(await userController.modifyNickname(updateDto, 35)).toEqual(
        userReturn,
      );
      expect(userService.modifyUser).toHaveBeenCalledTimes(1);
    });
  });

  describe('Get User Data', () => {
    it('SUCCESS: 유저 ID에 해당하는 유저 데이터를 반환', async () => {
      expect(await userController.getUser(35)).toEqual(userReturn);
      expect(userService.getUser).toHaveBeenCalledTimes(1);
    });
  });

  describe('Register User Data', () => {
    it('SUCCESS: 유저를 등록하고 해당 유저의 데이터를 반환', async () => {
      expect(await userController.registerUser(registerDto)).toEqual({
        jwtAccessToken: 'sl3ijfs3f.3fn2af.adsv35',
        ...userReturn,
      });
      expect(userService.registerUser).toHaveBeenCalledTimes(1);
    });
  });

  describe('Remove User Data', () => {
    it('SUCCESS: 유저와 관련된 데이터를 삭제하고 유저 엔티티에서 삭제된 row 개수 반환', async () => {
      expect(await userController.removeUser(35)).toEqual(deletedUserReturn);
      expect(userService.removeUser).toHaveBeenCalledTimes(1);
    });
  });
});

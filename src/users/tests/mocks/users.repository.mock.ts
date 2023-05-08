import { setUserReturnDummy } from '../dummies/users.return.dummy';

export const mockUserRepository = () => {
  const userReturn = setUserReturnDummy();

  return {
    updateProfileUrl: jest.fn(),
    update: jest.fn(),
    findOneById: jest.fn().mockResolvedValue(userReturn),
    findOneByOAuthId: jest.fn(),
    create: jest.fn(),
    findByNickname: jest.fn(),
    deleteById: jest.fn(),
  };
};

import {
  setDeletedRowReturnDummy,
  setUserReturnDummy,
} from '../dummies/users.return.dummy';

export const mockUserRepository = () => {
  const userReturn = setUserReturnDummy();
  const deletedUserReturn = setDeletedRowReturnDummy();

  return {
    updateProfileUrl: jest.fn(),
    update: jest.fn(),
    // userId가 35가 아니면 에러 발생하도록
    findOneById: jest.fn((userId) => {
      if (userId === 35) return userReturn;
      else return null;
    }),
    findOneByOAuthId: jest.fn(),
    create: jest.fn(),
    findByNickname: jest.fn(),
    deleteById: jest.fn().mockResolvedValue(deletedUserReturn),
  };
};

import {
  setUserDeletedRowReturn,
  setUserReturn,
} from '../dummies/users.return.dummy';

export const mockUserRepository = () => {
  const userReturn = setUserReturn();
  const deletedUserReturn = setUserDeletedRowReturn();

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

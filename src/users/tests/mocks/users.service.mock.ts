import {
  setUserDeletedRowReturn,
  setUserReturn,
} from '../dummies/users.return.dummy';

export const mockUserService = () => {
  const userReturn = setUserReturn();
  const deletedUserReturn = setUserDeletedRowReturn();

  return {
    modifyUser: jest.fn().mockResolvedValue(userReturn),
    registerUser: jest.fn().mockResolvedValue({
      jwtAccessToken: 'sl3ijfs3f.3fn2af.adsv35',
      ...userReturn,
    }),
    getUser: jest.fn().mockResolvedValue(userReturn),
    removeUser: jest.fn().mockResolvedValue(deletedUserReturn),
  };
};

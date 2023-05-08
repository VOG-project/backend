import { setLikeListReturnDummy } from '../dummies/like.return.dummy';

export const mockLikeService = () => {
  const registerReturn = setLikeListReturnDummy();

  return {
    registerLike: jest.fn().mockResolvedValue(registerReturn),
    cancelLike: jest.fn(),
    getLikeUser: jest.fn(),
  };
};

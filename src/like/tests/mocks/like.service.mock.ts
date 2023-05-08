import { setLikeListReturnDummy } from '../dummies/like.return.dummy';

export const mockLikeService = () => {
  const likeList = setLikeListReturnDummy();

  return {
    registerLike: jest.fn().mockResolvedValue(likeList),
    cancelLike: jest.fn().mockResolvedValue(likeList),
    getLikeUser: jest.fn(),
  };
};

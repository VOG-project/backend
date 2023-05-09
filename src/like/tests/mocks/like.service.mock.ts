import { setLikeListReturn } from '../dummies/like.return.dummy';

export const mockLikeService = () => {
  const likeList = setLikeListReturn();

  return {
    registerLike: jest.fn().mockResolvedValue(likeList),
    cancelLike: jest.fn().mockResolvedValue(likeList),
    getLikeUser: jest.fn().mockResolvedValue(likeList),
  };
};

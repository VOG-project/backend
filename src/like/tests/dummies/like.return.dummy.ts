import { LikeUserReturn } from 'src/like/dto/result.like.dto';

export const setLikeListReturn = (): LikeUserReturn => {
  return {
    userIds: [1, 6, 8, 9, 22, 34],
  };
};

import { LikeCreatRequest } from 'src/like/dto/create.like.dto';
import { LikeDeleteRequest } from 'src/like/dto/delete.like.dto';

export const LikeRegisterDto: LikeCreatRequest = {
  userId: 1,
};

export const LikeDeleteDto: LikeDeleteRequest = {
  userId: 1,
};

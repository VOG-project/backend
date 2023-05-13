import { PostDeletedCountReturn } from 'src/posts/dto/return.post.dto';
import { UserEntireDataReturn } from 'src/users/dto/return.user.dto';

export const setUserReturn = (): UserEntireDataReturn => {
  return {
    id: 35,
    oauthId: 'Sb35YY9N_bZgbfSW1jDYkjCcgKrEEHUQ8CLTn',
    provider: 'naver',
    nickname: '눈누난나',
    sex: '여',
    profileUrl: 'https://www.vog-storage/user/efsef.jpg',
    createdAt: new Date('2023-03-05 16:25:04.871850'),
    updatedAt: new Date('2023-03-05 16:25:04.871850'),
  };
};

export const setUserDeletedRowReturn = (): PostDeletedCountReturn => {
  return {
    deletedCount: 1,
  };
};

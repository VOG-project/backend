import { UserCreateRequest } from 'src/users/dto/create.user.dto';
import { UserModificationNicknameRequest } from 'src/users/dto/modify.user.dto';

export const setRegisterDtoDummy = (): UserCreateRequest => {
  return {
    oauthId: 'Sb35YY9N_bZgbfSW1jDYkjCcgKrEEHUQ8CLTn',
    provider: 'naver',
    nickname: '눈누난나',
    sex: '여',
  };
};

export const setUpdateDtoDummy = (): UserModificationNicknameRequest => {
  return {
    nickname: '뚜루뚜뚜',
  };
};

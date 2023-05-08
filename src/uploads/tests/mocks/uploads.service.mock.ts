import { setUserReturnDummy } from 'src/users/tests/dummies/users.return.dummy';

export const mockUploadService = () => {
  const userReturn = setUserReturnDummy();

  return {
    deleteUserProfileImageFile: jest.fn(),
    uploadUserProfileImageFile: jest.fn().mockResolvedValue(userReturn),
  };
};

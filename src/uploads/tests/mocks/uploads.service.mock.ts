import { setUserReturn } from 'src/users/tests/dummies/users.return.dummy';

export const mockUploadService = () => {
  const userReturn = setUserReturn();

  return {
    deleteUserProfileImageFile: jest.fn(),
    uploadUserProfileImageFile: jest.fn().mockResolvedValue(userReturn),
  };
};

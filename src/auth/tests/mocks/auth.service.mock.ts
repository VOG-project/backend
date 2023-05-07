export const mockAuthService = () => {
  return {
    loginByNaver: jest.fn(),
    requestNaverUserOAuthId: jest.fn(),
    loginByKakao: jest.fn(),
    decodeKakaoIdToken: jest.fn(),
    generateJwtAcessToken: jest.fn(),
    registerAuthInfo: jest.fn(),
  };
};

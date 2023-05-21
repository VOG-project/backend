export const mockAuthGuard = () => {
  return {
    canActivate: jest.fn((): boolean => true),
  };
};
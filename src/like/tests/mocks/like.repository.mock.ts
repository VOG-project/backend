export const mockLikeRepository = () => {
  return {
    createLike: jest.fn(),
    findLikeUsersByPostId: jest.fn().mockResolvedValue({
      userIds: ['1', '6', '8', '9', '22', '34'],
    }),
    deleteLike: jest.fn(),
    deleteLikeOfPost: jest.fn(),
  };
};

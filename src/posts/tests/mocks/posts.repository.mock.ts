export const mockPostRepository = () => {
  return {
    create: jest.fn(),
    findOneById: jest.fn((postId) => {
      if (postId === 1) return {};
      else return null;
    }),
    findPostListByBoardType: jest.fn(),
    findPostListByNickname: jest.fn(),
    findPostListByTitle: jest.fn(),
    addView: jest.fn(),
    findViewByPostId: jest.fn(),
    createView: jest.fn(),
    deleteView: jest.fn(),
    checkExist: jest.fn(),
    findPostAndUserById: jest.fn(),
    findCachingPost: jest.fn(),
    writeCachingPost: jest.fn(),
    update: jest.fn(),
    deletePost: jest.fn(),
    deleteCachingPost: jest.fn(),
  };
};

import { LikeRepository } from '../like.repository';
import { LikeService } from './../like.service';
import { Test, TestingModule } from '@nestjs/testing';
import { LikeRegisterDto } from './dummies/like.dto.dummy';
import { LikeUsers, PostReturn, UserReturn } from './dummies/like.return.dummy';
import { UserRepository } from './../../users/users.repository';
import { PostsRepository } from './../../posts/posts.repository';

describe('LikeService', () => {
  let likeService: LikeService;
  let likeRepository: LikeRepository;
  let userRepository: UserRepository;
  let postRepository: PostsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LikeService,
        {
          provide: LikeRepository,
          useValue: {
            findLikeUsersByPostId: jest.fn(() => LikeUsers),
            createLike: jest.fn(),
          },
        },
        {
          provide: UserRepository,
          useValue: { findOneById: jest.fn(() => UserReturn) },
        },
        {
          provide: PostsRepository,
          useValue: { findOneById: jest.fn(() => PostReturn) },
        },
      ],
    }).compile();

    likeService = module.get<LikeService>(LikeService);
    likeRepository = module.get<LikeRepository>(LikeRepository);
    userRepository = module.get<UserRepository>(UserRepository);
    postRepository = module.get<PostsRepository>(PostsRepository);
  });

  describe('RegisterLike', () => {
    const likeDummyDto = LikeRegisterDto;
    const postId = 1;
    const likeUsersReturn = LikeUsers;
    it('SUCCESS: SUCCESS: Dto에 포함된 userId와 postId를 입력 받아 좋아요 추가 및 postId에 해당하는 게시물에 좋아요를 누른 userId 반환', async () => {
      const result = await likeService.registerLike(postId, likeDummyDto);

      expect(result).toStrictEqual(likeUsersReturn);
      expect(userRepository.findOneById).toBeCalledTimes(1);
      expect(userRepository.findOneById).toBeCalledWith(likeDummyDto.userId);
      expect(postRepository.findOneById).toBeCalledTimes(1);
      expect(postRepository.findOneById).toBeCalledWith(postId);
      expect(likeRepository.createLike).toBeCalledTimes(1);
      expect(likeRepository.createLike).toBeCalledWith(
        postId,
        likeDummyDto.userId,
      );
      expect(likeRepository.findLikeUsersByPostId).toBeCalledTimes(1);
      expect(likeRepository.findLikeUsersByPostId).toBeCalledWith(postId);
    });
  });
});

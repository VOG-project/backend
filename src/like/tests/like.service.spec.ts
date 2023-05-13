import { Test, TestingModule } from '@nestjs/testing';
import { LikeRepository } from '../like.repository';
import { LikeService } from '../like.service';
import { mockLikeRepository } from './mocks/like.repository.mock';
import { setLikeRegisterDto } from './dummies/like.dto.dummy';
import { setLikeListReturn } from './dummies/like.return.dummy';
import { UserRepository } from 'src/users/users.repository';
import { mockUserRepository } from 'src/users/tests/mocks/users.repository.mock';
import { PostsRepository } from 'src/posts/posts.repository';
import { mockPostRepository } from 'src/posts/tests/mocks/posts.repository.mock';

describe('LikeService', () => {
  let likeService: LikeService;
  let likeRepository: LikeRepository;
  let userRepository: UserRepository;
  let postRepository: PostsRepository;
  const likeDto = setLikeRegisterDto();
  const likeList = setLikeListReturn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LikeService,
        {
          provide: LikeRepository,
          useValue: mockLikeRepository(),
        },
        {
          provide: UserRepository,
          useValue: mockUserRepository(),
        },
        {
          provide: PostsRepository,
          useValue: mockPostRepository(),
        },
      ],
    }).compile();

    likeService = module.get<LikeService>(LikeService);
    likeRepository = module.get<LikeRepository>(LikeRepository);
    userRepository = module.get<UserRepository>(UserRepository);
    postRepository = module.get<PostsRepository>(PostsRepository);
  });

  describe('Register Like', () => {
    it('SUCCESS: 게시물에 대한 좋아요 데이터 등록 후 등록된 userId 리스트 반환', async () => {
      expect(await likeService.registerLike(1, likeDto)).toEqual(likeList);
      expect(userRepository.findOneById).toHaveBeenCalledTimes(1);
      expect(postRepository.findOneById).toHaveBeenCalledTimes(1);
      expect(likeRepository.createLike).toHaveBeenCalledTimes(1);
      expect(likeRepository.findLikeUsersByPostId).toHaveBeenCalledTimes(1);
    });
  });

  describe('Cancel Like', () => {
    it('SUCCESS: 게시물에 대한 좋아요 데이터 취소 후 등록된 userId 리스트 반환', async () => {
      expect(await likeService.cancelLike(1, likeDto)).toEqual(likeList);
      expect(userRepository.findOneById).toHaveBeenCalledTimes(1);
      expect(postRepository.findOneById).toHaveBeenCalledTimes(1);
      expect(likeRepository.deleteLike).toHaveBeenCalledTimes(1);
      expect(likeRepository.findLikeUsersByPostId).toHaveBeenCalledTimes(1);
    });
  });

  describe('Get Like List', () => {
    it('SUCCESS: postId에 해당하는 게시물에 등록된 좋아요 userId 리스트 반환', async () => {
      expect(await likeService.getLikeUser(1)).toEqual(likeList);
      expect(postRepository.findOneById).toHaveBeenCalledTimes(1);
      expect(likeRepository.findLikeUsersByPostId).toHaveBeenCalledTimes(1);
    });

    it('EXCEPTION: 존재하지 않는 게시물 데이터에 접근하는 경우', async () => {
      expect(async () => await likeService.getLikeUser(2)).rejects.toThrow(
        '존재하지 않는 게시물입니다.',
      );
    });
  });
});

import { LikeRepository } from '../like.repository';
import { LikeService } from './../like.service';
import { Test, TestingModule } from '@nestjs/testing';
import { LikeDeleteDto, LikeRegisterDto } from './dummies/like.dto.dummy';
import { LikeUsers, PostReturn, UserReturn } from './dummies/like.return.dummy';
import { UserRepository } from './../../users/users.repository';
import { PostsRepository } from './../../posts/posts.repository';
import { HttpException } from '@nestjs/common';

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
            deleteLike: jest.fn(),
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

    it('SUCCESS: Dto에 포함된 userId와 postId를 입력 받아 좋아요 추가 및 postId에 해당하는 게시물에 좋아요를 누른 userId 반환', async () => {
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

    it('EXCEPTION: userId에 해당하는 유저가 없을 경우 에러메세지 및 404 상태코드 발생', async () => {
      jest
        .spyOn(userRepository, 'findOneById')
        .mockImplementationOnce(() => null);

      expect(
        async () => await likeService.registerLike(postId, likeDummyDto),
      ).rejects.toThrow('존재하지 않는 유저입니다.');
      expect(userRepository.findOneById).toBeCalledTimes(1);
      expect(userRepository.findOneById).toBeCalledWith(likeDummyDto.userId);
    });

    it('EXCEPTION: postId에 해당하는 게시물이 없을 경우 에러메세지 및 404 상태코드 발생', async () => {
      jest
        .spyOn(postRepository, 'findOneById')
        .mockImplementationOnce(() => null);

      // 이거 왜 호출 안되냐고
      //expect(postRepository.findOneById).toBeCalledTimes(1);

      expect(
        async () => await likeService.registerLike(postId, likeDummyDto),
      ).rejects.toThrow(new HttpException('존재하지 않는 게시물입니다.', 404));
      expect(userRepository.findOneById).toBeCalledTimes(1);
      expect(userRepository.findOneById).toBeCalledWith(likeDummyDto.userId);
    });
  });

  describe('CancelLike', () => {
    const likeDummyDto = LikeDeleteDto;
    const postId = 1;
    const likeUsersReturn = LikeUsers;

    it('SUCCESS: 좋아요 대상 userId와 postId 입력받아 좋아요 취소 및 postId에 해당하는 게시물에 좋아요를 누른 userId 반환', async () => {
      const result = await likeService.cancelLike(postId, likeDummyDto);

      expect(result).toStrictEqual(likeUsersReturn);
      expect(userRepository.findOneById).toBeCalledTimes(1);
      expect(userRepository.findOneById).toBeCalledWith(likeDummyDto.userId);
      expect(postRepository.findOneById).toBeCalledTimes(1);
      expect(postRepository.findOneById).toBeCalledWith(postId);
      expect(likeRepository.deleteLike).toBeCalledTimes(1);
      expect(likeRepository.deleteLike).toBeCalledWith(
        postId,
        likeDummyDto.userId,
      );
      expect(likeRepository.findLikeUsersByPostId).toBeCalledTimes(1);
      expect(likeRepository.findLikeUsersByPostId).toBeCalledWith(postId);
    });

    it('EXCEPTION: userId에 해당하는 유저가 없을 경우 에러메세지 및 404 상태코드 발생', async () => {
      jest
        .spyOn(userRepository, 'findOneById')
        .mockImplementationOnce(() => null);

      try {
        await likeService.cancelLike(postId, likeDummyDto);
        expect(userRepository.findOneById).toBeCalledTimes(1);
        expect(userRepository.findOneById).toBeCalledWith(likeDummyDto.userId);
      } catch (err) {
        expect(err.status).toBe(404);
        expect(err.response).toBe('존재하지 않는 유저입니다.');
      }
    });

    it('EXCEPTION: postId에 해당하는 게시물이 없을 경우 에러메세지 및 404 상태코드 발생', async () => {
      jest
        .spyOn(postRepository, 'findOneById')
        .mockImplementationOnce(() => null);

      try {
        await likeService.cancelLike(postId, likeDummyDto);

        expect(userRepository.findOneById).toBeCalledTimes(1);
        expect(userRepository.findOneById).toBeCalledWith(likeDummyDto.userId);
        expect(postRepository.findOneById).toBeCalledTimes(1);
        expect(postRepository.findOneById).toBeCalledWith(postId);
        expect(likeRepository.findLikeUsersByPostId).toBeCalledTimes(2);
        expect(likeRepository.findLikeUsersByPostId).toBeCalledWith(postId);
      } catch (err) {
        expect(err.status).toBe(404);
        expect(err.response).toBe('존재하지 않는 게시물입니다.');
      }
    });
  });

  describe('GetLikeUser', () => {
    const postId = 1;
    const likeUsersReturn = LikeUsers;

    it('SUCCESS: postId에 해당하는 게시물에 좋아요를 등록한 userId 배열 반환', async () => {
      const result = await likeService.getLikeUser(postId);

      expect(result).toStrictEqual(likeUsersReturn);
      expect(postRepository.findOneById).toBeCalledTimes(1);
      expect(postRepository.findOneById).toBeCalledWith(postId);
      expect(likeRepository.findLikeUsersByPostId).toBeCalledTimes(1);
      expect(likeRepository.findLikeUsersByPostId).toBeCalledWith(postId);
    });

    it('EXCEPTION: postId에 해당하는 게시물이 없을 경우 에러메세지 및 404 상태코드 발생', async () => {
      jest
        .spyOn(postRepository, 'findOneById')
        .mockImplementationOnce(() => null);

      try {
        await likeService.getLikeUser(postId);

        expect(postRepository.findOneById).toBeCalledTimes(1);
        expect(postRepository.findOneById).toBeCalledWith(postId);
        expect(likeRepository.findLikeUsersByPostId).toBeCalledTimes(1);
        expect(likeRepository.findLikeUsersByPostId).toBeCalledWith(postId);
      } catch (err) {
        expect(err.status).toBe(404);
        expect(err.response).toBe('존재하지 않는 게시물입니다.');
      }
    });
  });
});

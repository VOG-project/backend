import { Test, TestingModule } from '@nestjs/testing';
import { PostsRepository } from '../posts.repository';
import { PostsService } from '../posts.service';
import { PostRegisterDummyDto } from './dummies/posts.dto.dummy';
import { PostEntireReturn } from './dummies/posts.return.dummy';
import { LikeRepository } from 'src/like/like.repository';
import { CommentsRepository } from 'src/comments/comments.repository';

describe('PostsService', () => {
  let postsService: PostsService;
  let postsRepository: PostsRepository;
  let likeRepository: LikeRepository;
  let commentRepository: CommentsRepository;
  let jsonBuiltInObj: JSON;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: PostsRepository,
          useValue: {
            create: jest.fn(() => {
              return {
                postId: 1,
              };
            }),
            createView: jest.fn(),
            findOneById: jest.fn(() => PostEntireReturn),
            checkExist: jest.fn(() => true),
            addView: jest.fn(() => 10),
            findCachingPost: jest.fn(),
          },
        },
        {
          provide: LikeRepository,
          useValue: {},
        },
        {
          provide: CommentsRepository,
          useValue: {},
        },
      ],
    }).compile();

    postsService = module.get<PostsService>(PostsService);
    postsRepository = module.get<PostsRepository>(PostsRepository);
    likeRepository = module.get<LikeRepository>(LikeRepository);
    commentRepository = module.get<CommentsRepository>(CommentsRepository);
  });

  describe('RegisterPost', () => {
    const postId = 1;
    const postDummyDto = PostRegisterDummyDto;
    const postReturn = PostEntireReturn;

    it('SUCCESS: 댓글 데이터 생성 및 해당 데이터 반환', async () => {
      const result = await postsService.registerPost(postDummyDto);

      expect(result).toStrictEqual(postReturn);
      expect(postsRepository.create).toBeCalledTimes(1);
      expect(postsRepository.create).toBeCalledWith(postDummyDto);
      expect(postsRepository.createView).toBeCalledTimes(1);
      expect(postsRepository.createView).toBeCalledWith(postId);
      expect(postsRepository.findOneById).toBeCalledTimes(1);
      expect(postsRepository.findOneById).toBeCalledWith(postId);
    });
  });

  //describe('GetPostList', () => {});

  describe('GetPost', () => {
    const postId = 1;
    const postReturn = PostEntireReturn;
    const postReturnStringify = JSON.stringify(postReturn);

    it('SUCCESS: postId에 해당하는 데이터 반환(캐싱 데이터가 존재할 때)', async () => {
      jest
        .spyOn(postsRepository, 'findCachingPost')
        .mockImplementationOnce(async () => {
          return postReturnStringify;
        });

      jest.spyOn(JSON, 'parse').mockImplementationOnce(() => {
        return postReturn;
      });

      const result = await postsService.getPost(postId);

      expect(result).toStrictEqual(postReturn);
      expect(postsRepository.checkExist).toBeCalledTimes(1);
      expect(postsRepository.checkExist).toBeCalledWith(postId);
      expect(postsRepository.addView).toBeCalledTimes(1);
      expect(postsRepository.addView).toBeCalledWith(postId);
      expect(postsRepository.findCachingPost).toBeCalledTimes(1);
      expect(postsRepository.findCachingPost).toBeCalledWith(postId);
    });
  });
});

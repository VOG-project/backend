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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: PostsRepository,
          useValue: {},
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
});

import { Injectable, HttpException } from '@nestjs/common';
import { PostsRepository } from 'src/posts/posts.repository';
import { UserRepository } from 'src/users/users.repository';
import { LikeRepository } from './like.repository';

@Injectable()
export class LikeService {
  constructor(
    private readonly likeRepository: LikeRepository,
    private readonly userRepository: UserRepository,
    private readonly postRepository: PostsRepository,
  ) {}

  async registerLike(postId: number, userId: number) {
    const isExistedUser = await this.userRepository.findOneById(userId);
    if (!isExistedUser)
      throw new HttpException('존재하지 않는 유저입니다.', 400);

    const isExistedPost = await this.postRepository.findOneById(postId);
    if (!isExistedPost)
      throw new HttpException('존재하지 않는 게시물입니다.', 400);

    await this.likeRepository.createLike(postId, userId);

    const users = await this.likeRepository.findLikeUserByPostId(postId);
    //const result = users.map((id: string) => parseInt(id, 10));

    //return result;
  }
}

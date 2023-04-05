import { Injectable, HttpException } from '@nestjs/common';
import { PostsRepository } from 'src/posts/posts.repository';
import { UserRepository } from 'src/users/users.repository';
import { LikeRepository } from './like.repository';
import { LikeCreatRequest } from './dto/create.like.dto';
import { LikeDeleteRequest } from './dto/delete.like.dto';

@Injectable()
export class LikeService {
  constructor(
    private readonly likeRepository: LikeRepository,
    private readonly userRepository: UserRepository,
    private readonly postRepository: PostsRepository,
  ) {}

  async registerLike(
    postId: number,
    likeCreateRequest: LikeCreatRequest,
  ): Promise<any> {
    const { userId } = likeCreateRequest;

    const isExistedUser = await this.userRepository.findOneById(userId);
    if (!isExistedUser)
      throw new HttpException('존재하지 않는 유저입니다.', 400);

    const isExistedPost = await this.postRepository.findOneById(postId);
    if (!isExistedPost)
      throw new HttpException('존재하지 않는 게시물입니다.', 400);

    await this.likeRepository.createLike(postId, userId);

    const { userIds } = await this.likeRepository.findLikeUsersByPostId(postId);
    const result = userIds.map((id: string) => parseInt(id, 10));

    return { userIds: result };
  }

  async cancelLike(postId: number, likeDeleteRequest: LikeDeleteRequest) {
    const { userId } = likeDeleteRequest;

    const isExistedUser = await this.userRepository.findOneById(userId);
    if (!isExistedUser)
      throw new HttpException('존재하지 않는 유저입니다.', 400);

    const isExistedPost = await this.postRepository.findOneById(postId);
    if (!isExistedPost)
      throw new HttpException('존재하지 않는 게시물입니다.', 400);

    await this.likeRepository.deleteLike(postId, userId);

    const { userIds } = await this.likeRepository.findLikeUsersByPostId(postId);
    const result = userIds.map((id: string) => parseInt(id, 10));

    return { userIds: result };
  }

  async getLikeUser(postId: number) {
    const isExistedPost = await this.postRepository.findOneById(postId);
    if (!isExistedPost)
      throw new HttpException('존재하지 않는 게시물입니다.', 400);

    const { userIds } = await this.likeRepository.findLikeUsersByPostId(postId);
    const result = userIds.map((id: string) => parseInt(id, 10));

    return { userIds: result };
  }
}

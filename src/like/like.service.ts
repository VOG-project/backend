import { Injectable, HttpException } from '@nestjs/common';
import { PostsRepository } from 'src/posts/posts.repository';
import { UserRepository } from 'src/users/users.repository';
import { LikeRepository } from './like.repository';
import { LikeCreatRequest } from './dto/create.like.dto';
import { LikeDeleteRequest } from './dto/delete.like.dto';
import { LikeUserReturn } from './dto/result.like.dto';

@Injectable()
export class LikeService {
  constructor(
    private readonly likeRepository: LikeRepository,
    private readonly userRepository: UserRepository,
    private readonly postRepository: PostsRepository,
  ) {}

  /**
   * 좋아요 추가할 경우 데이터를 생성합니다.
   */
  async registerLike(
    postId: number,
    likeCreateRequest: LikeCreatRequest,
  ): Promise<LikeUserReturn> {
    const { userId } = likeCreateRequest;

    // 존재하지 않는 유저가 좋아요 할 경우 예외처리
    const isExistedUser = await this.userRepository.findOneById(userId);
    if (!isExistedUser)
      throw new HttpException('존재하지 않는 유저입니다.', 404);

    // 존재하지 않는 게시물에 좋아요 할 경우 예외처리
    const isExistedPost = await this.postRepository.findOneById(postId);
    if (!isExistedPost)
      throw new HttpException('존재하지 않는 게시물입니다.', 404);

    await this.likeRepository.createLike(postId, userId);

    const { userIds } = await this.likeRepository.findLikeUsersByPostId(postId);
    // redis에서 id가 문자열로 반환되기 때문에 number 타입으로 변환
    const result = userIds.map((id: string) => parseInt(id, 10));

    return { userIds: result };
  }

  /**
   * 좋아요 취소할 경우 좋아요 데이터를 삭제합니다.
   */
  async cancelLike(
    postId: number,
    likeDeleteRequest: LikeDeleteRequest,
  ): Promise<LikeUserReturn> {
    const { userId } = likeDeleteRequest;

    // 존재하지 않는 유저가 좋아요 취소 할 경우 예외처리
    const isExistedUser = await this.userRepository.findOneById(userId);
    if (!isExistedUser)
      throw new HttpException('존재하지 않는 유저입니다.', 404);

    // 존재하지 않는 게시물에 좋아요 취소 할 경우 예외처리
    const isExistedPost = await this.postRepository.findOneById(postId);
    if (!isExistedPost)
      throw new HttpException('존재하지 않는 게시물입니다.', 404);

    await this.likeRepository.deleteLike(postId, userId);

    const { userIds } = await this.likeRepository.findLikeUsersByPostId(postId);
    // redis에서 id가 문자열로 반환되기 때문에 number 타입으로 변환
    const result = userIds.map((id: string) => parseInt(id, 10));

    return { userIds: result };
  }

  /**
   * 게시물 아이디에 포함되는 좋아요 데이터를 반환합니다
   */
  async getLikeUser(postId: number) {
    const isExistedPost = await this.postRepository.findOneById(postId);
    // 존재하지 않는 게시물에 접근할 경우 예외처리
    if (!isExistedPost)
      throw new HttpException('존재하지 않는 게시물입니다.', 404);

    const { userIds } = await this.likeRepository.findLikeUsersByPostId(postId);
    // redis에서 id가 문자열로 반환되기 때문에 number 타입으로 변환
    const result = userIds.map((id: string) => parseInt(id, 10));

    return { userIds: result };
  }
}

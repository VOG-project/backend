import { Injectable, HttpException } from '@nestjs/common';
import { PostCreateRequest } from './dto/create.post.dto';
import { PostGetCondition } from './dto/get.post.dto';
import {
  PostAndCommentsReturn,
  PostDeletedCountReturn,
  PostEntireDataReturn,
  PostListReturn,
} from './dto/return.post.dto';
import { PostsRepository } from './posts.repository';
import { PostModificationRequest } from './dto/modify.post.dto';
import { LikeRepository } from './../like/like.repository';

@Injectable()
export class PostsService {
  constructor(
    private readonly postRepository: PostsRepository,
    private readonly likeRepository: LikeRepository,
  ) {}

  async registerPost(
    postRequestDto: PostCreateRequest,
  ): Promise<PostEntireDataReturn> {
    const { postId } = await this.postRepository.create(postRequestDto);
    return this.postRepository.findOneById(postId);
  }

  async getPostList(condition: PostGetCondition): Promise<PostListReturn[]> {
    let { board } = condition;
    const { page } = condition;
    const RESULT_ROW_COUNT = 10;

    board = board.toLowerCase();

    return this.postRepository.findPostListByBoardType(
      board,
      page,
      RESULT_ROW_COUNT,
    );
  }

  async getPost(postId: number): Promise<PostAndCommentsReturn> {
    const post = await this.postRepository.findOneById(postId);
    if (!post) throw new HttpException('존재하지 않는 게시물입니다.', 400);

    return this.postRepository.findPostAndComments(postId);
  }

  async modifyPost(
    postModificationRequest: PostModificationRequest,
    postId: number,
  ): Promise<PostEntireDataReturn> {
    const post = await this.postRepository.findOneById(postId);

    if (!post) {
      throw new HttpException('존재하지 않는 게시물입니다.', 404);
    }

    await this.postRepository.updatePost(postModificationRequest, postId);

    return this.postRepository.findOneById(postId);
  }

  async removePost(postId: number): Promise<PostDeletedCountReturn> {
    const post = await this.postRepository.findOneById(postId);
    if (!post) {
      throw new HttpException('존재하지 않는 게시물입니다.', 404);
    }

    await this.likeRepository.deleteLikeOfPost(postId);

    return this.postRepository.deletePost(postId);
  }
}

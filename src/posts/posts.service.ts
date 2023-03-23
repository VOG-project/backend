import { Injectable, HttpException } from '@nestjs/common';
import { PostCreateRequest } from './dto/create.post.dto';
import { PostGetCondition } from './dto/get.post.dto';
import {
  PostDeletedCountReturn,
  PostEntireResponseDto,
  PostListReturn,
} from './dto/return.post.dto';
import { PostsRepository } from './posts.repository';
import { PostModificationRequest } from './dto/modify.post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly postRepository: PostsRepository) {}

  async registerPost(
    postRequestDto: PostCreateRequest,
  ): Promise<PostEntireResponseDto> {
    const { postId } = await this.postRepository.create(postRequestDto);
    return this.postRepository.findOneById(postId);
  }

  async getPostList(condition: PostGetCondition): Promise<PostListReturn[]> {
    let { board } = condition;
    const { page } = condition;
    const RETURN_ROW_COUNT = 10;

    board = board.toLowerCase();

    return this.postRepository.findPostListByBoardType(
      board,
      page,
      RETURN_ROW_COUNT,
    );
  }

  async modifyPost(
    postModificationRequest: PostModificationRequest,
    postId: number,
  ) {
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

    return this.postRepository.deletePost(postId);
  }
}

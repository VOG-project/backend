import { Injectable } from '@nestjs/common';
import { PostRequestDto } from './dto/create.post.dto';
import { PostGetCondition } from './dto/get.post.dto';
import { PostEntireResponseDto } from './dto/response.post.dto';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(private readonly postRepository: PostsRepository) {}

  async registerPost(
    postRequestDto: PostRequestDto,
  ): Promise<PostEntireResponseDto> {
    const { postId } = await this.postRepository.create(postRequestDto);
    return this.postRepository.findOneById(postId);
  }

  async getPostList(condition: PostGetCondition) {
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
}

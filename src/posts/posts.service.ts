import { Injectable } from '@nestjs/common';
import {
  PostRegisterRequestDto,
  PostUpdateRequestDto,
} from './dto/post.request.dto';
import { PostsRepository } from './posts.repository';
import {
  PostDeleteResponseDto,
  PostRegisterResponseDto,
  PostUpdateResponseDto,
} from './dto/post.response.dto';

@Injectable()
export class PostsService {
  constructor(private readonly postRepository: PostsRepository) {}

  async getPostList(page: number, targetEntity: string) {
    return await this.postRepository.find10Each(page, targetEntity);
  }

  async registerPost(
    data: PostRegisterRequestDto,
    targetEntity: string,
  ): Promise<PostRegisterResponseDto> {
    return await this.postRepository.create(data, targetEntity);
  }

  async updatePost(
    data: PostUpdateRequestDto,
    postId: number,
    targetEntity: string,
  ): Promise<PostUpdateResponseDto> {
    return await this.postRepository.update(data, postId, targetEntity);
  }

  async deletePost(
    postId: number,
    targetEntity: string,
  ): Promise<PostDeleteResponseDto> {
    return await this.postRepository.delete(postId, targetEntity);
  }
}

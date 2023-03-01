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

  async registerPost(
    data: PostRegisterRequestDto,
    targetEntity: string,
  ): Promise<PostRegisterResponseDto> {
    return await this.postRepository.create(data, targetEntity);
  }

  async updatePost(
    data: PostUpdateRequestDto,
    postId: number,
  ): Promise<PostUpdateResponseDto> {
    return await this.postRepository.update(data, postId);
  }

  async deletePost(postId: number): Promise<PostDeleteResponseDto> {
    return await this.postRepository.delete(postId);
  }
}

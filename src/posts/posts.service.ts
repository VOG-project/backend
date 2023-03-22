import { Injectable } from '@nestjs/common';
import { PostRequestDto } from './dto/create.post.dto';
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
}

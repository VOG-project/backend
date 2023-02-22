import { Injectable } from '@nestjs/common';
import { PostRegisterRequestDto } from './dto/post.request.dto';
import { PostsRepository } from './posts.repository';
import { PostRegisterResponseDto } from './dto/post.response.dto';

@Injectable()
export class PostsService {
  constructor(private readonly postRepository: PostsRepository) {}
  async registerPost(
    data: PostRegisterRequestDto,
  ): Promise<PostRegisterResponseDto> {
    return await this.postRepository.create(data);
  }
}

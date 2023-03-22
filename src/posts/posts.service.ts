import { Injectable } from '@nestjs/common';
import { PostRequestDto } from './dto/create.post.dto';
import { PostEntireResponseDto } from './dto/response.post.dto';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(private readonly postRepository: PostsRepository) {}

  registerPost(postRequestDto: PostRequestDto): Promise<PostEntireResponseDto> {
    return this.postRepository.create(postRequestDto);
  }
}

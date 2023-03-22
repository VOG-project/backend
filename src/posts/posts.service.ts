import { Injectable } from '@nestjs/common';
import { PostRequestDto } from './dto/create.post.dto';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(private readonly postRepository: PostsRepository) {}

  registerPost(postRequestDto: PostRequestDto) {
    return this.postRepository.create(postRequestDto);
  }
}

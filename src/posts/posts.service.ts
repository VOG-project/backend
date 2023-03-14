import { Injectable, HttpException } from '@nestjs/common';
import {
  PostRegisterRequestDto,
  PostUpdateRequestDto,
} from './dto/post.request.dto';
import { PostsRepository } from './posts.repository';
import {
  PostDeleteResponseDto,
  PostGetListResponseDto,
  PostGetResponseDto,
  PostGetTotalCountResponseDto,
  PostRegisterResponseDto,
  PostUpdateResponseDto,
} from './dto/post.response.dto';
import { PostGetTotalCountQueryDto } from './dto/post.query.dto';

@Injectable()
export class PostsService {
  constructor(private readonly postRepository: PostsRepository) {}

  async getPost(id: number, targetEntity: string): Promise<PostGetResponseDto> {
    switch (targetEntity) {
      case 'freePost':
        return await this.postRepository.findFreePostById(id);
      case 'humorPost':
        return await this.postRepository.findHumorPostById(id);
      case 'championshipPost':
        return await this.postRepository.findChampionshipPostById(id);
    }
  }

  async getPostList(
    page: number,
    targetEntity: string,
  ): Promise<PostGetListResponseDto[]> {
    switch (targetEntity) {
      case 'freePost':
        return await this.postRepository.find10EachListFromFreePost(page);
      case 'humorPost':
        return await this.postRepository.find10EachListFromHumorPost(page);
      case 'championshipPost':
        return await this.postRepository.find10EachListFromChampionshipPost(
          page,
        );
    }
  }

  async getTotalPostCount(
    filter: PostGetTotalCountQueryDto,
  ): Promise<PostGetTotalCountResponseDto> {
    const { board } = filter;

    switch (board) {
      case 'free':
        return await this.postRepository.getFreePostTotalCount();
      case 'humor':
        return await this.postRepository.getHumorPostTotalCount();
      case 'championship':
        return await this.postRepository.getChampionshipPostTotalCount();
      default:
        throw new HttpException('올바른 게시판 카테고리가 아닙니다.', 400);
    }
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

import { Injectable, HttpException } from '@nestjs/common';
import { PostCreateRequest } from './dto/create.post.dto';
import { PostGetListCondition, PostSearchCondition } from './dto/get.post.dto';
import {
  PostDeletedCountReturn,
  PostEntireDataReturn,
  PostPagenationReturn,
} from './dto/return.post.dto';
import { PostsRepository } from './posts.repository';
import { PostModificationRequest } from './dto/modify.post.dto';
import { LikeRepository } from './../like/like.repository';
import { CommentsRepository } from 'src/comments/comments.repository';

@Injectable()
export class PostsService {
  constructor(
    private readonly postRepository: PostsRepository,
    private readonly likeRepository: LikeRepository,
    private readonly commentRepository: CommentsRepository,
  ) {}

  /**
   * 댓글 데이터를 생성하고 생성한 데이터를 반환합니다.
   */
  async registerPost(
    postRequestDto: PostCreateRequest,
  ): Promise<PostEntireDataReturn> {
    const { postId } = await this.postRepository.create(postRequestDto);
    this.postRepository.createView(postId);
    return await this.postRepository.findOneById(postId);
  }

  /**
   * 카테고리와 page 번호에 해당하는 게시물 목록을 반환합니다.
   */
  async getPostList(
    postGetListCondition: PostGetListCondition,
  ): Promise<PostPagenationReturn> {
    const postList = await this.postRepository.findPostListByBoardType(
      postGetListCondition,
    );
    const totalCount = postList.totalCount;

    // 하나의 게시물 데이터 객체마다 Redis에 존재하는 좋아요 데이터를 추가합니다.
    const result = await Promise.all(
      postList.result.map(async (post) => {
        const likeIds = await this.likeRepository.findLikeUsersByPostId(
          post.id,
        );
        const commentCount =
          await this.commentRepository.findCommentAndReplyCountByPostId(
            post.id,
          );
        const view = await this.postRepository.findViewByPostId(post.id);

        return { ...likeIds, ...post, ...commentCount, view };
      }),
    );

    const listResult = { totalCount, result };
    return listResult;
  }

  /**
   * 게시물 아이디에 해당하는 데이터를 반환합니다.
   */
  async getPost(postId: number): Promise<PostEntireDataReturn> {
    const isExistedPost = await this.postRepository.checkExist(postId);
    // 데이터가 존재하지 않으면 예외처리 합니다.
    if (!isExistedPost)
      throw new HttpException('존재하지 않는 게시물입니다.', 400);

    // 조회수 1 증가
    const view = await this.postRepository.addView(postId);

    // mysql에 접근하기 전에 redis에서 데이터를 가져옵니다. 없으면 mysql로 접근합니다.
    const cachingPost = await this.postRepository.findCachingPost(postId);
    if (cachingPost) {
      // 가져온 데이터는 문자열이기 때문에 JSON 객체로 변환해야합니다.
      const post = JSON.parse(cachingPost);
      return { ...post, view };
    }

    const post = await this.postRepository.findPostAndUserById(postId);
    // mysql에서 가져온 데이터를 캐싱이 가능하도록 redis에 저장합니다.
    await this.registerPostToCache(postId, post);

    return { ...post, view };
  }

  /**
   * redis에 게시물 데이터를 저장합니다.
   */
  async registerPostToCache(
    postId: number,
    post: PostEntireDataReturn,
  ): Promise<void> {
    await this.postRepository.writeCachingPost(postId, post);
  }

  /**
   * 게시물 데이터를 갱신합니다.
   */
  async modifyPost(
    postModificationRequest: PostModificationRequest,
    postId: number,
  ): Promise<PostEntireDataReturn> {
    const post = await this.postRepository.findOneById(postId);
    // 게시물 데이터가 존재하지 않으면 예외처리합니다.
    if (!post) {
      throw new HttpException('존재하지 않는 게시물입니다.', 404);
    }

    await this.postRepository.update(postModificationRequest, postId);

    const modifiedPost = await this.postRepository.findPostAndUserById(postId);
    // 수정된 데이터를 캐싱하기 위해 redis에 저장합니다.
    await this.registerPostToCache(postId, modifiedPost);
    const view = await this.postRepository.findViewByPostId(postId);

    return { ...modifiedPost, view };
  }

  /**
   * searchType에 해당하는 게시물 데이터를 반환합니다.
   */
  async searchPost(
    postSearchCondition: PostSearchCondition,
  ): Promise<PostPagenationReturn> {
    let postList: PostPagenationReturn;
    const { searchType } = postSearchCondition;
    if (searchType === 'nickname') {
      postList = await this.postRepository.findPostListByNickname(
        postSearchCondition,
      );
    } else if (searchType === 'title') {
      postList = await this.postRepository.findPostListByTitle(
        postSearchCondition,
      );
    } else {
      // searchType이 nickname이나 title이 아니면 예외처리
      throw new HttpException('닉네임과 제목으로만 검색할 수 있습니다.', 400);
    }

    const totalCount = postList.totalCount;
    // 하나의 게시물 데이터 객체마다 Redis에 존재하는 좋아요 데이터를 추가합니다.
    const result = await Promise.all(
      postList.result.map(async (post) => {
        const likeIds = await this.likeRepository.findLikeUsersByPostId(
          post.id,
        );
        const view = await this.postRepository.findViewByPostId(post.id);

        return { ...likeIds, ...post, view };
      }),
    );
    const listResult = { totalCount, result };
    return listResult;
  }

  /**
   * 게시물 아이디에 해당하는 데이터 row를 삭제합니다.
   */
  async removePost(postId: number): Promise<PostDeletedCountReturn> {
    const post = await this.postRepository.findOneById(postId);
    // 게시물 아이디에 해당하는 데이터가 없으면 예외처리
    if (!post) {
      throw new HttpException('존재하지 않는 게시물입니다.', 404);
    }

    // 게시물에 대한 좋아요 데이터를 삭제합니다.
    await this.likeRepository.deleteLikeOfPost(postId);
    // 게시물에 대한 캐시 데이터를 삭제합니다.
    await this.postRepository.deleteCachingPost(postId);
    // 게시물에 대한 조회수 데이터를 삭제합니다.
    await this.postRepository.deleteView(postId);
    return await this.postRepository.deletePost(postId);
  }
}

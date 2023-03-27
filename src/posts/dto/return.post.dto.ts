import { ApiProperty } from '@nestjs/swagger';
import { CommentEntireDataReturn } from 'src/comments/dto/return.comment.dto';
import { UserPkNicknameReturn } from 'src/users/dto/return.user.dto';

export class PostEntireDataReturn {
  @ApiProperty({
    example: 6,
    description: '게시물 PK',
  })
  id: number;

  @ApiProperty({
    example: '챌리저 찍음 ㅎㅎ',
    description: '게시물 제목',
  })
  title: string;

  @ApiProperty({
    example: '진짜 찍은 건 아님 ㅋㅋ 껄껄껄',
    description: '게시물 내용',
  })
  content: string;

  @ApiProperty({
    example: 712,
    description: '좋아요 개수',
  })
  likeCount: number;

  @ApiProperty({
    example: 'free',
    description: '게시판 카테고리(free | humor | championship)',
  })
  postCategory: string;

  @ApiProperty({
    example: '2023-03-05 16:25:04.871850',
    description: '게시물 생성 일자',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2023-03-05 16:25:04.871850',
    description: '게시물 수정 일자',
  })
  updatedAt: Date;
}

export class PostPkIdReturn {
  postId: number;
}

export class PostListReturn {
  @ApiProperty({
    example: 6,
    description: '게시물 PK',
  })
  id: number;

  @ApiProperty({
    example: '챌리저 찍음 ㅎㅎ',
    description: '게시물 제목',
  })
  title: string;

  @ApiProperty({
    example: 712,
    description: '좋아요 개수',
  })
  likeCount: number;

  @ApiProperty({
    example: 'free',
    description: '게시판 카테고리(free | humor | championship)',
  })
  postCategory: string;

  @ApiProperty({
    example: '2023-03-05 16:25:04.871850',
    description: '게시물 생성 일자',
  })
  createdAt: Date;
}

export class PostDeletedCountReturn {
  @ApiProperty({
    example: 2,
    description: '삭제된 게시물 row 개수',
  })
  deletedCount: number;
}

export class PostAndCommentsReturn {
  @ApiProperty({
    example: 6,
    description: '게시물 PK',
  })
  id: number;

  @ApiProperty({
    example: '챌리저 찍음 ㅎㅎ',
    description: '게시물 제목',
  })
  title: string;

  @ApiProperty({
    example: '진짜 찍은 건 아님 ㅋㅋ 껄껄껄',
    description: '게시물 내용',
  })
  content: string;

  @ApiProperty({
    example: 712,
    description: '좋아요 개수',
  })
  likeCount: number;

  @ApiProperty({
    example: 'free',
    description: '게시판 카테고리(free | humor | championship)',
  })
  postCategory: string;

  @ApiProperty({
    example: '2023-03-05 16:25:04.871850',
    description: '게시물 생성 일자',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2023-03-05 16:25:04.871850',
    description: '게시물 수정 일자',
  })
  updatedAt: Date;

  @ApiProperty({
    example: {
      id: 367,
      nickname: '페이커임',
    },
  })
  user: UserPkNicknameReturn;

  @ApiProperty({
    example: {
      id: 6,
      userId: 7,
      content: '댓글썼어용',
      group: 6,
      sequence: 0,
      createdAt: '2023-03-25T22:24:18.479Z',
      updatedAt: '2023-03-25T22:24:18.479Z',
      childeComments: CommentEntireDataReturn,
    },
  })
  comments: CommentEntireDataReturn[];
}

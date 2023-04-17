import { ApiProperty } from '@nestjs/swagger';
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
  likeCount?: number;

  @ApiProperty({
    example: 3721,
    description: '게시물 조회 수',
  })
  view: number;

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
      id: '32',
      nickname: '꾸꾸까까',
      profileUrl: 'dkfjaoef.com/user/efwef.jpg',
      updatedAt: '2023-03-05 16:25:04.871850',
    },
    description: '게시물 작성자 데이터',
  })
  user?: UserPkNicknameReturn;
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
    example: 3621,
    description: '게시물 조회 수',
  })
  view: number;

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
    example: {
      id: 35,
      nickname: '테스트 닉네임',
      profileUrl:
        'https://vog-image-storage.s3.ap-northeast-2.amazonaws.com/user/17-pro1588abc.jpg',
    },
    description: '작성자 정보',
  })
  user: object;
}

export class PostPagenationReturn {
  @ApiProperty({
    example: [
      {
        createdAt: '2023-04-14T04:38:48.250Z',
        id: 3,
        title: '하하하하',
        likeCount: 0,
        view: 0,
        postCategory: 'free',
        user: {
          id: 1,
          nickname: '꾸꾸까까',
          profileUrl: 'https://vog-image-s2.amazonaws.com/user/default.jpg',
        },
      },
    ],
  })
  result: PostListReturn[];

  @ApiProperty({
    example: 362,
    description: '검색한 게시물 총 개수',
  })
  totalCount: number;
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
}

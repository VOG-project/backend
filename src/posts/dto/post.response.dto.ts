import { ApiProperty } from '@nestjs/swagger';

export class PostRegisterResponseDto {
  @ApiProperty({
    example: 372,
    description: '게시물 식별 아이디',
  })
  postId: number;
}

export class PostUpdateResponseDto {
  @ApiProperty({
    example: 1,
    description: '업데이트된 게시물 개수',
  })
  updatedCount: number;
}

export class PostDeleteResponseDto {
  @ApiProperty({
    example: 1,
    description: '삭제된 게시물 개수',
  })
  deletedCount: number;
}

export class PostGetListResponseDto {
  @ApiProperty({
    example: 3,
    description: '게시물 아이디',
  })
  id: number;

  @ApiProperty({
    example: 62,
    description: '게시물 작성자 아이디',
  })
  writerId: number;

  @ApiProperty({
    example: '롤 티어 자랑합니다~',
    description: '게시물 타이틀',
  })
  title: string;

  @ApiProperty({
    example: 3671,
    description: '게시물 좋아요 개수',
  })
  likeCount: number;

  @ApiProperty({
    example: '리그오브레전드',
    description: '게시물 카테고리',
  })
  gameCategory: string;

  @ApiProperty({
    example: '2023-03-02T07:33:46.738Z',
    description: '게시물 수정 일자',
  })
  createdAt: Date;

  @ApiProperty({
    example: {
      id: 3621,
      nickname: '꾸꾸까까',
    },
    description: '게시물 작성자 정보',
  })
  user: {
    id: number;
    nickname: string;
  };
}

export class PostGetResponseDto {
  @ApiProperty({
    example: 3,
    description: '게시물 아이디',
  })
  id: number;

  @ApiProperty({
    example: 62,
    description: '게시물 작성자 아이디',
  })
  writerId: number;

  @ApiProperty({
    example: '페이커 선생님 사랑해요',
    description: '게시물 타이틀',
  })
  title: string;

  @ApiProperty({
    example: '사랑합니다사랑합니다사랑합니다사랑합니다 ... ',
    description: '게시물 내용',
  })
  @ApiProperty({
    example: 3671,
    description: '게시물 좋아요 개수',
  })
  likeCount: number;

  @ApiProperty({
    example: '리그오브레전드',
    description: '게시물 카테고리',
  })
  gameCategory: string;

  @ApiProperty({
    example: '2023-03-02T07:33:46.738Z',
    description: '게시물 수정 일자',
  })
  updatedAt: Date;

  @ApiProperty({
    example: {
      id: 3621,
      email: 'qwerty@naver.com',
      nickname: '꾸꾸까까',
      sex: '여',
      profileUrl: 'http://이미지URL.com',
      updatedAt: '2023-03-02T07:33:46.738Z',
    },
    description: '게시물 작성자 정보',
  })
  user: {
    id: number;
    email: string;
    nickname: string;
    sex: string;
    profileUrl: string;
    updatedAt: Date;
  };
}

export class PostGetTotalCountResponseDto {
  @ApiProperty({
    example: 36,
    description: '게시물 총 개수',
  })
  postCount: number;
}

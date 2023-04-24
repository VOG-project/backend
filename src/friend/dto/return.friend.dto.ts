import { ApiProperty } from '@nestjs/swagger';
import { UserEntireDataReturn } from 'src/users/dto/return.user.dto';

export class FriendFollowingReturn {
  @ApiProperty({
    example: 36,
    description: '유저 pk(친구 추가 시도하는 유저)',
  })
  userId: number;

  @ApiProperty({
    example: {
      id: 4,
      email: 'test4@test.com',
      nickname: '테스트4',
      sex: '남',
      profileUrl:
        'https://vog-image-storage.s3.ap-northeast-2.amazonaws.com/user/4-p.jpg',
    },
    description: '친구로 등록한 유저들의 데이터',
  })
  following: UserEntireDataReturn;
}

export class FriendDeletedCountReturn {
  @ApiProperty({
    example: 2,
    description: '삭제된 게시물 row 개수',
  })
  deletedCount: number;
}

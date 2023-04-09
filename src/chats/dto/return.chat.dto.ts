import { ApiProperty } from '@nestjs/swagger';

export class ChatEntireDataReturn {
  @ApiProperty({
    example: 'efs3f23a4-362efas-12was',
    description: '소켓 통신에서 사용될 roomId(uuid)',
  })
  roomId: string;

  @ApiProperty({
    example: '플레 이상 미드 한 분 구함',
    description: '방 제목',
  })
  title: string;

  @ApiProperty({
    example: '이 채팅방은 이런이런 채팅방입니다.',
    description: '방 설명',
  })
  description: string;

  @ApiProperty({
    example: 3,
    description: '현재 인원',
  })
  currentMember: number;

  @ApiProperty({
    example: 6,
    description: '최대 인원',
  })
  maximumMember: number;

  @ApiProperty({
    example: 2,
    description: '채팅방 번호',
  })
  no: number;

  @ApiProperty({
    example: '2023-03-05 16:25:04.871850',
    description: '채팅방 생성 일자',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2023-03-05 16:25:04.871850',
    description: '채팅방 수정 일자',
  })
  updatedAt: Date;
}

export class ChatIsAcceptableReturn {
  @ApiProperty({
    example: true,
    description: '채팅방 참여 가능 여부',
  })
  canParticipant: boolean;
}

export class ChatRoomTotalCountReturn {
  @ApiProperty({
    example: 33,
    description: '총 채팅방 개수',
  })
  chatRoomCount: number;
}

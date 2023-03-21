import { ApiProperty } from '@nestjs/swagger';

export class ChatRegisterRoomResponseDto {
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
    example: 3,
    description: '현재 인원',
  })
  currentMember: number;

  @ApiProperty({
    example: 6,
    description: '최대 인원',
  })
  maximumMember: number;
}

export class ChatAcceptParticipationResponseDto {
  @ApiProperty({
    example: true,
    description: '채팅방 참여 가능 여부',
  })
  canParticipant: boolean;
}

export class ChatGetRoomListResponseDto {
  @ApiProperty({
    example: '2023-03-21T03:46:10.190Z',
    description: '채팅방 생성 날짜',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2023-03-21T03:46:10.190Z',
    description: '채팅방 수정 날짜',
  })
  updatedAt: Date;

  @ApiProperty({
    example: '4cdf09-672b-4c2a-b9ec-e8d',
    description: '채팅방 접속 소켓 roomId',
  })
  roomId: string;

  @ApiProperty({
    example: '빨리 오세요',
    description: '채팅방 제목',
  })
  title: string;

  @ApiProperty({
    example: 2,
    description: '현재 채팅방 인원 수',
  })
  currentMember: number;

  @ApiProperty({
    example: 7,
    description: '채팅방 최대 인원 수',
  })
  maximumMember: number;

  @ApiProperty({
    example: 6,
    description: '채팅방 번호',
  })
  no: number;
}

export class ChatGetRoomTotalCountResponseDto {
  @ApiProperty({
    example: 33,
    description: '총 채팅방 개수',
  })
  chatRoomCount: number;
}

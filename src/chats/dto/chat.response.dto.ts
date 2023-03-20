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

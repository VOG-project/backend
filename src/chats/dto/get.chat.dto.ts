import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class ChatIsAcceptableCondition {
  @ApiProperty({
    example: 61,
    description: '채팅 참여를 원하는 유저 pk',
  })
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  userId: number;
}

export class ChatChatRoomListCondition {
  @ApiProperty({
    example: 2,
    description: '조회할 채팅방 목록 페이지 번호',
  })
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  page: number;
}

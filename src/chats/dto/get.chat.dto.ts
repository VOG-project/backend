import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, IsString } from 'class-validator';
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

export class ChatRoomSearchCondition {
  @ApiProperty({
    example: '게임 한판 합시다',
    description: '검색할 채팅방 제목',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: 2,
    description: '조회할 채팅방 목록 페이지 번호',
  })
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  page: number;
}

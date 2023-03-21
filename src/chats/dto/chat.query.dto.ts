import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class ChatGetChatRoomListQueryDto {
  @ApiProperty({
    example: 2,
    description: '조회할 채팅방 목록 페이지 번호',
  })
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  page: number;
}

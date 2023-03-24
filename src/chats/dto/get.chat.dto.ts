import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ChatIsAcceptableCondition {
  @ApiProperty({
    example: 61,
    description: '채팅 참여를 원하는 유저 pk',
  })
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}

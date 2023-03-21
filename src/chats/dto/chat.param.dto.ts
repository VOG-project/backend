import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ChatAcceptParticipationParamDto {
  @ApiProperty({
    example: 'c041d4ef-d7ff-4178-bd82-82dcbefa9a94',
    description: '참여하고자 하는 채팅방 roomId',
  })
  @IsNotEmpty()
  @IsString()
  roomId: string;
}

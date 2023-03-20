import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt } from 'class-validator';
import { CreatedUpdatedDate } from 'src/commonEntities/date.common.entity';

export class ChatRegisterRoomRequestDto {
  @ApiProperty({
    example: '미드 정글 두 자리 남습니다.',
    description: '방 제목',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: 5,
    description: '최대 인원',
  })
  @IsNotEmpty()
  @IsInt()
  maximum: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ReplyModifyRequest {
  @ApiProperty({
    example: '답글 달아봅니다~',
    description: '답글 내용',
  })
  @IsNotEmpty()
  @IsString()
  content: string;
}

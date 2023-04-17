import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserModificationNicknameRequest {
  @ApiProperty({
    example: '뚜루뚜뚜',
    description: '변경할 닉네임',
  })
  @IsNotEmpty()
  @IsString()
  newNickname: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class UserDeleteParam {
  @ApiProperty({
    example: 3,
    description: '유저 아이디(pk)',
  })
  @IsNotEmpty()
  @IsInt()
  userId: number;
}

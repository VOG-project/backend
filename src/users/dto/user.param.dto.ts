import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class UserDeletedInfoParamDto {
  @ApiProperty({
    example: 36,
    description: '유저 아이디',
  })
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  userId: number;
}

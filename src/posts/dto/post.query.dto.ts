import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PostGetTotalCountQueryDto {
  @ApiProperty({
    example: 'championship',
    description: '게시판 카테고리 이름(free, humor, championship',
  })
  @IsString()
  @IsNotEmpty()
  board: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class PostGetCondition {
  @ApiProperty({
    example: 'championship',
    description: '게시판 카테고리 명(free | humor | championship)',
  })
  @IsNotEmpty()
  @IsString()
  board: string;

  @ApiProperty({
    example: 3,
    description: '불러올 페이지 번호',
  })
  @IsNotEmpty()
  @IsInt()
  page: number;
}

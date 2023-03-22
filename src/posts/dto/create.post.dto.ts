import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PostRequestDto {
  @ApiProperty({
    example: '챌리저 찍음 ㅎㅎ',
    description: '게시물 제목',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: '진짜 찍은 건 아님 ㅋㅋ 껄껄껄',
    description: '게시물 내용',
  })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({
    example: 'free',
    description: '게시판 카테고리(free | humor | championship)',
  })
  @IsNotEmpty()
  @IsString()
  postCategory: string;
}

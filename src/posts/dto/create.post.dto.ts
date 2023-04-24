import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt, IsEnum } from 'class-validator';

enum CreateRequestTypeEnum {
  category1 = 'free',
  category2 = 'humor',
  category3 = 'championship',
}

export class PostCreateRequest {
  @ApiProperty({
    example: '372',
    description: '작성자 pk',
  })
  @IsNotEmpty()
  @IsInt()
  writerId: number;

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
  @IsEnum(CreateRequestTypeEnum)
  postCategory: string;
}
